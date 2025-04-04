import { expect } from "@playwright/test";

class CheckoutPage{
    constructor(page){
      this.page = page;
      this.firstnameForLocator                = page.locator('#first-name');
      this.lastnameForLocator                 = page.locator('#last-name');
      this.postalCodeLocator                  = page.locator('#postal-code');
      this.continueButtonLocator              = page.locator('#continue');
      this.finishButtonLocator                = page.locator('#finish');
      this.confirmationPurchaseMessageLocator = page.locator('text=Thank you for your order!');      
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
        await this.firstnameForLocator.fill(firstname);
        await this.lastnameForLocator.fill(lastname);
        await this.postalCodeLocator.fill(zipCode);
        await this.continueButtonLocator.click();
    }

    //Step two
    async confirmInfoPurchase(){
      await this.navigateSecondPage();
      await this.finishButtonLocator.click();
      return await this.confirmationPurchaseMessageLocator.isVisible();
      }

}

export default CheckoutPage;