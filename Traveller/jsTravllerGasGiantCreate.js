
function getNumberGasGiants(hasGasGiants, test){

    try {
      var nGasGiants = 0
      var hasGasGiantRoll = Math.floor(Math.random() * 6)+1+Math.floor(Math.random() * 6)+1;
      if(hasGasGiants == 1 || hasGasGiantRoll < 10){
        var nGasGiantRoll = Math.floor(Math.random() * 6)+1+Math.floor(Math.random() * 6)+1;
        if(nGasGiantRoll < 4){
          nGasGiants = 1;
        }else if(nGasGiantRoll < 6){
          nGasGiants = 2;
        }else if(nGasGiantRoll < 8){
          nGasGiants = 3;
        }else if(nGasGiantRoll < 11){
          nGasGiants = 4;
        }else{
          nGasGiants = 5;
        }
      }
      if(test){
        window.alert("jsTravellerPlanetCreate.getNumberGasGiants #Gas Giants-"+nGasGiants);
      }
      return nGasGiants;
    } catch (error) {
      window.alert("jsTravellerPlanetCreate.getNumberGasGiants "+error);
      
    }
  }


  function formatUGGD(habZone, orbit){
    /*Formats a gas giant orbit object for mulitline display*/
    try {
        //window.alert("jsTravellerPlanetCreate.formatUGGD: "+JSON.stringify(orbit));
        var display = " "+padDisplay(7, orbit.orbitOrder, "Orbit Order");
        if(orbit.orbitNumber > habZone -.5 && orbit.orbitNumber < habZone+.5){
            display = display.substring(0, display.length-1)+"*";
        }
        display = display+padDisplay(8, orbit.orbitNumber, "Orbit Number");
        display = display + padDisplay(25, orbit.orbitObj.planetName, "Planet Name");
        display = display + padDisplay(5, orbit.orbitObj.size, "Plant Size");
        display = display + orbit.orbitObj.diameter+"k"+"\r ";
        
        for(var ss = 0; ss < orbit.orbitObj.satellites.length; ss++){
            display = display+"  "+orbit.orbitOrder+padDisplay(7-orbit.orbitOrder.length, orbit.orbitObj.satellites[ss].order,"Satelliet Order");
            display = display + padDisplay(25, orbit.orbitObj.satellites[ss].satName, "Satellite Name");
            display = display + formatUPP(orbit.orbitObj.satellites[ss])+"\r";
        }

        return display;
    } catch (error) {
        window.alert("jsTravellerPlanetCreate.formatUGGD "+error);
    }
}


const gasGiant = {
    size : "GG",
    diameter : 20000,
    planetName : "default",
    notes : "",
    satellites : [],
  }
  
  function formatUGGP(gasGiant){
    /*formats a gas giant
  */
  try {
    var returnValue = gasGiant.size+"    Diameter "+gasGiant.diameter+"k\r";
    return returnValue;
  } catch (error) {
    window.alert("jsTravellerPlanetCreate.formatUGGP "+error);
  }
  }
  
