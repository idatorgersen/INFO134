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

  toaletter.forEach(function(t) {
    if(t.visible) addMarker(t);
  });
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
  toaletter.forEach(function(t) {
    let style = 'style="color:black" onclick="popup(' + t.id + ')"';
    if(!t.visible) style = 'style="color:grey"';
    document.getElementById("doliste").innerHTML += "<li><b>" + t.id + ". </b><a " + style + " href='#'>" + t.adresse + "</a></li>";
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
  let filter = {};

  for(let i = 0; i < form.length; i++) {
    filter[form[i].id] = form[i].checked || Number(form[i].value);
  }

  console.log(filter);

  getData(filter);
  updateMarkers();
  listMarkers();
}

function getData(filter) {
  if(!toaletter) toaletter = dokart["entries"];
  for(let i in toaletter) toaletter[i].visible = true;

  if(filter) filterData(filter);
}

function filterData(filter) {
  toaletter.forEach(function(t) {
    console.log(t);
    if((filter.herre && !Boolean(t.herre)) || (filter.dame && !Boolean(t.dame))) {
      t.visible = false;
    } else if(filter.rullestol && t.rullestol != "1") {
      t.visible = false;
    } else if(filter.stellerom && t.stellerom != "1") {
      t.visible = false;
    } else if(filter.gratis && Number(t.pris) > 0) {
      console.log(t.pris);
      t.visible = false;
    } else if(filter.makspris < Number(t.pris) && filter.makspris != 0) {
      t.visible = false;
    }
  });
}
