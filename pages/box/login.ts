import { Page, Locator } from '@playwright/test';
import testData from "../../data/testData.json"


export class BoxLoginPage {

 private readonly page: Page;
 private readonly emailInput: Locator;
 private readonly nextButton:Locator;
 private readonly passwordInput: Locator;
 private readonly loginButton: Locator;

 constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.locator('#login-email');
    this.nextButton = this.page.locator("#login-submit");
    this.passwordInput = this.page.locator('#password-login');
    this.loginButton = this.page.locator('#login-submit-password');
 }


async login(): Promise<void> {
await this.page.goto('https://app.box.com');
await this.emailInput.fill(testData.Box.email);
await this.nextButton.click();

await this.page.waitForLoadState('networkidle');
await this.passwordInput.fill(testData.Box.password);
await this.loginButton.click();
}

}