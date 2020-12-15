var index = 1;  //marker arrayi oluşturuldu
var markers = [];
var path;

let map;
let poly;



//--------------------------------------------------------
function initMap() {
  const Ankara = { lat: 39.933, lng: 32.854 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: Ankara,
    scaleControl: true,
    mapTypeControl: true,
    fullscreenControl: true
  });
  poly = new google.maps.Polyline({
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 3,
  });

  google.maps.event.addListener(map, "click", (event) => { //click eventi algılanıyor, click yapılan noktanın LatLng değerleri alınıyor
    addMarker(event.latLng, map); //click eventi addMarker fonksiyonu ile marker koyuyor
    poly.setMap(map);
    $("#marker").append('<div>'+index+': '+event.latLng+'</div>');
    index++;
  });
}
//--------------------------------------------------------



//------------------ADD MARKER--------------------------------------
function addMarker(location, map) {
  path= poly.getPath();

  var lab = index.toString();
  var marker = new google.maps.Marker({
    position: location,
    label: lab,
    map: map,
  })
  markers.push(marker);
  path.push(location);
  ShowPosition(marker, marker.position);
  calculateDistance();
}
//--------------------END ADD MARKER------------------------------------



//--------------------SHOW POSITION------------------------------------
function ShowPosition(marker, position) {
    var positionString = position.toString();
    var infowindow = new google.maps.InfoWindow({
      content: positionString, //YALNIZCA STRING ALIYOR
    });
    
    marker.addListener("click", () => { //when a marker clicked, an infowindow opens at its top
      infowindow.open(marker.get("map"), marker);
    });
    
  }
//--------------------END SHOW POSITION------------------------------------

  

//--------------------DISTANCE CALCULATION------------------------------------
function calculateDistance() {
  let path_length=0;

  let list1 = document.getElementById("total-length");
  list1.innerHTML="";

  var R = 3958.8; // Radius of the Earth in miles
  let rlat1,rlat2,difflat,difflon,d;

  for (let i = 1; i < markers.length; i++) {
        rlat1 = markers[i-1].position.lat() * (Math.PI/180);
        rlat2 = markers[i].position.lat() * (Math.PI/180);
        difflat = rlat2-rlat1;
        difflon = (markers[i].position.lng()-markers[i-1].position.lng()) * (Math.PI/180);
        d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        path_length += d;
  }
  
  $("#total-length").append(path_length+' km');
}
//--------------------END DISTANCE CALCULATION------------------------------------



// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
  poly.setMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
  poly.setMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  
  clearMarkers();

  while(path.length>0){
    path.pop(); //path boşalttık
  }
  poly.setMap(map); //boş path ile tekrar initilaze ettik
  
  markers = [];
  index=1;

  path_length=0;

  let list1 = document.getElementById("total-length");
  list1.innerHTML="";

  let list2 = document.getElementById("marker");
  list2.innerHTML="";
  
}