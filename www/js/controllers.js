angular.module('FindALoo.controllers', [])

.controller('BathroomOptions', function($scope) {
  $scope.playlists = [
    { title: 'Add Loo', id: 1 },
    { title: 'Save Loo', id: 2 }
  ];
})

.controller('BathroomOptions', function($scope, $stateParams) {
});
