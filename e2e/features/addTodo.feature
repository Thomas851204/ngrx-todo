Feature: Can I add a new task to the list?
As a user Id like to add a new task to the list

Scenario:
Given I write "new task" into the input field
When I click on the Add button
Then I should see a new task at the end of the list with "new task" text
