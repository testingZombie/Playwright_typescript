import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/saucelabs/loginPage";
import testData from "../data/testData.json"
import { InventoryPage } from "../pages/saucelabs/inventory";
import { CartPage } from "../pages/saucelabs/cartPage";
import { CheckOutPage } from "../pages/saucelabs/checkOutPage";
import { CheckOverviewPage } from "../pages/saucelabs/checkOutOverviewPage";
import { CheckOutCompletePage } from "../pages/saucelabs/checkOutCompletePage";
 
test.describe('Sauce Demo Login Tests', () => {
  test('should login with standard user @saucelabs', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckOutPage(page);
    const checkOutOverviewPage = new CheckOverviewPage(page);
    const checkOutCompletePage = new CheckOutCompletePage(page);

    test.step('login to saucelabs', async()=>{
      await page.goto(testData.saucelabs.baseUrl)
      await loginPage.loginWithFetchedCredentials();
    })
    

    // console.log(page.url())

    test.step('Verify add to cart buttons count', async()=>{
      const addToCartBtns = await inventoryPage.countAddToCart()
      expect(addToCartBtns).toBe(6)
    })
    
    test.step('change the prices from low to high and high to low', async()=>{
      const {actualPrices, expectedPrices} = await inventoryPage.verifyPriceSorting('asc')
      console.log(actualPrices, expectedPrices)
      expect(actualPrices).toEqual(expectedPrices)
    })
    

    test.step('add item to cart and checkout', async()=>{
      const addedProduct = await inventoryPage.addItemToCart(0)
      await inventoryPage.clickCartButton()

      await cartPage.clickCheckOut()

      await checkOutPage.fillInformation('Test', 'User', '12345');

      const checkoutProduct = await checkOutOverviewPage.getProductDetails();
      expect(checkoutProduct.productName).toBe(addedProduct.productName)
      expect(checkoutProduct.productPrice).toBe(addedProduct.productPrice)
      
      await checkOutOverviewPage.clickFinish()

      const thankyouMsg = await checkOutCompletePage.getThankYouMessage()
      console.log(thankyouMsg)

      expect(thankyouMsg).toContain('Thank you for your order!')
    })
  
    await page.close()
  });
})








































//   test('should not login with locked out user', async ({ page }) => {
//     const loginPage = new LoginPage(page);
    
//     await loginPage.navigateToLoginPage();
//     const credentials = await loginPage.getCredentialsByType('locked_out');
//     await loginPage.login(credentstandardials);
    
//     // Verify error message is displayed
//     const errorMessage = page.locator('[data-test="error"]');
//     await expect(errorMessage).toBeVisible();
//     await expect(errorMessage).toContainText('locked out');
//   });
  
//   test('should fetch and verify all available usernames', async ({ page }) => {
//     const loginPage = new LoginPage(page);
    
//     await loginPage.navigateToLoginPage();
//     const usernames = await loginPage.getAvailableUsernames();
    
//     // Verify we have all 6 expected usernames
//     expect(usernames.length).toBe(6);
//     expect(usernames).toContain('standard_user');
//     expect(usernames).toContain('locked_out_user');
//     expect(usernames).toContain('problem_user');
//     expect(usernames).toContain('performance_glitch_user');
//     expect(usernames).toContain('error_user');
//     expect(usernames).toContain('visual_user');
//   });
  
//   test('should test login with each user type', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     const userTypes = ['standard', 'problem', 'performance_glitch', 'error', 'visual'] as const;
    
//     for (const userType of userTypes) {
//       // Create a new context for each user to avoid test interference
//       await loginPage.navigateToLoginPage();
//       await loginPage.loginAs(userType);
      
//       // Verify we reached the inventory page
//       await expect(page).toHaveURL(/.*inventory.html/);
      
//       // Log out before testing the next user
//       await page.click('#react-burger-menu-btn');
//       await page.click('#logout_sidebar_link');
//     }
//   });
// });
// // page.click - Available For Sale
 
// // test.describe('group', ()=>{
// //     test('Login to saucelabs @saucelabs', async({page})=>{
// //         const loginPage = new LoginPage(page);
// //         await loginPage.login()
        
// //     })
// // })

// // // npx playwright test --grep "(?=.*@azureWebsite)(?=.*@saucelabs)"