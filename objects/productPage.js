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


    async addProducts(numberOfProducts){
        for (let i=0; i<numberOfProducts;i++){
            await this.locators.addToCartButtonsLocator.nth(i).click();    
        }    
    }

    async numberOfProductsOnCart() {  //return a boolean
        let numberOfProductsObtained;
        const isBadgeVisible = await this.locators.cartBadgeLocator.isVisible();
        if (!isBadgeVisible) return 0;
        numberOfProductsObtained = parseInt(await this.locators.cartBadgeLocator.textContent(), 10);
        return numberOfProductsObtained;
    }

    async productHasImage(productName){
        let productNameFormated = productName.toLowerCase().replace(/ /g, "-");
        try{
            const imageSrc = await this.page.locator(`img[data-test*="inventory-item-${productNameFormated}-img"]`).getAttribute("src");
            if (imageSrc && imageSrc.includes(".jpg"))
                return true;
        }
        catch{
            return false;
        }
    }
    async productHasName(productName){
        let productDescription = await this.page.locator(`.inventory_item_description:has-text("${productName}")`);
        const productNameLocator = await productDescription.locator('.inventory_item_name');
        const productNameText = await productNameLocator.textContent()
        if (!productNameText)
            return false;
        return true;
    }
    async productHasPrice(productName){
        let productDescription = await this.page.locator(`.inventory_item_description:has-text("${productName}")`);
        const productNameLocator = await productDescription.locator('.inventory_item_price');
        const productNameText = await productNameLocator.textContent()
        if (!productNameText)
            return false;
        return true;
    }

    async productHasAddToCartButton(productName){
        let productDescription = await this.page.locator(`.inventory_item_description:has-text("${productName}")`);
        return await productDescription.locator('.btn_inventory').isVisible();  
    }
    
}

export default ProductPage;