var index = 1; //marker arrayi oluşturuldu
var markers = [];
var path;
var path_length = 0;
var i = 1;
var flag = 0;

let mymap;
let poly;

//-----------------MAP INITILAZE---------------------------------
function initMap() {
    const Ankara = [39.933, 32.854] /* lat,lng */
    mymap = L.map('mymap').setView(Ankara, /*zoom: */ 10);

    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=f8XhqqItUC0E8uVL6dTd', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(mymap)

    //let starting_marker = L.marker(Ankara).addTo(mymap);



    //var myFeatureGroup = L.featureGroup().addTo(mymap).on("click");


    //starting_marker.bindPopup("<b>Hi there!</b><br>Ankara is the starting point.").openPopup();

    var popup = L.popup();
    calculateDistance();
    //------------------ADD MARKER--------------------------------------
    function addMarker(e) {
        if (flag == 1) {
            showMarkers();
        }
        flag = 0;
        //popup.setLatLng(e.latlng)
        //.setContent(e.latlng.toString())
        //.openOn(mymap);
        //console.log(e.latlng)
        let marker = L.marker(e.latlng).addTo(mymap);
        //console.log(marker.position.lat)
        marker_lat = (e.latlng.lat);
        marker_lng = (e.latlng.lng);
        //console.log(marker.getLatLng().lat);
        markers.push(marker);
        $("#markers").append('<li>' + index + ': (' + marker_lat + ', ' + marker_lng + ')</li>');
        index++;
        calculateDistance();

    }
    mymap.on('click', addMarker);

    //--------------------END OF ADD MARKER------------------------------------
    //--------------------SHOW POSITION------------------------------------
    //--------------------END OF SHOW POSITION------------------------------------
}
//-----------------END OF MAP INITILAZE---------------------------------------
initMap();

//--------------------DISTANCE CALCULATION------------------------------------
function calculateDistance() { //by using the haversine formula
    console.log("i: " + i)
    let list1 = document.getElementById("total-length");
    list1.innerHTML = "";

    console.log("if1 lat: " + markers[i - 1].getLatLng().lat);


    /* var path_length;
    let d;

    if (i < 2) {
        for (i = 1; i < markers.length; i++) {
            d = distance(markers[i].latlng, markers[i - 1].latlng)
            path_length += d;
        }
        $("#total-length").append('Total Length: ' + path_length + ' km');

    } else {
        d = distance(markers[i].latlng, markers[i - 1].latlng)
        path_length += d;
        $("#total-length").append('Total Length: ' + path_length + ' km');

        i++;
    } */

}
//--------------------END OF DISTANCE CALCULATION------------------------------------


// Sets the map on all markers in the array.
function setMapOnAll(mymap) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].addTo(mymap);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
        mymap.removeLayer(markers[i])
    }

    //setMapOnAll(null);
    //poly.setMap(null);
    flag = 1;
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(mymap);
    //poly.setMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {

    clearMarkers();

    /*while (path.length > 0) {
        path.pop(); //path boşalttık
    }
    poly.setMap(map); //boş path ile tekrar initilaze ettik
*/
    markers = [];
    index = 1;

    path_length = 0;

    let list1 = document.getElementById("total-length");
    list1.innerHTML = "";

    let list2 = document.getElementById("markers");
    list2.innerHTML = "";

    path_length = 0;
    i = 1;
    calculateDistance();
}

function openNav() {
    document.getElementById("mySidebar").style.width = "20%";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0%";
}



/*var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);*/


function lat(latlng) {

}