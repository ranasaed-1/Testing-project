const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require("../pages/HomePage");

// NOTE: "I am on the homepage" Given is defined in homepage.steps.js (shared globally)

When("I search for the product {string}", (term) => {
  homePage.search(term);
});

When("I filter products by the {string} category", (category) => {
  homePage.filterByCategory(category);
});

Then("the first product card should contain {string}", (text) => {
  homePage.firstProductCard.should("contain", text);
});

Then("product images should be present on the page", () => {
  homePage.pageImages.should("have.length.greaterThan", 0);
});

Then("the first image should be visible", () => {
  homePage.pageImages.first().should("be.visible");
});
