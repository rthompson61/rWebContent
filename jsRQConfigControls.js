/**
 * A set of utilities to build configuration controls for RQ NPCs
 */

function buildConfigControls(template, type){
	try{
		/*
		 * Get list of hit locations
		 */
		var arySelObj = {};
		var configAry = [];
		var configForm = "";
		var blankObj = {name:"", value:"", disabled:0, selected:1};
		var selObjStr = "";
		/* 
		 * armor
		 */
		
		if(type == "armor"){
			arySelObj = buildSelectionObjectAry(template, type, 0);
			configForm = "<p style=\"text-align:center\">Outer Armor</p> <form id=\"NPC_Config_Outer_Armor\">";
			for(var n = 0; n < arySelObj.length; n++){
				blankObj.value= "armor-"+arySelObj[n].name+"-0--0-0-0";
				selObjStr= singleSelectOnChangeObj(arySelObj[n], blankObj);
				if(selObjStr.split("option").length > 3){
					configForm = configForm + selObjStr + "<br/>";
				}
			}
			configForm = configForm +"</form>";
			configAry.push(configForm);
			arySelObj =buildSelectionObjectAry(template, type, 1);
			configForm = "<p style=\"text-align:center\">Inner Armor</p> <form id=\"NPC_Config_Inner_Armor\">";
			for(var n = 0; n < arySelObj.length; n++){
				arySelObj[n].name = "inner:"+arySelObj[n].name; 
				blankObj.value= "armor-"+arySelObj[n].name+"-1--0-0-0";
				selObjStr= singleSelectOnChangeObj(arySelObj[n], blankObj);
				if(selObjStr.split("option").length > 3){
					configForm = configForm + selObjStr + "<br/>";
				}
			}
			configForm = configForm +"</form>";
			configAry.push(configForm);
		}else{
		/*
		 * shields
		 */
			if(type=="shield"){
				arySelObj = buildSelectionObjectAry(template, type, 0);
				configForm = "<p style=\"text-align:center\">Shield and Weapons</p> <form id=\"NPC_Config_Shield\">";
				for(var n = 0; n < arySelObj.length; n++){
					blankObj.value= "shield-"+arySelObj[n].name+"-0--0-0-0";
					selObjStr= singleSelectOnChangeObj(arySelObj[n], blankObj);
					if(selObjStr.split("option").length > 3){
						configForm = configForm + selObjStr + "<br/>";
					}
				}
				configForm = configForm +"</form>";
				configAry.push(configForm);
			}
		}
		return configAry;
	}catch(err){
		return "error: jsRQConfigControlss.buildConfigControls: " + err;
	}
}

function buildInitControls(control, bgRace){
	try{
		var initControls = [];
		 var formNPCBuilder = "<form name=\"NPC_Builder\">";
		 var names = getTemplateNames();  
		 names.sort();
		 initControls[0] = "<p>Error</p>";
		 if(control == 1){
			 names.unshift("race", "basicGeneration", "");
			 initControls[0] = formNPCBuilder+"Race:&nbsp;&nbsp;"+singleSelectOnChange(names)+"</form>";
		 }else if(control==2){
//			 window.alert("jsRQConfigControls.buildInitControls: "+bgRace);
		 var formExperience = "<form name=\"Experience\">";	
//		 var exp = ["experienceLevel","updateSkills", "","Novice","Trained","Blooded","Experienced", "Veteran","Master","Exemplar"];
//		 if(bgRace == "Dragonewt"){
//			 exp = ["experienceLevel","updateSkills", "","Crested","Beaked","Tailed Priest","Full Priest", "Inhuman King"];
//		 }
		 	initControls[0] = formExperience+"Experience:&nbsp;&nbsp;"+singleSelectOnChange(getExperienceLevels(bgRace))+"</form>";
		 }else if(control==3){
  		 var sources = getTemplateSources();
  		 sources = uniqueValues(sources);
  		 sources.sort();  
  		 sources.unshift("source", "raceDropdown", "");
  		 initControls[0] = "<form name=\"NPC_Source\">"+"Source:&nbsp;&nbsp;"+singleSelectOnChange(sources)+"</form>";
		 }else if (control==4){
		   names = getTemplateNamesBySource(bgRace);
		   names.sort();
			 names.unshift("race", "basicGeneration", "");
  		 initControls[0] = "<form name=\"NPC_Builder\">"+"Race:&nbsp;&nbsp;"+singleSelectOnChange(names)+"</form>";
		 }
		return initControls;
	}catch(err){
		return "error: jsRQConfigControlss.buildInitControls: " + err;
	}
}


function buildSelectionObjectAry(template, type, inner){
	try{
		var selObj = {label:"test", id:"nTest", multiple:0, onchange:"", options:[], hidden:0 };
		var optGrpObj = {label:"", options:[]}
		var optionObj = {name:"", value:"", disabled:0, selected:0};
		var tempSO;
		var tempG0;
		var normLabel = "";
		var arySelObj = [];
		if(type== "armor"){
			for(var i = 0; i < template.body.hitLocations.length; i++ ){
				tempSO = Object.create(selObj);
				tempSO.name = template.body.hitLocations[i].location;
				tempSO.onchange = "updateEquip";
				if(template.body.hitLocations[i].label.length == 4){
					normLabel = template.body.hitLocations[i].label+"&nbsp;";
				}else{
					normLabel = template.body.hitLocations[i].label;
				}
				tempSO.label = normLabel;
				tempSO.options = getEquipOptionObj(type, tempSO.name, inner, 1, 1);
				tempSO.hidden = template.body.hitLocations[i].hidden;
				arySelObj.push(tempSO);
			}
		}else{
			var locations = template.equipment.keys;
			if(type=="shield"){
				for(var i = 0; i < locations.length; i++ ){
					tempSO = Object.create(selObj);
					tempSO.name = locations[i];
					tempSO.onchange = "updateEquip";
					tempSO.label = locations[i].toUpperCase();
					if(i > 0){
						type = locations[i].slice(0, locations[i].length-1);
					}
					tempSO.options = getEquipOptionObj(type, tempSO.name, 0, template.characteristics.str.value[getExperienceLevels(template.name)[3]], template.characteristics.dex.value[getExperienceLevels(template.name)[3]]);
					arySelObj.push(tempSO);
				}
			}
		}
		return arySelObj;
	}catch(err){
		return "error: jsRQConfigControlss.buildSelectionObjectAry: " + err;
	}
}

function getHitLocations(hitLocs){
	/*
	 * input list of 
	 */
	try{
		
		var hitLocObjs = getHitLocations(template.body.hitLocations);
	}catch(err){
		return "error: jsRQConfigControlss.buildConfigControls: " + err;
	}
}

function getControlsByForm(doc, form, srch){
	/*
	 * input list of 
	 */
	try{
//		window.alert("jsRQConfigControlss.getControlsByForm: 1 "+form);
//		form = "NPC_Config_Shield";
		var elList = doc.getElementById(form).elements;
		var txt = "";
		var elements = [];
		for(var e = 0; e < elList.length; e++){
			if(srch == null || elList[e].id.indexOf(srch) > -1){
//				txt = txt + elList[e].id+",<p/>";
				elements.push(elList[e].id);
			}
		}
//		window.alert("jsRQConfigControlss.getControlsByForm: 2"+txt);
		return elements;
	}catch(err){
		window.alert("Rrror: jsRQConfigControlss.getControlsByForm: " + err);
	}
}

function cultureControl(race){
	try{
		
	}catch(err){
		return "error: jsRQConfigControlss.cultureControl: " + err;
	}
}

function getExperienceLevels(bgRace){
	try{
		var exp = ["experienceLevel","updateSkills", "","Novice","Trained","Blooded","Experienced", "Veteran","Master","Exemplar"];
		var animals = ["Basilisk", "Bison", "Bolo Lizard", "Cliff Toad", "Cockatrice", "Demi-bird", "Demon, Manes", "Dragonsnail", "Dream Dragon", "Ghoul", "Giant Rat", "Gorp", "High Llama", "Horse", "Horse, War", "Impala", "Jack O'Bear", "Rhino", "Rock Lizard", "Rubble Runner", "Sable", "Shadow Cat", "Skeleton", "Sky Bull", "Snake", "Tusker", "Unicorn", "Wyrm", "Wyvern", "Zombie" ];
		 if(bgRace == "Dragonewt"){
			 exp = ["experienceLevel","updateSkills", "","Crested","Beaked","Tailed Priest","Full Priest", "Inhuman King"];
		 }else{
			 for(var a = 0; a < animals.length; a++){
//				 window.alert("getExpereinceLevels: "+ bgRace +" ? " + animals[a] + " ? "+ bgRace.substring(0,5));
				 if(bgRace == animals[a] || bgRace.substring(0,5) == "Snake"){ //I change the template.name value to include the type of snake during generation
					 exp = ["experienceLevel","updateSkills", "","Yearling","Mature","Old and Cunning"];
				 }
			 }
		 }
		 return exp;
	}catch(err){
		return "error: jsRQConfigControls.getExperienceLevels: " + err;
	}
}
