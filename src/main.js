var data;
var projection;
var w = 1000, h = 800;
var mymap = L.map('mapid').setView([40.7, -73.90], 11);
 
function initializeData(csv) {
  data = csv.map(function(d) {
    return {
      lat: +d.lat,
      lon: +d.lon,
      school: d.LOCATION_NAME,
      schoolType: d.schoolType
    }
  });
}



 
function initProjection() {
  var geoJSON = {
    type: "FeatureCollection",
    features: []
  }
 
  data.forEach(function(d) {
    geoJSON.features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [d.lon, d.lat]
      }
    });
  });
 
  projection = d3.geoMercator();
  projection.fitSize([w, h], geoJSON);
}


function addLayers() {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYm9ib3NjYXJoYXBweWFwcGxlIiwiYSI6ImNqcmZnemx1NzFzeXQ0M3FuMHRqMDYwaHMifQ.yturWl0gYhIdGprffSEJSw'
}).addTo(mymap);
}


function addSchools() {
    data.forEach(
        function(d) {
            if (d.schoolType == "Charter") {
            L.circle([d.lat, d.lon], {
            color: '#F7910B',
            radius: 100
            }).addTo(mymap);
            }   else {
                L.circle([d.lat, d.lon], {
                    color: '#6699CC'
                    }).addTo(mymap);

     }
        })
                }






d3.csv('data/schoolslatlon.csv', function(err, csv) {
    initializeData(csv);
    addLayers();
    initProjection();
    addSchools();
    
  });


