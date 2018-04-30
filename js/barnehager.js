var eier, kapasitet;

window.onload = function() {
  getJSON("http://www.barnehagefakta.no/api/Location/kommune/1201", function(response) {
    data = response;
  });
}
 function eier(value) {
   eier = value;
   refresh();
}

function maks(value){
  kapasitet = value;
  refresh();
}

function refresh(){
  var liste = data.filter(function(b){
      if(eier && b.eierform !== eier){
        return true;
      }
      if (b.antallBarn < kapasitet){
        return true;
      }
      console.log(b.eierform);
      return false;
  });
  listPositions(liste);
}
