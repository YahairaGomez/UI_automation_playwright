class CartPage{
    constructor(page){
      this.page = page;
      this.locators ={
        removeProductButtonsLocator : page.locator('.cart_button')
      }
      
    }

    async navigate(){
        await this.page.goto("/cart.html");
    }
    
    async removeProducts(){
        await this.navigate();
        await this.locators.removeProductButtonsLocator.nth(0).click();    
    }
}

export default CartPage;