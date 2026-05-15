const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require("../pages/HomePage");

Given("I am on the homepage", () => {
  homePage.visit();
});

When("I set the viewport to mobile size {string} by {string}", (width, height) => {
  cy.viewport(Number(width), Number(height));
});

When("I set the viewport to desktop size {string} by {string}", (width, height) => {
  cy.viewport(Number(width), Number(height));
});

Then("the page URL should include {string}", (text) => {
  cy.url().should("include", text);
});

Then("the page body should be visible", () => {
  cy.get("body").should("be.visible");
});

Then("the page title should not be empty", () => {
  cy.title().should("not.be.empty");
});

Then("the page title should be a string", () => {
  cy.title().should("be.a", "string");
});

Then("I should see at least one product card", () => {
  homePage.productCards.should("have.length.greaterThan", 0);
});

Then("the first product card should be visible", () => {
  homePage.firstProductCard.should("be.visible");
});

Then("the navbar should be visible", () => {
  homePage.assertNavbarVisible();
});

Then("the navbar should exist on the page", () => {
  homePage.navbar.should("exist");
});
