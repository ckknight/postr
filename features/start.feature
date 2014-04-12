Feature: User starts application
	In order to share cultural event with friends
	As a drunk concert goer
	I want to capture relevant event data

Scenario: Take a picture of an event poster
	Given I have found an event poster
	And I have activated the Postr app
	When I press "take photo" button
	And choose a photo
	Then the photo is displayed