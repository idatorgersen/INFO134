
const toaletter = dokart["entries"];

let markers = [];

window.onload = function() {
  for(var i = 0; i < toaletter.length; i++) {
    document.getElementById("doliste").innerHTML += "<li>" + toaletter[i].id + ". " + toaletter[i].adresse + "</li>";

  }
}

function initMap() { // Google
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(60.395053,5.319800),
  });
  for(var i = 0; i < toaletter.length; i++){
    addMarker(toaletter[i], map);
  }
}

function addMarker(spot, map) { // Sindre
  let info = new google.maps.InfoWindow({
    content: spot.adresse
  });

  let marker = new google.maps.Marker({
    position: {lat: parseFloat(spot.latitude), lng: parseFloat(spot.longitude)},
    title: spot.id,
    label: spot.id,
    map: map,
    infowindow: info
  });

  markers.push(marker);

  marker.addListener('click', function() {
    markers.forEach(function(marker) {
      marker.infowindow.close(map, marker)
    });
    this.infowindow.open(map, marker);
  });
}
