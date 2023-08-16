Feature: Profile Configuration

	Background:
		Given I am logged in

	# Scenario: Standard user credentials login
	# 	Given I access app
	# 	When I type my credentials on the form
	# 	When I click the login button
	# 	Then I should be logged in

	@start @end
	Scenario: User change profile configuration
		Given I navigate to Profile Edit page
		When I change my name and bio
		Then I should see the changes in Profile page

	# @end
	# Scenario: User change language
	# 	Given I navigate to Configuration page
	# 	When I try to logout
	# 	Then I should be on Login page
