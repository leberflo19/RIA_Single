var mymap;
let deleteEnabled = false;
let draggable = false;

let highscore = localStorage.getItem('points');

jQuery(document).ready(function() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };


    
    
    mymap = L.map('mymap').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibGViZXJmbG8xOSIsImEiOiJja2licWtlMmcxMXZrMnhvNW1mMzFzcDV1In0.jiWbmxKb5Tuk-oPMp9Mr2w'
    }).addTo(mymap);


    navigator.geolocation.getCurrentPosition(success, error, options);

    function success(pos) {
      var crd = pos.coords;
    
      latit = crd.latitude;
      longit = crd.longitude;
      mymap.panTo(new L.LatLng(latit, longit));
      var marker = new L.marker([latit,longit]);
      marker.addTo(mymap).bindPopup("Aktuelle Position");
      marker.on('click', removeMarker);  
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    

    
});


function addpoi(){
  mymap.on('click', addMarker);
}

function addMarker(e){
  latit = e.latlng.lat;
  longit = e.latlng.lng;
  var marker = new L.marker([latit,longit], {draggable:'true'});

  marker.on('dragend', function(event){
    if(draggable){
      var marker = event.target;
      var position = marker.getLatLng();
      marker.setLatLng(new L.LatLng(position.lat, position.lng),{draggable:'true'});
    }
  });
  
  marker.addTo(mymap)
  marker.bindPopup("POI");
  marker.on('click', removeMarker);  

  mymap.addLayer(marker);
  mymap.off('click', addMarker);
}

function removeMarker(e){
  if(deleteEnabled){
    e.target.removeFrom(mymap);
  }
  deleteEnabled = false;
}
function removepoi(){
  deleteEnabled = true;
}

function test(){
  console.log("test");
}



