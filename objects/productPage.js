import { expect } from '@playwright/test';

class ProductPage{
    constructor(page){
      this.page = page;
        this.addToCartButtonsLocator = page.locator('.btn_inventory');
        this.cartBadgeLocator        = page.locator('[data-test="shopping-cart-badge"]');
        this.allProducts             = page.locator('.inventory_item_name');
    }

    async navigate(){
        await this.page.goto('/inventory.html');
    }
    async addProducts(numberOfProducts){
        for (let i=0; i<numberOfProducts;i++){
            await this.addToCartButtonsLocator.nth(i).click();    
        }    
    }

    async numberOfProductsOnCart() {  //return a boolean
        let numberOfProductsObtained;
        const isBadgeVisible = this.cartBadgeLocator.isVisible();
        if (!isBadgeVisible) return 0;
        numberOfProductsObtained = parseInt(await this.cartBadgeLocator.textContent(), 10);
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
        let productDescription = this.page.locator(`.inventory_item_description:has-text("${productName}")`);
        const productNameLocator = productDescription.locator('.inventory_item_name');
        const productNameText = await productNameLocator.textContent();
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