import puppeteer from "puppeteer";
import { PictureStats } from "../interfaces/PictureStats";
import UserRepository from "../repositories/userRepository";
import User from "../interfaces/User";
import devices from "puppeteer/DeviceDescriptors";
import fetch from "node-fetch";
import { getCPMRates } from "./getCPMRates";
import {
  PostRootData,
  ShortcodeMedia,
  Edge6,
  EdgeMediaToTaggedUser2,
  Edge7,
} from "../interfaces/InstagramPostData";
import { UserRootData } from "../interfaces/InstagramUserData";
import { Instagram_Url, query_hash, Instagram_Api_Param } from "../config";
import { MultiplePostsRootData } from "../interfaces/InstagramMultiplePostsData";
import {
  ImagePreview,
  ImageDetails,
  Image,
  BasicUserInformation,
} from "../interfaces/Image";
import querystring from "querystring";
import { UserInformation } from "./UserInformation";

export default class AdvancedInformation {
  private browser: puppeteer.Browser | undefined;
  private page: puppeteer.Page | undefined;
  private constructor() {}

  public static InitAsync = async () => {
    const ai = new AdvancedInformation();
    ai.browser = await puppeteer.launch({
      headless: false,
    });
    ai.page = await ai.browser.newPage();
    await ai.page.emulate(devices["Pixel 2"]);
    return ai;
  };

  static async getDetailsForPicture(shortCode: string) {
    const url = `${Instagram_Url}p/${shortCode}/${Instagram_Api_Param}`;
    const media = ((await (await fetch(url)).json()) as PostRootData).graphql
      .shortcode_media;
    const image: ImageDetails = {
      id: shortCode,
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
  static getImages(media: ShortcodeMedia): Image[] {
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
  static getTaggedUsers(users: Edge7[]): BasicUserInformation[] {
    return users.map((user) => {
      return {
        avatar: user.node.user.profile_pic_url,
        name: user.node.user.full_name,
        username: user.node.user.username,
      };
    });
  }
  static async getLastFiftyPictures(username: string) {
    const [igId, cursor] = await UserRepository.getIgIdAndCursor(username);
    const ui = new UserInformation();
    const basic = await ui.getBasicInformation(
      `${Instagram_Url}${username}/${Instagram_Api_Param}`
    );
    const url = `${Instagram_Url}graphql/query/?query_hash=${query_hash}&variables=%7B%22id%22%3A"${igId}%22%2C%22first%22%3A50%2C%22after%22%3A%22${encodeURIComponent(
      cursor
    )}%22%7D`;
    const media = ((await (await fetch(url)).json()) as MultiplePostsRootData)
      .data.user.edge_owner_to_timeline_media.edges;
    const images: ImagePreview[] = [];

    media.map((val, ind) => {
      const image: ImagePreview = {
        id: val.node.shortcode,
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
    });
    return images;
  }

  static async getAvgCommentsAndLikes(url: string) {
    let avgComments = 0;
    let avgLikes = 0;
    const response = await fetch(url);
    const data = await response.json();
    const root: UserRootData = data;

    avgComments = root.graphql.user.edge_owner_to_timeline_media.edges!.reduce(
      (prev, curr) => {
        return prev + curr.node.edge_media_to_comment.count;
      },
      0
    );
    avgLikes += root.graphql.user.edge_owner_to_timeline_media.edges!.reduce(
      (prev, curr) => {
        return prev + curr.node.edge_media_preview_like.count;
      },
      0
    );

    return {
      likes:
        avgLikes / root.graphql.user.edge_owner_to_timeline_media.edges!.length,
      comments:
        avgComments /
        root.graphql.user.edge_owner_to_timeline_media.edges!.length,
    } as PictureStats;
  }
  static async getAvgEngagementRate(url: string, followers?: number) {
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

  static async getAvgPriceForAds(
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

    return { min: price - price * 0.05, max: price + price * 0.15 };
  }

  static async getErForPost(username: string, id: string) {
    const followers = await UserRepository.getFollowersForUsername(username);
    const response = await fetch(`https://www.instagram.com/p/${id}/?__a=1`);
    const data = await response.json();
    const imageData: PostRootData = data;
    return (
      ((imageData.graphql.shortcode_media.edge_media_preview_comment.count +
        imageData.graphql.shortcode_media.edge_media_preview_like.count) /
        followers) *
      100
    );
  }

  private async autoScroll(imageNumber: number) {
    const delay = 1000;
    let preCount = 0;
    let postCount = 0;
    do {
      preCount = await this.getCount();
      await this.scrollDown();
      await this.page!.waitFor(delay);
      postCount = await this.getCount();
    } while (postCount < imageNumber && postCount > preCount);
  }
  private async getCount() {
    return await this.page!.$$eval(".v1Nh3", (a) => a.length);
  }
  private async scrollDown() {
    await this.page!.evaluate(() => {
      const allItems = document.getElementsByClassName("v1Nh3");
      console.log(allItems);
      allItems[allItems.length - 1].scrollIntoView();
    });
  }
  stopBrowser() {
    this.browser?.close();
  }
}
