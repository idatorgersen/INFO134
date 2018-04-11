var toaletter;

window.onload = function() { // Ida og Sindre
  getJSON("https://hotell.difi.no/api/json/bergen/dokart?", function(response) {
    toaletter = response.entries;
    toaletter.forEach(function(toalett) {
      toalett.visible = true;
    });

    updateMarkers();
    toiletList();
  });

  currentdate = new Date();
  document.getElementById("hour").value = currentdate.getHours();
  document.getElementById("minute").value = ("0" + currentdate.getMinutes()).substr(-2); //Legger til 0 foran tall 0-9. = 01,02 osv.
}

function updateMarkers() { // Sindre
  map.markers.forEach(function(marker) {
    marker.setMap(null);
  });

  toaletter.forEach(function(t) {
    if(t.visible) {
      let infoContent = "<b>" + t.plassering + "</b></br>" + t.adresse + " </br></br><i>Åpningstider:</i></br>" +
              "Man-fre: " + t.tid_hverdag + "</br> Lør: " + t.tid_lordag +
              "</br> Søn: " + t.tid_sondag;
      addMarker(t, infoContent);
    }
  });
}

function toiletList() { // Ida
  document.getElementById("doliste").innerHTML = "";
  toaletter.forEach(function(t) {
    let effect = 'onclick="triggerMarkerClick(' + t.id + ')"';
    if(!t.visible) effect = 'style="color:grey"';
    document.getElementById("doliste").innerHTML += "<li><b>" + t.id + ". </b><a " + effect + " href='#'>" + t.adresse + "</a></li>";
  });
}

function showSearch(){ // Ida
	var x = document.getElementById('search');
    if (x.style.display == 'block')
    {
        x.style.display = 'none';
    }
    else
    {
        x.style.display = 'block';
    }
}

function search() { // Ida og Sindre
  let form = document.getElementById("search");
  let filter = {};

  for(let i = 0; i < form.length; i++) {
    filter[form[i].id] = form[i].checked || Number(form[i].value);
  }

  toiletFilter(filter);
  updateMarkers();
  toiletList();
}

function toiletFilter(filter) {
  toaletter.forEach(function(t) {
    if((filter.herre && !Boolean(t.herre)) || (filter.dame && !Boolean(t.dame))) {
      t.visible = false;
    } else if(filter.rullestol && t.rullestol != "1") {
      t.visible = false;
    } else if(filter.stellerom && t.stellerom != "1") {
      t.visible = false;
    } else if(filter.gratis && Number(t.pris) > 0) {
      t.visible = false;
    } else if(filter.makspris < Number(t.pris) && filter.makspris != 0) {
      t.visible = false;
    }
  });
}
