import {test,expect} from "../Fixtures/fixture";
// import { LoginPage } from "../pages/azurewebsites/loginPage";
// import { DashboardPage } from "../pages/azurewebsites/dashboardPage"
// import { DealDetailsPage } from "../pages/azurewebsites/dealDetailsPage";
// import { DealVerificationPage } from "../pages/azurewebsites/dealVerificationPage";

import testData from "../data/testData.json"

test.describe('Unicorn Construction Deal', ()=>{
    // test.use({
    //     baseURL:"https://trainee-web-app.azurewebsites.net"
    // })
    test('Deal process @UnicornDeal', async({login,dashboard,dealDetail,dealVerify})=>{

        const dealPath = testData.azureWebsite.deal
            await login.navigate()
            await login.login()

            const title = await dashboard.getWelcomePageTitle()
            expect(title).toEqual("UNICORN")
            const logoutTxt = await dashboard.getLogoutButtonText()
            expect(logoutTxt).toBe('Logout ')

            await dashboard.createDeal(dealPath.deal_address, dealPath.deal_number)

            await dealDetail.fillDealDetails(dealPath.startDate, dealPath.endDate,  dealPath.agentName, dealPath.photoPath)        
   
             //deal details
            expect(await dealVerify.dealVerify("Property Type")).toBe(dealPath.propertyType)
            expect(await dealVerify.dealVerify("Transaction Type")).toBe(dealPath.transactionType)
            expect(await dealVerify.dealVerify("Deal Agent Name")).toBe(dealPath.agentName)       

        
    })
})


// npx playwright test --grep "@azureWebsite"