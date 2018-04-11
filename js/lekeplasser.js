var lekeplasser;

window.onload = function() {
  getJSON("https://hotell.difi.no/api/json/bergen/lekeplasser?", function(response) {
    lekeplasser = response.entries;
    lekeplasser.forEach(function(lekeplass) {
      lekeplass.visible = true;
    })

    updateMarkers();
    listMarkers();
  });
  })
}
