import { test } from '@playwright/test';
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

  //Add edge cases
  test("Login and Logout with valid credentials", async ({}) => {
    await loginPage.logout();
  }),

  test("Add items to cart and remove one", async ({}) => {
    await productPage.addProducts();
    await cartPage.removeProducts();
    await productPage.verifyNumberOfProductsSelected(1);
  }),
  
  test("Complete the Checkout Process", async ({}) => {
    await productPage.addProducts();
    await cartPage.navigate();
    await checkoutPage.fillInfoPurchase(firstNameInput, lastNameInput, zipCodeInput);
    await checkoutPage.confirmInfoPurchase();
  }),

  test("Verify Product Cards on Products Page", async ({})=>{  
    await productPage.verifyAllProductsAttributes();
  })
})
