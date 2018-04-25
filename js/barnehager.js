
window.onload = function() {
  getJSON("http://www.barnehagefakta.no/api/Location/kommune/1201", function(response) {
    data = response;
  })
}
