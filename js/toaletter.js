var toaletter, map;

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

window.onload = function() { // Ida og Sindre
  currentdate = new Date();
  document.getElementById("hour").value = currentdate.getHours();
  document.getElementById("minute").value = ("0" + currentdate.getMinutes()).substr(-2); //Legger til 0 foran tall 0-9. = 01,02 osv.

  getData();
  updateMarkers();
  listMarkers();
}

function initMap() { // Google
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(60.395053,5.319800),
    markers: []
  });
}

function updateMarkers() { // Sindre
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

function listMarkers() { // Ida
  document.getElementById("doliste").innerHTML = "";
  for(var i = 0; i < toaletter.length; i++) {
    document.getElementById("doliste").innerHTML += "<li><b>" + toaletter[i].id + ". </b><a href='#' onclick='popup(" + toaletter[i].id + ")'>" + toaletter[i].adresse + "</a></li>";
  }
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
  listMarkers();
}

function getData(filter) {
  if(!toaletter) toaletter = dokart["entries"];

  if(filter) {
    toaletter = toaletter.filter(t => {
      return (!filter.herre || Boolean(t.herre))
        && (!filter.dame || Boolean(t.dame))
        && (!filter.rullestol || Number(t.rullestol))
        && (!filter.stellerom || Number(t.stellerom))
        && (!filter.gratis || !Boolean(Number(t.pris)) || (t.pris === "NULL"))
    });
    //toaletter = toaletter.filter(t => t.kvinne = filter.kvinne);
  }
}
