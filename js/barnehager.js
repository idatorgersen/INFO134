//Oppgave 10
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
    }if(b.antallBarn == undefined){
      return false;
    }else if(kapasitet && b.antallBarn > kapasitet){
      return false;
    }
    if(kapasitet == 10){
      return b.antallBarn < 10;
    }else if(kapasitet == 25){
      return b.antallBarn > 10 && b.antallBarn < 25;
    } else if(kapasitet == 50){
      return b.antallBarn > 25 && b.antallBarn < 50;
    } else if(kapasitet == 75){
      return b.antallBarn > 50 && b.antallBarn < 100;
    }else if(kapasitet == 300){
      return b.antallBarn > 100 && b.antallBarn < 500;
    }
    return true;
  });
  listPositions(liste);
}
