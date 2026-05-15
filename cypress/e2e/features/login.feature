Feature: Login
  As a registered user
  I want to log into the Practice Software Testing site
  So that I can access my account and place orders

  Scenario: Verify the login page loads correctly
    Given I navigate to the login page
    Then the email input should be visible
    And the password input should be visible
    And the login button should be visible

  Scenario: Login with valid credentials
    Given I navigate to the login page
    When I enter the email "customer@practicesoftwaretesting.com"
    And I enter the password "welcome01"
    And I click the login button
    Then I should be redirected away from the login page

  Scenario: Login with invalid credentials shows an error
    Given I navigate to the login page
    When I enter the email "invalid@example.com"
    And I enter the password "wrongpassword"
    And I click the login button
    Then an error message should be displayed
    And the error message should not be empty
