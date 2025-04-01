import { expect, test } from '@playwright/test';
import LoginPage from '../../objects/loginPage';
import ProductPage from '../../objects/productPage';
import CartPage from '../../objects/cartPage';
import CheckoutPage from '../../objects/checkoutPage';
import generateRandomData from '../../utils/generateRandomData';
let loginPage, productPage, cartPage, checkoutPage;
let firstNameInput, lastNameInput, zipCodeInput;

test.describe("Assignment 1", () =>{
  test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    firstNameInput = generateRandomData.firstname;
    lastNameInput = generateRandomData.lastname;
    zipCodeInput = generateRandomData.zip_code;
    await loginPage.generateValidLogin();
  }),

  test("Login and Logout with valid credentials", async ({}) => {
    const logoutSuccessful = await loginPage.logout();
    await expect(logoutSuccessful).toBe(true);
  }),

  test("Add items to cart and remove one", async ({}) => {
    await productPage.addProducts(2);
    await cartPage.removeProducts(1);
    const numberOfProductsInCart= await productPage.numberOfProductsOnCart();
    await expect(numberOfProductsInCart).toBe(1);
    
  }),
  
  test("Complete the Checkout Process", async ({page}) => {
    await productPage.addProducts(2);
    await cartPage.navigate();
    await checkoutPage.fillInfoPurchase(firstNameInput, lastNameInput, zipCodeInput);
    await expect(page).toHaveURL('/checkout-step-two.html');
    const isACompleteCheckout = await checkoutPage.confirmInfoPurchase();
    await expect(isACompleteCheckout).toBe(true);
  }),

  test("Verify Product Cards on Products Page", async ({page})=>{  
    const listOfProduct = await page.locator('.inventory_item_name').allTextContents();
    for (const productName of listOfProduct){
      await expect(await productPage.productHasImage(productName)).toBe(true);
      await expect(await productPage.productHasName(productName)).toBe(true);
      await expect(await productPage.productHasPrice(productName)).toBe(true);
      await expect(await productPage.productHasAddToCartButton(productName)).toBe(true);
      }
  })
})
