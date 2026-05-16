/**
 * Page Object Model – Contact Page
 * URL: https://practicesoftwaretesting.com/#/contact
 */
class ContactPage {
  get firstNameInput() { return cy.get('[data-test="first-name"]'); }
  get lastNameInput() { return cy.get('[data-test="last-name"]'); }
  get emailInput() { return cy.get('[data-test="email"]'); }
  get subjectSelect() { return cy.get('[data-test="subject"]'); }
  get messageTextarea() { return cy.get('[data-test="message"]'); }
  get submitButton() { return cy.get('[data-test="contact-submit"]'); }

  visit() {
    cy.visit("/contact");
    return this;
  }

  fillFirstName(firstName) {
    this.firstNameInput.clear().type(firstName);
    return this;
  }

  fillLastName(lastName) {
    this.lastNameInput.clear().type(lastName);
    return this;
  }

  fillEmail(email) {
    this.emailInput.clear().type(email);
    return this;
  }

  selectSubject(subject) {
    this.subjectSelect.select(subject);
    return this;
  }

  fillMessage(message) {
    this.messageTextarea.clear().type(message);
    return this;
  }

  submit() {
    this.submitButton.click();
    return this;
  }

  fillAndSubmit({ firstName, lastName, email, subject, message }) {
    cy.intercept("POST", "**/messages").as("contactRequest");
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillEmail(email);
    this.selectSubject(subject);
    this.fillMessage(message);
    this.submit();
    cy.wait("@contactRequest");
    return this;
  }

  assertPageLoaded() {
    cy.url().should("include", "/contact");
    this.firstNameInput.should("be.visible");
    this.lastNameInput.should("be.visible");
    this.emailInput.should("be.visible");
    this.submitButton.should("be.visible");
    return this;
  }

  assertSubmitSuccess() {
    cy.contains("Thanks for your message").should("be.visible");
    return this;
  }
}

module.exports = new ContactPage();
