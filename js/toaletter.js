var toaletter, map;
getData();

/*window.onload = function startProgram()
{
  var xhr = new XMLHttpRequest();
  var url="http://hotell.difi.no/api/json/bergen/dokart?";
  xhr.open("GET", url);
  xhr.onreadystatechange = function(){
    if(xhr.readyState ===4 && xhr.status === 200){
      console.log("Type", xhr.getResponseHeader("Content-Type"));
      console.log("Text", xhr.responseText);
    }
  };
  xhr.send();
}*/

window.onload = function() {
  for(var i = 0; i < toaletter.length; i++) {
    document.getElementById("doliste").innerHTML += "<li><a href='#' onclick='popup(" + toaletter[i].id + ")'>" + toaletter[i].id + ". " + toaletter[i].adresse + "</a></li>";

  }
}

function initMap() { // Google
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(60.395053,5.319800),
    markers: []
  });

  updateMarkers();
}

function updateMarkers(filter) {
  map.markers.forEach(function(marker) {
    marker.setMap(null);
  });
  for(var i = 0; i < toaletter.length; i++) {
    addMarker(toaletter[i]);
  }
}

function addMarker(spot) { // Sindre
  let info = new google.maps.InfoWindow({
    content: spot.adresse
  });

  let marker = new google.maps.Marker({
    position: {lat: spot.latitude, lng: spot.longitude},
    title: spot.id,
    label: spot.id,
    map: map,
    infowindow: info
  });

  map.markers.push(marker);

  marker.addListener('click', function() {
    map.markers.forEach(function(marker) {
      marker.infowindow.close(map, marker)
    });
    this.infowindow.open(map, marker);
  });
}

function popup(id) { // Sindre
  let ourMarker = map.markers.find(function(marker) {
    if(marker.label == id) return marker;
  });
  google.maps.event.trigger(ourMarker, 'click');
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
  let values = {};

  for(let i = 0; i < form.length; i++) {
    values[form[i].id] = form[i].checked || Number(form[i].value);
  }
  console.log(values);
  getData(values);
  updateMarkers();
}

function getData(filter) {
  toaletter = dokart["entries"];

  if(filter) {
    toaletter = toaletter.filter(t => {
      return (!filter.herre || t.herre)
        && (!filter.dame || t.dame)
        && (!filter.rullestol || t.rullestol)
        && (!filter.stellerom || t.stellerom)
    });
    //toaletter = toaletter.filter(t => t.kvinne = filter.kvinne);
  }
}
