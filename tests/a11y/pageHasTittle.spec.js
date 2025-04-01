import { test } from '@playwright/test';
import LoginPage from '../../objects/loginPage';
import ProductPage from '../../objects/productPage';
import CartPage from '../../objects/cartPage';
import CheckoutPage from '../../objects/checkoutPage';
import AccessibilityTestChecker from '../../objects/accessibilityTestChecker';
let loginPage, productPage, cartPage, checkoutPage;
let accessibilityChecker;

// Assignment 2: Basic Accessibility Check
test.describe("Checking All Pages has a tittle", ()=> {
    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        accessibilityChecker = new AccessibilityTestChecker(page);
        await loginPage.generateValidLogin();
      })
    test("The login page must have a tittle", async ({})=>{
      await accessibilityChecker.checkTitle();
    })

    test("The product page must have a tittle", async ({})=>{
      await accessibilityChecker.checkTitle('/inventory.html');
    })

    test("The cart page must have a tittle", async ({})=>{
      await accessibilityChecker.checkTitle('/cart.html');
    })

    test("The checkout page (step one) must have a tittle", async ({})=>{
      await accessibilityChecker.checkTitle('/checkout-step-one.html');
    })

    test("The checkout page (step two) must have a tittle", async ({})=>{
      await accessibilityChecker.checkTitle('/checkout-step-two.html');
    })

    test("The checkout page (final step) must have a tittle", async ({})=>{
      await accessibilityChecker.checkTitle('/checkout-complete.html');
    })
        
})