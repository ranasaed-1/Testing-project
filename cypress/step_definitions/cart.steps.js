const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const cartPage = require("../pages/CartPage");
const homePage = require("../pages/HomePage");
const productPage = require("../pages/ProductPage");

Given("I navigate to the cart page", () => {
  cartPage.visit();
});

When("I click on the first product", () => {
  homePage.clickFirstProduct();
  cy.wait(1000);
});

When("I add the product to the cart", () => {
  productPage.addToCart();
  cy.wait(1000);
});

Then("the cart page should be visible", () => {
  cy.get("body").should("be.visible");
});
