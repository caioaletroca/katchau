@viewportHeight(915)
@viewportWidth(412)

Feature: Follow User
	
	Background:
		Given I am logged in

	@start
	Scenario: Follow an user
		Given I navigate to Other user page
		When I follow the Other user
		Then I should be following the other user

	@end
	Scenario: Unfollow an user
		Given I navigate to Other user page
		When I unfollow the Other user
		Then I should not be following the other user
