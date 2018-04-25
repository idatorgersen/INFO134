let lekeplasser, toaletter;

window.onload = function() {
  getJSON("https://hotell.difi.no/api/json/bergen/lekeplasser?", function(response) {
    lekeplasser = response;

    getJSON("https://hotell.difi.no/api/json/bergen/dokart?", function(response) {
      toaletter = response;
      createOptions();
    });
  });
}

function createOptions() {
  for(let i = 0; i < toaletter.length; i++) {
    let opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = toaletter[i].adresse;
    document.getElementById("favourite").appendChild(opt);
  }

  document.getElementById("favourite").onchange = function() {
    clearMarkers();

    let t = toaletter[this.value];
    lekeplasser.sort(function(a, b) {
      return calculateDistance(a, t) - calculateDistance(b, t);
    });
    addMarker(t, {icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'});
    for(var i = 0; i<10; i++){
      addMarker(lekeplasser[i]);
    }

    listPositions(lekeplasser.slice(0, 5));

    /*lekeplasser.forEach(function(a) {
      console.log(calculateDistance(a, t));
    })*/
  }
}
