let lekeplasser, toaletter;

window.onload = function() {
  getJSON("https://hotell.difi.no/api/json/bergen/lekeplasser?", function(response) {
    lekeplasser = response.entries;

    getJSON("https://hotell.difi.no/api/json/bergen/dokart?", function(response) {
      toaletter = response.entries;
      createOptions();
    });
  });
}

function createOptions() {
  for(let i = 0; i < toaletter.length; i++) {
    let opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = toaletter[i].id + ". " + toaletter[i].adresse;
    document.getElementById("favourite").appendChild(opt);
  }

  document.getElementById("favourite").onchange = function() {
    clearMarkers();

    let t = toaletter[this.value];
    lekeplasser.sort(function(a, b) {
      return calculateDistance(a, t) - calculateDistance(b, t);
    });
    addMarker(t, {icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', infowindow: new google.maps.InfoWindow({ content: "" })});

    closestLekeplasser = lekeplasser.slice(0, 5);
    closestLekeplasser.forEach(function(l) {
      let infoContent = "<b>" + l.navn + "</b>";
      addMarker(l, {label: l.id, infowindow: new google.maps.InfoWindow({ content: infoContent })});
    });

    listPositions(closestLekeplasser);
  }
}
