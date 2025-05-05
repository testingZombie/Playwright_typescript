import { test,Locator, Page, expect } from "@playwright/test";
// import HelperBase from ../

export class LoginPage {
    page:Page;
    private readonly usernameInput: string = '#user-name';
    private passwordInput: string = '#password';
    private loginButton: string = '#login-button';
    private credentialsSection: string = '.login_credentials';
    private passwordSection: string = '.login_password';


    constructor(page:Page){
        this.page=page;
    }


    async getAvailableUsernames():Promise<string[]> {
        await this.page.waitForSelector(this.credentialsSection, {state: 'visible'})
        const credentialsText = await this.page.locator(this.credentialsSection).textContent();

        if (!credentialsText) {
            throw new Error('Could not find credentials text')
        }

        const usernames:string[] = credentialsText
        .replace('Accepted usernames are:', '')
        .replaceAll('user', 'user,')
        .split(',')
        .map(line=>line.trim())
        .filter(line=>line.length > 0)

        return usernames

    }

    async getPassword() {
        await this.page.waitForSelector(this.passwordSection, {state:'visible'});
        const passwordText = await this.page.locator(this.passwordSection).textContent();
            
        const password = passwordText
        ?.replace('Password for all users:','')
        .trim();

        return password;
    }
    async login(username:string, password:string ){
        await this.page.fill(this.usernameInput,username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);

    }
   
    // async navigate(){
    //     await this.page.goto('https://trainee-web-app.azurewebsites.net/auth/login');
    // }


    async loginWithFetchedCredentials(userIndex = 0) {
        try{
        // Get available usernames
        const usernames = await this.getAvailableUsernames();
        
        // Get the password
        const password = await this.getPassword();
        // const password = "secret_sauce";

        console.log(usernames)
        console.log(password)
        
        if (usernames.length === 0 || !password) {
            throw new Error('Could not fetch credentials from the page');
        }
        
        // Use the specified username by index (default is the first one)
        const username = usernames[userIndex];
        
        await this.login(username, password)
        
    }catch(error){
        console.log("Error during login using fetched credentials", error);

  
    }
    
    }
}
      
