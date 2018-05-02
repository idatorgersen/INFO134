//Oppgave 3

window.onload = function() {
  // Kaller på getJSON i scripts.js for å hente datasett "dokart"
  getJSON("https://hotell.difi.no/api/json/bergen/dokart?", function(response) {
    data = response.entries;
    data.forEach(function(item) {
      item.visible = true;
    });

    updateMarkers();
    listPositions(data);
  });

  /**
   * Henter nåværende tidspunkt og legger det inn som standardvalør i søkefelt for klokkeslett
   * Legger også til 0 foran tall 0-9. = 01,02 osv.
   */
  currentdate = new Date();
  document.getElementById("hour").value = ("0" + currentdate.getHours()).substr(-2);
  document.getElementById("minute").value = ("0" + currentdate.getMinutes()).substr(-2);
}

/**
 * Funksjon som genererer markører på map basert på egenskapen "visible"
 */
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

// Funksjon som slår av/på visning av avansert søk
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

/**
 * Funksjon som kjøres når klient trykker "søk"
 * Sender søkeparametre fra html-form videre til filter-funksjon
 */
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

/**
 * Funksjon som filtrerer synlige datapunkt basert på klientens valg i søkefeltene
 * param: filter  objekt som inneholder søkeparametre fra html-form
 */
function toiletFilter(filter) {
  let today = new Date().getDay();
  if(today == 0) {
    today = "tid_sondag";
  } else if(today == 6) {
    today = "tid_lordag";
  } else {
    today = "tid_hverdag";
  }

  data.forEach(function(t) {
    let open, opens, closes;
    open = t[today].split(" - ");
    if(open.length > 1) {
      opens = open[0].split(".").map(Number);
      closes = open[1].split(".").map(Number);
    }

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
    } else if(opens && (filter.hour < opens[0] || (filter.hour == opens[0] && filter.minute < opens[1]))) {
      t.visible = false;
    } else if(closes && (filter.hour > closes[0] || (filter.hour == closes[0] && filter.minute > closes[1]))) {
      t.visible = false;
    } else {
      t.visible = true;
    }
  });
}

// Funksjon som skal filtrere basert på tekst-input ved hjelp av regex
function hurtigsok() {
  var searchText = document.getElementById("searchField").value;
  var captureStart = /(^.+?)(?=\w+:\w+)/g;
  var captureParams = /(\b([a-zæøå]+):([a-zæøå]+)\b)/g;

  var matchStart = searchText.match(captureStart);
  var matchParams = searchText.match(captureParams);

  console.log(searchText);
  console.log(matchStart);
  console.log(matchParams);
}
