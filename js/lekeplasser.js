var lekeplasser;

window.onload = function() {
  getJSON("https://hotell.difi.no/api/json/bergen/lekeplasser?", function(response) {
    lekeplasser = response.entries;
    lekeplasser.forEach(function(lekeplass) {
      lekeplass.visible = true;
    });

    updateMarkers();
  })
}
function updateMarkers() {
  map.markers.forEach(function(marker) {
    marker.setMap(null);
  });
  lekeplasser.forEach(function(l) {
    if(l.visible) {
      let infoContent = "<b>" + l.navn + "</b>";
      addMarker(l, infoContent);
    }
  });
}
