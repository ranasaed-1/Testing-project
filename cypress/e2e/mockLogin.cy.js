describe("Mock Login", () => {
  it("mocks the login process", () => {
    cy.intercept("POST", "**/users/login", {
      statusCode: 200,
      body: { access_token: "fake-token" }
    }).as("login");

    cy.intercept("GET", "**/users/me", {
      statusCode: 200,
      body: { id: "1", name: "Jane Doe", email: "customer@practicesoftwaretesting.com", role: "user" }
    }).as("me");

    cy.visit("https://practicesoftwaretesting.com/auth/login");
    cy.get('[data-test="email"]').type("customer@practicesoftwaretesting.com");
    cy.get('[data-test="password"]').type("welcome01");
    cy.get('[data-test="login-submit"]').click();

    cy.url().should("not.include", "/auth/login");
    cy.get("body").should("be.visible");
  });
});
