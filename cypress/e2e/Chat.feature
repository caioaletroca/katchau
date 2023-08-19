# @viewportHeight(915)
# @viewportWidth(412)

# Feature: Chat
	
# 	Background:
# 		Given I am logged in

# 	@start
# 	Scenario: Send a message
# 		Given I navigate to Other user page
# 		And I start a chat with Other user
# 		When I type and send a message
# 		Then I should see my message

# 	Scenario: Search for no existing conversation
# 		Given I navigate to Conversation page
# 		When I search for a no existing conversation
# 		Then I should see no results

# 	@end
# 	Scenario: Search for conversation
# 		Given I navigate to Conversation page
# 		When I search for Other user
# 		Then I should be on Other user chat page
