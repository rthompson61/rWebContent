function createOrderSatellites(planetSize, zone, planetName, test){
    /*function returns an array of satellite object ordered by orbit
    planetSize = size of parent in HedDex or SGG, LGG for gas giants
    zone - system zone: inner , habitable, outer
    test - boolean
    */
    try {
        var satAry = [];
        var nSats = 0;
        var orderAry = [];
        var orderSatAry = [];
        var errLoc = 0;
        if(planetSize == "LGG"){
            nSats =  (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1);;
        }else if(planetSize == "SGG"){
            nSats =  (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1)-4;
        }else if(hex2Dec(planetSize)>0){
            nSats = (Math.floor(Math.random() * 6)-3);
        }       
        if(nSats < 0){
            nSats = 0;
        }
        errLoc = 1;
        for(var ns = 0; ns < nSats; ns++){
            satAry.push(createSatellite(planetSize, zone, planetName, false));
        }
        //order by orbit
        if(nSats >1){
            var lastOrbit = -1;
            for(ns = 0; ns < nSats; ns++){
                //deduplicate
                for (var ds = 0; ds < nSats; ds++){
                    errLoc = 2;
                    if( satAry[ns].orbit == satAry[ds].orbit && ns != ds){
                        if(satAry[ns].orbit < 15){
                            satAry[ns].orbit = satAry[ns].orbit+1;
                            errLoc = 3;
                        }else if(satAry[ns].orbit < 75){
                            satAry[ns].orbit = satAry[ns].orbit+5;
                        }else{
                            satAry[ns].orbit=satAry[ns].orbit+25;
                        }
                        if(test){
                            window.alert("jsTravellerSatelliteCreate.createOrderSatellites: Duplicates "+formatUPP(satAry[ns])+" | "+formatUPP(satAry[ds]));
                        }
                    }
                }
                errLoc = 4;
                orderAry.push(satAry[ns].orbit);
                lastOrbit = satAry[ns].orbit;
            }
            orderAry.sort(function(a, b){return a - b});
//            for(var os = 0; os < orderAry.length; os++ ){
 
            for(var os = 0; os < nSats; os++ ){
                       for(ns = 0; ns < nSats; ns++){
                           errLoc = 5;
                    if(satAry[ns].orbit == orderAry[os]){
                        orderSatAry[os] = satAry[ns];
                    }
                }
            }
        }
        var ringName = "";
        for(var osa = 0; osa < orderSatAry.length; osa++){
            if(orderSatAry[osa].size == "R"){
                if(ringName == ""){
                    ringName = orderSatAry[osa].satName;
                }else{
                    orderSatAry[osa].satName = ringName;
                }
            }
        }
        
        errLoc =6;
        if(test && nSats > 0){
            var testString = "";
            for( ns = 0; ns < nSats; ns++){
            //    testString = testString+satAry[ns].orbit+" "+ satAry[ns].UPP()+" "+satAry[ns].satName+"\n\r";
            }   
           // testString = testString+"______________"+"\n\r";
            for(os = 0; os < nSats; os++){
                errLoc =7;
                if(orderSatAry[os] !== undefined){
                testString = testString+orderSatAry[os].orbit
                testString = testString+" "+formatUPP(orderSatAry[os])+" "+orderSatAry[os].satName+"\n\r";
                }else{
                    testString = testString + "orderSatAry["+os+"] is undefined.  Number of satellites = "+nSats;
                }
            }
            window.alert("Test - jsTravellerPlanetCreate.createOrderSatellites: "+satAry.length +"<>"+orderSatAry.length+"\n\r"+testString);
        }
        
        return orderSatAry;
    } catch (error) {
        window.alert("jsTravellerPlanetCreate.createOrderSatellites: "+error+" Error Location: "+errLoc);
    }
}
  
function createSatellite(planetSize, zone, planetName, test){
    /*function creates a single satellite
     planetSize = size of parent in HedDex or SGG, LGG for gas giants
    zone - system zone: inner , habitable, outer
    test - boolean
    */ 
    try {
//     var sat = clone(satellite);
        var sat = Object.assign({}, satellite);
      sat.size = generateSatelliteSize(planetSize, false);
      sat.atmosphere = generateSatelliteAtmosphere(zone, sat.size, false);
      sat.hydro = generateSatelliteHydrography(sat.size, zone, sat.atmosphere, false);  
      sat.population = generateSatellitePopulation(sat.size, zone, sat.atmosphere, false);
      var bodyType = "planet";
      if(sat.size == "R"){
        sat.satName = planetName+"'s "+NameAsteroid(false);
      }else{
        sat.satName = BuildName(bodyType, false);
      }
      var isGasGiant = false;
      if(planetSize == "SGG" || planetSize == "LGG"){
          isGasGiant = true;
      }
      sat.orbit = generateSatelliteOrbit(sat.size, isGasGiant, false);
      if(test){
        window.alert("jsTravellerSatelliteCreate.satelliteCreate: "+formatUPP(sat)+" "+sat.satName+" "+sat.orbit);    
 //       window.alert("jsTravellerSatelliteCreate.satelliteCreate: "+sat.UPP()+" "+sat.satName+" "+sat.orbit);    
      }
      return sat;
    } catch (error) {
        window.alert("jsTravellerSatelliteCreate.satelliteCreate: " + error);
    }
}

function generateSatellitePopulation(size, zone, atmosphere, test){
    /*function returns hexidecimal (0-A) population of the satellite
    size - hexidecimal size of satellite
    zone system zone - inner outer, habitable
    atmosphere - hexidecimal atmosphere of the satellite (0-F)
    */
   try {
       var pop = (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1)-2;
       if(hex2Dec(size)<-1){
           pop = 0;
       }else{
           if(zone == "inner"){
               pop = pop -6;
           }else if(zone == "outer"){
               pop = pop - 5;
           }
           if (parseInt(hex2Dec(atmosphere)) != 5 && parseInt(hex2Dec(atmosphere)) != 6 && parseInt(hex2Dec(atmosphere)) != 8){
               pop = pop -2;
           }
           if(hex2Dec(size)<5){
               pop = pop -2;
           }
           if (pop < 0){
               pop = 0;
           }
           if(pop > 10){
               pop = 10;
           }
       }
       if(test){
        window.alert("Test - jsTravellerSatelliteCreate.generateSatellitePopulation: " + zone  +" | "+ size +" | "+atmosphere  +" = "+pop);
       }
       return dec2Hex(pop);
   } catch (error) {
       window.alert("jsTravellerSatelliteCreate.generateSatellitePopulation: " + error);
   }
}

function generateSatelliteHydrography(size, zone, atmosphere, test){
    /*function returns hexidecimal (0-A) % liquid surface of the satellite
    size - hexidecimal size of satellite
    zone system zone - inner outer, habitable
    atmosphere - hexidecimal atmosphere of the satellite (0-F)
    */
   try {
       var hydroPick = (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1);
       var hydro = 0;
       if(hex2Dec(size)<2){
           hydro = 0;
       }else{
           hydro = hydroPick + parseInt(hex2Dec(size)) - 7;
           if(zone == "inner"){
               hydro = hydro -4;
           }else if(zone == "outer"){
               hydro = hydro - 2;
           }
           if (parseInt(hex2Dec(atmosphere)) < 2 || parseInt(hex2Dec(atmosphere)) >9){
               hydro = hydro -4;
           }
           if (hydro < 0){
               hydro = 0;
           }
           if(hydro > 10){
               hydro = 10;
           }
       }
       if(test){
        window.alert("Test - jsTravellerSatelliteCreate.generateSatelliteHydrography: " + zone  +" | "+ size +" | "+atmosphere +" | "+hydroPick +" = "+hydro);
       }
       return dec2Hex(hydro);
   } catch (error) {
       window.alert("jsTravellerSatelliteCreate.generateSatelliteHydrography: " + error);
   }
}


function generateSatelliteAtmosphere(zone, size, test){
    //function returns atmosphre for satellite (0-F)
    //zone - system zone inner, habitable, outer
    //size satellite size (0-A)
    //test boolean
    try {
        var atmosPick = (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1);
        var atmos = 0;
        if(hex2Dec(size) < 2){
            atmos = 0;
        }else{
            atmos = atmosPick + parseInt(hex2Dec(size)) - 7;
            if(zone == "inner"){
                atmos = atmos-4;
            }else if(zone == "outer"){
                atmos = atmos - 2;
            }
            if(atmos < 0){
                atmos = 0;
            }
        }
        if(test){
            window.alert("Test jsTravellerSatelliteCreate.generateSatelliteAtmosphere: "+zone+" | "+hex2Dec(size)+" | "+atmosPick+" = "+dec2Hex(atmos));
        }
        return dec2Hex(atmos);
    } catch (error) {
        window.alert("jsTravellerSatelliteCreate.generateSatelliteAtmosphere: "+error);
    }
}

function generateSatelliteOrbit(satelliteSize, isGasGiant, test){
    //returns satellite Orbit in planet radii
    //satelliteSize - size code of teh satellite
    //isGasGiant - boolean, true if planet is a gas giant
    // test - boolean
    try {
        var orbitType = (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1);
        var orbitPick = 0;
        var orbit = 0;
        if(satelliteSize == "R"){
            //ring
            orbitPick = (Math.floor(Math.random() * 6)+1);
            if(orbitPick < 4){
                orbit = 1;
            }else if (orbitPick < 6){
                orbit = 2;
            }else {
                orbit = 3;
            }
        }else if(isGasGiant && orbitType == 12){
            //extreme
            orbitPick = (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1);
            switch(orbitPick){
                case 2 : orbit = 75; break;
                case 3 : orbit = 100; break;
                case 4 : orbit = 125; break;
                case 5 : orbit = 150; break;
                case 6 : orbit = 175; break;
                case 8 : orbit = 225; break;
                case 9 : orbit = 250; break;
                case 10 : orbit = 275; break;
                case 11 : orbit = 300; break;
                case 12 : orbit = 325; break;
                default: orbit = 200;
            }
        }else if (orbitType > 7){
            //far
            //extreme
            orbitPick = (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1);
            switch(orbitPick){
                case 2 : orbit = 15; break;
                case 3 : orbit = 20; break;
                case 4 : orbit = 25; break;
                case 5 : orbit = 30; break;
                case 6 : orbit = 35; break;
                case 8 : orbit = 45; break;
                case 9 : orbit = 50; break;
                case 10 : orbit = 55; break;
                case 11 : orbit = 60; break;
                case 12 : orbit = 65; break;
                default: orbit = 40;
            }
        }else{
            //close
            //extreme
            orbitPick = (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1);
            switch(orbitPick){
                case 2 : orbit = 3; break;
                case 3 : orbit = 4; break;
                case 4 : orbit = 5; break;
                case 5 : orbit = 6; break;
                case 6 : orbit = 7; break;
                case 8 : orbit = 9; break;
                case 9 : orbit = 10; break;
                case 10 : orbit = 11; break;
                case 11 : orbit = 12; break;
                case 12 : orbit = 13; break;
                default: orbit = 8;
            }
        }
        if(test){
            window.alert("Test jsTravellerSatelliteCreate.generateSatelliteOrbit: "+satelliteSize+" | "+isGasGiant+" "+orbitType+" | "+orbitPick+" | "+orbit);
        }
        return orbit;
    } catch (error) {
        window.alert("jsTravellerSatelliteCreate.generateSatelliteOrbit: "+error);
    }
}

function generateSatelliteSize( planetSize,  test){
    /*
    function creates and returns the size of a satellite object
    satSize = size of teh satellite object
    planetSize = size of parent in HedDex or SGG, LGG for gas giants
    test -= testflag
    */
    try {
        var satSize = "0";
         if(isNaN(parseInt(planetSize))){
             if(parseInt(planetSize) == "A"){
                satSize = 10  - (Math.floor(Math.random() * 6)+1);
             }else if (parseInt(planetSize) == "SGG"){
                satSize =  (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1)-6;
             }else{
                satSize =  (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1)-4;
             }
         }else{
             satSize = parseInt(planetSize) - (Math.floor(Math.random() * 6)+1);
         }
         if(test){
             window.alert("jsTravellerSatellietCreate.generateSatelliteSize: " + planetSize+ " | " + satSize);
         }
         if(satSize > 10){
             satSize = "A";
         }else if(satSize < 0){
             satSize = "S";
         }else if(satSize == 0){
             satSize = "R";
         }
          
        return satSize;
     } catch (error) {
         window.alert("jsTravellerSatelliteCreate.generateSatelliteSize: "+error);
     }
 }

function formatUPP(psObj){
    /*
    Returns the Universal Planetary Profile
    (Sta/Space Port Type)(Size)(Atmosphere)(Hydrographic %)(Population)(Government)(Law Level)-(Tech Level)
    psObj - a Planet or Satellite Object
    */
   try{
    return psObj.port+psObj.size+psObj.atmosphere+psObj.hydro+psObj.population+psObj.government+psObj.law+"-"+psObj.techLevel;
   }catch(error){
    window.alert("jsTravellerSatelliteCreate.formatUPP: "+error);
   }
}

 const satellite = {
     orbit : 0,
     parent : "",
     parentDescription : "",
     order : "A",
     size : "0",
     atmosphere : "0",
     hydro : "0",
     population : "0",
     government : "0",
     law : "0",
     techLevel : "0",
     port : "Z",
     tradeClassification : "",
     satName : "default",
     notes : "",
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