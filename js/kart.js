function initMap() {
  var kvarteret = {lat: 60.389716, lng: 5.322079};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: kvarteret
  });
  var marker = new google.maps.Marker({
    position: kvarteret,
    map: map
  });
  var marker2 = new google.maps.Marker({
    position: {lat: 60.387953, lng:5.321822},
    map: map
  });
}
