import { expect, test } from '@playwright/test';
import LoginPage from '../../objects/loginPage';
import ProductPage from '../../objects/productPage';
import CartPage from '../../objects/cartPage';
import CheckoutPage from '../../objects/checkoutPage';
import AccessibilityTestChecker from '../../objects/accessibilityTestChecker';
let loginPage, productPage, cartPage, checkoutPage;
let accessibilityChecker;
let pages = [];
test.describe("Assignment 2", () =>{
  test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    accessibilityChecker = new AccessibilityTestChecker(page);
    pages = await accessibilityChecker.pagesList();
    await loginPage.generateValidLogin();
  })
  for(const { page: pageName, navigate } of pages){
    test(`The ${pageName}'s elements must have visible outline`, async ({}) => {
      await navigate();  
      const inputsOutline = await accessibilityChecker.checkOutlineForInputs();
      const buttonsOutline = await accessibilityChecker.checkOutlineForButtons();
      let interactiveElements = [inputsOutline, buttonsOutline];
      
      for (let i=0 ; i< interactiveElements.length; i++){
        for (let j = 0; j < inputsOutline.length; j++) {
          expect(inputsOutline[j].outlineStyle).toBe('none');
          expect(inputsOutline[j].outlineWidth).toBe('0px');
        }
      }    
    });
  }  
})
