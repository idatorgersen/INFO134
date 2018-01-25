function initMap() {
  var kvarteret = {lat: 60.389716, lng: 5.322079};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: kvarteret
  });
  //Kvarteret
  var marker = new google.maps.Marker({
    position: kvarteret,
    map: map
  });
  //Universitetsmuseet
  var marker2 = new google.maps.Marker({
    position: {lat: 60.387953, lng:5.321822},
    map: map
  });
  //Studentsenteret
  var marker3 = new google.maps.Marker({
    position: {lat: 60.387953, lng:5.323139},
    map: map
  });
  //SV
  var marker4 = new google.maps.Marker({
    position: {lat: 60.388549, lng:5.324381},
    map: map
  });
}
