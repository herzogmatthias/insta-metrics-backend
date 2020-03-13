import puppeteer from "puppeteer";
import fetch, { FetchError, Response } from "node-fetch";
import { UserRootData } from "../interfaces/InstagramUserData";
import BasicUserInformation from "../interfaces/BasicUserInformation";
import { BasicStatistics } from "../interfaces/BasicStatistics";
import { imagga_basic_auth } from "../config";

export class UserInformation {
  constructor() {}

  async getBasicInformation(url: string): Promise<BasicUserInformation> {
    const user = ((await (await fetch(url)).json()) as UserRootData).graphql
      .user;
    return {
      avatar: user.profile_pic_url,
      name: user.full_name,
      username: user.username
    };
  }
  async getBasicStats(url: string): Promise<BasicStatistics> {
    const user = ((await (await fetch(url)).json()) as UserRootData).graphql
      .user;

    return {
      following: user.edge_follow.count,
      followers: user.edge_followed_by.count,
      posts: user.edge_owner_to_timeline_media.count
    };
  }
  async getLastThreePosts(url: string) {
    const browser: puppeteer.Browser = await puppeteer.launch({
      headless: true
    });
    const page: puppeteer.Page | undefined = await browser.newPage();
    await page?.goto(url);
    const pictures = (await page?.$$(".v1Nh3"))!;
    const embedHTML: string[] = [];
    for (let i = 0; i < 3; i++) {
      await pictures[i].click();
      await page?.waitFor(1000);
      console.log(page?.url());
      const response = await fetch(
        `https://api.instagram.com/oembed/?url=${page?.url()}`,
        { method: "GET" }
      );
      const body = await response.json();
      embedHTML.push(body.html);
      await page?.goBack();
    }
    browser.close();
    return embedHTML;
  }

  async getTags(url: string) {
    const pictures = ((await (
      await fetch(url)
    ).json()) as UserRootData).graphql.user.edge_owner_to_timeline_media.edges!.filter(
      v => !v.node.is_video
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
              Authorization: imagga_basic_auth
            }
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
