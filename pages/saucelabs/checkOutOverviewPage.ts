import { Locator, Page, expect } from "@playwright/test";

export class CheckOverviewPage{
    private page:Page;
    private productNameClass:Locator
    private productPriceClass:Locator
    private readonly finishButton:Locator

    constructor(page:Page){
        this.page = page;
        this.productNameClass = page.locator(".inventory_item_name")
        this.productPriceClass = page.locator(".inventory_item_price")
        this.finishButton = page.getByText('Finish')
    }

    async getProductDetails(){
        const productName =  await this.productNameClass.textContent()
        const productPrice =  await this.productPriceClass.textContent()

        return {
            productName,
            productPrice
        }

    }

    async clickFinish(){
        await this.finishButton.click()
    }
}