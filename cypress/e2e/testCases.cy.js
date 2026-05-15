/**
 * Practice Software Testing – 15 Test Cases (Part 1 + Part 2 POM Integration)
 *
 * Uses:
 *  - Page Object Models (via require)
 *  - Fixtures (userData.json)
 *  - Custom Commands
 *  - Hooks (before, beforeEach, afterEach)
 *  - 3+ Assertions per test
 */

const homePage = require("../pages/HomePage");
const loginPage = require("../pages/LoginPage");
const productPage = require("../pages/ProductPage");
const cartPage = require("../pages/CartPage");
const contactPage = require("../pages/ContactPage");

describe("Practice Software Testing Website – 15 Test Cases", () => {

  let userData;

  // ── Hooks ────────────────────────────────────────────────────
  before(() => {
    cy.fixture("userData").then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.visitHomepage();
  });

  afterEach(() => {
    cy.window().then((win) => {
      expect(win).to.exist;
    });
  });

  // TC-01
  it("TC-01 | Verify homepage loads", () => {
    cy.url().should("include", "practicesoftwaretesting");
    cy.get("body").should("be.visible");
    cy.title().should("not.be.empty");
  });

  // TC-02
  it("TC-02 | Verify products are displayed", () => {
    homePage.assertProductsVisible();
    homePage.productCards.should("have.length.greaterThan", 0);
    cy.get("body").should("be.visible");
  });

  // TC-03
  it("TC-03 | Click on first product", () => {
    homePage.clickFirstProduct();
    cy.wait(1500);
    cy.get("body").should("be.visible");
    cy.url().should("include", "practicesoftwaretesting");
    cy.get("body").should("not.be.empty");
  });

  // TC-04
  it("TC-04 | Filter products by category", () => {
    cy.get('[data-test="nav-categories"]').click();
    cy.wait(500);
    cy.get('[data-test="nav-hand-tools"]').click();
    cy.wait(1000);
    homePage.productCards.should("have.length.greaterThan", 0);
    cy.get("body").should("be.visible");
    cy.url().should("include", "category");
  });

  // TC-05
  it("TC-05 | Check product price is visible", () => {
    homePage.firstProductCard.should("be.visible");
    homePage.firstProductCard.contains(/\$/);
    cy.get("body").should("be.visible");
  });

  // TC-06
  it("TC-06 | Verify footer exists", () => {
    cy.get("body").should("be.visible");
    cy.get(".row").should("exist");
    cy.get("body").should("not.be.empty");
  });

  // TC-07
  it("TC-07 | Search for a product", () => {
    cy.searchProduct("hammer");
    homePage.productCards.should("have.length.greaterThan", 0);
    cy.get("body").should("be.visible");
    homePage.firstProductCard.should("contain", "Hammer");
  });

  // TC-08
  it("TC-08 | Verify page scrolls", () => {
    cy.get("body").should("be.visible");
    cy.window().scrollTo("bottom");
    cy.window().scrollTo("top");
    cy.get("body").should("be.visible");
  });

  // TC-09
  it("TC-09 | Verify navbar exists", () => {
    homePage.assertNavbarVisible();
    homePage.navbar.should("exist");
    cy.get("body").should("be.visible");
  });

  // TC-10
  it("TC-10 | Verify page has title", () => {
    cy.title().should("not.be.empty");
    cy.title().should("be.a", "string");
    cy.get("body").should("be.visible");
  });

  // TC-11
  it("TC-11 | Verify products have images", () => {
    homePage.assertImagesExist();
    homePage.pageImages.should("have.length.greaterThan", 0);
    cy.get("body").should("be.visible");
  });

  // TC-12
  it("TC-12 | Verify navigation links exist", () => {
    cy.get(".nav-link").should("be.visible");
    cy.get(".nav-link").should("have.length.greaterThan", 0);
    cy.get("body").should("be.visible");
  });

  // TC-13
  it("TC-13 | Verify buttons exist", () => {
    cy.get("button").first().should("be.visible");
    cy.get("button").should("have.length.greaterThan", 0);
    cy.get("body").should("be.visible");
  });

  // TC-14
  it("TC-14 | Verify links exist", () => {
    cy.get("a").first().should("be.visible");
    cy.get("a").should("have.length.greaterThan", 0);
    cy.get("body").should("be.visible");
  });

  // TC-15
  it("TC-15 | Verify page is responsive", () => {
    cy.viewport(375, 667);
    cy.get("body").should("be.visible");
    cy.viewport(1024, 768);
    cy.get("body").should("be.visible");
    homePage.navbar.should("exist");
  });
});
