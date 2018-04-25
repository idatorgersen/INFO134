window.onload = function() {
  // Kaller på getJSON i scripts.js for å hente datasett "lekeplasser"
  getJSON("https://hotell.difi.no/api/json/bergen/lekeplasser?", function(response) {
    data = response;

    updateMarkers();
  })
}

/**
 * Funksjon som genererer markører på map basert på egenskapen "visible"
 */
function updateMarkers() {
  clearMarkers();

  data.forEach(function(l) {
    if(l.visible) {
      let infoContent = "<b>" + l.navn + "</b>";
      addMarker(l, {label: l.id, infowindow: new google.maps.InfoWindow({ content: infoContent })});
    }
  });
}
