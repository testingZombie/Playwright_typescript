import { type Page, expect } from "@playwright/test"

export class HelperBase{
    readonly page:Page

    constructor(page:Page){
        this.page = page
    }


}