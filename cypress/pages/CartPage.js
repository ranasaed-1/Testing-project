/**
 * Page Object Model – Cart / Checkout Page
 * URL: https://practicesoftwaretesting.com/#/checkout
 */
class CartPage {
  get cartItems() { return cy.get('[data-test="cart-item"]'); }
  get proceedToCheckoutBtn() { return cy.get('[data-test="proceed-to-checkout"]'); }
  get deleteItemBtns() { return cy.get('[data-test="delete-product"]'); }
  get cartTotalPrice() { return cy.get('[data-test="cart-total"]'); }
  get emptyCartMessage() { return cy.get('[data-test="empty-cart"]'); }

  visit() {
    cy.visit("/checkout");
    return this;
  }

  proceedToCheckout() {
    this.proceedToCheckoutBtn.should("be.visible").click();
    return this;
  }

  deleteFirstItem() {
    this.deleteItemBtns.first().click();
    cy.wait(500);
    return this;
  }

  assertPageLoaded() {
    cy.url().should("include", "/checkout");
    cy.get("body").should("be.visible");
    return this;
  }

  assertCartHasItems() {
    this.cartItems.should("have.length.greaterThan", 0);
    return this;
  }

  assertCartIsEmpty() {
    this.emptyCartMessage.should("be.visible");
    return this;
  }

  assertProceedButtonVisible() {
    this.proceedToCheckoutBtn.should("be.visible");
    this.proceedToCheckoutBtn.should("not.be.disabled");
    return this;
  }
}

module.exports = new CartPage();
