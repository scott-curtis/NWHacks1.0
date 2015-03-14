    //tells the app the device is ready
    //document.addEventListener("deviceready", onDeviceReady, false);
    //function onDeviceReady() {
    //console.log("navigator.geolocation works well");}
    //initializes the app
  // Gets the current position of the user and centers the screen to that
  var lat = 0;
  var lng = 0;
  function getCurrentPos(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    var onSuccess = function(position){
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      alert('Success');
    };
    //Defaults to London, England if position can not be determined
    var onError = function(){
      alert('Error');
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
      lat = 51.508742;
      lng = -0.120850;
    };
  }
  //Creates a point at the users location
  var myCenter = new google.maps.LatLng(lat,lng);
  
  //Initializes the map
  function initialize() {
    var mapProp = {
      center:new google.maps.LatLng(lat,lng),
      zoom:5,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
    
    //Creates a Marker at the users current position
    var currentPosMarker = new google.maps.Marker({position:myCenter,
      animation:google.maps.Animation.BOUNCE
    });
    currentPosMarker.setMap(map);
  }
  google.maps.event.addDomListener(window, 'load', initialize);