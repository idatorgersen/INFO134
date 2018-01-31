const hotspots = [
  {
    name: "Det Akademiske Kvarter",
    pos: {lat: 60.389716, lng: 5.322079}
  },
  {
    name: "Den Blå Steinen",
    pos: {lat: 60.391881, lng:5.322871}
  },
  {
    name: "Studentsenteret",
    pos: {lat: 60.386711, lng:5.323203}
  },
  {
    name: "SV-fakultetet",
    pos: {lat: 60.388549, lng:5.324381}
  }
];
//Skal legge inn dynamisk endring av zoom her
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: getCenterCoordinates(hotspots)
  });

  for(i in hotspots) addMarker(hotspots[i], map);
}

function addMarker(spot, map) {
  let marker = new google.maps.Marker({
    position: spot.pos,
    title: spot.name,
    map: map
  });

  let info = new google.maps.InfoWindow({
    content: spot.name
  });

  marker.addListener('click', function() {
    info.open(map, marker);
  });

  // Denne koden gjør at markers bouncer konstant etter onclick. Veldig unødvendig.
  marker.addListener('click', function() {
    if(this.getAnimation() !== null) this.setAnimation(null);
    else this.setAnimation(google.maps.Animation.BOUNCE);
  })
}

function getCenterCoordinates(coordinates) {
  let lat = 0.0, lng = 0.0;
  let ln = coordinates.length;
  for(let i = 0; i < ln; i++) {
    lat += coordinates[i].pos.lat;
    lng += coordinates[i].pos.lng;
  }

  return {lat: lat / ln, lng: lng / ln};
}
