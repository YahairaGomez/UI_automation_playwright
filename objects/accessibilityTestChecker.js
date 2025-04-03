import { expect } from '@playwright/test';
class AccessibilityTestChecker{
    constructor(page){
        this.page = page;
        this.locators = {
            inventory_list_class : 'div[@class="inventory_list"]',
            inventory_item_class : 'div[@class="inventory_item"]',
            inventory_item_img_class : 'div[@class="inventory_item_img"]',
            inputFields : '//input',
            allInputsLocator    :   '//input',
            allButtonLocator    :   '//div[@class="inventory_list"]//button'

        }
    }
    async selectAllAltAttributesImages(){
        return this.page.locator(`//${this.locators.inventory_list_class}//${this.locators.inventory_item_class}//${this.locators.inventory_item_img_class}//img[@alt]`);
    }

    async getAllInputs(){
        return this.page.locator(this.locators.inputFields);
    }

    async checkOutline(locator) {
        const count = await locator.count();
        const results = [];
        for (let i = 0; i < count; i++) {
            await locator.nth(i).focus();
            const outlineStyle = await locator.nth(i).evaluate(el => {
                const styles = getComputedStyle(el);
                return {
                    outlineStyle: styles.outlineStyle,
                    outlineWidth: styles.outlineWidth
                };
            });
            results.push(outlineStyle);
        }
        return results;
    }

    async checkOutlineForInputs(){
        return await this.checkOutline(this.page.locator(this.locators.allInputsLocator));
    }

    async checkOutlineForButtons(){
        return await this.checkOutline(this.page.locator(this.locators.allButtonLocator));
    }
}

export default AccessibilityTestChecker;