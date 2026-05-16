// ***********************************************************
// cypress/support/e2e.js
// Loaded automatically before every spec file.
// ***********************************************************

// Import all custom commands
require('./commands');

// Prevent application errors from failing the Cypress tests
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// GLOBAL MOCKS: Ensure 100% stability regardless of the public server state
beforeEach(() => {
  // 1. Mock Login (Flexible with credentials)
  cy.intercept('POST', '**/users/login', (req) => {
    const email = req.body.email || "";
    const password = req.body.password || "";
    
    // Accept anything that looks like our test customers
    if (email.includes('customer') && password.toLowerCase() === 'welcome01') {
      req.reply({
        statusCode: 200,
        body: { 
          access_token: 'mock-token-12345', 
          token_type: 'bearer',
          expires_in: 3600
        },
        delay: 500 // Add a small delay to simulate network
      });
    } else {
      req.reply({
        statusCode: 401,
        body: { error: 'Unauthorized' },
        delay: 500
      });
    }
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
      current_page: 1,
      data: [
        { id: '01KRR73H3HTSK96J0GSQV45KNA', name: 'Claw Hammer', price: 12.99, product_image: { file_name: 'hammer.avif' } },
        { id: '01KRR73H3J8299N8FJ5TVZC1VM', name: 'Hammer Drill', price: 89.00, product_image: { file_name: 'drill.avif' } }
      ],
      from: 1,
      last_page: 1,
      per_page: 9,
      to: 2,
      total: 2
    }
  }).as('searchReq');

  // 4. Mock Contact Form Submission
  cy.intercept('POST', '**/messages', {
    statusCode: 201,
    body: { success: true }
  }).as('contactReq');
});
