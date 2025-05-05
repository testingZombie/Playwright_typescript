import { Locator,Page } from "@playwright/test";
import { BasePage } from "./basePage";


export class RegisterPage extends BasePage{
    readonly genderMaleRadio:Locator;
    readonly genderFemaleRadio:Locator;
    readonly firstNameInput:Locator;
    readonly lastNameInput:Locator;
    readonly emailInput:Locator;
    readonly passwordInput:Locator;
    readonly confirmtionPasswordInput:Locator;
    readonly registerBtn:Locator;

    constructor(page:Page){
        super(page);
        this.genderMaleRadio = this.page.locator('#gender-male');
        this.genderFemaleRadio = this.page.locator('#gender-female');
        this.firstNameInput =  this.page.locator('#FirstName');
        this.lastNameInput = this.page.locator('#LastName');
        this.emailInput = this.page.locator('#Email');
        this.passwordInput = this.page.locator('#Password');
        this.confirmtionPasswordInput = this.page.locator('#ConfirmPassword');
        this.registerBtn = this.page.locator("#input[value='Register']");
    }
    async registerUser(gender:'male'|'female', firstName:string, lastName:string, email:string,password:string):Promise<void>{

        if (gender === 'male'){
            await this.genderMaleRadio.check();
        }else{
            await this.genderFemaleRadio.check();
        }

        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmtionPasswordInput.fill(password);
        await this.registerBtn.click();
    }


}