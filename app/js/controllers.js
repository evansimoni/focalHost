'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('LandingPageController', [function() {

}])
.controller('WaitlistController', ['$scope', 'partyService', function($scope, partyService) {
  // Binds Firebase parties to the $scope
  $scope.parties = partyService.parties;

  // Object to store data from the Waitlist form
  $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};

  // Function to save a new party to the Waitlist
  $scope.saveParty = function() {
    partyService.saveParty($scope.newParty);
    $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'};
  }

  // Function to send text message to a party
  $scope.sendTextMessage = function(party) {
    var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages');
    var textMessages = $firebase(textMessageRef);
    var newTextMessage = {
      phoneNumber: party.phone,
      size: party.size,
      name: party.name
    }
    textMessages.$add(newTextMessage);
    party.notified = 'Yes';
    $scope.parties.$save(party.$id);
  };
}])
.controller('AuthController', ['$scope', 'authService', function($scope, authService) {
  // Object bound to inputs on the register and login pages
  $scope.user = {email: '', password: ''};
  // Method to register a new user using the auth service
  $scope.register = function() {
    authService.register($scope.user);
  };
  // Method to log in a new user using the auth service
  $scope.login = function() {
    authService.login($scope.user);
  };
  // Method to log out a new user using the auth service
  $scope.logout = function() {
    authService.logout();
  };
}]);