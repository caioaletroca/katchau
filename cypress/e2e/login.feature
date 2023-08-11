Feature: Login

	Scenario: Standard user credentials login
		Given I access app
		When I type my credentials on the form
		When I click the login button
		Then I should be logged in

