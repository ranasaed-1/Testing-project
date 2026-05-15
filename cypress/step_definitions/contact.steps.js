const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const contactPage = require("../pages/ContactPage");

Given("I navigate to the contact page", () => {
  contactPage.visit();
});

When("I fill in first name {string}", (firstName) => {
  contactPage.fillFirstName(firstName);
});

When("I fill in last name {string}", (lastName) => {
  contactPage.fillLastName(lastName);
});

When("I fill in contact email {string}", (email) => {
  contactPage.fillEmail(email);
});

When("I select subject {string}", (subject) => {
  contactPage.selectSubject(subject);
});

When("I fill in message {string}", (message) => {
  contactPage.fillMessage(message);
});

When("I submit the contact form", () => {
  contactPage.submit();
  cy.wait(2000);
});

Then("the first name field should be visible", () => {
  contactPage.firstNameInput.should("be.visible");
});

Then("the last name field should be visible", () => {
  contactPage.lastNameInput.should("be.visible");
});

Then("the email field should be visible", () => {
  contactPage.emailInput.should("be.visible");
});

Then("the submit button should be visible", () => {
  contactPage.submitButton.should("be.visible");
});

Then("a success confirmation message should be displayed", () => {
  contactPage.assertSubmitSuccess();
});
