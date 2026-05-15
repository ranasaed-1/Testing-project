Feature: Shopping Cart
  As a shopper
  I want to add products to my cart and review them
  So that I can proceed to purchase

  Scenario: Navigate to cart page
    Given I navigate to the cart page
    Then the cart page should be visible
    And the page URL should include "checkout"

  Scenario: Add a product to the cart and verify cart updates
    Given I am on the homepage
    When I click on the first product
    And I add the product to the cart
    Then the cart page should be visible
