import {Page, expect} from '@playwright/test'

export class DealVerificationPage{
    private page:Page

    constructor(page:Page){
        this.page=page
    }

    
    async dealVerify(label: string){
        const deal =  this.page.locator(`//th[contains(text(),'${label}')]/../td`).textContent();
        return deal;
    }
}