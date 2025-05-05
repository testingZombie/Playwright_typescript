import { Locator, Page, expect } from "@playwright/test";

export class DashboardPage{
    private page:Page;
    private profileIcon:Locator
    private logoutBtn:Locator
    private createBtn:Locator
    private address:Locator
    private dealNum:Locator
    private agreement:Locator

    constructor(page:Page){
        this.page=page;
        this.profileIcon = this.page.locator(".profile-icon span")
        this.logoutBtn = this.page.locator(".logout-text")
        this.address  = this.page.getByRole('textbox', { name: 'Enter Address' })
        this.dealNum = this.page.getByRole('textbox', { name: 'Enter Deal Number' })
        this.agreement = this.page.locator("//label[contains(text(), 'Sale')]")
        this.createBtn = this.page.locator("//button[contains(text(),'CREATE NEW')]")
    }

    
    async getWelcomePageTitle(){
        return await this.page.title()
    }

    async getLogoutButtonText():Promise<string>{
        await this.profileIcon.click()
        return await this.logoutBtn.textContent() ?? '';
    }


    async takeScreenShot(){
        await this.page.screenshot({path: './reports/dashboard.png'});
    }

    async createDeal(deal_address:string,deal_number:string){
        await this.address.fill(deal_address);
        await this.dealNum.fill(deal_number);
        await this.agreement.click();
        await this.createBtn.click();
    
    }

    




}