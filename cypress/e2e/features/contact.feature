Feature: Contact Form
  As a visitor
  I want to submit the contact form on the Practice Software Testing site
  So that I can reach the support team

  Scenario: Verify the contact page loads correctly
    Given I navigate to the contact page
    Then the first name field should be visible
    And the last name field should be visible
    And the email field should be visible
    And the submit button should be visible

  Scenario: Submit the contact form with valid data
    Given I navigate to the contact page
    When I fill in first name "John"
    And I fill in last name "Smith"
    And I fill in contact email "john.smith@example.com"
    And I select subject "Return"
    And I fill in message "I would like to return a product I purchased last week. Please advise on the return procedure."
    And I submit the contact form
    Then a success confirmation message should be displayed
