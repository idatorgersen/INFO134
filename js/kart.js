const hotspots = [
  {
    name: "Det Akademiske Kvarter",
    pos: {lat: 60.389716, lng: 5.322079}
  },
  {
    name: "Universitetsmuseet",
    pos: {lat: 60.387953, lng:5.321822}
  },
  {
    name: "Studentsenteret",
    pos: {lat: 60.387953, lng:5.323139}
  },
  {
    name: "SV-fakultetet",
    pos: {lat: 60.388549, lng:5.324381}
  }
];

function initMap() {
  var kvarteret = {lat: 60.389716, lng: 5.322079};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: kvarteret
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
  /*marker.addListener('click', function() {
    if(this.getAnimation() !== null) this.setAnimation(null);
    else this.setAnimation(google.maps.Animation.BOUNCE);
  })*/
}
