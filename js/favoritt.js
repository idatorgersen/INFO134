// Variabler som tar vare på datasettene som brukes på favoritt-siden
let lekeplasser, toaletter;

window.onload = function() {
  // Kaller på getJSON i scripts.js for å hente datasett "lekeplasser"
  getJSON("https://hotell.difi.no/api/json/bergen/lekeplasser?", function(response) {
    lekeplasser = response.entries;
    lekeplasser.forEach(function(item) {
      item.visible = true;
    });

    // Kaller på getJSON i scripts.js for å hente datasett "dokart"
    getJSON("https://hotell.difi.no/api/json/bergen/dokart?", function(response) {
      toaletter = response.entries;
      toaletter.forEach(function(item) {
        item.visible = true;
      });
      
      createOptions();
    });
  });
}

/**
 * Funksjon som genererer dropdown-meny (<select>) hvor man kan velge favoritt-toalett
 */
function createOptions() {
  for(let i = 0; i < toaletter.length; i++) {
    let opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = toaletter[i].id + ". " + toaletter[i].adresse;
    document.getElementById("favourite").appendChild(opt);
  }

  // Her defineres en eventlistener som aktiveres når noe som helst endres i dropdown-menyen
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
