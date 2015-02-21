'use strict';

angular.module('homeAutomationApp')
  .controller('SwitchCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.toOn = function(){
      $http.put('/api/gpio/4', {mode: 'out', value: '1'})
        .success(function(data, status, header, config){
          console.log('data', data)
        }).error(function(data, status, header, config){
          console.log('data', data);
        });
    }

    $scope.toOff = function(){
      $http.put('/api/gpio/4', {mode: 'out', value: '0'});
    }
  });
