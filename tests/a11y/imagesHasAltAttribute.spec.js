import { expect, test } from '@playwright/test';
import LoginPage from '../../objects/loginPage';
import ProductPage from '../../objects/productPage';
import CartPage from '../../objects/cartPage';
import CheckoutPage from '../../objects/checkoutPage';
import AccessibilityTestChecker from '../../objects/accessibilityTestChecker';
let loginPage, productPage, cartPage, checkoutPage;
let accessibilityChecker;
const pages = [
    { page: "Login Page", navigate: () => loginPage.navigate() },
    { page: "Product Page", navigate: () => productPage.navigate() },
    { page: "Cart Page", navigate: () => cartPage.navigate() },
    { page: "Checkout Page (First Step)", navigate: () => checkoutPage.navigateFirstPage() },
    { page: "Checkout Page (Second Step)", navigate: () => checkoutPage.navigateSecondPage() },
    { page: "Checkout Page (Final Step)", navigate: () => checkoutPage.navigateFinalPage() }
  ];


test.describe("Checking All Pages has a alt attribute", ()=> {
    test.beforeEach(async ({page})=>{
      loginPage = new LoginPage(page);
      productPage = new ProductPage(page);
      cartPage = new CartPage(page);
      checkoutPage = new CheckoutPage(page);
      accessibilityChecker = new AccessibilityTestChecker(page);
      await loginPage.generateValidLogin();
    })
    for(const { page: pageName, navigate } of pages){
      test(`The ${pageName} must have images with alt text`, async ({}) => {
        await navigate();  
        let allImgsLocator = await accessibilityChecker.selectAllAltAttributesImages();
        const count = await allImgsLocator.count();
        for (let i=0; i<count; i++){
            const hasAltAttribute = await allImgsLocator.nth(i).getAttribute('alt');
            await expect(hasAltAttribute).toBeTruthy();
        }    
      });
    }  
})