
import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/saucelabs/loginPage";
import testData from "../data/testData.json"

test.describe('sauce parameterize', ()=>{
  testData.loginsUsers.forEach((username)=>{
    test(`Login with ${username}`, async({page})=>{
      const passwd = "secret_sauce";
      const loginPage = new LoginPage(page);
      await page.goto(testData.saucelabs.baseUrl)
      await loginPage.login(username, passwd);
      expect(page.url()).toContain("inventory")
      await page.locator('#react-burger-menu-btn').click()
      await page.locator('#logout_sidebar_link').click()
  })
  })
})   
