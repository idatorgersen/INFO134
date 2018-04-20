let lekeplasser, toaletter;

window.onload = function() {
  getJSON("https://hotell.difi.no/api/json/bergen/lekeplasser?", function(response) {
    lekeplasser = response;

    getJSON("https://hotell.difi.no/api/json/bergen/dokart?", function(response) {
      toaletter = response;
      createOptions();
    });
  });
  updateMarkers();
}

function createOptions() {
  for(let i = 0; i < toaletter.length; i++) {
    let opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = toaletter[i].adresse;
    document.getElementById("favourite").appendChild(opt);
  }

  document.getElementById("favourite").onchange = function() {
    addMarker(toaletter[this.value], null, {});
  }
}
function updateMarkers() { // Sindre
  map.markers.forEach(function(marker) {
    marker.setMap(null);
  });
}
