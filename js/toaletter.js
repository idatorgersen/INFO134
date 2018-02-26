
let toaletter = dokart["entries"];

let listeElement = "";

window.onload = function() {
  for(var i = 0; i < toaletter.length; i++) {
    document.getElementById("doliste").innerHTML += "<li>" + toaletter[i].id + ". " + toaletter[i].adresse + "</li>";
  }
}

function initMap() { // Google
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: getCenterCoordinates(toaletter)
  });
}

function addMarker(spot, map) { // Sindre
  let info = new google.maps.InfoWindow({
    content: spot.name
  });

  let marker = new google.maps.Marker({
    position: spot.pos,
    title: spot.name,
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

function getCenterCoordinates(coordinates) { // Sindre
  let lat = 0.0, lng = 0.0;
  let ln = coordinates.length;
  for(let i = 0; i < ln; i++) {
    lat += coordinates[i].pos.lat;
    lng += coordinates[i].pos.lng;
  }

  return {lat: lat / ln, lng: lng / ln};
}
