const toaletter = dokart["entries"];

window.onload = function startProgram()
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
}

window.onload = function() {
  for(var i = 0; i < toaletter.length; i++) {
    document.getElementById("doliste").innerHTML += "<li><a href='#' onclick='popup(" + toaletter[i].id + ")'>" + toaletter[i].id + ". " + toaletter[i].adresse + "</a></li>";

  }
}

function initMap() { // Google
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(60.395053,5.319800),
    markers: []
  });
  for(var i = 0; i < toaletter.length; i++){
    addMarker(toaletter[i], map);
  }

  popup = popup.bind({m: map});
}

function addMarker(spot, map) { // Sindre
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

function popup(id) {
  let ourMarker = this.m.markers.forEach(function(marker) {
    if(marker.id == id) return marker;
  })
  google.maps.event.trigger(ourMarker, 'click');
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
