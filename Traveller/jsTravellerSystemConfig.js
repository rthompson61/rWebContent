function TravellerSystemCreate(hasGasGiants, test){
  /*
  Returns traveller star system
  hasGasGiants - 0: Unknown 1: True  2:False
  test - boolean
  */
  try{
    var testString = "";
    //Set system nature
    var sysNature = "Solo";
    var sysNatureRoll = Math.floor(Math.random() * 6)+1+Math.floor(Math.random() * 6)+1;
    if(sysNatureRoll > 11){
      sysNature = "Trinary";
    }else if (sysNatureRoll >7){
      sysNature = "Binary";
    }
    testString = sysNature+"\r";
    //set primary 
    var priTypeRoll = Math.floor(Math.random() * 6)+1+Math.floor(Math.random() * 6)+1;
    var priSizeRoll = Math.floor(Math.random() * 6)+1+Math.floor(Math.random() * 6)+1;
    //random chance to modify the rollw to create Type B stars or Bright SUpergiant
    if(Math.floor(Math.random() * 100)==0){
      priTypeRoll = priTypeRoll -2;
      if(test){
        window.alert("jsTravellerSystemConfig.TravellerSystemCreate - Chance of Type B");
      }
    }if(Math.floor(Math.random() * 100)==0){
      priSizeRoll = priSizeRoll -2;if(test){
        window.alert("jsTravellerSystemConfig.TravellerSystemCreate - Chance of Size Ia or Ib ");
      }
    }
    var primary = generatePrimary(priTypeRoll,priSizeRoll,false);
    testString = testString +primary.starName+" "+formatUSP(primary)+"\r";
    //set max orbits
    primary.maxOrbit = Math.floor(Math.random() * 6)+1+Math.floor(Math.random() * 6)+1;
    if(primary.size == "III"){
      primary.maxOrbit = primary.maxOrbit+4;
    }else if(primary.size == "Ia" || primary.size == "Ib" || primary.size == "II"){
      primary.maxOrbit = primary.maxOrbit+8;
    }
    if(primary.type == "M"){
      primary.maxOrbit = primary.maxOrbit-4;
    }else if(primary.type == "K"){
      primary.maxOrbit = primary.maxOrbit-2;
    }
    if(primary.maxOrbit < 0){
      primary.maxOrbit = 0;
    }
    testString = testString +"maximum orbit: "+primary.maxOrbit+"\r";
    primary.orbits = [];
    for(var on = 0; on < primary.maxOrbit+1; on++){
      primary.orbits.push(Object.assign({}, orbitObj)) ;
      primary.orbits[on].orbitId = on;
      primary.orbits[on].orbitNumber = on;
      if(on < primary.lowestOrbit){
        primary.orbits[on].occupant = "Unavailable";
      }
      if(primary.orbits[on].orbitNumber == NaN){
        window.alert("jsTravellerStarCreate.TravellerSystemCreate - orbit number NaN"+ on);
      }
    }
    //place companions
    var companions = [];
    if(sysNature == "Binary"){
      companions.push(generateCompanion(priTypeRoll, priSizeRoll, false));
    }else if(sysNature == "Trinary"){
      companions.push(generateCompanion(priTypeRoll, priSizeRoll, false));
      companions.push(generateCompanion(priTypeRoll, priSizeRoll, false));
    }
    for(var co = 0; co <companions.length; co++){
      primary.orbits = companionOrbits(primary.lowestOrbit, primary.orbits, companions[co], false);
    }
    testString = testString +"new maximum orbit: "+primary.maxOrbit+"\r";

 
    //empty orbits
    primary.orbits = setEmptyOrbits(primary.type, primary.orbits, false);
    
    //set gas giants
    primary.orbits = setGasGiants(hasGasGiants, primary.habZone, primary.orbits, false, false);
    
    //set planetiod belts
    primary.orbits = setPlanetoidBelts(primary.orbits, primary.habZone, false);
    //place planetoid belts
    //captured planets
    primary.orbits = setCapturedPlanets(primary.type, primary.orbits, false);
    //for each orbit - if not companions, gas giant, planetoid belt
    //set planet
  
    primary.orbits = cleanOrbits(primary.orbits, false);
      for(on = 0; on < primary.orbits.length; on ++){
        testString = testString +"Orbit "+primary.orbits[on].orbitId+" Number: "+primary.orbits[on].orbitNumber+"  Occupant: "+primary.orbits[on].occupant+"\r";
        if(primary.orbits[on].occupant == "Companion"){
          testString = testString+"     "+primary.orbits[on].orbitObj.starName+" "+formatUSP(primary.orbits[on].orbitObj)+"\r";
        }
      }
      //for each orbit
      //determine main planet, govt, law, tech level, trade
      //determine subordinate govt, law, tech level, trade
    if(test){
    //  window.alert("jsTravellerSystemConfig.TravellerSystem.Create: "+testString);
      window.alert("jsTravellerSystemConfig.TravellerSystem.Create: \r"+travellerSystemReport(primary, false));
    }
    
  }catch(error){
    window.alert("jsTravellerSystemConfig.TravellerSystem.Create: "+error);
  }
}

function travellerSystemReport(primary, test){
  /*
  returns a formated output ooof the contents of star system
  primary - star system object
  test - boolean
  */
 try {
   var output = "";
   output = output +"Primary      "+formatUSP(primary, false)+"\r";
   output = output+"\t"+"\t"+primary.starName+"\r";
  for(var po = 0; po < primary.orbits.length; po++){
    if(primary.orbits[po].occupant == "Gas Giant"){
      output = output+formatUGGD(primary.habZone, primary.orbits[po]); 
    }else if(primary.orbits[po].occupant == "Planetoid Belt"){
      output = output + formatUPPD(primary.habZone, primary.orbits[po]);
    }else{
      output = output+primary.orbits[po].orbitNumber+"     "+primary.orbits[po].occupant+"\r"; 
    }
  }
  if(test){
    window.alert("jsTRavellerStarCreate.travellerSystemReport:\r"+ output);
  }
   return output;
 } catch (error) {
   window.alert ("jsTraveller.travellerSystemReport: "+error);
 }

}
