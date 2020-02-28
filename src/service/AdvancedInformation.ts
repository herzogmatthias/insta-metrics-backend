import puppeteer from "puppeteer";
import { PictureStats } from "../interfaces/PictureStats";
import UserRepository from "../repositories/userRepository";
import User from "../interfaces/User";
import devices from "puppeteer/DeviceDescriptors";
import fetch from "node-fetch";
import { getCPMRates } from "./getCPMRates";
import { PostRootData } from "../interfaces/InstagramPostData";
import { UserRootData } from "../interfaces/InstagramUserData";

export default class AdvancedInformation {
  private browser: puppeteer.Browser | undefined;
  private page: puppeteer.Page | undefined;
  private constructor() {}

  public static InitAsync = async () => {
    const ai = new AdvancedInformation();
    ai.browser = await puppeteer.launch({
      headless: false
    });
    ai.page = await ai.browser.newPage();
    await ai.page.emulate(devices["Pixel 2"]);
    return ai;
  };

  async getCommentsandLikesXPosts(url: string, maxPictures: number) {
    await this.page?.goto(url);
    await this.autoScroll(maxPictures);
    const pictureStats: PictureStats[] = [];
    for (let i = 0; i < maxPictures; i++) {
      const picture = (await this.page?.$$(".v1Nh3 > a"))![i];
      const response = await fetch(
        ((await (await picture.getProperty("href")).jsonValue()) as string) +
          "?__a=1"
      );
      const data = await response.json();

      const imageData: PostRootData = data;
      pictureStats.push({
        comments:
          imageData.graphql.shortcode_media.edge_media_preview_comment.count,
        likes: imageData.graphql.shortcode_media.edge_media_preview_like.count
      });
    }
    return pictureStats;
  }

  static async getAvgCommentsAndLikes(url: string) {
    let avgComments = 0;
    let avgLikes = 0;
    const response = await fetch(url + "?__a=1");
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
        root.graphql.user.edge_owner_to_timeline_media.edges!.length
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
    const response = await fetch(url + "?__a=1");
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
    return await this.page!.$$eval(".v1Nh3", a => a.length);
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
