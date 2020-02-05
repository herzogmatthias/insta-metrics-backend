import puppeteer from 'puppeteer'

export const checkUserName = async (username: string) => {
    const url = `https://www.instagram.com/${username}/`
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    const result = await page.title()
    if(result.includes("Page Not Found")) {
        return false
    }
    return true;
}