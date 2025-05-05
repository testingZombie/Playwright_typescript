import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/azurewebsites/loginPage";
import { DashboardPage } from "../pages/azurewebsites/dashboardPage"
import { DealDetailsPage } from "../pages/azurewebsites/dealDetailsPage";
import { DealVerificationPage } from "../pages/azurewebsites/dealVerificationPage";
import testData from "../data/testData.json"

test.describe('Unicorn Construction Deal', ()=>{
    test.use({
        baseURL:"https://trainee-web-app.azurewebsites.net"
    })
    test('Deal process @UnicornDeal', async({page})=>{
        const loginPage = new LoginPage(page);
        const dashBoardPage = new DashboardPage(page);
        const dealDetailsPage = new DealDetailsPage(page);
        const dealVerificationPage = new DealVerificationPage(page)
        const dealPath = testData.azureWebsite.deal

            await page.goto(testData.azureWebsite.login.baseUrl)
            await loginPage.login()

            const title = await dashBoardPage.getWelcomePageTitle()
            expect(title).toEqual("UNICORN")
            const logoutTxt = await dashBoardPage.getLogoutButtonText()
            expect(logoutTxt).toBe('Logout ')

            await dashBoardPage.createDeal(dealPath.deal_address, dealPath.deal_number)
            console.log(page.url())

            await dealDetailsPage.fillDealDetails(dealPath.startDate, dealPath.endDate,  dealPath.agentName, dealPath.photoPath)        
   
             //deal details
            expect(await dealVerificationPage.dealVerify("Property Type")).toBe(dealPath.propertyType)
            expect(await dealVerificationPage.dealVerify("Transaction Type")).toBe(dealPath.transactionType)
            expect(await dealVerificationPage.dealVerify("Deal Agent Name")).toBe(dealPath.agentName)       

        
    })
})


// npx playwright test --grep "@azureWebsite"