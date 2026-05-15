/**
 * Page Object Model – Login Page
 * URL: https://practicesoftwaretesting.com/#/auth/login
 */
class LoginPage {
  get emailInput() { return cy.get('[data-test="email"]'); }
  get passwordInput() { return cy.get('[data-test="password"]'); }
  get loginButton() { return cy.get('[data-test="login-submit"]'); }
  get errorAlert() { return cy.get('[data-test="login-error"]'); }

  visit() {
    cy.visit("/auth/login");
    return this;
  }

  typeEmail(email) {
    this.emailInput.clear().type(email);
    return this;
  }

  typePassword(password) {
    this.passwordInput.clear().type(password);
    return this;
  }

  clickLogin() {
    this.loginButton.click();
    return this;
  }

  login(email, password) {
    this.visit();
    this.typeEmail(email);
    this.typePassword(password);
    this.clickLogin();
    return this;
  }

  assertPageLoaded() {
    cy.url().should("include", "/auth/login");
    this.emailInput.should("be.visible");
    this.passwordInput.should("be.visible");
    this.loginButton.should("be.visible");
    return this;
  }

  assertLoginError() {
    this.errorAlert.should("be.visible");
    this.errorAlert.should("not.be.empty");
    return this;
  }

  assertLoginSuccess() {
    cy.url().should("not.include", "/auth/login");
    cy.get("body").should("be.visible");
    return this;
  }
}

module.exports = new LoginPage();
