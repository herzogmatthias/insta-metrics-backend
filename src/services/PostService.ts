import UserRepository from "../repositories/userRepository";
import {
  PostRootData,
  ShortcodeMedia,
  Edge7,
} from "../interfaces/InstagramPostData";
import { getCPMRates } from "./getCPMRates";
import { UserRootData } from "../interfaces/InstagramUserData";
import { PictureStats } from "../interfaces/PictureStats";
import {
  ImagePreview,
  ImageDetails,
  BasicUserInformation,
  Image,
} from "../interfaces/Image";
import fetch from "node-fetch";
import { Instagram_Url, Instagram_Api_Param, query_hash } from "../config";
import { MultiplePostsRootData } from "../interfaces/InstagramMultiplePostsData";
import UserService from "./UserService";
import { Ranking } from "../interfaces/Ranking";

export default class PostService {
  async getDetailsForPicture(shortCode: string) {
    const url = `${Instagram_Url}p/${shortCode}/${Instagram_Api_Param}`;
    const media = ((await (await fetch(url)).json()) as PostRootData).graphql
      .shortcode_media;
    const er = await this.getErForPost(media.owner.username, shortCode);
    let hashTags: string[] | undefined = [];
    if (media.edge_media_to_caption.edges[0]) {
      hashTags = media.edge_media_to_caption.edges[0].node.text
        .match(/#\w+/g)
        ?.map((v) => v.replace("#", ""));
    }
    const image: ImageDetails = {
      id: shortCode,
      er: er,
      hashTags: hashTags ? hashTags : [],
      caption: media.edge_media_to_caption.edges[0]
        ? media.edge_media_to_caption.edges[0].node.text
        : "",
      comments: media.edge_media_to_parent_comment.count,
      likes: media.edge_media_preview_like.count,
      owner: {
        avatar: media.owner.profile_pic_url,
        name: media.owner.full_name,
        username: media.owner.username,
      },
      previewComments: media.edge_media_to_parent_comment.edges.map((val) => {
        return {
          likes: val.node.edge_liked_by.count,
          timeStamp: val.node.created_at,
          owner: {
            avatar: val.node.owner.profile_pic_url,
            name: "",
            username: val.node.owner.username,
          },
          text: val.node.text,
        };
      }),
      images: media.edge_sidecar_to_children
        ? this.getImages(media)
        : [
            {
              display_url: media.is_video
                ? media.video_url!
                : media.display_url,
              tagged_users:
                media.edge_media_to_tagged_user.edges.length != 0
                  ? this.getTaggedUsers(media.edge_media_to_tagged_user.edges)
                  : [],
              isVideo: media.is_video,
            },
          ],
    };
    return image;
  }
  private getImages(media: ShortcodeMedia): Image[] {
    return media.edge_sidecar_to_children!.edges.map((val) => {
      return {
        isVideo: val.node.is_video,
        display_url: val.node.is_video
          ? val.node.video_url!
          : val.node.display_url,
        tagged_users:
          val.node.edge_media_to_tagged_user.edges.length != 0
            ? this.getTaggedUsers(val.node.edge_media_to_tagged_user.edges)
            : [],
      };
    });
  }
  private getTaggedUsers(users: Edge7[]): BasicUserInformation[] {
    return users.map((user) => {
      return {
        avatar: user.node.user.profile_pic_url,
        name: user.node.user.full_name,
        username: user.node.user.username,
      };
    });
  }
  async getLastFiftyPictures(username: string) {
    const CursorAndIgIdPromise = UserRepository.getIgIdAndCursor(username);
    const userService = new UserService();
    const followersPromise = UserRepository.getFollowersForUsername(username);
    const basicPromise = userService.getBasicInformation(
      `${Instagram_Url}${username}/${Instagram_Api_Param}`
    );
    const data = await Promise.all([
      CursorAndIgIdPromise,
      followersPromise,
      basicPromise,
    ]);
    const [igId, cursor] = [...data[0]];
    const followers = data[1];
    const basic = data[2];
    const url = `${Instagram_Url}graphql/query/?query_hash=${query_hash}&variables=%7B%22id%22%3A"${igId}%22%2C%22first%22%3A50%2C%22after%22%3A%22${encodeURIComponent(
      cursor
    )}%22%7D`;
    const media = ((await (await fetch(url)).json()) as MultiplePostsRootData)
      .data.user.edge_owner_to_timeline_media.edges;
    let images: ImagePreview[] = [];

    await Promise.all(
      media.map(async (val, ind) => {
        const image: ImagePreview = {
          id: val.node.shortcode,
          er: await this.getErForPost(username, val.node.shortcode, followers),
          caption: val.node.edge_media_to_caption.edges[0]
            ? val.node.edge_media_to_caption.edges[0].node.text
            : "",
          likes: val.node.edge_media_preview_like.count,
          comments: val.node.edge_media_to_comment.count,
          author: basic.name,
          avatarUrl: basic.avatar,
          imageUrl: val.node.display_url,
          timeStamp: val.node.taken_at_timestamp,
          isVideo: val.node.is_video,
          multipleViews: val.node.edge_sidecar_to_children ? true : false,
        };
        images.push(image);
      })
    );
    return images;
  }

  async getAvgEngagementRate(url: string, followers?: number) {
    let f;
    if (!followers) {
      f = await UserRepository.getFollowersForUsername(
        url.split("/")[url.split("/").length - 2]
      );
    } else {
      f = followers;
    }

    let avgComments = 0;
    let avgLikes = 0;
    const response = await fetch(url);
    const data = await response.json();
    const root: UserRootData = data;

    avgComments =
      root.graphql.user.edge_owner_to_timeline_media.edges!.reduce(
        (prev, curr) => {
          return prev + curr.node.edge_media_to_comment.count;
        },
        0
      ) / root.graphql.user.edge_owner_to_timeline_media.edges!.length;
    avgLikes +=
      root.graphql.user.edge_owner_to_timeline_media.edges!.reduce(
        (prev, curr) => {
          return prev + curr.node.edge_media_preview_like.count;
        },
        0
      ) / root.graphql.user.edge_owner_to_timeline_media.edges!.length;

    return ((avgComments + avgLikes) / f) * 100;
  }

  async getAvgPriceForAds(
    url: string,
    engagementRate?: number,
    followers?: number
  ): Promise<{ min: number; max: number }> {
    let er;
    if (!engagementRate) {
      er = await UserRepository.getEngagementRateForUsername(
        url.split("/")[url.split("/").length - 2]
      );
    } else {
      er = engagementRate;
    }
    const cpmValue = getCPMRates(er);
    let f;
    if (!followers) {
      f = await UserRepository.getFollowersForUsername(
        url.split("/")[url.split("/").length - 2]
      );
    } else {
      f = followers;
    }
    const price = (f / 1000) * cpmValue;

    return { min: price - price * 0.15, max: price + price * 0.5 };
  }

  async getRankingsForPost(shortCode: string) {
    const url = `${Instagram_Url}p/${shortCode}/${Instagram_Api_Param}`;
    const media = ((await (await fetch(url)).json()) as PostRootData).graphql
      .shortcode_media;

    const username = media.owner.username;
    const er = await this.getErForPost(username, shortCode);
    const images = await this.getLastFiftyPictures(username);
    return [
      this.getRank(images, "likes", media.edge_media_preview_like.count),
      this.getRank(
        images,
        "comments",
        media.edge_media_to_parent_comment.count
      ),
      this.getRank(images, "er", er),
    ];
  }

  private getRank(
    images: ImagePreview[],
    type: "er" | "likes" | "comments",
    value: number
  ) {
    let counter = 0;
    images.forEach((val) => {
      if (val[type] > value) {
        counter++;
      }
    });
    return {
      rank: counter,
      percentage: 100 - (counter / 50) * 100,
      type:
        type === "er"
          ? "Engagement Rate"
          : type[0].toUpperCase() + type.substr(1),
    } as Ranking;
  }

  async getErForPost(username: string, id: string, followers?: number) {
    let storedFollowers = followers
      ? followers
      : await UserRepository.getFollowersForUsername(username);
    if (storedFollowers === -1) {
      storedFollowers = ((await (
        await fetch(`${Instagram_Url}${username}/${Instagram_Api_Param}`)
      ).json()) as UserRootData).graphql.user.edge_followed_by.count;
    }
    const response = await fetch(
      `${Instagram_Url}p/${id}/${Instagram_Api_Param}`
    );
    const data = await response.json();
    const imageData: PostRootData = data;
    return (
      ((imageData.graphql.shortcode_media.edge_media_preview_comment.count +
        imageData.graphql.shortcode_media.edge_media_preview_like.count) /
        storedFollowers) *
      100
    );
  }
}
