//The Real Slim Shady
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var lat = 0;
var lng = 0;
var app = angular.module('starter', ['ionic', 'starter.controllers'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});

app.factory('geolocation', ['$window', function(win) {
      
       //tells the app the device is ready
    //document.addEventListener("deviceready", onDeviceReady, false);
    //function onDeviceReady() {
    //console.log("navigator.geolocation works well");}
    //initializes the app
  // Gets the current position of the user and centers the screen to that
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    function onSuccess(position){
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    }
    //Defaults to pos (0,0) if position can not be determined
    function onError(error){
      alert('Error');
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
      lat = 0;
      lng = 0;
    }
    
}]);

/* app.factory('elements', ['$window', function(win, getCoords){
  
  toilets = angular.module('toilets', []);
  console.log(toilets);
  toilets.filter('range', function(){
    return toilets;
  });
}]); */

app.factory('map',['$window', '$q', function(win, $q, geolocation) {
  
  //var xCoords = elements.arr[0];
  //var yCoords = elements.arr[1];
  //var comments = elements.arr[2];
  toilets = angular.module('toilets', []);
  toilets.filter('range', function(){return toilets});

  
  return {
    /*getLatLng: function() {
      return {
        lat: lat,
        lng: lng
      };
    }, */
    
    promise: $q(function(resolve, reject) {
      //Creates a point at the users location
      var myCenter = new google.maps.LatLng(lat,lng);
      
      var comments = [];
      var xCoords = [];
      var yCoords = [];
      
      total = parseInt(toilets.length);
      for(var i=0;i<total;i++)
        if(i%3===0){comments[i] = toilet[i];}
        else if(i%2===0){yCoords[i] = toilet[i];}
        else{xCoords[i] = toilets[i];}
        
        
      //Initializes the map
      function initialize() {
        // Reset the markers
        //markers = [];
        
        // Initialize the map
        var mapProp = {
          center:new google.maps.LatLng(lat,lng),
          zoom:9,
          mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
        
        var temp;
        var temp2;
        angular.forEach(xCoords, function($scope, i){
          temp = new google.maps.LatLng(xCoords[i], yCoords[i]);
          temp2 = new google.maps.Marker({position: temp});
          temp2.setMap(map);
          alert('SUCCESS: ' + xCoord[i]);
        } );
        
        //Creates a Marker at the users current position
        var currentPosMarker = new google.maps.Marker({position:myCenter,
          animation:google.maps.Animation.BOUNCE
        });
        currentPosMarker.setMap(map);
        
        // Return the reference to the map
        resolve(map);
      }
      
      google.maps.event.addDomListener(window, 'load', initialize);
    })
  };
}]);