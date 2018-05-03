// Globale variabler som tar vare på kart og datasett
let map, data;

/**
 * Oppgave 2
 * Funksjon som henter JSON fra gitt url
 * JSON-dokumentet tolkes og returneres til callback-funksjon
 */
function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType('application/json');
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      if(xhr.getResponseHeader("Content-Type").match(/application[/]json/g)) {
        let jsonResponse = JSON.parse(xhr.responseText);
        callback(jsonResponse);
      } else {
        callback(null);
      }
    }
  };
  xhr.send();
}

/**
 * Initialiseringsfunksjon for Google Maps
 * Opprettet en referanse "markers" i map som tar vare på alle aktive markører i et array
 */
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(60.395053,5.319800),
    markers: []
  });
}

/**
 * Funksjon som legger til gitt markør til map
 * Dersom infowindow er supplert som ekstra parameter legges det til en eventlistener for click-event
 * param: spot    objekt som inneholder koordinater som latitude og longitude
 * param: params  objekt som inneholder parametre for marker-objekt (valgfritt)
 */
function addMarker(spot, params) {
  let marker = new google.maps.Marker(Object.assign({}, {
    position: {lat: parseFloat(spot.latitude), lng: parseFloat(spot.longitude)},
    title: spot.id,
    map: map
  }, params));
  map.markers.push(marker);

  if(marker.infowindow) {
    marker.addListener('click', function() {
      map.markers.forEach(function(marker) {
        marker.infowindow.close(map, marker)
      });
      this.infowindow.open(map, marker);
    });
  }
}

// Funksjon som rydder bort alle markører fra map
function clearMarkers() {
  map.markers.forEach(function(marker) {
    marker.setMap(null);
  });
  map.markers = [];
}

// Funksjon som lager en liste basert på gitt samling av objekter
function listPositions(positions) {
  document.getElementById("posList").innerHTML = "";

  positions.forEach(function(p) {
    let effect = 'onclick="triggerMarkerClick(' + p.id + ')"';
    if(!p.visible && p.visible !== undefined) effect = 'style="color:grey"';
    document.getElementById("posList").innerHTML += "<li><a " + effect + " href='#'>" + (p.adresse || p.navn) + "</a></li>";
  });
}

/**
 * Funksjon som aktiverer click-event på gitt markør
 * Brukes i posList, som en onclick-effekt ved bruk av listen
 */
function triggerMarkerClick(id) {
  let targetMarker = map.markers.find(function(marker) {
    if(marker.title == id) return marker;
  });
  google.maps.event.trigger(targetMarker, 'click');
}


// Oppgave 7. Funksjon som regner ut avstand mellom to koordinater ved hjelp av Pytagoras
function calculateDistance(c1, c2) {
  let lat = Math.abs(c1.latitude - c2.latitude);
  let lng = Math.abs(c1.longitude - c2.longitude);

  return Math.sqrt((lat * lat) + (lng * lng));
}

// Funksjon for burgermeny. Legger til classname responsive på topnav, dette brukes videre i css
function burger() {
    var burger = document.getElementById("nav");
    if (burger.className === "topnav") {
        burger.className += " responsive";
    } else {
        burger.className = "topnav";
    }
}
