import puppeteer from 'puppeteer'

export default class AdvancedInformation{
    private browser: puppeteer.Browser | undefined;
    private page: puppeteer.Page | undefined;
    private constructor() {
    }
            
            
    public static InitAsync = async () => {
        const ui = new AdvancedInformation();
        ui.browser = await puppeteer.launch()
        ui.page = await ui.browser.newPage()
        return ui
    }

    async getLikes(url: string) {
        await this.page?.goto(url);
        const picture = (await this.page?.$$('.v1Nh3'))![0]
        picture.hover().then(async () => {
            const result = (await picture.$$('.qn-0x'))[0]
            console.log(await (await result.getProperty('textContent')).jsonValue())
        })
        
    }
}