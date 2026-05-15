Feature: Homepage
  As a visitor
  I want to browse the Practice Software Testing homepage
  So that I can explore available products and navigate the site

  Background:
    Given I am on the homepage

  Scenario: Verify homepage loads successfully
    Then the page URL should include "practicesoftwaretesting"
    And the page body should be visible
    And the page title should not be empty

  Scenario: Verify products are displayed on the homepage
    Then I should see at least one product card
    And the first product card should be visible

  Scenario: Verify the navigation bar is visible
    Then the navbar should be visible
    And the navbar should exist on the page

  Scenario: Verify the page title is a non-empty string
    Then the page title should not be empty
    And the page title should be a string

  Scenario: Verify the page is responsive on mobile and desktop
    When I set the viewport to mobile size "375" by "667"
    Then the page body should be visible
    When I set the viewport to desktop size "1024" by "768"
    Then the page body should be visible
    And the navbar should exist on the page
