import { expect } from "@playwright/test";

class CheckoutPage{
    constructor(page){
      this.page = page;
      this.locators ={
        firstnameForLocator : '#first-name',
        lastnameForLocator : '#last-name',
        postalCodeLocator : '#postal-code',
        continueButtonLocator : '#continue',
        finishButtonLocator : '#finish',
        confirmationPurchaseMessageLocator: 'text=Thank you for your order!'
      }
      
    }

    //Step one
    async fillInfoPurchase(firstname, lastname, zipCode){
        await this.page.goto("/checkout-step-one.html");
        await this.page.fill(this.locators.firstnameForLocator, firstname);
        await this.page.fill(this.locators.lastnameForLocator, lastname);
        await this.page.fill(this.locators.postalCodeLocator, zipCode);
        await this.page.locator(this.locators.continueButtonLocator).click();
        await expect(this.page).toHaveURL('/checkout-step-two.html');
    }

    //Step two
    async confirmInfoPurchase(){
        await this.page.goto("/checkout-step-two.html");
        await this.page.locator(this.locators.finishButtonLocator).click();
        await expect(this.page.locator(this.locators.confirmationPurchaseMessageLocator)).toBeVisible();
    }
}

export default CheckoutPage;