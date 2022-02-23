
function cleanOrbits(pOrbits, test){
  /*
  Returns list of orbits
  added to do a final sanity check on the orbit data as I can't find the source of orbitNumber NaN
  pOrbits - list of orbits
  test -boolean
  */
 try {
   var stringTest = "";
   var lastOrbit = 0;
   var orbitBodies = 1;
  for(var po = 0; po < pOrbits.length; po++){
    if(po > 0 && pOrbits[po].orbitNumber == 0){
      pOrbits[po].orbitNumber = lastOrbit+1;
    }
    if(pOrbits[po].orbitNumber == NaN){
      pOrbits[po].orbitNumber = lastOrbit+1;
    }
    lastOrbit== pOrbits[po].orbitNumber;
    if(pOrbits[po].occupant == "Gas Giant" || pOrbits[po].occupant == "Planetoid Belt" || pOrbits[po].occupant == "Available"){
      pOrbits[po].orbitOrder = integer_to_roman(orbitBodies);
      orbitBodies++;
    }
  }
   if(test){
    window.alert("jsTravellerStarCreate.cleanOrbits "+stringTest);  
   }
   return pOrbits;
 } catch (error) {
   window.alert("jsTravellerStarCreate.cleanOrbits "+error);
 }
}


function setPlanetoidBelts(pOrbits, habZone, test){
  /*
  Returns list of orbits with planetoid belts
  pOrbits - list of orbits
  habZone - orbit of habitable zone
  test - boolean
  */
  try {
    var testString = "";
    //create list of available orbits below gas giants
    var nGasGiants = 0;
    var orbitsBelowAry = [];
    for(var po = 0; po < pOrbits.length; po++){
      if(pOrbits[po].occupant == "Gas Giant"){
        nGasGiants++;
        if(po > 0 && (pOrbits[po-1].occupant == "Available" || pOrbits[po-1].occupant == "Captured")){
          orbitsBelowAry.push(po-1);
        }
      }
    }
    testString = "#GG= "+nGasGiants+"    Orbits Below Gas Giants: "+orbitsBelowAry.toString();
    //determine number of planetoid belts
    var nBelts = 0
      var hasBeltRoll = Math.floor(Math.random() * 6)+1+Math.floor(Math.random() * 6)+1 - nGasGiants;
      if( hasBeltRoll < 7){
        var nBeltRoll = Math.floor(Math.random() * 6)+1+Math.floor(Math.random() * 6)+1 - nGasGiants;
        if(nBeltRoll < 1){
          nBelts = 3;
        }else if(nBeltRoll < 6){
          nBelts = 2;
        }else{
          nBelts = 1;
        }
      }

      var nAvailableOrbits = getNumberAvailableOrbits(0, true, pOrbits, false);
      if(nBelts > nAvailableOrbits){
        nBelts = nAvailableOrbits;
      }
      testString = testString+"Number of Belts: "+nBelts+"\r";
    //place planetoid belts below gas giants working inwards
    //any extras determine random orbits
    var lastOccupant = "";
    for(var op = pOrbits.length-1; op > -1; op--){
      if(lastOccupant == "Gas Giant" && pOrbits[op].occupant == "Available" && nBelts > 0){
        //place belt
        pOrbits[op].occupant = "Planetoid Belt";
        nBelts--;
      }
      lastOccupant = pOrbits[op].occupant;
    }
    if(nBelts >0){
      //random orbit
      var availOrbitAry = [];
      for(var po = 0; po < pOrbits.length; po++){
        if(pOrbits[po].occupant == "Available"){
          availOrbitAry.push(po);
        }
      }
      if(nBelts > availOrbitAry.length){
        nBelts = availOrbitAry.length;
      }
      var randOrbit = Math.floor(Math.random()*availOrbitAry.length);
      var remainingOrbits = availOrbitAry.length;
      while(nBelts > 0){
        if(pOrbits[randOrbit].occupant == "Available"){
          pOrbits[randOrbit].occupant = "Planetoid Belt";
          remainingOrbits--;
          nBelts--;
        }
        randOrbit = Math.floor(Math.random()*remainingOrbits);
      }
    }
    for(var po = 0; po < pOrbits.length; po++){
      if(pOrbits[po].occupant == "Planetoid Belt"){
        pOrbits[po] = createPlanetoidBelt(pOrbits[po], habZone, test);
      }
    }


    if(test){
      for(var po = 0; po < pOrbits.length; po++){
        testString = testString+pOrbits[po].orbitId+" "+pOrbits[po].orbitNumber+" "+pOrbits[po].occupant+"\r";
      }
      window.alert("jsTravellerStarCreate.setPlanetoidBelts: "+testString);
    }
    return pOrbits;
  } catch (error) {
    window.alert("jsTravellerStarCreate.setPlanetoidBelts "+error);
 }
}

function setGasGiants(hasGasGiants, habZone, pOrbits, isCompanion, test){
  /*
  returns list of orbits with gas giants placed
  hasGasGiants 0 - unknown, 1  true 2 false
  habZone - orbit of the habitable zone
  test boolean
  */
 try {
  //convert pOrbits from Object to Array
 
  var testString = "Has Gas Giants: "+hasGasGiants+" HabZone: "+habZone+"\n";
  nGasGiants = 0;
  if(hasGasGiants <2){
    //set gas giants
      var nGasGiants = getNumberGasGiants(hasGasGiants, false);
      var nAvailableOrbits = getNumberAvailableOrbits(habZone, true, pOrbits, false);
      if(nGasGiants > nAvailableOrbits && nAvailableOrbits > 0){
        nGasGiants = nAvailableOrbits;
      }else if(nAvailableOrbits < 1 && isCompanion == false){
        nGasGiants = 1;
      }else if(isCompanion){
        nGasGiants = 0;
      }
      testString = testString +" #Gas Giants "+nGasGiants+"\r";
      var ggOrbit = 0;
      var gObj = {};
      for(var ngg = 1; ngg <= nGasGiants; ngg++){
        ggOrbit  = generateGasGiantOrbit(nAvailableOrbits, habZone, pOrbits, false); 
        gObj = createGasGiant(habZone, ggOrbit, false);
        pOrbits = editOrbits("Gas Giant", ggOrbit, gObj, pOrbits,false);
        nAvailableOrbits--;
      }
      
    }
  if(test){
    for(var po = 0; po < pOrbits.length; po++){
      testString = testString+pOrbits[po].orbitId+" "+pOrbits[po].orbitNumber+" "+pOrbits[po].occupant+"\r";
      if(pOrbits[po].occupant == "Gas Giant"){
        testString = testString+JSON.stringify(pOrbits[po].orbitObj)+"\r";
      }
      if(pOrbits[po].orbitNumber != Math.floor(pOrbits[po].orbitNumber)){
        testString = testString+"        Aphelion: "+pOrbits[po].aphelion+"   Perihelion: "+pOrbits[po].perihelion+"\r";
      }
    }
  window.alert("jsTravellerStarCreate.setGasGiants: "+testString);
  }
   return pOrbits;
 } catch (error) {
   window.alert("jsTravellerStarCreate.setGasGiants: "+error);
 }
}


function setCapturedPlanets(starType, pOrbits,  test){
  //returns list of robits updated with captured planets
  //star type - spectral type
  //pOrbits - list of orbits
  //test - boolean
  try {
    var hasCapturedRoll = Math.floor(Math.random() * 6)+1;
    if(starType == "A" || starType == "B"){
      hasCapturedRoll++;
    }
    var nAvailableOrbits = getNumberAvailableOrbits(0, false, pOrbits, false);
    var nCaptured = 0;
    if(hasCapturedRoll > 4){
      var nOrbitsRoll =  Math.floor(Math.random() * 6)+1;
      if(nOrbitsRoll < 3){
        nCaptured = 1;
      }else if(nOrbitsRoll < 5){
        nCaptured = 2;
      }else{
        nCaptured = 3;
      }
    }
    if(nCaptured > nAvailableOrbits){
      nCaptured = nAvailableOrbits;
    }
    //select random orbit to set as Captured
    var rOrbit = Math.floor(Math.random() *  getNumberAvailableOrbits(0, false, pOrbits, false))+1;
    for(var eo = 0; eo < nCaptured; eo++){
      var cAvail = 0;
      for(var po = 0; po < pOrbits.length; po++){
        if(pOrbits[po].occupant == "Available"){
          cAvail++; 
          if(cAvail == rOrbit){
//            pOrbits[po].occupant = "Captured";
            var deviation = Math.floor(Math.random()*30)+1;
            if(deviation < 4){
              pOrbits[po].orbitNumber = pOrbits[po].orbitNumber+.1;
            }else if(deviation < 7){
              pOrbits[po].orbitNumber = pOrbits[po].orbitNumber-.1;
            }else if(deviation < 12){
              pOrbits[po].orbitNumber = pOrbits[po].orbitNumber+.2;
            }else if(deviation < 17){
              pOrbits[po].orbitNumber = pOrbits[po].orbitNumber-.2;
            }else if(deviation < 21){
              pOrbits[po].orbitNumber = pOrbits[po].orbitNumber+.3;
            }else if(deviation < 25){
              pOrbits[po].orbitNumber = pOrbits[po].orbitNumber-.3;
            }else if(deviation < 27){
              pOrbits[po].orbitNumber = pOrbits[po].orbitNumber+.4;
            }else if(deviation < 29){
              pOrbits[po].orbitNumber = pOrbits[po].orbitNumber-.4;
            }else if(deviation < 30){
              pOrbits[po].orbitNumber = pOrbits[po].orbitNumber+.5;
            }else{
              pOrbits[po].orbitNumber = pOrbits[po].orbitNumber-.5;
            }
            if(pOrbits[po].orbitNumber == NaN){
              window.alert("jsTravellerStarCreate.getCapturedPlanets - orbit number NaN: Deviation roll = "+deviation);
            }
            deviation = Math.floor(Math.random()*6)+1;
            if(deviation < 4){
              pOrbits[po].aphelion = pOrbits[po].orbitNumber+.1;
            }else if(deviation < 4){
              pOrbits[po].aphelion = pOrbits[po].orbitNumber+.2;
            }else{
              pOrbits[po].aphelion = pOrbits[po].orbitNumber+.3;
            }
            deviation = Math.floor(Math.random()*6)+1;
            if(deviation < 4){
              pOrbits[po].perihelion = pOrbits[po].orbitNumber-.1;
            }else if(deviation < 4){
              pOrbits[po].perihelion = pOrbits[po].orbitNumber-.2;
            }else{
              pOrbits[po].perihelion = pOrbits[po].orbitNumber-.3;
            }
            pOrbits[po].orbitNumber = Math.abs(pOrbits[po].orbitNumber);
            pOrbits[po].aphelion = Math.abs(pOrbits[po].aphelion);
            pOrbits[po].perihelion = Math.abs(pOrbits[po].perihelion);
            pOrbits[po].orbitNumber = pOrbits[po].orbitNumber.toFixed(1);
            pOrbits[po].aphelion = pOrbits[po].aphelion.toFixed(1);
            pOrbits[po].perihelion = pOrbits[po].perihelion.toFixed(1);
          }
        }
      }
      rOrbit = Math.floor(Math.random() * getNumberAvailableOrbits(0, false, pOrbits, false))+1;
    }
    if(test){
      var testString = starType+" "+pOrbits.length +" "+nCaptured+"\n";
      for(var po = 0; po < pOrbits.length; po++){
        testString = testString+pOrbits[po].orbitId+" "+pOrbits[po].orbitNumber+" "+pOrbits[po].occupant+"\r";
        if(pOrbits[po].orbitNumber !== Math.floor(pOrbits[po].orbitNumber)){
          testString = testString+"        Aphelion: "+pOrbits[po].aphelion+"   Perihelion: "+pOrbits[po].perihelion+"\r";
        }
      }
    window.alert("jsTravellerStarCreate.setEmptyOrbits: "+testString);
    }

    return pOrbits;
  } catch (error) {
    window.alert("jsTravellerStarCreate.setEmptyOrbits: "+error);
    
  }
}


function setEmptyOrbits(starType, pOrbits,  test){
  //returns list of robits updated with empty orbits
  //star type - spectral type
  //pOrbits - list of orbits
  //test - boolean
  try {
    var hasEmptyRoll = Math.floor(Math.random() * 6)+1;
    if(starType == "A" || starType == "B"){
      hasEmptyRoll++;
    }
    var nAvailableOrbits = getNumberAvailableOrbits(0, false, pOrbits, false);
    var nEmpty = 0;
    if(hasEmptyRoll > 4){
      var nOrbitsRoll =  Math.floor(Math.random() * 6)+1;
      if(nOrbitsRoll < 3){
        nEmpty = 1;
      }else if(nOrbitsRoll < 4){
        nEmpty = 2;
      }else{
        nEmpty = 3;
      }
      if(nEmpty > nAvailableOrbits-1){
        nEmpty = nAvailableOrbits-1;
      }
    }
    //select random orbit to set as Empty
    var rOrbit = Math.floor(Math.random() *  getNumberAvailableOrbits(0, false, pOrbits, false));
    for(var eo = 0; eo < nEmpty; eo++){
      var cAvail = 0;
      for(var po = 0; po < pOrbits.length; po++){
        if(pOrbits[po].occupant == "Available"){
          if(test){
            window.alert("jsTravellerStarCreate.setEmptyOrbits: Available"+ cAvail+" | "+rOrbit+" | "+po+" | "+nEmpty);
          }
          cAvail++;
          if(cAvail == rOrbit){
            pOrbits[po].occupant = "Empty";
          }
        }
      }
      rOrbit = Math.floor(Math.random() * getNumberAvailableOrbits(0, false, pOrbits, false));
    }
    if(test){
      var testString = starType+" "+pOrbits.length +" "+nEmpty+"\n";
      for(var po = 0; po < pOrbits.length; po++){
        testString = testString+pOrbits[po].orbitId+" "+pOrbits[po].orbitNumber+" "+pOrbits[po].occupant+"\r";
      }
    window.alert("jsTravellerStarCreate.setEmptyOrbits: "+testString);
    }

    return pOrbits;
  } catch (error) {
    window.alert("jsTravellerStarCreate.setEmptyOrbits: "+error);
    
  }
}

function generateCompanionOrbit(orbitRoll, test){
  /*
  Returns companion star orbit
  orbitRoll is value to look up'
  test - boolean
  */
 try {
   var cOrbit = "Far";
   if(orbitRoll < 3){
     cOrbit = "Close";
   }else if(orbitRoll < 5){
    cOrbit = 1;
  }else if(orbitRoll < 6){
    cOrbit = 2;
  }else if(orbitRoll < 7){
    cOrbit = 3;
  }else if(orbitRoll < 8){
    cOrbit = 4+Math.floor(Math.random() * 6)+1;
  }else if(orbitRoll < 9){
    cOrbit = 5+Math.floor(Math.random() * 6)+1;
  }else if(orbitRoll < 10){
    cOrbit = 6+Math.floor(Math.random() * 6)+1;
  }else if(orbitRoll < 11){
    cOrbit = 7+Math.floor(Math.random() * 6)+1;
  }else if(orbitRoll < 12){
    cOrbit = 8+Math.floor(Math.random() * 6)+1;
  }
  if(test){
    window.alert("jsTravellerStarCreate.generateCompanionOrbit: "+orbitRoll+" | "+cOrbit);
  }
  return cOrbit;
 } catch (error) {
   window.alert("jsTravellerStarCreate.generateCompanionOrbit: "+error);
 }
}


function companionOrbits(lowOrbit, pOrbits, cStar, test){
  /*
  Returns list of orbits with Companion orbit determined
  lowOrbit - lowest available orbit
  pOrbits - list of orbits
  cStar - comapion Star object
  test - boolean
  */
  try {
if(test){
  if(Array.isArray(pOrbits)){
    window.alert("jsTravellerStarCreate.companionOrbits: pOrbits is array");
  }else{
    window.alert("jsTravellerStarCreate.companionOrbits: pOrbits is not an array");}
}    
    var cOrbit = 0;
    var cOrbitRoll = Math.floor(Math.random() * 6)+1+Math.floor(Math.random() * 6)+1;
    cOrbit = generateCompanionOrbit(cOrbitRoll, false);

    if(Number.isInteger(cOrbit) && cOrbit < lowOrbit){
      cOrbit = "Close";
    }

    if(orbitIsAvailable("Companion", cOrbit, pOrbits, false) === false){
       var loopCount = 0;
      //while orbitIsAvailable === false
      while(orbitIsAvailable("Companion", cOrbit, pOrbits, false) === false && loopCount < 10){      
        //calculate new orbit & check orbitIsAvailable
        cOrbit = generateCompanionOrbit(11, false);
        loopCount++;
      }
      if(orbitIsAvailable("Companion", cOrbit, pOrbits, false) === false){
        window.alert("jsTravellerStarCreate.companionOrbits: Error looped 10 times without getting an available orbit");
      }
    } 
    pOrbits = editOrbits("Companion", cOrbit, cStar, pOrbits, false);
    if(test){
      var testString = lowOrbit+" "+cStar+"\n";
      for(var po = 0; po < pOrbits.length; po++){
        testString = testString+pOrbits[po].orbitId+" "+pOrbits[po].orbitNumber+" "+pOrbits[po].occupant+"\r";
      }
    window.alert("jsTravellerStarCreate.companonOrbits: "+testString);
    }
    return pOrbits;
    
  } catch (error) {
    window.alert("jstRavellerStarCreate.js:companionOrbits: "+error);   
  }
}

function editOrbits(nType, nOrbit, nObj, pOrbits, test){
  //returns ordered, updated list of orbits (pOrbits)
  //nType - type of object (comapnion star, gas giant, asteroid belt, planet) to be inserted
  //nOrbit - orbit of the new object.  May exist in pOrbits or may need to be added
  //nObj - object to be inserted in the orbit
  //pOrbits - list of orbits around a star
  //test - boolean
    try {
      if(nType == "Companion"){
        if(nOrbit == "Far"){
          //not by the book, but using the same idea as with satellite orbits
          var orbitPick = (Math.floor(Math.random() * 6)+1)+(Math.floor(Math.random() * 6)+1);
          switch(orbitPick){
              case 2 : nOrbit = 15; break;
              case 3 : nOrbit = 20; break;
              case 4 : nOrbit = 25; break;
              case 5 : nOrbit = 30; break;
              case 6 : nOrbit = 35; break;
              case 8 : nOrbit = 45; break;
              case 9 : nOrbit = 50; break;
              case 10 : nOrbit = 55; break;
              case 11 : nOrbit = 60; break;
              case 12 : nOrbit = 65; break;
              default: nOrbit = 40;
          }
          if(pOrbits[pOrbits.length - 1].orbitNumber !== "Close" && nOrbit > pOrbits[pOrbits.length - 1].orbitNumber/2 && nOrbit < pOrbits[pOrbits.length - 1].orbitNumber+2){
            nOrbit = pOrbits[pOrbits.length - 1].orbitNumber*2;
          }
        }
          //can't insert if > 1/2 existing companion orbit or < existing companion orbit +2
          //iterate thru and determine where an existing companion is
          var eCOrbit = -5;
          for(var po = 0; po < pOrbits.length; po++){
            if(pOrbits[po].occupant.startsWith("Companion")){
              eCOrbit = pOrbits[po].orbitNumber;
            }
          }
          if(eCOrbit !== "Close" && eCOrbit > -1){
            if(nOrbit > eCOrbit/2 && nOrbit < eCOrbit+2){
              nOrbit = pOrbits[pOrbits.length - 1].orbitNumber*2;
            }
          }
          //insert into pOrbits
          if(nOrbit == "Close"){
            pOrbits.unshift(Object.assign({}, orbitObj));
            pOrbits[0].orbitId = 0;
            pOrbits[0].orbitNumber = nOrbit;
            pOrbits[0].occupant = "Companion";
            pOrbits[0].orbitObj = nObj;
          }else if(nOrbit > pOrbits[pOrbits.length-1].orbitNumber){
            pOrbits.push(Object.assign({}, orbitObj));
            pOrbits[pOrbits.length - 1].orbitId = 0;
            pOrbits[pOrbits.length - 1].orbitNumber = nOrbit;
            pOrbits[pOrbits.length - 1].occupant = "Companion";
            pOrbits[pOrbits.length - 1].orbitObj = nObj;
          }else{
            var inserted = false;
            for(var po = 0; po < pOrbits.length; po++){
              if(nOrbit < pOrbits[po].orbitNumber && inserted == false){
                if(pOrbits[po-1].orbitNumber !== nOrbit){
                  pOrbits.splice(po, 0, (Object.assign({}, orbitObj)));
                  pOrbits[po].orbitId = 0;
                  pOrbits[po].orbitNumber = nOrbit;
                  pOrbits[po].occupant = "Companion";
                  pOrbits[po].orbitObj = nObj;
                }else{
                pOrbits[po-1].orbitId = 0;
                pOrbits[po-1].orbitNumber = nOrbit;
                pOrbits[po-1].occupant = "Companion";
                pOrbits[po-1].orbitObj = nObj;
                inserted = true; 
                }
              }
            }
            if(inserted == false){
            pOrbits.push(Object.assign({}, orbitObj));
            pOrbits[pOrbits.length - 1].orbitId = 0;
            pOrbits[pOrbits.length - 1].orbitNumber = nOrbit;
            pOrbits[pOrbits.length - 1].occupant = "Companion";
            pOrbits[pOrbits.length - 1].orbitObj = nObj;
            }
          }
          if(nOrbit == NaN){
            window.alert("jsTravellerStarCreate.editOrbits - orbit number NaN"+ nOrbit);
          }
       // }
        //resequence OrbitIds
        for(var po = 0; po < pOrbits.length; po++){
          pOrbits[po].orbitId = po;
          //set unavailable orbits based on nOrbit
          if(nOrbit === "Close"){
            pOrbits[1].occupant = "Unavailable";
          }else if(((pOrbits[po].orbitNumber > nOrbit/2) && (pOrbits[po].orbitNumber < nOrbit)) || (pOrbits[po].orbitNumber == nOrbit +1)){
            pOrbits[po].occupant = "Unavailable";
          }
        }
        
      }else if(nType == "Gas Giant"){
        
        var orbitExists = false;
        for(var po = 0; po < pOrbits.length; po++){
          if(pOrbits[po].orbitNumber == nOrbit){
            pOrbits[po].orbitId = 0;
              pOrbits[po].occupant = "Gas Giant";
              pOrbits[po].orbitObj = nObj;
              orbitExists = true;
          }
        }
        if(orbitExists == false){
          var inserted = false;
          for(var po = 0; po < pOrbits.length; po++){
            if(nOrbit < pOrbits[po].orbitNumber && inserted == false){
              if(pOrbits[po-1].orbitNumber !== nOrbit){
                pOrbits.splice(po, 0, (Object.assign({}, orbitObj)));
                pOrbits[po].orbitId = 0;
                pOrbits[po].orbitNumber = nOrbit;
                pOrbits[po].occupant = "Gas Giant";
                pOrbits[po].orbitObj = nObj;
              }else{
              pOrbits[po-1].orbitId = 0;
              pOrbits[po-1].orbitNumber = nOrbit;
              pOrbits[po-1].occupant = "Gas Giant";
              pOrbits[po-1].orbitObj = nObj;
              inserted = true; 
              }
            }
          }
        }
        for(var po = 0; po < pOrbits.length; po++){
          pOrbits[po].orbitId = po;
          if(test && pOrbits[po].occupant == "Gas Giant"){
            window.alert("jsTravellerStarCreate.editOrbit: Gas Giant: "+JSON.stringify(pOrbits[po].orbitObj))
          }
        }
        
        

      } 
      if(test){  
          var testString = nType+" "+nOrbit+" "+nObj+"\n";
          for(var po = 0; po < pOrbits.length; po++){
            testString = testString+pOrbits[po].orbitId+" "+pOrbits[po].orbitNumber+" "+pOrbits[po].occupant+"\r";
          }
        window.alert("jsTravellerStarCreate.editOrbits: "+testString);
        }
      return pOrbits;
    } catch (error) {
      window.alert("jsTravellerStarCreate.editOrbits: "+error);
    }
  }
  

function orbitIsAvailable(objType, objOrbit, pOrbits, test){
  //returns true /false if objOrbit is available in pOrbits
  //objType - Companion star, Gas Giant Asteroid Belt
  //objOrbit - the orbit being checked
  //pOrbit - list of Orbits around the star
  //test - boolean 
  try {
    var returnValue = true;
    for(var po = 0; po < pOrbits.length; po++){
      if(objOrbit == pOrbits[po].orbitNumber && pOrbits[po].occupant != "Available"){
        returnValue = false;
      }
    }   
    if(test){
      var testString = objType+" "+objOrbit+"\n";
      for(var po = 0; po < pOrbits.length; po++){
        testString = testString+pOrbits[po].orbitId+" "+pOrbits[po].orbitNumber+" "+pOrbits[po].occupant+"\r";
      }
      window.alert("jsTravellerStarCreate.orbitIsAvailable "+testString+" orbitIsAvailable returns "+returnValue);  
    }
    return returnValue;
  } catch (error) {
    window.alert("jsTravellerStarCreate.orbitIsAvailable "+error);
  }
}

function generateCompanion(typeRoll, sizeRoll, test){
    /*Return a star object
    typeRoll - random roll for primary stellar type
    sizeRoll - randomRoll for primary stellar Size
    test - boolean
    */
   try {
  
    var cStar = Object.assign({}, star);
  
    typeRoll = typeRoll + Math.floor(Math.random() * 6)+1+Math.floor(Math.random() * 6)+1
    if(typeRoll < 2){
      cStar.type = "B";
    }else if(typeRoll < 3){
      cStar.type = "A";
    }else if(typeRoll < 5){
      cStar.type = "F";
    }else if(typeRoll < 7){
      cStar.type = "G";
    }else if(typeRoll < 9){
      cStar.type = "K";
    }else{
      cStar.type = "M";
    }
  
    sizeRoll = sizeRoll+ Math.floor(Math.random() * 6)+1+Math.floor(Math.random() * 6)+1
    if(sizeRoll <1){
      cStar.size = "Ia";
    }else if(sizeRoll <2){
      cStar.size = "Ib";
    }else if(sizeRoll <3){
      cStar.size = "II";
    }else if(sizeRoll <4){
      cStar.size = "III";
    }else if(sizeRoll <5){
      cStar.size = "IV";
    }else if(sizeRoll <7){
      cStar.size = "D";
    }else if(sizeRoll <9){
      cStar.size = "V";
    }else if(sizeRoll <10){
      cStar.size = "VI";
    }else{
      cStar.size = "D";
    }
  
    cStar.spectralClass = Math.floor(Math.random() * 10);
  
    if(cStar.size == "IV" && (cStar.type == "M" || (cStar.type =="K" && cStar.spectralClass > 4))){
      cStar.size = "V";
    }
    if(cStar.size == "VI" && (cStar.type == "B" || cStar.type == "A" || (cStar.type =="F" && cStar.spectralClass <5))){
      cStar.size = "V";
    }
    var orbitRestrict = getStarOrbitConstraints(cStar.type,cStar.size, cStar.spectralClass, false);
    cStar.lowestOrbit = orbitRestrict[0];
    cStar.habZone = orbitRestrict[1];
    cStar.starName = BuildName("star", false);
    if(test){
      window.alert("Test - jsTravellerStarCreate.generateCompanion: "+formatUSP(cStar, false)+ "  Lowest Orbit: "+cStar.lowestOrbit+"  Hab Zone: "+cStar.habZone);
    }
    return cStar;
   } catch (error) {
     window.alert("jsTravellerStarCreate.generateCompanion: "+error);
   }
  }
  

function generatePrimary(typeRoll, sizeRoll, test){
    /*Return a star object
    typeRoll - random roll for stellar type
    sizeRoll - randomRoll for stellar Size
    test - boolean
    */
   try {
    var pStar = Object.assign({}, star);
    if(typeRoll < 2){
      pStar.type = "B";
    }else if(typeRoll < 3){
      pStar.type = "A";
    }else if(typeRoll < 8){
      pStar.type = "M";
    }else if(typeRoll < 9){
      pStar.type = "K";
    }else if(typeRoll < 10){
      pStar.type = "G";
    }else{
      pStar.type = "F";
    }
  
    if(sizeRoll <1){
      pStar.size = "Ia";
    }else if(sizeRoll <2){
      pStar.size = "Ib";
    }else if(sizeRoll <3){
      pStar.size = "II";
    }else if(sizeRoll <4){
      pStar.size = "III";
    }else if(sizeRoll <5){
      pStar.size = "IV";
    }else if(sizeRoll <11){
      pStar.size = "V";
    }else if(sizeRoll <12){
      pStar.size = "VI";
    }else{
      pStar.size = "D";
    }
  
    pStar.spectralClass = Math.floor(Math.random() * 10);
  
    if(pStar.size == "IV" && (pStar.type == "M" || (pStar.type =="K" && pStar.spectralClass > 4))){
      pStar.size = "V";
    }
    if(pStar.size == "VI" && (pStar.type == "B" || pStar.type == "A" || (pStar.type =="F" && pStar.spectralClass <5))){
      pStar.size = "V";
    }
    var orbitRestrict = getStarOrbitConstraints(pStar.type,pStar.size, pStar.spectralClass, false);
    pStar.lowestOrbit = orbitRestrict[0];
    pStar.habZone = orbitRestrict[1];
    pStar.starName = BuildName("star", false);
    if(test){
      window.alert("Test - jsTravellerStarCreate.generatePrimary: "+formatUSP(pStar, false)+ "  Lowest Orbit: "+pStar.lowestOrbit+"  Hab Zone: "+pStar.habZone);
    }
    return pStar;
   } catch (error) {
     window.alert("jsTravellerStarCreate.generatePrimary: "+error);
   }
  }

function formatUSP(oStar, test){
    /*
    Returns formatted Stellar profile
    oStar - star object
    test = boolean
    */
   try {
     var usp = "";
     var starColor = "";
     switch(oStar.type){
       case "O" : starColor = "Blue";break;
       case "B" : starColor = "Blue White"; break;
       case "A" : starColor = "White"; break;
       case "F" : starColor = "Yellow White"; break;
       case "G" : starColor = "Yellow"; break;
       case "K" : starColor = "Orange"; break;
       default: starColor = "Red";
     }
    
    if(oStar.size == "D"){
      usp = oStar.size+oStar.type+" White Dwarf";
    }else{
      usp = oStar.type+oStar.spectralClass+" "+oStar.size;
      if(oStar.size == "Ia"){
        usp = usp + " "+starColor+" "+"Bright Supergiant";
      }else if(oStar.size == "Ib"){
        usp = usp + " "+starColor+" "+"Weaker Supergiant";
      }else if(oStar.size == "II"){
        usp = usp + " "+starColor+" "+"Bright Giant";
      }else if(oStar.size == "III"){
        usp = usp + " "+starColor+" "+"Giant";
      }else if(oStar.size == "IV"){
        usp = usp + " "+starColor+" "+"Subgiant";
      }else if(oStar.size == "V"){
        usp = usp + " "+starColor+" "+"Main Sequence";
      }else{
        usp = usp + " "+starColor+" "+"Subdwarf";
      }
    } 
     return usp;
   } catch (error) {
    window.alert("jsTravellerStarCreate.formatUSP: "+error);
   }
  }
  
  const star = {
   type : "M",
   size : "D",
   spectralClass : 0,
   lowestOrbit : 0,
   habZone : 0,
   maxOrbit : 0,
   starName: "",
   orbits : []
  };

  const orbitObj = {orbitNumber : 0, 
    orbitId : 0,
    orbitOrder : "I",
    occupant : "Available",
    orbitObject : {}
  };

  function getStarOrbitConstraints(type, size, spectralClass, test){
    /*
    Returns array of two integers lowest orbit and habitable zone
    type - star type
    size - star size
    spectral call - star spectral class
    test binary
    */
  try {
    var lowOrbit = 0;
    var habZone = 0;
    var orbitAry = [];
    orbitAry.push(lowOrbit);
    orbitAry.push(habZone);
    if(size == "Ia"){
      if(type == "B"){
        if(spectralClass <5){
          lowOrbit = 8;
          habZone = 13;
        }else{
          lowOrbit = 7;
          habZone = 12;
        }
      }else if(type == "A"){
        lowOrbit = 7;
        habZone = 12;
      }else if(type == "F"){
        if(spectralClass <5){
          lowOrbit = 6;
          habZone = 12;
        }else{
          lowOrbit = 6;
          habZone = 11;
        }
      }else if(type == "G"){
        lowOrbit = 7;
        habZone = 12;
      }else if(type == "K"){
        lowOrbit = 7;
        habZone = 12;
      }else if(type == "M"){
        if(spectralClass <5){
          lowOrbit = 7;
          habZone = 12;
        }else{
          lowOrbit = 8;
        habZone = 12;
        }
      }
    }else if(size == "Ib"){
      if(type == "B"){
        if(spectralClass <5){
          lowOrbit = 8;
          habZone = 13;
        }else{
          lowOrbit = 6;
          habZone = 11;
        }
      }else if(type == "A"){
        if(spectralClass <5){
          lowOrbit = 5;
          habZone = 11;
        }else{
          lowOrbit = 5;
          habZone = 10;
        }
      }else if(type == "F"){
        if(spectralClass <5){
          lowOrbit = 5;
          habZone = 10;
        }else{
          lowOrbit = 4;
          habZone = 10;
        }
      }else if(type == "G"){
        if(spectralClass <5){
          lowOrbit = 4;
          habZone = 10;
        }else{
          lowOrbit = 5;
          habZone = 10;
        }
      }else if(type == "K"){
        if(spectralClass <5){
          lowOrbit = 5;
          habZone = 10;
        }else{
          lowOrbit = 6;
          habZone = 11;
        }
      }else if(type == "M"){
        if(spectralClass <5){
          lowOrbit = 6;
          habZone = 11;
        }else if(spectralClass <9){
          lowOrbit = 7;
          habZone = 12;
        }else{
          lowOrbit = 8;
          habZone = 12;
        }
      }
    }else if(size == "II"){
      if(type == "B"){
        if(spectralClass <5){
          lowOrbit = 7;
          habZone = 12;
        }else{
          lowOrbit = 5;
          habZone = 11;
        }
      }else if(type == "A"){
        if(spectralClass <5){
          lowOrbit = 3;
          habZone = 9;
        }else{
          lowOrbit = 2;
          habZone = 8;
        }
      }else if(type == "F"){
        lowOrbit = 2;
        habZone = 8;
      }else if(type == "G"){
        lowOrbit = 2;
        habZone = 8;
      }else if(type == "K"){
        if(spectralClass <5){
          lowOrbit = 2;
          habZone = 9;
        }else{
          lowOrbit = 3;
          habZone = 9;
        }
      }else if(type == "M"){
        if(spectralClass <5){
          lowOrbit = 4;
          habZone = 10;
        }else{
          lowOrbit = 6;
          habZone = 11;
        }
      }
    }else if(size == "III"){
      if(type == "B"){
        if(spectralClass <5){
          lowOrbit = 7;
          habZone = 12;
        }else{
          lowOrbit = 5;
          habZone = 10;
        }
      }else if(type == "A"){
        if(spectralClass <5){
          lowOrbit = 1;
          habZone = 8;
        }else{
          lowOrbit = 1;
          habZone = 7;
        }
      }else if(type == "F"){
        lowOrbit = 1;
        habZone = 6;
      }else if(type == "G"){
        if(spectralClass <5){
          lowOrbit = 1;
          habZone = 6;
        }else{
          lowOrbit = 1;
          habZone = 7;
        }
      }else if(type == "K"){
        if(spectralClass <5){
          lowOrbit = 1;
          habZone = 7;
        }else{
          lowOrbit = 1;
          habZone = 8;
        }
      }else if(type == "M"){
        if(spectralClass <5){
          lowOrbit = 2;
          habZone = 8;
        }else if(spectralClass <9){
          lowOrbit = 4;
          habZone = 9;
        }else{
          lowOrbit = 5;
          habZone = 9;
        }
      }
    }else if(size == "IV"){
      if(type == "B"){
        if(spectralClass <5){
          lowOrbit = 7;
          habZone = 12;
        }else{
          lowOrbit = 3;
          habZone = 9;
        }
      }else if(type == "A"){
        if(spectralClass <5){
          lowOrbit = 1;
          habZone = 7;
        }else{
          lowOrbit = 0;
          habZone = 6;
        }
      }else if(type == "F"){
        if(spectralClass <5){
          lowOrbit = 0;
          habZone = 6;
        }else{
          lowOrbit = 0;
          habZone = 5;
        }
      }else if(type == "G"){
        lowOrbit = 0;
        habZone = 5;
      }else if(type == "K"){
        if(spectralClass <5){
          lowOrbit = 0;
          habZone = 4;
        }
      }
    }else if(size == "V"){
      if(type == "B"){
        if(spectralClass <5){
          lowOrbit = 6;
          habZone = 12;
        }else{
          lowOrbit = 3;
          habZone = 9;
        }
      }else if(type == "A"){
        if(spectralClass <5){
          lowOrbit = 0;
          habZone = 7;
        }else{
          lowOrbit = 0;
          habZone = 6;
        }
      }else if(type == "F"){
        if(spectralClass <5){
          lowOrbit = 0;
          habZone = 5;
        }else{
          lowOrbit = 0;
          habZone = 4;
        }
      }else if(type == "G"){
        if(spectralClass <5){
          lowOrbit = 0;
          habZone = 3;
        }else{
          lowOrbit = 0;
          habZone = 2;
        }
      }else if(type == "K"){
        if(spectralClass <5){
          lowOrbit = 0;
          habZone = 2;
        }else{
          lowOrbit = 0;
          habZone = 0;
        }
      }else if(type == "M"){
        if(spectralClass <5){
          lowOrbit = 0;
          habZone = 0;
        }else{
          lowOrbit = 0;
          habZone = -1; 
        }
      }
    }else if(size == "VI"){
      if(type == "F"){
        if(spectralClass >4){
          lowOrbit = 0;
          habZone = 3;
        }
      }else if(type == "G"){
        if(spectralClass <5){
          lowOrbit = 0;
          habZone = 2;
        }else{
          lowOrbit = 0;
          habZone = 1;
        }
      }else if(type == "K"){
        if(spectralClass <5){
          lowOrbit = 0;
          habZone = 1;
        }else{
          lowOrbit = 0;
          habZone = -1;
        }
      }else if(type == "M"){
        lowOrbit = 0;
        habZone = -1;
      }
    }else if(size == "D"){
      if(type == "B"){
        lowOrbit = 0;
        habZone = 0;
      }else {
        lowOrbit = 0;
        habZone = -1;
      }
    }
    orbitAry[0] = lowOrbit;
    orbitAry[1] = habZone;
    if(test){
      window.alert("jsTravellerStarCreate.getStarOrbitConstraints: "+lowOrbit +" | "+habZone);
    }  
    return orbitAry;
  } catch (error) {
    
    window.alert("jsTravellerStarCreate.getStarOrbitConstraints: "+error);
  }
  
  }

  function getNumberAvailableOrbits(startOrbit, includeCaptured, pOrbits, test){
    //Returns number of available orbits
    //startOrbit - allows passing habzone orbit as a filter
    //includeCaputred - boolean allows counting Captured orbits as available
    //pOrbits - list of orbits
    //test - boolean
    try {
      var nAvailableOrbits = 0;
      if(startOrbit < 0){
        startOrbit = 0;
      }
      for(var po = startOrbit; po< pOrbits.length; po++){
        if(pOrbits[po].occupant == "Available" || (pOrbits[po].occupant == "Captured" && includeCaptured)){
          nAvailableOrbits++;
        }
      }
      if(test){
        window.alert("jsTravellerStarCreate.getNumberAvailableOrbits: "+nAvailableOrbits);
      }
      return nAvailableOrbits;
    } catch (error) {
      var eString = "startOrbit= "+startOrbit+"\tincludeCaptured = "+includeCaptured+"\tLength pOrbits= "+pOrbits.length;
      if(Number.isInteger(po)){
        eString = eString+"\tvar po = "+po;
      }
      window.alert("jsTravellerStarVreate.getNumberAvailableOrbits: "+error+"\r"+eString);
    }
  }