Feature: Product Search and Filtering
  As a shopper
  I want to search and filter products on the Practice Software Testing site
  So that I can quickly find what I need

  Background:
    Given I am on the homepage

  Scenario: Search for a product returns relevant results
    When I search for the product "hammer"
    Then I should see at least one product card
    And the first product card should contain "Hammer"

  Scenario: Verify product images are visible
    Then product images should be present on the page
    And the first image should be visible

  Scenario: Filter products by the Hand Tools category
    When I filter products by the "Hand Tools" category
    Then I should see at least one product card
    And the page URL should include "category"
