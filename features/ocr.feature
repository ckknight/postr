Feature: Image processing screen
	In order to initiate OCR capture of event data
	As a drunk concert goer
	I want to distract user while OCR process runs

Background:
	Given I have found an event poster
	And I have activated the Postr app
	When I choose a photo

Scenario: Display Image processing screen
	Given the scanning image progress bar has been presented
	When the progress bar is completed
	Then the event preview screen is displayed