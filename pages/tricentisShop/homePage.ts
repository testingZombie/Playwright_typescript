import {Page,Locator} from '@playwright/test'
import { BasePage } from './basePage'

class HomePage extends BasePage{

    constructor(page:Page){
        super(page);
    }

    async openUrl():Promise<void>{
        await this.navigateTo("https://demowebshop.tricentis.com/")
    }

    
}