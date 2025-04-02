import {expect} from '@playwright/test';
import generateRandomData from '../utils/generateRandomData';
import fs from 'fs';
class LoginPage{

    constructor(page, username, password){
        const usernameInput = username || process.env.SWAG_LABS_USERNAME;
        const passwordInput =  password || process.env.SWAG_LABS_PASSWORD;
        this.page = page;
        this.username = usernameInput;
        this.password = passwordInput;
        this.locators = {
            usernameFormLocator: '#user-name',
            passwordFormLocator: '#password',
            loginButtonLocator: '#login-button',
            menuButtonLocator: '#react-burger-menu-btn',
            logoutLinkLocator: '#logout_sidebar_link',
            loginConfirmationLocator: 'text=Login'
        };
    }

    async navigate(){
        await this.page.goto('/');
    }

    async generateValidLogin(){
        await this.navigate();
        await this.page.fill(this.locators.usernameFormLocator, this.username);
        await this.page.fill(this.locators.passwordFormLocator, this.password);
        await this.page.click(this.locators.loginButtonLocator);
        await expect(this.page).toHaveURL('/inventory.html', { timeout: 50000 });
        
    }
    
    async logout(){
        await this.page.click(this.locators.menuButtonLocator);
        await this.page.click(this.locators.logoutLinkLocator);
        await expect(this.page).toHaveURL('/');
        return await this.page.isVisible(this.locators.loginButtonLocator);
    }

    // Edge cases
    async generateLoginWithBlankFields(){
        await this.navigate();
        await this.page.fill(this.locators.usernameFormLocator, " ");
        await this.page.fill(this.locators.passwordFormLocator, " ");
        await this.page.click(this.locators.loginButtonLocator);
    }

    async generateLoginWithBadCredentials(){
        await this.navigate();
        await this.page.fill(this.locators.usernameFormLocator, generateRandomData.firstname);
        await this.page.fill(this.locators.passwordFormLocator, generateRandomData.lastname);
        await this.page.click(this.locators.loginButtonLocator);
    }
    
}

export default LoginPage;