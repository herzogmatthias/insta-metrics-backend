import puppeteer from 'puppeteer'

export class UserInformation {
    private browser: puppeteer.Browser | undefined;
    private page: puppeteer.Page | undefined;
    private constructor() {
    }
            
            
    public static InitAsync = async () => {
        const ui = new UserInformation();
        ui.browser = await puppeteer.launch()
        ui.page = await ui.browser.newPage()
        return ui
    }
    async getProfilePicture(url: string): Promise<string>{
        await this.page?.goto(url)
        const imageHandle = await this.page?.$$('._6q-tv');
        const image = await imageHandle![0].getProperty('src')
        const imagesrc = await image.jsonValue()
        return imagesrc as string
    }
    async getName(url: string): Promise<string> {
        await this.page?.goto(url)
        const nameHandle = await this.page?.$$('.rhpdm');
       const name = await (await nameHandle![0].getProperty('textContent')).jsonValue()
       console.log(name);
       return name as string;
    }
    async getBasicStats(url: string) {
        let basicStats = new Map<string, number>()
        await this.page?.goto(url)
        const basicStatsNameHandle = await this.page?.$$('.-nal3')
        const basicStatsHandle = await this.page?.$$('.g47SY');
        for(let i = 0 ; i < basicStatsHandle!.length; i++) {
            basicStats.set(await UserInformation.getKey(basicStatsNameHandle![i]), await (await basicStatsHandle![i].getProperty('textContent')).jsonValue() as number)
        }
        console.log(basicStats)
        return basicStats
    }
    async getDescription(url: string) {
        await this.page?.goto(url)
        const descriptionHandle = await (await this.page?.$$('.-vDIg'))![0].$('span')
        console.log(await (await descriptionHandle?.getProperty('textContent'))?.jsonValue())
    }
    static async getKey(value: puppeteer.ElementHandle<Element>) {
        return (await (await value.getProperty('textContent')).jsonValue() as string).split(' ')[1]
    }
}