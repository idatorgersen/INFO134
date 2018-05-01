var eier, kapasitet;

window.onload = function() {
  getJSON("http://www.barnehagefakta.no/api/Location/kommune/1201", function(response) {
    data = response;
  });
}

//Setter eier lik value og kjører refresh()
function eier(value) {
  eier = value;
  refresh();
}

//Setter kapasitet lik value og kjører refresh()
function maks(value){
  kapasitet = value;
  refresh();
}
//Filtrerer liste over barnehager ut fra hvilke radio buttons som er valgt
function refresh(){
  var liste = data.filter(function(b){
    if(eier && b.eierform !== eier){
      return false;
    }
    if(kapasitet && b.antallBarn > kapasitet){
      return false;
    }else if(b.antallBarn == undefined){
      return null;
    }
    return true;
  });
  console.log(liste);
  listPositions(liste);
}
