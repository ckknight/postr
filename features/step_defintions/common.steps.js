/*jshint node:true, esnext: true, noyield: true*/
"use strict";

var path = require('path');

module.exports = function () {
  this.Given(/have found an event poster/, function * () {
    // TODO: save image in a property or something
    this.pendingPhoto = path.normalize(path.join(__dirname, '..', '..', 'photo-1.JPG'));
  });
  this.Given(/have activated the Postr app/, function * () {
    // TODO: go to webpage
    browser.get("http://localhost:3000/");
  });
  this.When(/choose a photo/, function * () {
    $(".camera-upload").sendKeys(this.pendingPhoto);
  });
  this.Then(/photo is displayed/, function * () {
    browser.waitForAngular();
    browser.sleep(1000);
    expect($(".preview-photo").getAttribute('src')).to.eventually.match(/^data:.*?\/.*?;base64,/);
  });
  this.Given(/approve of event data captured/, function * () {

  });
  this.Given(/do not want to edit or add additonal information/, function * () {

  });
  this.When(/user swipes screen to the left/, function * () {

  });
  this.Then(/App accepts form and creates system calendar event/, function * () {

  });

  this.Given(/the event preview screen is showing/, function * () {

  });
  this.When(/the user swipes the screen to the right/, function * () {

  });
  this.Then(/the original image is shown with (?:the|) (.*) button/, function * (buttonName) {

  });

  this.Given(/User has swiped left from (?:the|) (.*) screen/i, function * (screenName) {

  });
  this.Given(/calendar event has been created/, function * () {

  });
  this.When(/event creation has completed/, function * () {

  });
  this.Then(/(.*) screen is shown/, function * (screenName) {

  });
  this.Then(/has a "(.*)" button/, function * (buttonName) {

  });
  this.Given(/(?:select|tap|press) (?:the |)"(.*)" (field|button|label)/, function * (action, name, type) {
    $(".take-photo").click();
  });
  this.Given(/system keyboard (?:is (?:presented|shown)|pops up|displays)/, function * () {

  });
  this.When(/user finishes text entry/, function * () {

  });
  this.Then(/keyboard is hidden and (?:the |)"(.*)" (?:screen|page) (?:is shown|pops up|displays|comes up)/, function * () {

  });

};