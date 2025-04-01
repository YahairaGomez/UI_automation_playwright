import { expect } from '@playwright/test';
class AccessibilityTestChecker{
    constructor(page){
        this.page = page;
        // this.locators = {
            
        // }
    }
    async checkTitle(path = "/") { 
        await this.page.goto(path); 
        await expect(this.page).toHaveTitle(/.+/); 
    }

    async keyboardFocusable(){

    }
}

export default AccessibilityTestChecker;