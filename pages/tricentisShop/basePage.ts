import {Page,Locator,expect} from '@playwright/test'
import { time } from 'console';


export class BasePage{
    readonly page:Page;
    readonly logo:Locator;
    readonly registerLink:Locator
    readonly loginLink:Locator
    readonly searchBox:Locator
    readonly searchBtn:Locator
    
    constructor(page:Page){
        this.page = page
        this.logo = this.page.getByAltText("Tricentis Demo Web Shop")
        this.registerLink = this.page.getByText("Register")
        this.loginLink = this.page.getByText("Log in")
        this.searchBox = page.getByRole('button',{name: 'Search store'})
        this.searchBtn = page.getByRole('button',{name:'Search'})
        

    }

    async navigateTo(url:string): Promise<void>{
        await this.page.goto(url);
    }

    async goToHomePage():Promise<void>{
        await this.logo.click()
    }

    // async goToRegister():Promise<void>{
    //     await this.registerLink.click()
    // }

    async goToLogIn():Promise<void>{
        await this.loginLink.click()
    }

    async search(item:string):Promise<void>{
        await this.searchBox.fill(item);
        await this.searchBtn.click();
    }
}