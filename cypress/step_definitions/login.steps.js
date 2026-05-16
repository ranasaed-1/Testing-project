const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const loginPage = require("../pages/LoginPage");

Given("I navigate to the login page", () => {
  loginPage.visit();
});

When("I enter the email {string}", (email) => {
  loginPage.typeEmail(email);
});

When("I enter the password {string}", (password) => {
  loginPage.typePassword(password);
});

When("I click the login button", () => {
  loginPage.clickLogin();
  cy.wait("@loginReq");
  cy.wait(1000); // Give the app time to process the token and redirect
});

Then("the email input should be visible", () => {
  loginPage.emailInput.should("be.visible");
});

Then("the password input should be visible", () => {
  loginPage.passwordInput.should("be.visible");
});

Then("the login button should be visible", () => {
  loginPage.loginButton.should("be.visible");
});

Then("I should be redirected away from the login page", () => {
  loginPage.assertLoginSuccess();
});

Then("an error message should be displayed", () => {
  loginPage.assertLoginError();
});

Then("the error message should not be empty", () => {
  loginPage.errorAlert.invoke("text").should("not.be.empty");
});
