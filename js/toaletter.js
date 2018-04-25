
window.onload = function() {
  getJSON("https://hotell.difi.no/api/json/bergen/dokart?", function(response) {
    data = response.entries;
    data.forEach(function(item) {
      item.visible = true;
    });

    updateMarkers();
    listPositions(data);
  });

  currentdate = new Date();
  document.getElementById("hour").value = ("0" + currentdate.getHours()).substr(-2);
  document.getElementById("minute").value = ("0" + currentdate.getMinutes()).substr(-2); //Legger til 0 foran tall 0-9. = 01,02 osv.
}

function updateMarkers() {
  clearMarkers();

  data.forEach(function(t) {
    if(t.visible) {
      let infoContent = "<b>" + t.plassering + "</b></br>" + t.adresse + " </br></br><i>Åpningstider:</i>" +
              "</br>Man-fre: " + ((t.tid_hverdag == "NULL") ? "STENGT" : t.tid_hverdag) +
              "</br> Lør: " + ((t.tid_lordag == "NULL") ? "STENGT" : t.tid_lordag) +
              "</br> Søn: " + ((t.tid_sondag == "NULL") ? "STENGT" : t.tid_sondag);
      addMarker(t, {label: t.id, infowindow: new google.maps.InfoWindow({ content: infoContent })});
    }
  });
}

function showSearch(){
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

function search() {
  let form = document.getElementById("search");
  let filter = {};

  for(let i = 0; i < form.length; i++) {
    filter[form[i].id] = form[i].checked || Number(form[i].value);
  }

  toiletFilter(filter);
  updateMarkers();
  listPositions(data);
}

function toiletFilter(filter) {
  data.forEach(function(t) {
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

function hurtigsok() {
    let regex = /(.*?)( kjønn:(mann|kvinne)| rullestol:(ja|nei)| åpen:((ja|nei)|(\d\d:\d\d))| stellerom:(ja|nei)| makspris:(\d+)| gratis:(ja|nei))/;
    var searchText = document.getElementById("searchField").value;

    console.log(searchText.match(regex));
}
