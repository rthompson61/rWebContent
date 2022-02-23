
function createPlanetoidBelt(orbit, habZone, test){
  /*Adds Planet Object to orbit object 
  orbit - orbit object
  test - boolean
  */
  try {
    var belt = Object.assign({}, planet);

    var zone = "inner";
    if(orbit == habZone){
        zone = "habitable";
    }else if(orbit > habZone){
        zone = "outer";
    }

    belt.size = 0;
    belt.atmosphere = 0;
    belt.hydro = 0;  
    belt.population = generateSatellitePopulation(0, zone, 0, false);
    belt.planetName = BuildName("belt", false);
    orbit.orbitObj = belt;
    if(test){
      window.alert("jsTravellerPlanetCreate.createPlanetoidBelt "+JSON.stringify(orbit));  
    }
    return orbit;
  } catch (error) {
    window.alert("jsTravellerPlanetCreate.createPlanetoidBelt "+error);
  }
}


  
function generateGasGiantOrbit(nAvailableOrbits, habZone, pOrbits,test){
  /*
  */
  try {
    var ggOrbit = 0;
  if(nAvailableOrbits == 0){
  //determine orbit to create
    if(pOrbits[pOrbits.length-1].occupant != "Companion"){
      ggOrbit = pOrbits[pOrbits.length-1].orbitNumber+1;
      if(ggOrbit <= habZone){
        ggOrbit = habZone+1;
      }
    }else{
      var hco = 0 ; //Highest consecutive orbit
      var hOccupant = "";
      var nxtO = -1;
      var nxtOccupant = "";

      for(var po = habZone; po < pOrbits.length; po++){
        oCount++;
        if(pOrbits[po].orbitNumber == hco+1 ){
          hco = pOrbits[po].orbitNumber;
          hOccupant = pOrbits[po].occupant;
        }else if(pOrbits[po].orbitNumber > hco+1 && pOrbits[po].orbitNumber < hco+2){
          hco = pOrbits[po].orbitNumber;
          hOccupant = pOrbits[po].occupant;
        }else if(pOrbits[po].orbitNumber >= hco+2){
          nxtO = pOrbits[po].orbitNumber;
          nxtOccupant = pOrbits[po].occupant;
        }
      }
      if(nxtOccupant != "Companion"){
        ggOrbit = hco+1;
        if(hco+1 <= habZone){
          ggOrbit = habZone+1;
        }
        if(hOccupant == "Companion"){
          ggOrbit = hco+2;
          if(hco+2 <= habZone){
            ggOrbit = habZone+1;
          } 
        }
      }else{
        if(hco+1 < nxtO/2){
          ggOrbit = hco+1;
          if(hco+1 <= habZone){
            ggOrbit = habZone+1;
          }
        }else{
          ggOrbit = nxtO +2;
          if(hco+1 <= habZone){
            ggOrbit = habZone+1;
          }
        }
      }
    }
  }else{
  //select random orbit
    var randOrbit = Math.floor(Math.random()*nAvailableOrbits);
    var orbitCount = 0;
    for(var po = habZone-2; po < pOrbits.length; po++){
      if(po >= 0){
        if(pOrbits[po].occupant == "Available"){
          orbitCount++;
          if(orbitCount == randOrbit){
            ggOrbit = pOrbits[po].orbitNumber;
          }
        }
      }
    }
  }
    
  if(test){
    window.alert("jsTravellerPlanetCreate.generateGasGiantOrbit "+ggOrbit);
  }

  return ggOrbit;
  } catch (error) {
  window.alert("jsTravellerPlanetCreate.generateGasGiantOrbit "+error);  
  }
}

function gasGiantSize(test){
    /*Returns size in kilometers
    test - boolean
    */
   try {
     var size = 20;
     var randomRoll = Math.floor(Math.random()*6);
     if(randomRoll < 3){
       randomRoll = Math.floor(Math.random()*3);
       size = size+(randomRoll*10)+Math.floor(Math.random()*10);
     }else{
      randomRoll = Math.floor(Math.random()*6)+Math.floor(Math.random()*6);
      size = 60+(randomRoll*10)+Math.floor(Math.random()*10);
      randomRoll = Math.floor(Math.random()*20);
      if(randomRoll < 4){
        size = size*2;
      }
     }
     size = size*1000;
     
    if(test){
      window.alert("jsTravllerPlanetCreate.gasGiantSize "+size);
    }
    return size;
   } catch (error) {
     window.alert("jsTravllerPlanetCreate.gasGiantSize "+error);
   }
  }

  function createGasGiant(habZone, orbit, test){
    /*
    returns a gas giant object
    habZone - orbit of teh habiytable zone
    orbit - orbit of the gas giant
    ggObj - gas giant object
      size : "GG",
      diameter : 20000,
      planetName : "default",
      notes : "",
      satellites : [],
    test - boolean 
    */
   try {
    var ggObj = Object.assign({}, gasGiant);

    var zone = "inner";
    if(orbit == habZone){
        zone = "habitable";
    }else if(orbit > habZone){
        zone = "outer";
    }

    ggObj.diameter = gasGiantSize(false);  
    if(ggObj.diameter < 60000){
      ggObj.size = "SGG";
    }else{
      ggObj.size = "LGG";
    }
    ggObj.planetName = BuildName("giant", false);
    ggObj.satellites = createOrderSatellites(ggObj.size, zone, ggObj.planetName,false);
    if(test){
      window.alert("jsTravellerPlanetCreate.createGasGiant "+JSON.stringify(ggObj)); 
    }
    return ggObj;
   } catch (error) {
     window.alert("jsTravellerPlanetCreate.createGasGiant "+error);
   }
  }

function createPlanet(orbit, stellarType, habZone, test){
    /*function creates a single planet
     orbit - number.
     stellarType the type of star the planet orbits
    habZone - orbit number of habitable zone
    test - boolean
    */ 
    try {
      var plnt = clone(planet);
      var zone = "habitable";
      var isPlusTwo = false;
      if(orbit < habZone){
          zone = "inner";
      }else if(orbit > habZone){
          zone = "outer";
          if(orbit > (habZone +1)){
              isPlusTwo = true;
          }
      }
      plnt.size = generatePlanetSize(orbit, stellarType, false);
      plnt.atmosphere = generatePlanetAtmosphere(zone, plnt.size, false);
      plnt.hydro = generateSatelliteHydrography(plnt.size, zone, plnt.atmosphere, false);  
      plnt.population = generateSatellitePopulation(plnt.size, zone, plnt.atmosphere, false);
      plnt.planetName = BuildName("planet", false);
      plnt.orbit = orbit;
      plnt.satellites = createOrderSatellites(plnt.size, zone, plnt.planetName, false);
      if(test){
        var testString = "";
          if(plnt.satellites.length > 0){
            for(var ps = 0; ps < plnt.satellites.length; ps++){
                testString = testString+"\n     "+formatUPP(plnt.satellites[ps])+" "+plnt.satellites[ps].satName;
            }
          }
        window.alert("jsTravellerPlanetCreate.planetCreate: "+plnt.UPP()+" "+plnt.planetName+" "+plnt.orbit+testString);    
      }
      //when building satellite - update how Rings are named
      return plnt;
    } catch (error) {
        window.alert("jsTravellerPlanetCreate.planetCreate: " + error);
    }
}


function generatePlanetAtmosphere(zone, size, isPlusTwo, test){
    //function returns atmosphre for satellite (0-F)
    //zone - system zone inner, habitable, outer
    //size planet size (0-A)
    //isPlusTwo - boolean: true if at least two orbits beyond the habitable zone
    //test boolean
    try {
        var atmosPick = (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1);
        var atmos = 0;
        if(hex2Dec(size) < 1){
            atmos = 0;
        }else{
            atmos = atmosPick + parseInt(hex2Dec(size)) - 7;
            if(zone == "inner"){
                atmos = atmos-4;
            }else if(zone == "outer"){
                if(isPlusTwo && atmosPick == 12){
                    atmos = 10;
                }else{
                    atmos = atmos - 2;
                }
            }
            if(atmos < 0){
                atmos = 0;
            }
        }
        if(test){
            window.alert("Test jsTravellerPlanetCreate.generatePlanetAtmosphere: "+zone+" | "+hex2Dec(size)+" | "+atmosPick+" = "+dec2Hex(atmos));
        }
        return dec2Hex(atmos);
    } catch (error) {
        window.alert("jsTravellerPlanetCreate.generatePlanetAtmosphere: "+error);
    }
}

function generatePlanetSize(orbit, stellarType, test){
    /*function generates the size (S-A) for a single planet
     orbit - number.
     stellarType the type of star the planet orbits
    zone - system zone: inner , habitable, outer
    test - boolean
    */ 
    try {
        var plntSize = (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1)-2;
         if(orbit == 0){
            plntSize = plntSize - 5;
         }else if(orbit < 1.5){
            plntSize = plntSize - 4;
         }else if(orbit < 2.5){
            plntSize = plntSize - 3;
         }
         if(stellarType == "M"){
            plntSize = plntSize -5;
         }
         if(test){
             window.alert("jsTravellerPlanetCreate.generatePlanetSize: " + orbit+ " | " +stellarType+ " | " + plntSize);
         }
         if(plntSize > 9){
            plntSize = "A";
         }else if(plntSize < 1){
            plntSize = "S";
         }
          
        return plntSize;
     } catch (error) {
         window.alert("jsTravellerPlanetCreate.generatePlanetSize: "+error);
     }
 }


const planet = {
    orbit : 0,
    parent : "",
    parentDescription : "",
    order : "I",
    size : "0",
    atmosphere : "0",
    hydro : "0",
    population : "0",
    government : "0",
    law : "0",
    techLevel : "0",
    port : "Z",
    tradeClassification : "",
    planetName : "default",
    notes : "",
    satellites : [],
    description : function(){
        return this.parent+" "+this.order;
    },
    systemDescription : function(){
        return this.parentDescription+" "+this.order;
    },
    UPP : function(){
        return this.port+this.size+this.atmosphere+this.hydro+this.population+this.government+this.law+"-"+this.techLevel;
    }
}

function formatUPPD(habZone, orbit){
    try {
        //window.alert("jsTravellerPlanetCreate.formatUGGD: "+JSON.stringify(orbit));
        var display = " "+padDisplay(7, orbit.orbitOrder, "Orbit Order");
        if(orbit.orbitNumber > habZone -.5 && orbit.orbitNumber < habZone+.5){
            display = display.substring(0, display.length-1)+"*";
        }
        display = display+padDisplay(8, orbit.orbitNumber, "Orbit Number");
        display = display + padDisplay(25, orbit.orbitObj.planetName, "Planet Name");
        display = display + formatUPP(orbit.orbitObj)+"\r ";
        
        for(var ss = 0; ss < orbit.orbitObj.satellites.length; ss++){
            display = display+"  "+orbit.orbitOrder+padDisplay(7-orbit.orbitOrder.length, orbit.orbitObj.satellites[ss].order,"Satelliet Order");
            display = display + padDisplay(25, orbit.orbitObj.satellites[ss].satName, "Satellite Name");
            display = display + formatUPP(orbit.orbitObj.satellites[ss])+"\r";
        }

        return display;
    } catch (error) {
        window.alert("jsTravellerPlanetCreate.formatUPPD "+error);
    }
}

function padDisplay(length, stringValue, objDesc){
  try {
      display = stringValue;
      for(var pad = 0; pad < (length-stringValue.length); pad++){
          display = display+" ";
      }
      return display;
  } catch (error) {
      window.alert("jsTravellerPlanetCreate.padDisplay "+error+"  Input: Object: "+objDesc+"  length:"+length+" string: "+stringValue);
  }
}