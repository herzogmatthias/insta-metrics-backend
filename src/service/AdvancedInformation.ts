import puppeteer from "puppeteer";
import { PictureStats } from "../interfaces/PictureStats";

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
    return ai;
  };

  async getCommentsandLikesXPictures(url: string, maxPictures: number) {
    await this.page?.goto(url);
    await this.autoScroll(maxPictures);
    const pictures = (await this.page?.$$(".v1Nh3"))!;
    const pictureStats: PictureStats[] = [];
    for (let i = 0; i < maxPictures; i++) {
      await pictures[i].hover();
      const likesAndComments = (await pictures[i].$$(".qn-0x"))[0];
      const result = await likesAndComments.$("ul.Ln-UN");
      let comments = (await (
        await (await result!.$$("li"))[1]!.getProperty("textContent")
      ).jsonValue()) as number;
      let likes = (await (
        await (await result!.$$("li"))[0]!.getProperty("textContent")
      ).jsonValue()) as number;

      pictureStats.push({ likes, comments });
    }
    return pictureStats;
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
}
