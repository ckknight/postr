define(function (require) {
  'use strict';

  require('angular-ui-router');
  require('angular-file-upload');

  return angular
    .module('myApp', [
      'ui.router',
      'angularFileUpload'
    ])
    .controller('AppController', require('./controllers/AppController'))
    .controller('EventController', require('./controllers/EventController'))
    .controller('StartController', require('./controllers/StartController'))
    .config(['$urlRouterProvider', '$stateProvider',
      function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('start', {
            url: '/',
            templateUrl: 'html/start.html',
            controller: 'StartController'
          })
      }
    ]);
});