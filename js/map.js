jQuery(document).ready(function() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    function success(pos) {
        var crd = pos.coords;
      
        latit = crd.latitude;
        longit = crd.longitude;
        mymap.panTo(new L.LatLng(latit, longit));
        L.marker([latit,longit]).addTo(mymap).bindPopup("Aktuelle Position");
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
    
    
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibGViZXJmbG8xOSIsImEiOiJja2licWtlMmcxMXZrMnhvNW1mMzFzcDV1In0.jiWbmxKb5Tuk-oPMp9Mr2w'
    }).addTo(mymap);

    navigator.geolocation.getCurrentPosition(success, error, options);
});
