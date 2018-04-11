let map;

function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType('application/json');
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      if(xhr.getResponseHeader("Content-Type").match(/application[/]json/g)) {
        callback(JSON.parse(xhr.responseText));
      } else {
        callback(null);
      }
    }
  };
  xhr.send();
}

function initMap() { // Google
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(60.395053,5.319800),
    markers: []
  });
}

function addMarker(spot, infoContent) { // Sindre
  let marker = new google.maps.Marker({
    position: {lat: parseFloat(spot.latitude), lng: parseFloat(spot.longitude)},
    title: spot.id,
    label: spot.id,
    map: map,
    infowindow: new google.maps.InfoWindow({ content: infoContent })
  });

  map.markers.push(marker);

  marker.addListener('click', function() {
    map.markers.forEach(function(marker) {
      marker.infowindow.close(map, marker)
    });
    this.infowindow.open(map, marker);
  });
}
