import {test as baseTest} from '@playwright/test'
import { LoginPage } from '../pages/azurewebsites/loginPage'
import { DashboardPage } from '../pages/azurewebsites/dashboardPage'
import { DealDetailsPage } from '../pages/azurewebsites/dealDetailsPage'
import { DealVerificationPage } from '../pages/azurewebsites/dealVerificationPage'

type pages = {
    login:LoginPage
    dashboard:DashboardPage
    dealDetail:DealDetailsPage
    dealVerify:DealVerificationPage
}

export const test=baseTest.extend<pages>({
    login: async({page},use)=>{
        // const login=new LoginPage(page);
        // await use(login)
        await use(new LoginPage(page));
    },
    dashboard:async({page},use)=>{
        await use(new DashboardPage(page))
    },
    dealDetail:async({page},use)=>{
        await use(new DealDetailsPage(page))
    },
    dealVerify:async({page},use)=>{
        await use(new DealVerificationPage(page))
    }
})
export {expect} from "@playwright/test"