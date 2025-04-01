import { expect, test } from '@playwright/test';
import LoginPage from '../../objects/loginPage';
import ProductPage from '../../objects/productPage';
import CartPage from '../../objects/cartPage';
import CheckoutPage from '../../objects/checkoutPage';
import generateRandomData from '../../utils/generateRandomData';
let loginPage, productPage, cartPage, checkoutPage;
let firstNameInput, lastNameInput, zipCodeInput;
let errorMessage;
test.describe("Assignment 1 - Edge cases", () =>{
  test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    firstNameInput = generateRandomData.firstname;
    lastNameInput = generateRandomData.lastname;
    zipCodeInput = generateRandomData.zip_code;
    errorMessage = ["Epic sadface", "Error"];

    await loginPage.generateValidLogin();
  }),

  test("Create an invalid login with blank fields ", async ({page})=>{
    await loginPage.logout();
    await loginPage.generateLoginWithBlankFields();
    const errorLocatorText = await page.locator(`text=${errorMessage[0]}`)
    await expect(errorLocatorText).toBeVisible();
  }),
  test("Create an invalid login with bad credentials ", async ({page})=>{
    await loginPage.logout();
    await loginPage.generateLoginWithBadCredentials();
    const errorLocatorText = await page.locator(`text=${errorMessage[0]}`)
    await expect(errorLocatorText).toBeVisible();
  }),
  
  test.only("Complete the Checkout Process with an invalid checkout form", async ({page}) => {
    await productPage.addProducts(2);
    await cartPage.navigate();
    await checkoutPage.fillInfoPurchase("", "", "");
    const errorLocatorText = await page.locator(`text=${errorMessage[1]}`)
    await expect(errorLocatorText).toBeVisible();
  })
})
  