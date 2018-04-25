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
<<<<<<< HEAD
    cleanMarkers();
    addMarker(toaletter[this.value], null, {});
=======
    clearMarkers();

    let t = toaletter[this.value];
    lekeplasser.sort(function(a, b) {
      return calculateDistance(a, t) - calculateDistance(b, t);
    });
    addMarker(t, {icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'});
    addMarker(lekeplasser[0]);

    listPositions(lekeplasser.slice(0, 10));

    /*lekeplasser.forEach(function(a) {
      console.log(calculateDistance(a, t));
    })*/
>>>>>>> 39c7e9b3984702ec137f339246e76e931d260af0
  }
}
