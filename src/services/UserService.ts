import BasicUserInformation from "../interfaces/BasicUserInformation";
import { UserRootData } from "../interfaces/InstagramUserData";
import { BasicStatistics } from "../interfaces/BasicStatistics";
import {
  Instagram_Url,
  Instagram_Api_Param,
  imagga_basic_auth,
} from "../config";
import { PostRootData } from "../interfaces/InstagramPostData";
import fetch, { Response } from "node-fetch";

export default class UserService {
  async getBasicInformation(url: string): Promise<BasicUserInformation> {
    const user = ((await (await fetch(url)).json()) as UserRootData).graphql
      .user;
    return {
      avatar: user.profile_pic_url,
      name: user.full_name,
      username: user.username,
    };
  }
  async getBasicStats(url: string): Promise<BasicStatistics> {
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
    console.log(id);
    const firstShortCode =
      data.edge_owner_to_timeline_media.edges[0].node.shortcode;
    const picture = ((await (
      await fetch(`${Instagram_Url}p/${firstShortCode}/${Instagram_Api_Param}`)
    ).json()) as PostRootData).graphql.shortcode_media;
    const cursor = picture.edge_media_to_parent_comment.page_info.end_cursor;
    return [id, cursor];
  }

  async getTags(url: string) {
    const pictures = ((await (
      await fetch(url)
    ).json()) as UserRootData).graphql.user.edge_owner_to_timeline_media.edges!.filter(
      (v) => !v.node.is_video
    );
    const tags: string[] = [];
    const responses: Response[] = [];
    for (let i = 0; i < pictures.length && i < 5; i++) {
      setTimeout(() => null, 1100);
      responses.push(
        await fetch(
          "https://api.imagga.com/v2/tags?image_url=" +
            encodeURIComponent(pictures[i].node.display_url),
          {
            headers: {
              Authorization: imagga_basic_auth,
            },
          }
        )
      );
    }
    for (const response of responses) {
      const body = await response.json();
      console.log(body);
      if (body.result) {
        tags.push(body.result.tags[0]);
      }
    }

    return tags;
  }
}
