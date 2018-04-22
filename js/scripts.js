let map, data;

function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType('application/json');
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      if(xhr.getResponseHeader("Content-Type").match(/application[/]json/g)) {
        let jsonResponse = JSON.parse(xhr.responseText).entries;
        jsonResponse.forEach(function(item) {
          item.visible = true;
        });
        callback(jsonResponse);
      } else {
        callback(null);
      }
    }
  };
  xhr.send();
}

function cleanMarkers(){
  map.markers.forEach(function(marker) {
    marker.setMap(null);
  })
}

function initMap() { // Google
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(60.395053,5.319800),
    markers: []
  });
}

function addMarker(spot, params) { // Sindre
  let marker = new google.maps.Marker(Object.assign({}, {
    position: {lat: parseFloat(spot.latitude), lng: parseFloat(spot.longitude)},
    title: spot.id,
    map: map
  }, params));

  map.markers.push(marker);

  marker.addListener('click', function() {
    map.markers.forEach(function(marker) {
      marker.infowindow.close(map, marker)
    });
    this.infowindow.open(map, marker);
  });
}

function triggerMarkerClick(id) { // Sindre
  let targetMarker = map.markers.find(function(marker) {
    if(marker.label == id) return marker;
  });
  google.maps.event.trigger(targetMarker, 'click');
}

function calculateDistance(c1, c2) {
  let lat = Math.abs(c1.lat(), c2.lat());
  let lng = Math.abs(c1.lng(), c2.lng());

  return Math.sqrt((lat * lat) + (lng * lng));
}
