import { expect, test } from '@playwright/test';
import LoginPage from '../../objects/loginPage';
import ProductPage from '../../objects/productPage';
import CartPage from '../../objects/cartPage';
import CheckoutPage from '../../objects/checkoutPage';
import AccessibilityTestChecker from '../../objects/accessibilityTestChecker';
let loginPage, productPage, cartPage, checkoutPage;
let accessibilityChecker;

test.describe("Assignment 2", () =>{
  test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    accessibilityChecker = new AccessibilityTestChecker(page);
    await loginPage.generateValidLogin();
  }),

  
  test("Login page inputs must have associated <label> elements with for attributes", async ({page}) => {
    await page.goto('/'); 
    let allInputsLocator = await accessibilityChecker.getAllInputs();
    const count = await allInputsLocator.count();
    for (let i = 0; i < count; i++) {
        let inputId = await allInputsLocator.nth(i).getAttribute('id');
        await expect(await page.locator(`label[for="${inputId}"]`)).toHaveCount(0); 
    }         
  })
})
