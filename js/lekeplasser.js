window.onload = function() {
  getJSON("https://hotell.difi.no/api/json/bergen/lekeplasser?", function(response) {
    data = response.entries;

    updateMarkers();
  })
}
function updateMarkers() {
  clearMarkers();

  data.forEach(function(l) {
    if(l.visible) {
      let infoContent = "<b>" + l.navn + "</b>";
      addMarker(l, {label: l.id, infowindow: new google.maps.InfoWindow({ content: infoContent })});
    }
  });
}
