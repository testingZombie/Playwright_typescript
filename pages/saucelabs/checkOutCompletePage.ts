import { Locator, Page, expect } from "@playwright/test";

export class CheckOutCompletePage{
    private page:Page;
    private thankyouHeader:Locator


    constructor(page:Page){
        this.page = page;
        this.thankyouHeader = page.locator('.complete-header')
    }

    async getThankYouMessage(){
        const thankyou = await this.thankyouHeader.textContent()
        return thankyou

    }
}