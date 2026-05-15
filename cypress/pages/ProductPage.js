/**
 * Page Object Model – Product Detail Page
 * URL: https://practicesoftwaretesting.com/#/product/{id}
 */
class ProductPage {
  get productName() { return cy.get('[data-test="product-name"]'); }
  get productPrice() { return cy.get('[data-test="product-price"]'); }
  get quantityInput() { return cy.get('[data-test="quantity"]'); }
  get addToCartBtn() { return cy.get('[data-test="add-to-cart"]'); }
  get productImage() { return cy.get("img").first(); }

  addToCart() {
    this.addToCartBtn.should("be.visible").click();
    cy.wait(1000);
    return this;
  }

  setQuantity(qty) {
    this.quantityInput.clear().type(String(qty));
    return this;
  }

  assertPageLoaded() {
    cy.url().should("include", "/product/");
    this.productName.should("be.visible");
    this.productPrice.should("be.visible");
    return this;
  }

  assertProductNameVisible() {
    this.productName.should("be.visible");
    this.productName.invoke("text").should("not.be.empty");
    return this;
  }

  assertPriceVisible() {
    this.productPrice.should("be.visible");
    this.productPrice.invoke("text").should("match", /\$/);
    return this;
  }

  assertAddToCartEnabled() {
    this.addToCartBtn.should("be.visible");
    this.addToCartBtn.should("not.be.disabled");
    return this;
  }
}

module.exports = new ProductPage();
