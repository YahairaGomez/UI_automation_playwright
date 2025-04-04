import generateRandomData from '../utils/generateRandomData';
import {expect} from '@playwright/test';
class LoginPage{

    constructor(page, username, password){
        const usernameInput = username || process.env.SWAG_LABS_USERNAME;
        const passwordInput =  password || process.env.SWAG_LABS_PASSWORD;
        this.page = page;
        this.username = usernameInput;
        this.password = passwordInput;
        this.usernameFormLocator        = page.locator('#user-name');
        this.passwordFormLocator        = page.locator('#password');
        this.loginButtonLocator         = page.locator('#login-button');
        this.menuButtonLocator          = page.locator('#react-burger-menu-btn');
        this.logoutLinkLocator          = page.locator('#logout_sidebar_link');
        this.loginConfirmationLocator   = page.locator('text=Login');
    }

    async navigate(){
        await this.page.goto('/');
    }

    async generateValidLogin(){
        await this.navigate();
        await this.usernameFormLocator.fill(this.username);
        await this.passwordFormLocator.fill(this.password);
        await this.loginButtonLocator.click();
        await expect(this.page).toHaveURL('/inventory.html', { timeout: 50000 });
        
    }
    
    async logout(){
        await this.menuButtonLocator.click();
        await this.logoutLinkLocator.click();
        await expect(this.page).toHaveURL('/');
        return await this.loginButtonLocator.isVisible();
    }

    // Edge cases
    async generateLoginWithBlankFields(){
        await this.navigate();
        await this.usernameFormLocator.fill( " ");
        await this.passwordFormLocator.fill( " ");
        await this.loginButtonLocator.click();
    }

    async generateLoginWithBadCredentials(){
        await this.navigate();
        await this.usernameFormLocator.fill(generateRandomData.firstname);
        await this.passwordFormLocator.fill(generateRandomData.lastname);
        await this.loginButtonLocator.click();
    }
}

export default LoginPage;