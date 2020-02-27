import puppeteer from "puppeteer";
import { PictureStats } from "../interfaces/PictureStats";
import UserRepository from "../repositories/userRepository";
import User from "../interfaces/User";
import devices from "puppeteer/DeviceDescriptors";
import { InstagramData } from "../interfaces/InstagramData";
import fetch from "node-fetch";

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
      if (i > 11) {
        await this.autoScroll(maxPictures);
      }
      const picture = (await this.page?.$$(".v1Nh3 > a"))![i];
      const response = await fetch(
        ((await (await picture.getProperty("href")).jsonValue()) as string) +
          "?__a=1"
      );
      const data = await response.json();
      const imageData: InstagramData = data;
      pictureStats.push({
        comments:
          imageData.graphql.shortcode_media.edge_media_preview_comment.count,
        likes: imageData.graphql.shortcode_media.edge_media_preview_like.count
      });
    }
    return pictureStats;
  }

  async getPriceForPost(username: string) {
    const user = (await UserRepository.findUser(username)) as User;
    const price = (user.followers / 100) * 10;
    return { min: price - price * 0.05, max: price + price * 0.2 };
  }

  async getErForPost(username: string, id: string) {
    const followers = await UserRepository.getFollowersForUsername(username);
    const response = await fetch(`https://www.instagram.com/p/${id}/?__a=1`);
    const data = await response.json();
    const imageData: InstagramData = data;
    return (
      ((imageData.graphql.shortcode_media.edge_media_preview_comment.count +
        imageData.graphql.shortcode_media.edge_media_preview_like.count) /
        followers) *
      100
    );
  }

  private async checkForVideo(): Promise<boolean> {
    try {
      const playButton = await this.page?.$eval("video", e => {});
      return true;
    } catch {
      return false;
    }
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
