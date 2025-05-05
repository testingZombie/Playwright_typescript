import { test,Locator, Page, expect } from "@playwright/test";
// import HelperBase from ../
import config from "../../data/config"

export class LoginPage {
    page:Page;
    emailInput:Locator
    passwordInput:Locator
    loginButton:Locator

    
    constructor(page:Page){
        this.page=page;
        this.emailInput = this.page.getByRole('textbox', { name: 'User Name' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: " SIGN IN" });
    }

    async navigate(){
        await this.page.goto(config.Unicorn_URL) 
    }
    

    async login(){
        
        await this.emailInput.fill(config.Unicorn_Email);
        await this.passwordInput.fill(config.Unicorn_Password);
        await this.loginButton.click();

    }
}
      
