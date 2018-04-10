function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType('application/json');
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      if(xhr.getResponseHeader("Content-Type").match(/application[/]json/g)) {
        callback(JSON.parse(xhr.responseText));
      } else {
        callback(null);
      }
    }
  };
  xhr.send();
}