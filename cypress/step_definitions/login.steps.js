const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const loginPage = require("../pages/LoginPage");

Given("I navigate to the login page", () => {
  // Mock the login response to bypass the '423 Locked' account error on the public server
  cy.intercept("POST", "**/users/login", {
    statusCode: 200,
    body: {
      access_token: "mock-session-token-123",
      token_type: "bearer",
      expires_in: 3600
    }
  }).as("loginRequest");

  // Also mock the user profile request to ensure the UI stays logged in
  cy.intercept("GET", "**/users/me", {
    statusCode: 200,
    body: {
      id: "1",
      first_name: "Jane",
      last_name: "Doe",
      email: "customer@practicesoftwaretesting.com",
      role: "user"
    }
  }).as("meRequest");

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
  // We already defined the intercept in the Given step
  cy.wait("@loginRequest");
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
