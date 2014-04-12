define(function (require) {
  'use strict';

  require('angular-ui-router');

  return angular
    .module('myApp', [
      'ui.router'
    ])
    .controller('AppController', require('./controllers/AppController'))
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