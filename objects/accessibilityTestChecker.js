import { expect } from '@playwright/test';
class AccessibilityTestChecker{
    constructor(page){
        this.page = page;
        this.inventory_list_class = page.locator('div[@class="inventory_list"]');
        this.inventory_item_class = page.locator( 'div[@class="inventory_item"]');
        this.inventory_item_img_class = page.locator( 'div[@class="inventory_item_img"]');
        this.allInputsLocator = page.locator( '//input');
        this.allButtonLocator = page.locator( '//div[@class="inventory_list"]//button');
    }

    async selectAllAltAttributesImages(){
        return this.page.locator(`//${this.inventory_list_class}//${this.inventory_item_class}//${this.inventory_item_img_class}//img[@alt]`);
    }

    async getAllInputs(){
        return this.allInputsLocator;
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
        return await this.checkOutline(this.allInputsLocator);
    }

    async checkOutlineForButtons(){
        return await this.checkOutline(this.allButtonLocator);
    }
}

export default AccessibilityTestChecker;