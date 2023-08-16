Feature: Profile Configuration

	Background:
		Given I am logged in

	@start
	Scenario: User change profile configuration
		Given I navigate to Profile Edit page
		When I change my name and bio
		Then I should see the changes in Profile page
	
	Scenario: User change language
		Given I navigate to Language page
		When I select another language
		Then I should see the application in another language

	@end
	Scenario: User log off
		Given I navigate to Configuration page
		When I try to log off
		Then I should be in Login page
