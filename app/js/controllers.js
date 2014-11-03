'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('LandingPageController', [function() {

}])
.controller('WaitlistController', ['$scope', '$firebase', function($scope, $firebase) {
  var partiesRef = new Firebase('https://focalhost.firebaseio.com/parties');
  // Function to connect $scope.parties to live Firebase data
  $scope.parties = $firebase(partiesRef);

  // Object to store data from the Waitlist form
  $scope.newParty = {name: '', phone: '', size: ''};

  // Function to save a new party to the Waitlist
  $scope.saveParty = function() {
    $scope.parties.$add($scope.newParty);
    $scope.newParty = {name: '', phone: '', size: ''};
  }

  // Function to send text message to a party
  $scope.sendTextMessage = function(phoneNumber) {
    var textMessageRef = new Firebase('https://focalhost.firebaseio.com/textMessages');
    var textMessages = $firebase(textMessageRef);
    textMessages.$add({phoneNumber: phoneNumber});
  };
}]);