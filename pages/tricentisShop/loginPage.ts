import {Page, Locator} from '@playwright/test'
import { BasePage } from './basePage'

export class LoginPage extends BasePage{
    readonly emailInput:Locator;
    readonly passwordInput:Locator;
    readonly rememberMeCheckbox: Locator;
    readonly loginButton: Locator

    constructor(page:Page){
        super(page);
        this.emailInput = this.page.locator('#Email');
        this.passwordInput = this.page.locator('#Password');
        this.rememberMeCheckbox = this.page.locator('#RememberMe');
        this.loginButton = this.page.locator("input[value='Log in']")
    }

    async login(email:string, password:string){
        await this.navigateTo("https://demowebshop.tricentis.com/login")
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click()
    }

    async checkRememberMe():Promise<void>{
        await this.rememberMeCheckbox.check();
    }


}

