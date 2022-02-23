function testSystemGeneration(){
    try {
/*
        window.alert("jsTravellerTestHarness.testSYstemGeneration: Button pushed");
        //test 1
         BuildWord(1, true);
         //test 2
         BuildWord(2, true);
         //test 3
         BuildWord(3, true);
         //test 4
         BuildWord(4, true);
         //test 5
         BuildName("planet", true);
         //test 6 
         BuildName("belt", true);
         //test 7
         BuildName("giant", true);
         //test 8
         NamePossessive(["An", "be", "ci"], "planet", true);
         //test 9
         NamePossessive(["An", "be", "ci"], "giant", true);
         //test 10
         NamePossessive(["An", "be", "ci"], "belt", true);
         //test 11
         NamePossessive(["Another"], "planet", true);
         //test 12
         NameAsteroid(true);
         //test 13
         NameDefinate(["Anbe", "Cide"], true);
        //test 14
        NameHyphenated(["Anbe", "Cide"], true);
        //test 15
        NameGlottalStop("Gerbil", true);
        //test 16
        NameGlottalStop("Shirley", true);
        //test 17
        NamePartative(["Girbel"], true);
        //test 18
        NamePartative(["Girbel", "Shirley"], true);
        //test 19
        NamePartative(["Girbel", "Shirley", "Giraffe"], true);
        
       //test 20
       generateSatelliteSize("9", true);
       //test 21
       generateSatelliteSize("SGG", true);
       //test 22
       generateSatelliteSize("LGG", true);
       
      //test 23
      generateSatelliteOrbit("R", false, true);
      generateSatelliteOrbit("8", true, true);
      generateSatelliteOrbit("S", false, true);
      
     //test 24 - satllite atmosphere
     generateSatelliteAtmosphere("inner", "9", true);
     generateSatelliteAtmosphere("outer", "R", true);
     generateSatelliteAtmosphere("habital", "4", true);

        //satellite hydro
        generateSatelliteHydrography("S", "inner", "0", true);
        generateSatelliteHydrography("7", "habitable", "8", true);
        generateSatelliteHydrography("5", "outer", "A", true);
    
   //test 26 - satelliet population
   generateSatellitePopulation("S", "inner", "0", true);
   generateSatellitePopulation("7", "habitable", "8", true);
   generateSatellitePopulation("5", "outer", "A", true);


   //test 27 - create satellite
  createSatellite("7", "habitable", "George", true);
  createSatellite("LGG", "outer", "George", true);
  createSatellite("4", "inner", "George", true);
  
 
    //test 28 - create and order an array of satellites
    createOrderSatellites("7", "habitable", "Mary",true);
    createOrderSatellites("LGG", "outer", "Mary",true);
    createOrderSatellites("4", "inner", "Mary",true);
    
    //test - 29 - planet size
    generatePlanetSize(0, "G", true);
    generatePlanetSize(0.7, "G", true);
    generatePlanetSize(2.6, "G", true);
    generatePlanetSize(4, "M", true);

    //test 30 - genrate palnetary atmosphere
    generatePlanetAtmosphere("inner", "S", false, true);
    generatePlanetAtmosphere("inner", "8", false, true);
    generatePlanetAtmosphere("habitable", "5", false, true);
    generatePlanetAtmosphere("outer", "7", false, true);
    generatePlanetAtmosphere("outer", "6", true, true);
    
    //test 31 create planet
    createPlanet(2, "M", 0, true);
    createPlanet(4, "F", 4, true);
    createPlanet(4, "F", 5, true);
    createPlanet(4, "G", 3, true);
    createPlanet(8, "G", 3, true);

        //test 32 create primary star
        
        generatePrimary(6, 6, true); //M V
        generatePrimary(8, 7, true); //K V
        generatePrimary(5, 11, true); //M VI
        generatePrimary(4, 3, true);  //M III
        generatePrimary(4, 4, true);  //M V (test size change IV to V)
        generatePrimary(2, 11, true);  //A V (test size change VI to V )

    
   
   //test 33 get orbit constraints
   getStarOrbitConstraints("A", "Ib", 6, true); // 5, 10
   getStarOrbitConstraints("F", "II", 3, true); // 2, 8
   getStarOrbitConstraints("G", "III", 7, true);  //1, 7
   getStarOrbitConstraints("B", "IV", 0, true); //7, 12
   getStarOrbitConstraints("F", "V", 9, true);  //0, 4
   getStarOrbitConstraints("K", "VI", 2, true);  //0, 1
   getStarOrbitConstraints("A", "D", 6, true);  //0, -1


        //test 34 create companion star
        generateCompanion(6, 6, true); 
        generateCompanion(8, 7, true); 
        generateCompanion(5, 2, true); 
        generateCompanion(4, 3, true);  
        generateCompanion(4, 4, true);  
        generateCompanion(2, 2, true);  
*/
        //test 35 create star system
        TravellerSystemCreate(0,true);
/*         test 36 - orbit is available for COmpanion
           use pObits arrray for subsequent tests
           */
          var pOrbits = [];
          for(var oo = 0; oo < 6; oo++){
              pOrbits.push(Object.assign({}, orbitObj));
              pOrbits[oo].orbitId = oo;
              pOrbits[oo].orbitNumber = oo;
              switch (oo){
                  case 2: pOrbits[oo].occupant = "Unavailable"; break;
                  case 3: pOrbits[3].occupant = "Companion"; break;
                  case 4: pOrbits[oo].occupant = "Unavailable"; break;
                  default: pOrbits[oo].occupant = "Available"; 
              }
          }

          //test 40 - number of available orbits
          //getNumberAvailableOrbits(0, false, pOrbits, true);
          //getNumberAvailableOrbits(3, false, pOrbits, true);

        //test 41 - set empty orbits
        //setEmptyOrbits("G", pOrbits, true);
        //setEmptyOrbits("B", pOrbits, true);


    /*      //add unavailble orbits 7 test those
          orbitIsAvailable("Companion", 3, pOrbits, true);
          orbitIsAvailable("Companion", "Close", pOrbits, true);
          orbitIsAvailable("Companion", "Far", pOrbits, true);
          orbitIsAvailable("Companion", 25, pOrbits, true);
          orbitIsAvailable("Companion", 4, pOrbits, true);
*/
          //test 37 - edit orbits add companion star
          var cStar = Object.assign({}, star);
          cStar.type = "M";
          cStar.size = "D";
          cStar.lowestOrbit = 0;
          cStar.habZone = 1; 
          cStar.starName = "Test Companion";
         // editOrbits("Companion", "Close", cStar, pOrbits, true)
        //  pOrbits.shift();
        //  editOrbits("Companion", "Far", cStar, pOrbits, true)
         // pOrbits[pOrbits.length-1].orbitNumber = 75;
        //  editOrbits("Companion", 5, cStar, pOrbits, true)

          //test 38 - generate companion orbit
          pOrbits = [];
          for(var oo = 0; oo < 6; oo++){
            pOrbits.push(Object.assign({}, orbitObj));
            pOrbits[oo].orbitId = oo;
            pOrbits[oo].orbitNumber = oo;
            pOrbits[oo].occupant = "Available"; 
            
        }
        //  companionOrbits(0, pOrbits, cStar, true);
          pOrbits = [];
          for(var oo = 0; oo < 6; oo++){
            pOrbits.push(Object.assign({}, orbitObj));
            pOrbits[oo].orbitId = oo;
            pOrbits[oo].orbitNumber = oo;
            pOrbits[oo].occupant = "Available"; 
            
        }
         // companionOrbits(7, pOrbits, cStar, true);
                 //test 42 - set captured planets
//        setCapturedPlanets("M", pOrbits, true);
//        setCapturedPlanets("A", pOrbits, true);

        //set gas giants
    //    setGasGiants(1, 3, pOrbits, true);
    //    setPlanetoidBelts(pOrbits, true);
        pOrbits[3].orbitNumber = 3.4;
        pOrbits[3].aphelion = 3.8;
        pOrbits[3].perihelion = 3.2; 
    //    setGasGiants(1, 3, pOrbits, true);
    //    setPlanetoidBelts(pOrbits, true);
        pOrbits = [];
        for(var oo = 0; oo < 6; oo++){
          pOrbits.push(Object.assign({}, orbitObj));
          pOrbits[oo].orbitId = oo;
          pOrbits[oo].orbitNumber = oo;
          pOrbits[oo].occupant = "Available";    
      }
    //    setGasGiants(0, 9, pOrbits, true);
    //    setPlanetoidBelts(pOrbits, true);
        pOrbits = [];
        for(var oo = 0; oo < 6; oo++){
          pOrbits.push(Object.assign({}, orbitObj));
          pOrbits[oo].orbitId = oo;
          pOrbits[oo].orbitNumber = oo;
          pOrbits[oo].occupant = "Available";    
      }
    //    setGasGiants(2, 3, pOrbits, true);
    //    setPlanetoidBelts(pOrbits, true);

    } catch (error) {
        window.alert("jsTravellerTestHarness.testSystemGeneration: 1a "+error);
    }
}