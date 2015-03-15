//The Real Slim Shady
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the AddToilet modal
  $scope.loginData = {};

  // Create the AddToilet modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the AddToilet modal to close it
  $scope.closeAddToilet = function() {
    $scope.modal.hide();
  };

  // Open the AddToilet modal
  $scope.openAddToilet = function() {
    $scope.modal.show();
  };

  // Will implemenet the adding of the data for our data plops
  $scope.addToilet = function() {
    console.log('Doing login', $scope.loginData);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.toiletOptions = [
    { title: 'Add a Loo', id: 1 },
    { title: 'Find Nearest Loo', id: 2 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams, map, $q) {
  // When the map is loaded
  map.promise.then(function(response){
    response.setCenter(new google.maps.LatLng(40.446, -123.909))
  });
  
  // Arbitrary setTimeout promise
  var myNewPromise = $q(function(resolve, reject) {
    setTimeout(function() {
      resolve('This worked! And should contain your geolocation data from your geolocation factory.');
    }, 5000);
  });
  
  // When both the map and geolocation promises are ready
  $q.all([map.promise, myNewPromise], function(data) {
    console.log(data);
  });
});
