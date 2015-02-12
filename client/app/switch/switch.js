'use strict';

angular.module('homeAutomationApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('switch', {
        url: '/switch',
        templateUrl: 'app/switch/switch.html',
        controller: 'SwitchCtrl',
        authenticate: true
      });
  });
