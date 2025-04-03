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
    async navigateFirstPage(){
      await this.page.goto('/checkout-step-one.html');
    }
    async navigateSecondPage(){
      await this.page.goto('/checkout-step-two.html');
    }
    async navigateFinalPage(){
      await this.page.goto('/checkout-complete.html');
    }
    //Step one
    async fillInfoPurchase(firstname, lastname, zipCode){
        await this.navigateFirstPage();
        await this.page.fill(this.locators.firstnameForLocator, firstname);
        await this.page.fill(this.locators.lastnameForLocator, lastname);
        await this.page.fill(this.locators.postalCodeLocator, zipCode);
        await this.page.locator(this.locators.continueButtonLocator).click();
    }

    //Step two
    async confirmInfoPurchase(){
      await this.navigateSecondPage();
      await this.page.locator(this.locators.finishButtonLocator).click();
      return await this.page.isVisible(this.locators.confirmationPurchaseMessageLocator);
      }

}

export default CheckoutPage;