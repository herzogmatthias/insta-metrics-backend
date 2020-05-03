import BasicUserInformation from "../interfaces/BasicUserInformation";
import { UserRootData } from "../interfaces/InstagramUserData";
import { BasicStatistics } from "../interfaces/BasicStatistics";
import { Instagram_Url, Instagram_Api_Param } from "../config";
import { PostRootData } from "../interfaces/InstagramPostData";
import fetch, { Response } from "node-fetch";
import { PictureStats } from "../interfaces/PictureStats";
import { Tag } from "../interfaces/Tag";
import PostService from "./PostService";
import User from "../interfaces/User";
import UserRepository from "../repositories/userRepository";

export default class UserService {
  async getBasicInformation(
    url: string,
    isBot?: boolean,
    withDescription: boolean = false
  ): Promise<BasicUserInformation> {
    console.log(isBot);
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    const user = data.graphql.user;
    let u: User | undefined = undefined;
    if (isBot === undefined) {
      u = await UserRepository.findUser(user.username);
    }

    if (withDescription) {
      return {
        avatar: user.profile_pic_url,
        name: user.full_name,
        username: user.username,
        description: user.biography,
        isBot: isBot === undefined ? u!.isBot : isBot,
      };
    } else {
      return {
        avatar: user.profile_pic_url,
        name: user.full_name,
        username: user.username,
        isBot: isBot === undefined ? u!.isBot : isBot,
      };
    }
  }
  async getBasicStats(url: string): Promise<BasicStatistics> {
    console.log(url);
    const user = ((await (await fetch(url)).json()) as UserRootData).graphql
      .user;
    return {
      following: user.edge_follow.count,
      followers: user.edge_followed_by.count,
      posts: user.edge_owner_to_timeline_media.count,
    };
  }

  async getIgIdandCursor(url: string) {
    const data = ((await (await fetch(url)).json()) as UserRootData).graphql
      .user;
    const id = data.id;
    const cursor = data.edge_owner_to_timeline_media.page_info.has_next_page
      ? data.edge_owner_to_timeline_media.page_info.end_cursor
      : null;

    return [id, cursor];
  }

  async getAvgCommentsAndLikes(url: string) {
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
  async getTags(url: string) {
    const pictures = ((await (
      await fetch(url)
    ).json()) as UserRootData).graphql.user.edge_owner_to_timeline_media.edges!.filter(
      (v) => !v.node.is_video
    );
    const tags: Tag[] = [];
    const responses: Response[] = [];
    for (let i = 0; i < pictures.length && i < 5; i++) {
      setTimeout(() => null, 1100);
      responses.push(
        await fetch(
          "https://api.imagga.com/v2/tags?image_url=" +
            encodeURIComponent(pictures[i].node.display_url),
          {
            headers: {
              Authorization: process.env.imagga_basic_auth!,
            },
          }
        )
      );
    }
    for (const response of responses) {
      const body = await response.json();
      if (body.result) {
        tags.push(...body.result.tags);
      }
    }

    return tags.sort((a, b) => b.confidence - a.confidence).splice(0, 5);
  }
  async getGeneralInformation(username: string) {
    const user = await UserRepository.findUser(username);
    const basic = await this.getBasicInformation(
      `${Instagram_Url}${username}/${Instagram_Api_Param}`,
      undefined,
      true
    );
    user.description = basic.description!;
    user.avatar = basic.avatar;
    user.name = basic.name;
    return user;
  }
  async getGraphData(username: string) {
    const postService = new PostService();
    const images = await postService.getLastFiftyPictures(username);
    images.sort((a, b) => a.timeStamp - b.timeStamp);
    return [
      {
        header: "Engagement Rate",
        chart: images.map((i) => {
          return { name: i.timeStamp, data: i.er };
        }),
      },
      {
        header: "Likes",
        chart: images.map((i) => {
          return { name: i.timeStamp, data: i.likes };
        }),
      },
      {
        header: "Comments",
        chart: images.map((i) => {
          return { name: i.timeStamp, data: i.comments };
        }),
      },
    ];
  }
  async getUserData(username: string, URI: string, isBot: boolean) {
    const postService = new PostService();
    const basicStats = await this.getBasicStats(URI);
    const [id, cursor] = await this.getIgIdandCursor(URI);
    const avgStats = await this.getAvgCommentsAndLikes(URI);
    const avgER = await postService.getAvgEngagementRate(
      URI,
      basicStats.followers
    );
    const avgAdPrice = await postService.getAvgPriceForAds(
      URI,
      avgER,
      basicStats.followers
    );
    let user: User = {
      userName: username,
      followers: basicStats.followers,
      following: basicStats.following,
      posts: basicStats.posts,
      cursor: cursor!,
      igId: id!,
      isBot: isBot,
      avgComments: avgStats.comments,
      avgLikes: avgStats.likes,
      avgEngagementRate: avgER,
      avgPriceMin: avgAdPrice.min,
      avgPriceMax: avgAdPrice.max,
    };
    return user;
  }
}
