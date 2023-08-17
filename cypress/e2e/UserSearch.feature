Feature: User Search

	Background:
		Given I am logged in

	@start
	Scenario: I search for a no existing user
		Given I navigate to Search page
		When I search for test
		Then I should see no results

	@end
	Scenario: I search for a Other user
		Given I navigate to Search page
		And I search for Other user
		When I click on the Other user
		Then I should be on Other user page

		
