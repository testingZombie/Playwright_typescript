import { Locator, Page, expect } from "@playwright/test";

export class CheckOutPage{
  private page:Page;
  private firstNamePlaceholder:Locator
  private lastNamePlaceholder:Locator
  private zipPlaceholder:Locator
  private continueButton:Locator


  constructor(page:Page){
    this.page = page;
    this.firstNamePlaceholder = page.getByPlaceholder('First Name')
    this.lastNamePlaceholder = page.getByPlaceholder('Last Name')
    this.zipPlaceholder = page.getByPlaceholder('Zip/Postal Code')
    this.continueButton = page.getByText('Continue')
  }

  async fillInformation(firstName:string, lastName:string, zipCode:string){
    await this.firstNamePlaceholder.fill(firstName);
    await this.lastNamePlaceholder.fill(lastName);
    await this.zipPlaceholder.fill(zipCode);
    await this.continueButton.click()
  }
}