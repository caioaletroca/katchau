@viewportHeight(915)
@viewportWidth(412)

Feature: Post Interactions
	
	Background:
		Given I am logged in

	@start
	Scenario: Like a Post
		Given I navigate to Post page of Other user
		When I like the post
		Then The post should contain a like

	Scenario: Leave a Comment
		Given I navigate to Post page of Other user
		When I leave a comment in the post
		Then The post should contain a comment

	@end
	Scenario: Like a Comment
		Given I navigate to comments on Post page of Other user
		When I like a comment
		Then The comment should contain a like
	
	# Scenario: Delete a Comment
	# 	Given I navigate to comments on Post page of Other user
	# 	When I delete my comment
	# 	Then The comment should be deleted
