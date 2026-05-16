/**
 * Page Object Model – Home Page
 * URL: https://practicesoftwaretesting.com/
 */
class HomePage {
  get searchInput() { return cy.get('[data-test="search-query"]'); }
  get searchButton() { return cy.get('[data-test="search-submit"]'); }
  get productCards() { return cy.get(".card"); }
  get firstProductCard() { return cy.get(".card").first(); }
  get productPrices() { return cy.get('[data-test="product-price"]'); }
  get navbar() { return cy.get(".navbar"); }
  get navCategories() { return cy.get('[data-test="nav-categories"]'); }
  get pageImages() { return cy.get("img"); }

  visit() {
    cy.visit("/");
    return this;
  }

  search(term) {
    cy.intercept("GET", "**/products/search?q=*").as("searchRequest");
    this.searchInput.clear().type(`${term}{enter}`);
    // If the enter key doesn't trigger it, click the button
    this.searchButton.click();
    
    // Wait for the API response
    cy.wait("@searchRequest").its("response.statusCode").should("eq", 200);
    
    // Additional wait to ensure UI rendering is complete
    cy.wait(1000);
    return this;
  }

  clickFirstProduct() {
    this.firstProductCard.find("img").click();
    return this;
  }

  filterByCategory(categoryName) {
    this.navCategories.click();
    cy.wait(300);
    cy.contains(categoryName).click();
    cy.wait(1000);
    return this;
  }

  assertPageLoaded() {
    cy.url().should("include", "practicesoftwaretesting");
    cy.get("body").should("be.visible");
    cy.title().should("not.be.empty");
    return this;
  }

  assertProductsVisible() {
    this.productCards.should("have.length.greaterThan", 0);
    this.firstProductCard.should("be.visible");
    return this;
  }

  assertNavbarVisible() {
    this.navbar.should("be.visible");
    this.navbar.should("exist");
    return this;
  }

  assertImagesExist() {
    this.pageImages.should("have.length.greaterThan", 0);
    this.pageImages.first().should("be.visible");
    return this;
  }
}

module.exports = new HomePage();
