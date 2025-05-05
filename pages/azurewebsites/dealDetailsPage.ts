import {Page, expect, Locator} from '@playwright/test'

export class DealDetailsPage{
    private page:Page
   
    private propertyType:Locator
    private propertyoption:Locator
    private transactionType:Locator
    private transactionoption:Locator
    private BookingDatePicker:Locator
    private closingDatePicker:Locator
    private agentNameInput:Locator
    private uploadPhoto:Locator
    private submitButton:Locator
    private previewButton:Locator
    private cashFinance:Locator


    constructor(page:Page){
        this.page=page
        // this.propertyType = this.page.locator('#disclosureType');
        // this.propertyoption=this.page.locator(`//span[text()='Commercial Land']`);
        // this.transactionType = this.page.getByText('Select×Sale');
        // this.BookingDatePicker = `//label[text()="Booking Date"]/parent::div/div/input`;
        // this.closingDatePicker = this.page.locator(`//input[@id='disbursementDate']`);
        // this.agentNameInput = this.page.locator('#dealAgentName')
        // this.uploadphoto= this.page.locator(`//input[@type='file']`)
        // this.submitButton = this.page.locator(`//input[@type="submit"]`);
        // this.previewButton = this.page.getByRole('button', { name: 'Preview' })

        this.propertyType=this.page.getByText('Select×Resendential Plot');
        this.propertyoption=this.page.getByRole('option', { name: 'Commercial Land' })
        this.transactionType=this.page.getByText('Select×Sale')
        this.transactionoption=this.page.getByRole('option', { name: 'Rent' })
        this.cashFinance=this.page.getByText('Cash + Finance')
        this.agentNameInput=this.page.locator('#dealAgentName')
        this.uploadPhoto=this.page.locator(`//input[@type='file']`)
        this.submitButton=this.page.locator(`//input[@type='submit']`)
        this.previewButton=this.page.locator(`//button[contains(text(),'Preview')]`)
        this.BookingDatePicker=this.page.locator(`//input[@id='closingDate']`)
        this.closingDatePicker=this.page.locator(`//input[@id='disbursementDate']`)

    }

    
    async fillDealDetails(bookingDate:string, closingDate:string, name:string, filePath:string ){
        console.log(this.propertyType)

        await this.propertyType.click();
        await this.propertyoption.click();
        await this.transactionType.click()
        await this.transactionoption.click()
        await this.cashFinance.click()
        await this.BookingDatePicker.fill(bookingDate)
        await this.closingDatePicker.fill(closingDate)
        await this.agentNameInput.fill(name)
        await this.uploadPhoto.setInputFiles(filePath)
        await this.submitButton.click()
        await this.previewButton.click()
    }


     
}