
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
    center: new google.maps.LatLng(60.395053,5.319800),
  });
  for(var i = 0; i < toaletter.length; i++){
    addMarker(toaletter[i], map);
  }
}

function addMarker(spot, map) { // Sindre

  let marker = new google.maps.Marker({
    position: {lat: spot.latitude, lng: spot.longitude},
    title: spot.id,
    map: map
  });
}
