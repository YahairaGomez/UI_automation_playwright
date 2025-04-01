import {expect} from '@playwright/test';

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
        await expect(this.page).toHaveURL('/inventory.html');
    }

    async logout(){
        await this.page.click(this.locators.menuButtonLocator);
        await this.page.click(this.locators.logoutLinkLocator);
        await expect(this.page).toHaveURL('/');
        await expect(this.page.locator(this.locators.loginConfirmationLocator)).toBeVisible(); 
    }
}

export default LoginPage;