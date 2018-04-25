window.onload = function() {
  getJSON("https://hotell.difi.no/api/json/bergen/lekeplasser?", function(response) {
    data = response;

    updateMarkers();
  })
}
function updateMarkers() {
<<<<<<< HEAD
=======
  clearMarkers();
  
>>>>>>> 39c7e9b3984702ec137f339246e76e931d260af0
  data.forEach(function(l) {
    if(l.visible) {
      let infoContent = "<b>" + l.navn + "</b>";
      addMarker(l, {label: l.id, infowindow: new google.maps.InfoWindow({ content: infoContent })});
    }
  });
}
