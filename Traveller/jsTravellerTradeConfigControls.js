function buildTravellerUSPControls(control) {
    try {
      var initControls = [];
      var formUSPuilder = "<form name=\"NPC_Builder\">";
      var names = [];
      initControls[0] = "<p>"+control +"System Information</p><br><br>";
        formUSPBuilder = "<form name=\"Starport_"+control+"\">";
        names = ["A", "B", "C", "D", "E"];
        names.unshift("Starport_"+control, "descUpdate", "X");
        initControls[0] =formUSPBuilder + "Starport:&nbsp;&nbsp;" + singleSelectOnChange(names) + "</form>";
        
        formUSPBuilder = "<form name=\"Size_"+control+"\">";
        names = [ "1", "2", "3", "4","5","6","7","8","9", "A"];
        names.unshift("Size_"+control, "descUpdate", "0");
        initControls.push(formUSPBuilder + "Size:&nbsp;&nbsp;" + singleSelectOnChange(names) + "</form>");
        
        formUSPBuilder = "<form name=\"Atmosphere_"+control+"\">";
        names = [ "1", "2", "3", "4","5","6","7","8","9", "A", "B", "C", "D", "E", "F"];
        names.unshift("Atmosphere_"+control, "descUpdate", "0");
        initControls.push (formUSPBuilder + "Atmos:&nbsp;&nbsp;" + singleSelectOnChange(names) + "</form>");
        
        formUSPBuilder = "<form name=\"Hydrographic_"+control+"\">";
        names = [ "1", "2", "3", "4","5","6","7","8","9", "A"];
        names.unshift("Hydrographic_"+control, "descUpdate", "0");
        initControls.push (formUSPBuilder + "Hydro:&nbsp;&nbsp;" + singleSelectOnChange(names) + "</form>");
        
        formUSPBuilder = "<form name=\"Population_"+control+"\">";
        names = [ "1", "2", "3", "4","5","6","7","8","9", "A"];
        names.unshift("Population_"+control, "descUpdate", "0");
        initControls.push(formUSPBuilder + "Pop:&nbsp;&nbsp;" + singleSelectOnChange(names) + "</form>");
        
         formUSPBuilder = "<form name=\"Government_"+control+"\">";
         names = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D"];
         names.unshift("Government_"+control, "descUpdate", "0");
         initControls.push (formUSPBuilder + "Govt:&nbsp;&nbsp;" + singleSelectOnChange(names) + "</form>");
         
          formUSPBuilder = "<form name=\"Law_"+control+"\">";
          names = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A+"];
          names.unshift("Law_"+control, "descUpdate", "0");
          initControls.push (formUSPBuilder + "Law:&nbsp;&nbsp;" + singleSelectOnChange(names) + "</form>");
          
           formUSPBuilder = "<form name=\"TechLevel_"+control+"\">";
           names = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G"];
           names.unshift("TechLevel_"+control, "descUpdate", "0");
           initControls.push (formUSPBuilder + "Tech Level:&nbsp;&nbsp;" + singleSelectOnChange(names) + "</form>");
      return initControls;
    } catch (err) {
      return "error: jsTravellerConfigControlss.buildInitControls: " + err;
    }
  }
  
  function tradeClassifications(USP_array){
    try{
      var tradeAry = []
      if (USP_array[1] == 0) {
        tradeAry.push(" Asteroid Belt");
      }
        if(4<= USP_array[2] && USP_array[2]<=9 && 4<= USP_array[3] && USP_array[3] <=8 && 5<= USP_array[4] && USP_array[4] <= 7){
           tradeAry.push(" Agricultural");
        }
        if(USP_array[3]== 0 && parseInt(USP_array[2], 16) >= 2){
          tradeAry.push(" Desert World");
        }
        if ((USP_array[2] <= 3) &&  (USP_array[3] <= 3) && 6 <= USP_array[4] ) {
          tradeAry.push(" Non-Agricultural");
        }
        if ((USP_array[2] < 3 || USP_array[2]==4 || USP_array[2]==7 || USP_array[2]==9)  && 9 <= parseInt(USP_array[4], 16) ) {
          tradeAry.push(" Industrial");
        }
        if (1 <= USP_array[4] && USP_array[4] <= 6) {
          tradeAry.push(" Non-Industrial");
        }
        if ((USP_array[2] == 6|| USP_array[2]==8 )  && (6 <= USP_array[4] && USP_array[4] <=8) && (4 <= USP_array[5] && parseInt(USP_array[5], 16) <=9)) {
          tradeAry.push(" Rich");
        }
        if ((2 <= USP_array[2] && USP_array[2] <= 5) && USP_array[3] <= 3) {
          tradeAry.push(" Poor");
        }
        if (USP_array[3] > 9) {
          tradeAry.push(" Water World");
        }
        if (USP_array[2] <= 0) {
          tradeAry.push(" Vacuum World");
        }
        if ((USP_array[2] == 0 || USP_array[2] == 1) &&  1 <= USP_array[3] ) {
          tradeAry.push(" Ice Capped");
        }
        if ((USP_array[2] == "A" || USP_array[2] =="B"  || USP_array[2] =="C" )&& USP_array[3] > 0 ) {
          tradeAry.push(" Fluid Oceans");
        }
        if (USP_array[4] > 8  ) {
          tradeAry.push(" High Population");
        }
        if (USP_array[4] > 0 && USP_array[4] <4  ) {
          tradeAry.push(" Low Population");
        }
        
      
    
      if ((USP_array[4] == 0 && USP_array[5] == 0) &&   USP_array[6] ==0 ) {
        tradeAry.push(" Barren World");
      }
      return tradeAry;;
    }catch(err){
      return "error: jsTravellerConfigControlss.tradeClassifications: " + err;
    }
  }
  
  function formatInfo(infoAry){
    try{
      var tradeAry = tradeClassifications(infoAry);
      var systemInfo = "";
      if (tradeAry[0] !== undefined) {
        tradeAry.sort();
        systemInfo = systemInfo +"<p>Trade Classifications: ";
        for (var tc = 0; tc < tradeAry.length; tc++) {
          systemInfo = systemInfo + tradeAry[tc];
          if (tc < tradeAry.length - 1) {
            systemInfo = systemInfo + ","
          }
        }
        systemInfo = systemInfo+"</p>";
      }
      
      return systemInfo;
    }catch(err){
      return "error jsTravellerConfigCOntrols.formatInfo: "+err;
    }
  }
  
  function getUSPvalues(doc, control){
    try{
      var USPAry = [];
      
         USPAry.push (doc.getElementById("Starport_"+control).value);
         USPAry.push (doc.getElementById("Size_"+control).value);
         USPAry.push (doc.getElementById("Atmosphere_"+control).value);
         USPAry.push (doc.getElementById("Hydrographic_"+control).value);
         USPAry.push (doc.getElementById("Population_"+control).value);
         USPAry.push (doc.getElementById("Government_"+control).value);
         USPAry.push (doc.getElementById("Law_"+control).value);
         USPAry.push (doc.getElementById("TechLevel_"+control).value);
         return USPAry;
    }catch(err){
        return "error jsTravellerConfigCOntrols.getUSPValues: "+err;
    }
    
  }
  
  function getCargoIdentity(ciUSP){
    try{
      var cargoId = [];
    
      var price = 4000;
    //  window.alert( "error.jsTravellerTradeConfigCOntrols.getCargoIdentify: 1 " + price);
      var ciTradeAry = tradeClassifications(ciUSP);
      for(var tc = 0; tc < ciTradeAry.length; tc++){
        if(ciTradeAry[tc] == " Agricultural"){
          cargoId.push("Ag");
          price = price - 1000;
        }
        if(ciTradeAry[tc] == " Asteroid Belt"){
          cargoId.push("As");
          price = price - 1000;
        }
        if(ciTradeAry[tc] == " Barren World"){
          cargoId.push("Ba");
          price = price + 1000;
        }
        if(ciTradeAry[tc] == " Desert World"){
          cargoId.push("De");
          price = price + 1000;
        }
        if(ciTradeAry[tc] == " Fluid Oceans"){
          cargoId.push("Fl");
          price = price + 1000;
        }
        if(ciTradeAry[tc] == " High Population"){
          cargoId.push("Hi");
          price = price - 1000;
        }
        if(ciTradeAry[tc] == " Industrial"){
          cargoId.push("In");
          price = price - 1000;
        }
        if(ciTradeAry[tc] == " Low Population"){
          cargoId.push("Lo");
          price = price + 1000;
        }
        if(ciTradeAry[tc] == " Non-Industrial"){
          cargoId.push("Ni");
          price = price + 1000;
        }
        if(ciTradeAry[tc] == " Poor"){
          cargoId.push("Po");
          price = price - 1000;
        }
        if(ciTradeAry[tc] == " Rich"){
          cargoId.push("Ri");
          price = price + 1000;
        }
        if(ciTradeAry[tc] == " Vacuum World"){
          cargoId.push("Va");
          price = price + 1000;
        }
        if(ciTradeAry[tc] == " Ice World"){
          cargoId.push("Ic");
        }
        if(ciTradeAry[tc] == " Non-Agricultural"){
          cargoId.push("Na");
        }
        if(ciTradeAry[tc] == " Water World"){
          cargoId.push("Wa");
        }
      };
     cargoId.sort();
    //  window.alert( "error.jsTravellerTradeConfigCOntrols.getCargoIdentify: " + cargoId);
     price = price + (100 * parseInt(ciUSP[7], 16));
      if(ciUSP[0] == "A"){
        price = price - 1000;
      }else if(ciUSP[0] == "C"){
        price = price + 1000;
      }else if (ciUSP[0] == "D") {
        price = price + 2000;
      }else if (ciUSP[0] == "E") {
        price = price + 3000;
      }else if (ciUSP[0] == "X") {
        price = price + 5000;
      }
      
      cargoId.unshift(ciUSP[0]+'-'+ciUSP[7]);
     cargoId.unshift(price);
    return cargoId;
    }catch(err){
       window.alert( "error.jsTravellerTradeConfigCOntrols.getCargoIdentify: " + err);
    } 
  }
  
  function getSalesModifiers(tc){
    try{
    /*  var sourceUSP = getUSPvalues(doc, "source");
      var marketUSP = getUSPvalues(doc, "market");
      var sourceTrade = parseTrade(getCargoIdentity(sourceUSP));
      var marketTrade = parseTrade(getCargoIdentity(marketUSP));
      var sourceAsTrue = false;
      var marketBaTrue = false;
      var marketAsTrue = false;  */
      const mapAg = new  Map([["Ag", 1], ["As", 1], ["Ba", 0], ["De", 1], ["Fl", 0], ["Hi", 1], ["Ic", 0], ["In", 1], ["Lo", 1], ["Na", 1], ["Ni", 0], ["Po", 0], ["Ri",1], ["Va", 0], ["Wa", 0]]);
      const mapAs = new Map([["Ag", 0], ["As", 0], ["Ba", 0], ["De", 0], ["Fl", 0], ["Hi", 0], ["Ic", 0], ["In", 1], ["Lo", 0], ["Na", 1], ["Ni", 0], ["Po", 0], ["Ri",1], ["Va", 1], ["Wa", 0]]);
      const mapBa = new Map([["Ag", 1], ["As", 0], ["Ba", 0], ["De", 0], ["Fl", 0], ["Hi", 0], ["Ic", 0], ["In", 1], ["Lo", 0], ["Na", 0], ["Ni", 0], ["Po", 0], ["Ri",0], ["Va", 0], ["Wa", 0]]);
      const mapDe = new Map([["Ag", 0], ["As", 0], ["Ba", 0], ["De", 1], ["Fl", 0], ["Hi", 0], ["Ic", 0], ["In", 0], ["Lo", 0], ["Na", 1], ["Ni", 0], ["Po", 0], ["Ri",0], ["Va", 0], ["Wa", 0]]);
      const mapFl = new Map([["Ag", 1], ["As", 0], ["Ba", 0], ["De", 0], ["Fl", 1], ["Hi", 0], ["Ic", 0], ["In", 0], ["Lo", 0], ["Na", 0], ["Ni", 0], ["Po", 0], ["Ri",0], ["Va", 0], ["Wa", 0]]);
      const mapHi = new Map([["Ag", 0], ["As", 0], ["Ba", 0], ["De", 0], ["Fl", 0], ["Hi", 1], ["Ic", 0], ["In", 0], ["Lo", 1], ["Na", 0], ["Ni", 0], ["Po", 0], ["Ri",1], ["Va", 0], ["Wa", 0]]);
      const mapIc = new Map([["Ag", 0], ["As", 0], ["Ba", 0], ["De", 0], ["Fl", 0], ["Hi", 0], ["Ic", 0], ["In", 1], ["Lo", 0], ["Na", 0], ["Ni", 0], ["Po", 0], ["Ri",0], ["Va", 0], ["Wa", 0]]);
      const mapIn = new Map([["Ag", 1], ["As", 1], ["Ba", 0], ["De", 1], ["Fl", 1], ["Hi", 1], ["Ic", 0], ["In", 1], ["Lo", 0], ["Na", 0], ["Ni", 1], ["Po", 1], ["Ri",1], ["Va", 1], ["Wa", 1]]);
      const mapLo = new Map([["Ag", 0], ["As", 0], ["Ba", 0], ["De", 0], ["Fl", 0], ["Hi", 0], ["Ic", 0], ["In", 1], ["Lo", 0], ["Na", 0], ["Ni", 0], ["Po", 0], ["Ri",1], ["Va", 0], ["Wa", 0]]);
      const mapNa = new Map([["Ag", 0], ["As", 1], ["Ba", 0], ["De", 1], ["Fl", 0], ["Hi", 0], ["Ic", 0], ["In", 0], ["Lo", 0], ["Na", 0], ["Ni", 0], ["Po", 0], ["Ri",0], ["Va", 1], ["Wa", 0]]);
      const mapNi = new Map([["Ag", 0], ["As", 0], ["Ba", 0], ["De", 0], ["Fl", 0], ["Hi", 0], ["Ic", 0], ["In", 1], ["Lo", 0], ["Na", 0], ["Ni", -1], ["Po", 0], ["Ri",0], ["Va", 0], ["Wa", 0]]);
      const mapPo = new Map([["Ag", 0], ["As", 0], ["Ba", 0], ["De", 0], ["Fl", 0], ["Hi", 0], ["Ic", 0], ["In", 1], ["Lo", 0], ["Na", 0], ["Ni", 0], ["Po", -1], ["Ri",0], ["Va", 0], ["Wa", 0]]);
      const mapRi = new Map([["Ag", 1], ["As", 0], ["Ba", 0], ["De", 1], ["Fl", 0], ["Hi", 1], ["Ic", 0], ["In", 1], ["Lo", 0], ["Na", 1], ["Ni", 0], ["Po", 0], ["Ri",1], ["Va", 0], ["Wa", 0]]);
      const mapVa = new Map([["Ag", 0], ["As", 1], ["Ba", 0], ["De", 0], ["Fl", 0], ["Hi", 0], ["Ic", 0], ["In", 0], ["Lo", 0], ["Na", 0], ["Ni", 0], ["Po", 0], ["Ri",0], ["Va", 1], ["Wa", 0]]);
      const mapWa = new Map([["Ag", 0], ["As", 0], ["Ba", 0], ["De", 0], ["Fl", 0], ["Hi", 0], ["Ic", 0], ["In", 1], ["Lo", 0], ["Na", 0], ["Ni", 0], ["Po", 0], ["Ri",1], ["Va", 0], ["Wa", 1]]);
      
      if(tc == "Ag"){
        return mapAg;
      }else if(tc == "As"){
        return mapAs;
      }else if (tc == "Ba") {
        return mapBa;
      }else if (tc == "De") {
        return mapDe;
      }else if (tc == "Fl") {
        return mapFl;
      }else if (tc == "Hi") {
        return mapHi;
      }else if (tc == "Ic") {
        return mapIc;
      }else if (tc == "In") {
        return mapIn;
      }else if (tc == "Lo") {
        return mapLo;
      }else if (tc == "Na") {
        return mapNa;
      }else if (tc == "Ni") {
        return mapNi;
      }else if (tc == "Po") {
        return mapPo;
      }else if (tc == "Ri") {
        return mapRi;
      }else if (tc == "Va") {
        return mapVa;
      }else if (tc == "Wa") {
        return mapWa;
      }
      return tcMap;
      
    }catch(err){
      window.alert("error.jsTravellerTrdaeConfigControls.getSealesModifiers: "+err)
    }
  }
  
  function parseTrade(tradeClass){
    try{
      var tradeAry = tradeClass.split("|");
      var tradeClassAry = tradeClass[1].split(" ");
      return tradeClassAry;
    }catch(err){
      window.alert("error jsTravellerTradeConfigCOntrols.parseTrade: "+err);
    }
  }
  
     function systemUpdate(doc) {
       try {
         var sourceUSP = [];
         var sourceCargoId = "";
         var marketUSP = [];
         sourceUSP = getUSPvalues(doc, "source");
         marketUSP = getUSPvalues(doc, "market");
         var marketCargoId = "";
         var sourceInfoText = "";
         
         sourceInfoText = validateUSPValues(doc, "source");
         if (sourceInfoText.length == 0){
           sourceInfoText = formatInfo(sourceUSP);
           sourceInfoText = sourceInfoText + ppeRequirements(doc, sourceUSP[2] );
           sourceCargoId = getCargoIdentity(sourceUSP);
           for (var ci = 1; ci < sourceCargoId.length; ci++) {
             sourceInfoText = sourceInfoText + " " + sourceCargoId[ci];
           }
           sourceInfoText = sourceInfoText + "&nbsp;&nbsp;&nbsp;Purchase Price: " + sourceCargoId[0] + "&nbsp;Cr/ton</p>";
         }
        doc.getElementById("sourceInfo").innerHTML = sourceInfoText;
        doc.getElementById("sourceInfo").style.visibility = "visible";
         var marketInfoText = "";
         marketInfoText = validateUSPValues(doc, "market");
         if (marketInfoText.length == 0){
           marketInfoText = formatInfo(marketUSP);
           marketInfoText = marketInfoText  + ppeRequirements(doc, marketUSP[2] );
         }
         /*
         Get Market cargo ID
         iterate thru  marketCargoId 2-n
             get map[marketCargoID n]
             iterate thru sourceCargioID 2-n
                base resale += Map.get(sourceCargoIdn)
        base retail *1000 + 50000 + TL difference
         */
         var baseResale = 0;
         var tcMap = new Map();
         var isBarren = false;
         marketCargoId = getCargoIdentity(marketUSP);
         for (var ci = 2; ci < marketCargoId.length; ci++){
           tcMap.clear();
           //marketInfoText = marketInfoText + " "+marketCargoId[ci];
           tcMap = getSalesModifiers(marketCargoId[ci]);
           if(marketCargoId[ci] == "Ba"){
             isBarren = true;
           }
           for (var sci = 2; sci < sourceCargoId.length; sci++){
             baseResale = baseResale + tcMap.get(sourceCargoId[sci]);
           }
         }
         if(isBarren){
           baseResale = 0;
         }else{
           baseResale = (baseResale*1000) + 5000;
       //    marketInfoText = marketInfoText = " "+baseResale+" + ("+hex2Dec(sourceUSP[7]) +" - "+hex2Dec(marketUSP[7])+") *.1 * "+baseResale;
           baseResale = baseResale + (hex2Dec(sourceUSP[7]) - hex2Dec(marketUSP[7]))*.1*baseResale;
         }
         marketInfoText = marketInfoText + "  Base Resale Price: "+baseResale+"Cr/ton";
      
         
        doc.getElementById("marketInfo").innerHTML = marketInfoText;
        doc.getElementById("marketInfo").style.visibility = "visible";
        return; 
  
       } catch (err) {
         doc.getElementById("Error").innerHTML = err;
         doc.getElementById("Error").style.visibility = "visible";
       }
     }
     
     function ppeRequirements(doc, atmos){
       try{
         var ppe = "";
         if(atmos < 2){
           ppe = "<p>Vacuum suit required.</p>";
         }else if(atmos < 4){
           ppe = "<p>Compressor ";
           if(atmos == 2){
             ppe = ppe+ "and Filter ";
           }
           ppe = ppe + "Mask required.</p>";
         }
         if(atmos == 4 || atmos == 7 || atmos ==  9){
           ppe = "<p>Filter Mask required.</p>"
         }
         if(atmos == "A"){
           ppe = "<p>Oxygen tanks required</p>";
         }
         if(atmos == "B"){
           ppe = "<p>Vacuum or Protective Suits required.</p>";
         }
         if(atmos == "C"){
           ppe = "<p>WARNING: Vaccum or Proctective Suits required.  Personal Protective Equipment subject to failure in 12 standard hours or less!</p>";
         }
         if(atmos == "D"){
           ppe = "<p>WARNING:  Lower elevations require a protective suit and pressure regulator.</p>";
         }
         if(atmos == "E"){
           ppe = "<p>WARNING: Check local airpressure and determine requirements before debarking.</p>";
         }
         if(atmos == "F"){
           ppe = "<p>WARNING: Commpressor masks required at most altitudues</p>";
         }
         return ppe;
       }catch(err){
         doc.getElementById("Error").innerHTML = "Error: Traveller Trade COnfiguration. ppeRequirements - "+err;
         doc.getElementById("Error").style.visibility = "visible";
       }
     }
     
     function validateUSPValues(doc, point){
       try{
         var USPValidation = "";
         if (doc.getElementById("Size_"+point).value == 0 && (doc.getElementById("Atmosphere_"+point).value > 0 || doc.getElementById("Hydrographic_"+point).value > 0 || isNaN(doc.getElementById("Atmosphere_"+point).value || isNAN(doc.getElementById("Hydrographic_"+point).value)))) {
           doc.getElementById("Atmosphere_"+point).selectedIndex = 0;
           doc.getElementById("Hydrographic_"+point).selectedIndex = 0;
           USPValidation =  "<p>Atmosphere and Hydrographic values must be 0 when Size is 0.</p>";
         }
         return USPValidation;
       }catch(err){
         doc.getElementById("Error").innerHTML = "Error: Traveller Trade COnfiguration. validateUSPValues - "+err;
         doc.getElementById("Error").style.visibility = "visible";
         
       }
     }
     
     function logMapElements(value, key, map) {
       console.log(`map.get('${key}') = ${value}`)
     }
     
     function hex2Dec(num){
       try{
         if(num == "A"){
           num = 10;
         }else if(num == "B"){
           num = 11;
         }else if (num == "C"){
           num = 12;
         }else if (num == "D"){
           num = 13;
         }else if (num == "E"){
           num = 14;
         }else if (num == "F"){
           num = 15;
         }else if (num == "G"){
           num = 16;
         }else if (num == "S"){
          num = -1;
        }else if (num == "R"){
          num = -2;
        }
         return num;
       }catch(err){
             window.alert("error jsTravellerTradeConfigCOntrols.hex2Dec: "+err);
       }
     }