//The Real Slim Shady
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
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
