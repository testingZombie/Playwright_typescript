import { Locator, Page, expect } from "@playwright/test";

export class CartPage{
    private page:Page;
    private checkOutID:Locator

    constructor(page:Page){
        this.page = page;
        this.checkOutID = page.locator('#checkout')
    }

    async clickCheckOut(){
        await this.checkOutID.click()
    }
}