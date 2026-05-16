// =============================================================
// Custom Commands – Practice Software Testing Automation Suite
// =============================================================

// ──────────────────────────────────────────────
// Navigation Commands
// ──────────────────────────────────────────────

/**
 * Visit the homepage.
 */
Cypress.Commands.add("visitHomepage", () => {
  cy.visit("/");
  cy.get("body").should("be.visible");
});

/**
 * Navigate to the login page.
 */
Cypress.Commands.add("navigateToLogin", () => {
  cy.visit("/auth/login");
  cy.get('[data-test="email"]').should("be.visible");
});

/**
 * Navigate to the contact page.
 */
Cypress.Commands.add("navigateToContact", () => {
  cy.visit("/contact");
  cy.get('[data-test="first-name"]').should("be.visible");
});

/**
 * Navigate to the cart/checkout page.
 */
Cypress.Commands.add("navigateToCart", () => {
  cy.visit("/checkout");
  cy.get("body").should("be.visible");
});

// ──────────────────────────────────────────────
// Authentication Commands
// ──────────────────────────────────────────────

/**
 * Log in with provided credentials.
 * @param {string} email
 * @param {string} password
 */
Cypress.Commands.add("login", (email, password) => {
  cy.navigateToLogin();
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-submit"]').click();
  cy.wait("@loginReq");
});

// ──────────────────────────────────────────────
// Search Commands
// ──────────────────────────────────────────────

/**
 * Type a search term and submit the search.
 * @param {string} term – the product name to search for
 */
Cypress.Commands.add("searchProduct", (term) => {
  cy.get('[data-test="search-query"]').clear().type(`${term}{enter}`);
  cy.get('[data-test="search-submit"]').click();
  cy.wait("@searchReq");
});

// ──────────────────────────────────────────────
// Category Filter Commands (from Part 1, improved)
// ──────────────────────────────────────────────

/**
 * Filter products by navigating via the navbar categories menu.
 * @param {string} category – visible text of the category link
 */
Cypress.Commands.add("filterByCategory", (category) => {
  cy.get('[data-test="nav-categories"]').click();
  cy.wait(500);
  cy.contains(category).click();
  cy.wait(1000);
});

/**
 * Assert that at least one product card is visible and has expected content.
 */
Cypress.Commands.add("verifyFilterResults", () => {
  cy.get(".card").should("have.length.greaterThan", 0);
  cy.get(".card").first().should("be.visible");
  cy.get("body").should("be.visible");
});

// ──────────────────────────────────────────────
// Product Commands
// ──────────────────────────────────────────────

/**
 * Assert that the first product card shows a price with a "$" sign.
 */
Cypress.Commands.add("checkProductPrice", () => {
  cy.get('[data-test="product-price"]').first().should("be.visible");
  cy.get('[data-test="product-price"]').first().invoke("text").should("match", /\$/);
  cy.get('[data-test="product-price"]').first().should("not.be.empty");
});

/**
 * Open the first product on the listing and add it to the cart.
 */
Cypress.Commands.add("addFirstProductToCart", () => {
  cy.get(".card").first().click();
  cy.get('[data-test="add-to-cart"]').should("be.visible").click();
  cy.wait(1000);
});

// ──────────────────────────────────────────────
// Contact Form Commands
// ──────────────────────────────────────────────

/**
 * Fill in and submit the contact form.
 * @param {object} data – { firstName, lastName, email, subject, message }
 */
Cypress.Commands.add("fillContactForm", ({ firstName, lastName, email, subject, message }) => {
  cy.get('[data-test="first-name"]').clear().type(firstName);
  cy.get('[data-test="last-name"]').clear().type(lastName);
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="subject"]').select(subject);
  cy.get('[data-test="message"]').clear().type(message);
});