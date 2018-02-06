const hotspots = [ // Sindre og Ida
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
  },
  {
    name: "Realfagsbygget",
    pos: {lat: 60.384821, lng:5.328484}
  },
  {
    name: "Det Juridiske Fakultet",
    pos: {lat: 60.390328, lng:5.314803}
  },
  {
    name: "Det Psykologiske Fakultet",
    pos: {lat: 60.389968, lng:5.324309}
  },
  {
    name: "Handelshøyskolen BI",
    pos: {lat: 60.382151, lng:5.324450}
  },
  {
    name: "Det Humanistiske Fakultet",
    pos: {lat: 60.387578, lng:5.318017}
  },
  {
    name: "Fakultet for kunst, musikk og design",
    pos: {lat: 60.379152, lng:5.353126}
  },
  {
    name: "Det medisinske fakultet",
    pos: {lat: 60.372656, lng:5.360194}
  },
  {
    name: "Hulen",
    pos: {lat: 60.384854, lng:5.325547}
  }

];
//Skal legge inn dynamisk endring av zoom her
function initMap() { // Google
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: getCenterCoordinates(hotspots)
  });

  for(i in hotspots) addMarker(hotspots[i], map);
}

function addMarker(spot, map) { // Sindre
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

function getCenterCoordinates(coordinates) { // Sindre
  let lat = 0.0, lng = 0.0;
  let ln = coordinates.length;
  for(let i = 0; i < ln; i++) {
    lat += coordinates[i].pos.lat;
    lng += coordinates[i].pos.lng;
  }

  return {lat: lat / ln, lng: lng / ln};
}
