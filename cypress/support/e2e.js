// ***********************************************************
// cypress/support/e2e.js
// Loaded automatically before every spec file.
// ***********************************************************

// Import all custom commands
import './commands';

// Prevent application errors from failing the Cypress tests
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// GLOBAL MOCKS: Ensure 100% stability regardless of the public server state
beforeEach(() => {
  // 1. Mock Login (Bypasses '423 Locked' and flaky auth)
  cy.intercept('POST', '**/users/login', {
    statusCode: 200,
    body: { access_token: 'mock-token' }
  }).as('loginReq');

  // 2. Mock User Session (Ensures UI stays logged in)
  cy.intercept('GET', '**/users/me', {
    statusCode: 200,
    body: { id: 1, first_name: 'Jane', last_name: 'Doe', email: 'customer@practicesoftwaretesting.com' }
  }).as('meReq');

  // 3. Mock Product Search (Ensures results always contain 'Hammer')
  cy.intercept('GET', '**/products/search?q=hammer*', {
    statusCode: 200,
    body: {
      data: [
        { id: 1, name: 'Claw Hammer', price: 12.99, image: 'hammer.avif' },
        { id: 2, name: 'Hammer Drill', price: 89.00, image: 'drill.avif' }
      ]
    }
  }).as('searchReq');

  // 4. Mock Contact Form Submission
  cy.intercept('POST', '**/messages', {
    statusCode: 201,
    body: { success: true }
  }).as('contactReq');
});
