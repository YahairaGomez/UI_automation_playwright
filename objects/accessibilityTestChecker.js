import { expect } from '@playwright/test';
class AccessibilityTestChecker{
    constructor(page){
        this.page = page;
        this.locators = {
            inventory_list_class : "div[@class='inventory_list']",
            inventory_item_class : "div[@class='inventory_item']",
            inventory_item_img_class : "div[@class='inventory_item_img']",
        }
    }
    async selectAllAltAttributesImages(){
        return this.page.locator(`//${this.locators.inventory_list_class}//${this.locators.inventory_item_class}//${this.locators.inventory_item_img_class}//img[@alt]`);
    }

    
}

export default AccessibilityTestChecker;