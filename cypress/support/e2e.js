// ***********************************************************
// cypress/support/e2e.js
// Loaded automatically before every spec file.
// ***********************************************************

// Import all custom commands
import './commands';

// Prevent application errors from failing the Cypress tests
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
