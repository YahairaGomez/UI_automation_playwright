import { expect } from '@playwright/test';

class ProductPage{
    constructor(page){
      this.page = page;
      this.locators = {
        addToCartButtonsLocator: page.locator('.btn_inventory'), 
        cartBadgeLocator: page.locator('[data-test="shopping-cart-badge"]'),
        allProducts: page.locator('.inventory_item_name'),
    };
    }


    async addProducts(){
        await this.locators.addToCartButtonsLocator.nth(0).click();    
        await this.locators.addToCartButtonsLocator.nth(1).click();      
    }

    async verifyNumberOfProductsSelected(expectedNumber) {  //return a boolean
        let numberOfProductsObtained;
        const isBadgeVisible = await this.locators.cartBadgeLocator.isVisible();
        if (!isBadgeVisible) numberOfProductsObtained = 0;
        numberOfProductsObtained = parseInt(await this.locators.cartBadgeLocator.textContent(), 10);
        await expect(numberOfProductsObtained).toBe(expectedNumber);
    }

    async verifySingleProductsAttributes(productName){
        let productNameFormated = productName.toLowerCase().replace(/ /g, "-");
        let productDescription = await this.page.locator(`.inventory_item_description:has-text("${productName}")`);
        await expect(await this.page.locator(`img[data-test*="inventory-item-${productNameFormated}-img"]`).getAttribute("src")).toContain(".jpg");
        await expect(await productDescription.locator('.inventory_item_name')).not.toBeEmpty();
        await expect(await productDescription.locator('.inventory_item_price')).not.toBeEmpty();
        await expect(await productDescription.locator('.btn_inventory')).toBeVisible();  
    }
    async verifyAllProductsAttributes(){
        const listOfProduct = await this.locators.allProducts.allTextContents();
        for (const productName of listOfProduct){
            await this.verifySingleProductsAttributes(productName);  
        }
    }
    
}

export default ProductPage;