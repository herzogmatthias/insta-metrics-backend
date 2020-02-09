import puppeteer from "puppeteer";

export class UserInformation {
  private browser: puppeteer.Browser | undefined;
  private page: puppeteer.Page | undefined;
  private constructor() {}

  public static InitAsync = async () => {
    const ui = new UserInformation();
    ui.browser = await puppeteer.launch();
    ui.page = await ui.browser.newPage();
    return ui;
  };
  async getProfilePicture(url: string): Promise<string> {
    await this.page?.goto(url);
    const imgs = await this.page?.$$eval("img._6q-tv[src]", imgs =>
      imgs.map(img => img.getAttribute("src"))
    );
    if (!imgs || imgs.length === 0) {
      const allImgs = await this.page?.$$eval("img[src]", imgs =>
        imgs.map(img => img.getAttribute("src"))
      );
      return allImgs![0] as string;
    }
    return imgs![0] as string;
  }
  async getName(url: string): Promise<string> {
    await this.page?.goto(url);
    const nameHandle = await this.page?.$$(".rhpdm");
    const name = await (
      await nameHandle![0].getProperty("textContent")
    ).jsonValue();
    console.log(name);
    return name as string;
  }
  async getBasicStats(url: string) {
    let basicStats = new Map<string, number>();
    await this.page?.goto(url);
    const basicStatsNameHandle = await this.page?.$$(".-nal3");
    const basicStatsHandle = await this.page?.$$(".g47SY");
    for (let i = 0; i < basicStatsHandle!.length; i++) {
      basicStats.set(
        await UserInformation.getKey(basicStatsNameHandle![i]),
        await this.getValue(basicStatsHandle![i])
      );
    }
    console.log(basicStats);
    return basicStats;
  }
  async getDescription(url: string) {
    await this.page?.goto(url);
    const descriptionHandle = await (await this.page?.$$(".-vDIg"))![0].$(
      "span"
    );
    console.log(
      await (await descriptionHandle?.getProperty("textContent"))?.jsonValue()
    );
  }
  static async getKey(value: puppeteer.ElementHandle<Element>) {
    return ((await (
      await value.getProperty("textContent")
    ).jsonValue()) as string).split(" ")[1];
  }

  private async getValue(
    value: puppeteer.ElementHandle<Element>
  ): Promise<number> {
    if (
      ((await (await value.getProperty("title")).jsonValue()) as string) !== ""
    ) {
      const val = (await (
        await value.getProperty("title")
      ).jsonValue()) as string;
      return Number(val.split(",").join(""));
    } else if (
      ((await (
        await value.getProperty("textContent")
      ).jsonValue()) as string).includes(",")
    ) {
      const val = (await (
        await value.getProperty("textContent")
      ).jsonValue()) as string;
      return Number(val.split(",").join(""));
    } else {
      return Number(await (await value.getProperty("textContent")).jsonValue());
    }
  }
}
