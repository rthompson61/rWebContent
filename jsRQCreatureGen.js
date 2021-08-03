/**
 * Utilities to generate RuneQuest creatures
 */

function genStats(templateName){
	try{
		//TO DO add in get template by name and change input parameter to race
		var template = getTemplateByName(templateName);
		if(template == null){template.name = "error";} 
		//get list of Experience levels
		var explvls = getExperienceLevels(template.name);
		var test = "jsRQCreatureGen.genStats: ";
		var rslt1 = 0;
		var naturalWpns = 0;

		//for each characteristic key
		for(var char in template.characteristics){
			template.characteristics[char].value.base = RQdieRoller(template.characteristics[char]);
			for(var el = 3; el < explvls.length; el++){
				if(template.characteristics[char].value.base > 0){
					if(el == 3){
					//generate char.base -> lowest experience level
						template.characteristics[char].value[explvls[el]] = template.characteristics[char].value.base;
						//Calculate Alt values
						if(template.characteristics[char].hasOwnProperty("alt")){
							template.characteristics[char].value.alt={};
							template.characteristics[char].value.alt[explvls[el]] = Math.ceil(template.characteristics[char].value[explvls[el]]*template.characteristics[char].alt);
						}
					}else{
					//for each exp level
					//random char advance
						rslt1 = 0;
						for(var i = 0; i < 3; i++){
							rslt1 = rslt1 + Math.ceil(Math.random()*6);
						}
						if(rslt1 < 4){
							template.characteristics[char].value[explvls[el]] = template.characteristics[char].value[explvls[el-1]] -1;
						}else if(rslt1 < 6 && (char == "pow" || char == "cha")){
							template.characteristics[char].value[explvls[el]] = template.characteristics[char].value[explvls[el-1]] - Math.ceil(Math.random()*3);
						}else if(rslt1 < 11 || (rslt1 < 17 && (char == "siz" || char == "int"))){
							template.characteristics[char].value[explvls[el]] = template.characteristics[char].value[explvls[el-1]];
						}else if(rslt1 < 14){
							template.characteristics[char].value[explvls[el]] = template.characteristics[char].value[explvls[el-1]]+1;
						}else if(rslt1 < 17){
							template.characteristics[char].value[explvls[el]] = template.characteristics[char].value[explvls[el-1]]+ Math.ceil(Math.random()*2);
						}else if(rslt1 < 18){
							template.characteristics[char].value[explvls[el]] = template.characteristics[char].value[explvls[el-1]]+ Math.ceil(Math.random()*3);
						}else{
							template.characteristics[char].value[explvls[el]] = template.characteristics[char].value[explvls[el-1]]+1;
						}
						//set Alt values
						if(template.characteristics[char].hasOwnProperty("alt")){
							template.characteristics[char].value.alt[explvls[el]] = Math.ceil(template.characteristics[char].value[explvls[el]]*template.characteristics[char].alt)
						}
					}
				}else{
					template.characteristics[char].value[explvls[el]] = template.characteristics[char].value.base;
				}
//				test = test+ char+" "+template.characteristics[char].value[explvls[el]]+", ";
				//end generating characteristics
			}
		}

		//Basic Magic
		if(template.magic.uses > 0){
			template = getBasicMagic(template);		
		}
		//for each base skill
		//for each exp level
		//new data structure template.exp[explvls[el]].<calc stat>
		test = test + ". Skills: ";
		template.exp = {};
		//generate skill at exp level
		for(var el = 3; el < explvls.length; el++){
			test = test +explvls[el];
			template.exp[explvls[el]] = {};
			template.exp[explvls[el]].attack = generalBonusCalc(template.characteristics.str.value[explvls[el]], -1, 5, 1)+generalBonusCalc(template.characteristics.int.value[explvls[el]], -2, 5, 1) + generalBonusCalc(template.characteristics.pow.value[explvls[el]], -1, 5, 1) + generalBonusCalc(template.characteristics.dex.value[explvls[el]], -2, 5, 1);
			template.exp[explvls[el]].parry = generalBonusCalc(template.characteristics.str.value[explvls[el]], -1, 5, 1)+generalBonusCalc(template.characteristics.siz.value[explvls[el]], -1, 5, -1) + generalBonusCalc(template.characteristics.pow.value[explvls[el]], -1, 5, 1) + generalBonusCalc(template.characteristics.dex.value[explvls[el]], -2, 5, 1);
			template.exp[explvls[el]].manipulation = generalBonusCalc(template.characteristics.str.value[explvls[el]], -1, 5, 1)+generalBonusCalc(template.characteristics.int.value[explvls[el]], -2, 5, 1) + generalBonusCalc(template.characteristics.pow.value[explvls[el]], -1, 5, 1) + generalBonusCalc(template.characteristics.dex.value[explvls[el]], -2, 5, 1);
			template.exp[explvls[el]].stealth = generalBonusCalc(template.characteristics.siz.value[explvls[el]], -2, 5, -1)+generalBonusCalc(template.characteristics.int.value[explvls[el]], -2, 5, 1) + generalBonusCalc(template.characteristics.pow.value[explvls[el]], -1, 5, 1) + generalBonusCalc(template.characteristics.dex.value[explvls[el]], -2, 5, 1);
			template.exp[explvls[el]].perception = generalBonusCalc(template.characteristics.int.value[explvls[el]], -2, 5, 1) + generalBonusCalc(template.characteristics.pow.value[explvls[el]], -1, 5, 1);
			template.exp[explvls[el]].oratory = generalBonusCalc(template.characteristics.int.value[explvls[el]], -1, 5, 1)+generalBonusCalc(template.characteristics.pow.value[explvls[el]], -1, 5, 1) + generalBonusCalc(template.characteristics.cha.value[explvls[el]], -2, 5, 1);
			template.exp[explvls[el]].knowledge = template.exp[explvls[el]].perception;
			template.exp[explvls[el]].hp = template.characteristics.con.value[explvls[el]]+generalBonusCalc(template.characteristics.siz.value[explvls[el]], -2, 1, 1)+generalBonusCalc(template.characteristics.pow.value[explvls[el]], -1, 1, 1);
			template.exp[explvls[el]].damageBonus = damageBonusCalc(template.characteristics.str.value[explvls[el]], template.characteristics.siz.value[explvls[el]]);
			template.exp[explvls[el]].enc = calcMaxEnc(template.characteristics.str.value[explvls[el]],template.characteristics.con.value[explvls[el]]);
			template.exp[explvls[el]].sr = {};
			template.exp[explvls[el]].sr.siz = calcStrikeRank(template.characteristics.siz.value[explvls[el]], "siz");
			template.exp[explvls[el]].sr.dex = calcStrikeRank(template.characteristics.dex.value[explvls[el]], "dex");
			template.exp[explvls[el]].move = template.move.base;
			template.exp[explvls[el]].tf = getTreasureFactors(template, explvls[el]);
			if(template.sr.hasOwnProperty("delta")){
				template.exp[explvls[el]].sr.dex = template.exp[explvls[el]].sr.dex + template.exp[explvls[el]].sr.delta; 
				if(template.exp[explvls[el]].sr.dex < 0){template.exp[explvls[el]].sr.dex=0;}
				else if (template.exp[explvls[el]].sr.dex >5){template.exp[explvls[el]].sr.dex=5;}
			} 
		//end base skill generateion
		}
		//defense is special
//		if > 0, then give them d3 increments and pass to next explvl		
		for(var el = 3; el < explvls.length; el++){
			template.exp[explvls[el]].defense = generalBonusCalc(template.characteristics.siz.value[explvls[el]], -1, 5, -1)+generalBonusCalc(template.characteristics.int.value[explvls[el]], -2, 5, 1) + generalBonusCalc(template.characteristics.pow.value[explvls[el]], -1, 5, 1) + generalBonusCalc(template.characteristics.dex.value[explvls[el]], -2, 5, 1);
			if(template.exp[explvls[el]].defense > 0){
				template.exp[explvls[el]].defense = template.exp[explvls[el]].defense + (Math.floor(Math.random()*4)*5);
			}
			if(el > 3 && template.exp[explvls[el-1]].defense > 0){
				template.exp[explvls[el]].defense = template.exp[explvls[el-1]].defense + (Math.floor(Math.random()*4)*5);
			}
			 if(template.exp[explvls[el]].defense < 0){
					template.exp[explvls[el]].defense = 0;
				}
			test = test +" Defense "+ template.exp[explvls[el]].defense+", ";
		}
		if(template != null){
			template = getChaoticFeature(template);	
			if(template.hasOwnProperty("chaos") && template.chaos > 100){
//test			window.alert("jsRQCreatureGen.genBasicStats Chaos: "+(template.chaos)/100);
				for(var c = 0; c <((template.chaos)/100)-1; c++){

//test					window.alert("jsRQCreatureGen.genBasicStats Chaos: "+c+" of "+(template.chaos)/100);
					template = getChaoticFeature(template);	
				}
			}
			template = standaloneDisease(template);
//			window.alert("jsRQCreatureGen.genBasicStats "+template.body.hitLocations[5].armor.natural);
//			template = generalStatCalc(template);
			for(var wpns in template.equipment){
				if(wpns.substring(0,7)=="natural"){
					naturalWpns = 1;
				}
			}
			if(naturalWpns > 0){
//				window.alert("Test jsRQCreatureGen.genBasicStats getNaturalWeapons "+explvls[3]);
				template = updateNaturalWeapons(template, explvls[3]);
			}

			//Skills
			if(template.skills.set.length <1){
				template.skills = setSkillsList2(template.skills, template.name, template.exp, template.characteristics.int.value.base);
			}
//			return template;
		}else{
			window.alert( "Error jsRQCreatureGen.genStats - Null template");
		}
		//display characteristics & base skills by exp level
//		window.alert(test);
		return template;
		// update dispaly to show char & skills by exp level
		//update attack/parry values for weapons
	}catch(err){
		window.alert("Error: jsRQCreature.genStats: "+err);
	}
}




function setAltValues(t){
	try{
		var chars = ["str", "con","siz","dex","int","pow","cha"];
		for(var c = 0; c < chars.length; c++){
			if(t.characteristics[chars[c]].hasOwnProperty("alt")){
				t.alt[chars[c]] = formatAlt(t.characteristics[chars[c]].value.current, t.characteristics[chars[c]].alt);
			}else{
				t.alt[chars[c]] = t.characteristics[chars[c]].value.current;
			}
		}
		t.alt.attack = generalBonusCalc(t.alt.str, -1, 5, 1)+generalBonusCalc(t.alt.int, -2, 5, 1) + generalBonusCalc(t.alt.pow, -1, 5, 1) + generalBonusCalc(t.alt.dex, -2, 5, 1);
		t.alt.parry = generalBonusCalc(t.alt.str, -1, 5, 1)+generalBonusCalc(t.alt.siz, -1, 5, -1) + generalBonusCalc(t.alt.pow, -1, 5, 1) + generalBonusCalc(t.alt.dex, -2, 5, 1);
//		t.alt.base = generalBonusCalc(template.characteristics.siz.value.current, -1, 5, -1)+generalBonusCalc(template.characteristics.int.value.current, -2, 5, 1) + generalBonusCalc(template.characteristics.pow.value.current, -1, 5, 1) + generalBonusCalc(template.characteristics.dex.value.current, -2, 5, 1);
//		t.alt.current = template.defense.base;
		t.alt.manipulation = generalBonusCalc(t.alt.str, -1, 5, 1)+generalBonusCalc(t.alt.int, -2, 5, 1) + generalBonusCalc(t.alt.pow, -1, 5, 1) + generalBonusCalc(t.alt.dex, -2, 5, 1);
		t.alt.stealth = generalBonusCalc(t.alt.siz, -2, 5, -1)+generalBonusCalc(t.alt.int, -2, 5, 1) + generalBonusCalc(t.alt.pow, -1, 5, 1) + generalBonusCalc(t.alt.dex, -2, 5, 1);
		t.alt.perception = generalBonusCalc(t.alt.int, -2, 5, 1) + generalBonusCalc(t.alt.pow, -1, 5, 1);
		t.alt.oratory = generalBonusCalc(t.alt.int, -1, 5, 1)+generalBonusCalc(t.alt.pow, -1, 5, 1) + generalBonusCalc(t.alt.cha, -2, 5, 1);
		t.alt.knowledge = t.alt.perception;
//		template.hp = template.characteristics.con.value.current+generalBonusCalc(template.characteristics.siz.value.current, -2, 1, 1)+generalBonusCalc(template.characteristics.pow.value.current, -1, 1, 1);
		t.alt.damageBonus = damageBonusCalc(t.alt.str, t.alt.siz);
		
		//window.alert(t.alt.str+" "+t.alt.con+" "+t.alt.siz+" "+t.alt.dex+" "+t.alt.int+" "+t.alt.pow+" "+t.alt.cha);
		return t;
	}catch(err){
		window.alert("Error: jsRCreatureGen.setAltValues: "+err);
	}
}

function updateCreature(paramAry, template, doc, level){
	try{
		var params = paramAry.split("-");
//		if(template.name == "Dragonewt"){
//			template = updateDragonewt(template, level);
//		}
		if(params[0] == "armor"){
			template = getDressed(template, doc, params);
//			window.alert("jsRQCreatureGen.updateCreature call getDressed Params2 "+params[2]+" Params3 "+params[3]);
		}else if(params[0]=="shield" || params[0]=="melee"  ){
//			window.alert("jsRQCreatureGen.updateCreature call updateWeaponsandshield");
			 template = updateWeaponsAndShield(template, params, level);
//				window.alert("jsRQCreatureGen.updateCreature call updateWeaponsandshield" + template.equipment.melee1.name + " " + template.equipment.melee2.name);
		}else if(params[0]=="missile"){
			template = updateMissileWeapons(template, params, level);
		}
		var e = doc.activeElement;
		if(e != undefined){e.options[e.selectedIndex].value}
		template = updateEnc(template, level);

		template.exp[level].tf = getTreasureFactors(template, level);
		return template
	}catch(err){
		template.error =template.error +"<br/>Error jsRQCreatureGen.updateCreature: " + err;
		return template;
	}
}
function takePantsOff(template, doc, params){
	try{
		var selContUpdate = 0;
		var locs = ["lleg","rleg","abdom"];
		var blankParams = ["","", 0, "", 0,0,0];
		var nullParams = [];
		nullParams[0] = "";
		for( var i = 0; i<locs.length; i++){
			blankParams[2] = params[2];
			blankParams[1] = locs[i];
			template = updateArmor(template, blankParams);
			if(locs[i] != params[1]){
				if(params[2]==1){
					locs[i] = "inner:"+locs[i];
				}
				selContUpdate = updateSelectorToValue(doc, locs[i], nullParams);
			}
		}
		if(getArmorByLocation(template.body.hitLocations,"chest",params[2])=="Hauberk"){
			var chest = "chest";
			var abdom = "abdom";
			var abdom2 = "abdom2"
			if(params[2]==1){
				chest = "inner:"+chest;
				abdom = "inner:"+abdom;
				abdom2 = "inner:"+abdom2;
			}
			var trewsValue = doc.getElementById(chest).value;
			var trewsAry = trewsValue.split("-");
			trewsAry[1] = abdom;
			selContUpdate = updateSelectorToValue(doc,trewsAry[1], trewsAry);
			trewsAry[1] = abdom2;
			doc.getElementById(trewsAry[1]).style.visibility = "hidden";
			selContUpdate = updateSelectorToValue(doc,trewsAry[1], nullParams);
		}
		template = updateArmor(template, params);
		return template;
	}catch(err){
		template.error =template.error +"<br/>Error jsRQCreatureGen.takePantsOff: " + err;
		return template;
	}
}

function takeShirtOff(template, doc, params, trews){
	try{
		var selContUpdate = 0;
		var locs = ["chest","abdom", "abdom2"];
		var blankParams = ["","", 0, "", 0,0,0];
		var nullParams = [];
		nullParams[0] = "";
		for( var i = 0; i<locs.length; i++){
			if(getArmorByLocation(template.body.hitLocations,locs[i],params[2])=="Hauberk"){
				blankParams[2] = params[2];
				blankParams[1] = locs[i];
				template = updateArmor(template, blankParams);
				if(locs[i] != params[1]){
					if(params[2]==1){
						locs[i] = "inner:"+locs[i];
					}
					selContUpdate = updateSelectorToValue(doc, locs[i], nullParams);
				}	
				if(locs[i]=="abdom2"){
					doc.getElementById(locs[i]).style.visibility = "hidden";
				}
			}
		}
		return template;
	}catch(err){
		template.error =template.error +"<br/>Error jsRQCreatureGen.takeShirtOff: " + err;
		return template;
	}
}

function putPantsOn(template, doc, params, hauberk){
	/*
	 * hauberk: 0=no, 1= yes
	 */
	try{
		var locs = getEquipLocations(params[0], params[3]);
		var selContUpdate = 0;
		for(var i = 0; i< locs.length; i++){
			params[1] = locs[i];
//			window.alert("jsRQCreatureGen.puPantsOn "+params[1]);
			template = updateArmor(template, params);
			if(params[2]==1){
				params[1] = "inner:"+params[1];
			}
			selContUpdate = updateSelectorToValue(doc,params[1], params);
		}
		if(hauberk == 1){
			var chest = "chest";
			if(params[2]==1){
				chest = "inner:"+chest;
			}
			var trewsValue = doc.getElementById(chest).value;
			var trewsAry = trewsValue.split("-");
			if(params[2]==1){
				trewsAry[1] = "inner:abdom2";
			}else{
				trewsAry[1] = "abdom2";
			}
			doc.getElementById(trewsAry[1]).style.visibility = "visible";
			selContUpdate = updateSelectorToValue(doc,trewsAry[1], trewsAry);
		}

		return template;
	}catch(err){
		template.error =template.error +"<br/>Error jsRQCreatureGen.putPantsOn: " + err;
		return template;
	}
}

function putShirtOn(template, doc, params, trews){
	/*
	 * trews: 0=no, 1= yes
	 */
	try{
		var locs = getEquipLocations(params[0], params[3]);
		var selContUpdate = 0;
		for(var i = 0; i< locs.length; i++){
			params[1] = locs[i];
			if((trews == 1 && locs[i] !="abdom") || (trews==0 && locs[i] !="abdom2")) {
				template = updateArmor(template, params);
				if(params[2]==1){
					params[1] = "inner:"+params[1];
				}
				doc.getElementById(params[1]).style.visibility = "visible";
				selContUpdate = updateSelectorToValue(doc,params[1], params);
			}
		}
		if(trews == 1){
			var leg = "rleg";
			if(params[2]==1){
				leg = "inner:"+leg;
			}
			var trewsValue = doc.getElementById(leg).value;
			var trewsAry = trewsValue.split("-");
			if(params[2]==1){
				trewsAry[1] = "inner:abdom";
			}else{
				trewsAry[1] = "abdom";
			}
			selContUpdate = updateSelectorToValue(doc,trewsAry[1], trewsAry);
		}
		return template;
	}catch(err){
		template.error =template.error +"<br/>Error jsRQCreatureGen.putShirtOn: " + err;
		return template;
	}
}

function setCurrentValue(base, bonus1, bonus2){
	try{
		var cv = 0;
		cv = Number(base)+Number(bonus1)+Number(bonus2);
		return cv;
	}catch(err){
		template.error =template.error +"<br/>Error jsRQCreatureGen.setCurrentValue: " + err;
		return template;
	}
}
function updateEnc(template, level){
	try{
		template.enc.current = 0;
		for(var i = 0; i < template.body.hitLocations.length; i++ ){
			template.enc.current = Number(template.enc.current)+Number(template.body.hitLocations[i].armor.inner.enc)+Number(template.body.hitLocations[i].armor.outer.enc);
		}
		var keys = template.equipment.keys;
		for(var k = 0; k < template.equipment.keys.length; k++){
			if(template.equipment[keys[k]].name != ""){
				template.enc.current = Number(template.enc.current)+Number(template.equipment[keys[k]].enc);
				template.equipment[keys[k]].sr.current = setCurrentValue(template.equipment[keys[k]].sr.base, template.sr.siz, template.sr.dex );
	//			template.equipment[keys[k]].attack.current = setSkills(level,  template.baseSkills.attack,template.equipment[keys[k]].attack.base, template.equipment[keys[k]].attack.prof );
	//			template.equipment[keys[k]].parry.current = setSkills(level, template.baseSkills.parry, template.equipment[keys[k]].parry.base, template.equipment[keys[k]].parry.prof );
			}
		}
		template.enc.current = Math.ceil(template.enc.current);
		var encPenalty = Number(template.enc.current) - Number(template.enc.max);
		if(encPenalty > 0){
			template.move.current = template.move.base - encPenalty;
			template.defense.current = template.defense.base - (5*encPenalty);
			for(var j = 0; j < template.equipment.keys.length; j++){
				if(template.equipment[keys[j]].name != ""){
//					template.equipment[keys[j]].sr.current = Number(template.equipment[keys[j]].sr.current)+encPenalty;
					template.equipment[keys[j]].sr.current = Number(template.equipment[keys[j]].sr.base) + Number(template.sr.siz) + Number(template.sr.dex)+encPenalty;
//					template.equipment[keys[j]].attack.current = Number(template.equipment[keys[j]].attack.current)-(5*encPenalty);
//					template.equipment[keys[j]].parry.current = Number(template.equipment[keys[j]].parry.current)-(5*encPenalty);
//					template.error = template.error+"<br/>Encumbrance calc. "+template.equipment[keys[j]].name+" Penalty "+encPenalty+" Base SR: "+template.equipment[keys[j]].sr.base+" Base Atk: "+template.equipment[keys[j]].attack.base+" Base Parry: "+template.equipment[keys[j]].parry.base;
				}
			}
		}
		if(Number(template.enc.current) > 1.5*Number(template.characteristics.str.value)){
			template.error = template.error+"<br/>Too many things! - Encumbrance cannot exceed "+Math.ceil(1.5*Number(template.characteristics.str.value));  
		}
		//weapon encumbrance & degradation
		//skill degradation
		return template;
	}catch(err){
		template.error = template.error+"<br/>Error jsRQCreatureGen.updateEnc: " + err;
		return template;
	}
}


function updateArmor(template, params){
	try{
		for(var i = 0; i < template.body.hitLocations.length; i++ ){
			if(params[1] == template.body.hitLocations[i].location){
				if(params[2] < 1){
					template.body.hitLocations[i].armor.outer.ap = params[4];
					template.body.hitLocations[i].armor.outer.enc = params[5];
					template.body.hitLocations[i].armor.outer.silent = params[6];
					template.body.hitLocations[i].armor.outer.subType = params[3];
				}else{
					template.body.hitLocations[i].armor.inner.ap = params[4];
					template.body.hitLocations[i].armor.inner.enc = params[5];
					template.body.hitLocations[i].armor.inner.silent = params[6];
					template.body.hitLocations[i].armor.inner.subType = params[3];
				}
				template.body.hitLocations[i].armor.current = Number(template.body.hitLocations[i].armor.natural)+Number(template.body.hitLocations[i].armor.inner.ap)+Number(template.body.hitLocations[i].armor.outer.ap);
				i = template.body.hitLocations.length;
//				window.alert("jsRQCreatureGen.updateArmor  Armor: "+params[3]+" AP: " + params[4]+" Hit Location: "+params[1]);
			}
		}
		return template;
	}catch(err){
		template.error = template.error+"<br/>Error jsRQCreatureGen.updateArmor: " + err;
		return template;
	}
}

function updateNaturalWeapons(template, level){
	try{
		var damPat = /\d+d\d+/;

		for(var e = 0; e < template.equipment.keys.length; e++){
			if(template.equipment.keys[e].substring(0,template.equipment.keys[e].length-1) !== "naturalMut" || (template.equipment.keys[e].substring(0,template.equipment.keys[e].length-1) == "naturalMut" && template.equipment[template.equipment.keys[e]].name !=="Light Crossbow" && template.equipment[template.equipment.keys[e]].name !=="Assault Rifle" && template.equipment[template.equipment.keys[e]].name !=="Bazooka" && template.equipment[template.equipment.keys[e]].name !=="Laser Pistol" && template.equipment[template.equipment.keys[e]].name !=="Breathe Fire"  )){
//				window.alert("updatenaturalWeapons: "+template.equipment[template.equipment.keys[e]].name);
				if(damPat.test(template.equipment[template.equipment.keys[e]].damage)  ){
//					window.alert("Test updatenaturalWeapons:  DamageBonus1 " +template.exp[level].damageBonus+" : "+level+" Alt: "+template.alt.damageBonus);
					if(template.alt.damageBonus !== "none"  && template.alt.damageBonus !== 0){
						template.equipment[template.equipment.keys[e]].damage= template.equipment[template.equipment.keys[e]].damage+template.alt.damageBonus;
//						window.alert("Test updatenaturalWeapons:  DamageBonus2 " +template.equipment[template.equipment.keys[e]].damage);
					}else if(template.exp[level].damageBonus !== "none" && template.exp[level].damageBonus !== 0){
						template.equipment[template.equipment.keys[e]].damage= template.equipment[template.equipment.keys[e]].damage+template.exp[level].damageBonus;
					}
					//window.alert("updatenaturalWeapons: "+level+"  "+  template.alt.attack+"  "+template.equipment[template.equipment.keys[e]].damage);
				}

				if(template.alt.alt >0){
					template.equipment[template.equipment.keys[e]].attack.current = setSkills(level,  template.alt.attack,template.equipment[template.equipment.keys[e]].attack.base, template.equipment[template.equipment.keys[e]].attack.prof, "n");
					template.equipment[template.equipment.keys[e]].parry.current = setSkills(level,  template.alt.parry,template.equipment[template.equipment.keys[e]].parry.base, template.equipment[template.equipment.keys[e]].parry.prof, "n");
					template.equipment[template.equipment.keys[e]].sr.current = template.equipment[template.equipment.keys[e]].sr.base + calcStrikeRank(template.alt.siz, "siz") + calcStrikeRank(template.alt.dex, "dex");
				
				}else{
					template.equipment[template.equipment.keys[e]].attack.current = setSkills(level,  template.baseSkills.attack,template.equipment[template.equipment.keys[e]].attack.base, template.equipment[template.equipment.keys[e]].attack.prof, "n");
					template.equipment[template.equipment.keys[e]].parry.current = setSkills(level,  template.baseSkills.parry,template.equipment[template.equipment.keys[e]].parry.base, template.equipment[template.equipment.keys[e]].parry.prof, "n");
					template.equipment[template.equipment.keys[e]].sr.current = template.equipment[template.equipment.keys[e]].sr.base + template.sr.siz + template.sr.dex;
					//window.alert("updatenaturalWeapons: "+level+"  Current SR "+  template.equipment[template.equipment.keys[e]].sr.current+"  Base SR "+template.equipment[template.equipment.keys[e]].sr.base+"  Size SR"+ template.sr.siz +"   Dex SR "+template.sr.dex);
				}
			}else{
//				window.alert("updatenaturalWeapons: "+template.equipment.keys[e].substring(0,template.equipment.keys[e].length-1));
				template.equipment[template.equipment.keys[e]].attack.current = setSkills(level,  template.baseSkills.attack,template.equipment[template.equipment.keys[e]].attack.base, template.equipment[template.equipment.keys[e]].attack.prof, "w");
				template.equipment[template.equipment.keys[e]].parry.current = setSkills(level,  template.baseSkills.parry,template.equipment[template.equipment.keys[e]].parry.base, template.equipment[template.equipment.keys[e]].parry.prof, "w");
				if(template.equipment[template.equipment.keys[e]] === -1){
					template.equipment[template.equipment.keys[e]]   = getRateOfFire(template.sr.dex);
				}
				if(template.exp[level].damageBonus !== "none" && template.equipment[template.equipment.keys[e]].damBonus >0){
					var halfBonus = "";
					if(template.damageBonus == "+1d4"){
						halfBonus = "+1d2";
					}else if(template.damageBonus == "-1d4"){
						halfBonus = "-1d4";
					}else{
						halfBonus = template.damageBonus.split("d")[0]+"d3";
					}
					template.equipment[template.equipment.keys[e]].damage= template.equipment[template.equipment.keys[e]].damage+halfBonus;
				}

			}
			if(template.equipment[template.equipment.keys[e]].attack.base == 100){
				template.equipment[template.equipment.keys[e]].attack.current= 100; 
			}
		}
		return template;
	}catch(err){

		window.alert("Error: jsRQCreatureGen.updateNaturalWeapons- "+err);
		template.error = template.error+"<br/>Error: jsRQCreatureGen.updateNaturalWeapons- "+err;
		return template; 
	}
}

function updateMissileWeapons(template, params, level){
	try{
		template.equipment[params[1]] = getEquipByValue(params[0], params[2]);
		template.equipment[params[1]].attack.current = setSkills(level,  template.baseSkills.attack,template.equipment[params[1]].attack.base, template.equipment[params[1]].attack.prof, "w");
		template.equipment[params[1]].parry.current = setSkills(level,  template.baseSkills.parry,template.equipment[params[1]].parry.base, template.equipment[params[1]].parry.prof, "w");
		if(template.equipment[params[1]].rate === -1){
			template.equipment[params[1]].rate   = getRateOfFire(template.sr.dex);
		}
		if(template.exp[level].damageBonus != "0" && template.exp[level].damageBonus != "none"){
			var halfBonus = "half";
			if(template.damageBonus == "+1d4"){
				halfBonus = "+1d2";
			}else if(template.damageBonus == "-1d4"){
				halfBonus = "-1d4";
			}else{
				halfBonus = String(template.exp[level].damageBonus).split("d")[0]+"d3";
			}
			template.equipment[params[1]].damage= template.equipment[params[1]].damage+halfBonus;
		}

		if(template.name == "Morokanth" && level == "Novice"  ){
			template.equipment[keys[k]].attack.current=05;
			template.equipment[keys[k]].parry.current=05;
		}
		//window.alert("jsRQCreatureGen.updateMissileWeapons: "+params[0]+"  "+params[1]+"  "+params[2] + "  "+template.equipment[params[1]].name);
		return template;
	}catch(err){
		window.alert("Error: jsRQCreatureGen.updateMissileWeapons: "+err);
	}
}

function updateWeaponsAndShield(template, params, level){
	try{
//		window.alert("jsRQCreatureGen.updateWeaponsAndShield : "+params[1]);
		template.equipment[params[1]].name = params[12];
		template.equipment[params[1]].ap = params[4];
		template.equipment[params[1]].enc = params[5];
		template.equipment[params[1]].attack.base = params[6];
		template.equipment[params[1]].parry.base = params[7];
		template.equipment[params[1]].damage = params[10];
		template.equipment[params[1]].sr.base = params[11];
		if(template.exp[level].damageBonus !== "none" ){
			template.equipment[params[1]].damage= template.equipment[params[1]].damage+template.exp[level].damageBonus;
//			window.alert("Test jsRQCreatureGen.updateWeaponsAndShield: DamageBonus "+template.equipment[params[1]].damage);
		}
//		template.error = template.error +"<br/>updateWeaponsAndShield "+template.equipment[params[1]].name;
		template.equipment[params[1]].attack.current = setSkills(level,  template.baseSkills.attack,template.equipment[params[1]].attack.base, template.equipment[params[1]].attack.prof, "w");
			template.equipment[params[1]].parry.current = setSkills(level,  template.baseSkills.parry,template.equipment[params[1]].parry.base, template.equipment[params[1]].parry.prof, "w");

			if(template.name == "Morokanth" && level == "Novice"  ){
				template.equipment[keys[k]].attack.current=05;
				template.equipment[keys[k]].parry.current=05;
			}
			
		return template;
	}catch(err){
		template.error = template.error+"<br/>Error jsRQCreatureGen.updateWeaponsAndShield: " + err;
		return template;
	}
}

function calcMaxEnc(str, con){
	/*
	 * str - strength attribute score
	 * con - constitution attribute score
	 */
	try{
		var max = 0;
		if(Math.ceil((str+con)/2)> str) {
			max = str;
	    	}else{
	    		max = Math.ceil((str+con)/2);
	    	}
		return max;
	}catch(err){
		return "Error jsRQCreatureGen.calcMaxEnc: " + err;
	}
	
}

function damageBonusCalc(str, siz){
	/*
	 * str - strength attribute score
	 * siz - size attribute score
	 */
	try{
		var bonus = "";
		str = Number(str);
		siz = Number(siz);
		switch (Math.ceil((str+siz)/2)) {
	    case 1:
	    case 2:
	    case 3:
	    case 4:
	    case 5:
	    case 6:
	        bonus = "-1d4";
	        break;
	    case 7:
	    case 8:
	    case 9:
	    case 10:
	    case 11:
	    case 12:
	        bonus = "none";
	        break;
	    case 13:
	    case 14:
	    case 15:
	    case 16:
	        bonus = "+1d4";
	        break;
	    case 17:
	    case 18:
	    case 19:
	    case 20:
	        bonus = "+1d6";
	        break;
	    default:
	     var nD = Math.ceil(((str+siz)/2-20)/8)+1;
	        bonus = "+"+nD+"d6";
	}
//		window.alert("Test: "+siz+"  " +str+"  "+(Math.ceil(str+siz)/2)+"  "+bonus);
		return bonus;
	}catch(err){
		return "Error jsRQCreatureGen.generalBonusCalc: " + err;
	}
}


function generalBonusCalc(atr, base, pct,rvs){
	/*
	 * atr - attribute score
	 * base - bonus value when atr range is 1-4;  -1 or -2
	 * pct - if % results desired then 5 else 1
	 * rvs - if low atr score should generate a positive result -1 else 1
	 */
	try{
		if(atr < 1){atr = 10;}
		var bonus = Math.ceil(atr/4)+base-1;
		if(base <-1 || bonus < 0){
			bonus = bonus * pct * rvs;
		}else{
			if(bonus < 2){bonus = 0;}
			else{bonus = (bonus-2)*pct*rvs;}
		}
		return bonus;
	}catch(err){
		return "Error jsRQCreatureGen.generalBonusCalc: " + err;
	}
}

function calcStrikeRank(atr, atrType){
	/*
	 * atr - attribute score
	 * atrType - siz or dex
	 */
	try{
		var sr =0;
		var nAttr = Number(atr);
		if(atrType == "siz"){
			if(nAttr < 7){
				sr = 3;
			}else{
				if(nAttr < 15){
					sr = 2;
				}else{
					if(nAttr < 22){
						sr = 1;
					}
				}
			}
		}else{
			if(nAttr < 6){
				sr = 5;
			}else{
				if(nAttr < 9){
					sr = 4;
				}else{
					if(nAttr < 13){
						sr = 3;
					}else{
						if(nAttr < 16){
							sr = 2;
						}else{
							if(nAttr < 19){
								sr = 1;
							}
						}
					}
				}
			}
		}
		return sr;
	}catch(err){
		return "Error jsRQCreatureGen.calcStrikeRank: " + err;
	}
}

function locationHitPointCalc(template, level){
	/*
	 * atr - attribute score
	 * base -  value when atr range is 1-6;
	 */
	try{
		if(template.body.type=="Ameboid"){
			template.body.hitLocations[0].hp.current = template.exp[level].hp;
		}else{
			for(var l = 0; l < template.body.hitLocations.length; l++){
				template.body.hitLocations[l].hp.current = template.body.hitLocations[l].hp.base;
				if(template.exp[level].hp>7 ){
					template.body.hitLocations[l].hp.current = template.body.hitLocations[l].hp.base + Math.ceil(template.exp[level].hp/3)-2;
				}
				if(template.name=="Skeleton"){
					template.body.hitLocations[l].hp.current = 1;
				}
			}
		}
		return template;
	}catch(err){
		return "Error jsRQCreatureGen.locationHitPointCalc: " + err;
	}
}

function getHitLocation(hitLocation, n){
	/*
	 * Input parameter are a template.hitLocation object and the element number of the array
	 */
	try{
		var hl = {label:"", roll:"", aphp:""};
		var ap = 0;
		if(hitLocation.length > n){
			if(hitLocation[n].hidden == 1){
				var newN = -1;
				for(var m = n; m < hitLocation.length; m++){
					if(hitLocation[m].hidden < 1){
						newN =m;
						m= hitLocation.length;
					}
				}
				if(newN > -1){
					hl.label = hitLocation[newN].label;
					hl.roll = hitLocation[newN].roll;
					if(hitLocation[newN].location=="abdom"){
						ap = hitLocation[newN].armor.current+hitLocation[newN+1].armor.current;
					}else{
						ap = hitLocation[newN].armor.current;
					}
					hl.aphp = formatFixedLengthElement(2,0,[ap]) +"/"+formatFixedLengthElement(2,1,[hitLocation[newN].hp.current]);
					hl.next = newN+1;
				}
			}else{
				hl.label = hitLocation[n].label;
				hl.roll = hitLocation[n].roll;
				if(hitLocation[n].location=="abdom"){
					ap = hitLocation[n].armor.current+hitLocation[n+1].armor.current;
				}else{
					ap = hitLocation[n].armor.current;
				}
				hl.aphp = formatFixedLengthElement(2,0,[ap]) +"/"+formatFixedLengthElement(2,1,[hitLocation[n].hp.current]);
				hl.next = n+1;
			}
		}
		if(hl.roll.length < 5){
			hl.roll = formatFixedLengthElement(5,0,[formatFixedLengthElement(3,1,[hl.roll])]);
		}
		return hl;
	}catch(err){
		return {label:"Error jsRQCreatureGen.getHitLocation: " + err, roll:n, aphp:loc};
	}
}
function getDressed(t, d, p){
	/*
	 * Template t, Document d, Parameter array p - from updateCreature
	 * returns template
	 */
	try{

		//Trews, no Hauberk : puPantsOn
		if(p[3] == "Trews" && getArmorByLocation(t.body.hitLocations, "abdom", p[2]) != "Hauberk"){
			t = putPantsOn(t, d, p, 0);
		}else if(p[3] == "Trews" && getArmorByLocation(t.body.hitLocations, "abdom", p[2]) == "Hauberk"){
			t = putPantsOn(t, d, p, 1);
		}else if(p[3] == "Hauberk" && getArmorByLocation(t.body.hitLocations, "abdom", p[2]) != "Trews"){ 
			t = putShirtOn(t, d, p, 0);
		}else if(p[3] == "Hauberk" && getArmorByLocation(t.body.hitLocations, "abdom", p[2]) == "Trews"){ 
			t = putShirtOn(t, d, p, 1);
		}else if( p[1].indexOf("abdom")> -1 &&  p[1].indexOf("abdom2")== -1 && getArmorByLocation(t.body.hitLocations, "abdom", p[2]) == "Trews" && getArmorByLocation(t.body.hitLocations, "abdom2", p[2]) == "Hauberk"){
			t = takeShirtOff(t,d,p);
			t = takePantsOff(t,d,p);
		}else if(p[2] != "Trews" && (p[1].indexOf("lleg")> -1 || p[1].indexOf("rleg")> -1) || ( p[1].indexOf("abdom")> -1 && getArmorByLocation(t.body.hitLocations, "abdom", p[2]) == "Trews")){
			t = takePantsOff(t,d,p);	
			window.alert("Test jsRQCreatureGen.getDressed: (1 TREWS) "+ " Params2 "+p[2]+"  Params3 "+p[3];
		}else if(p[1].indexOf("chest")> -1 || p[1].indexOf("abdom2")> -1 || ( p[1].indexOf("abdom")> -1 && getArmorByLocation(t.body.hitLocations, "abdom", p[2]) == "Hauberk")){
			t = takeShirtOff(t,d,p);	
			if(p[3] == "Byrnie"  || p[3] == "Cuirass"){
				t = updateArmor(t, p);
			}
		}else if(p[1].indexOf("lhleg")> -1 || p[1].indexOf("rhleg")> -1 ||  p[1].indexOf("hndqtr")> -1 ||p[1].indexOf("lfleg")> -1 || p[1].indexOf("rfleg")> -1 ||  p[1].indexOf("foreqtr")> -1 ){
			if(p[3] == "Barding"){
				t = equipBarding(t, d, p, 0);
//				window.alert("jsRQCreatureGen.getDressed: put on barding "+parms);
			}else{
				t = equipBarding(t, d, p, 1);
//				window.alert("jsRQCreatureGen.getDressed: take off barding "+parms);
			}
		}else{
//			window.alert("Test jsRQCreatureGen.getDressed: "+p[1].indexOf("chest")+" | "+p[1].indexOf("rleg"));
			t = updateArmor(t, p);
		}		
		return t;
	}catch(err){
		return template.error = template.error+"<br/>Error jsRQCreatureGen.getDressed: " + err;
	}
}

function equipBarding(t, d, p, w){
	try{
//		var parms = w+" ";
//		for(var k = 0; k < p.length; k++){
//			if(parms.length > 0){
//				parms = parms +", ["+k+"] "+p[k];
//			}else{
//				parms = "["+k+"] "+p[k];
//			}
//		}
		var selContUpdate = 0;
		var blankParams = ["","", 0, "", 0,0,0];
		var nullParams = [];
		var locs = ["lfleg", "rfleg", "foreqtr"];
		if(p[1].indexOf("lhleg")> -1 || p[1].indexOf("rhleg")> -1 ||  p[1].indexOf("hndqtr")> -1){
			locs = ["lhleg", "rhleg", "hndqtr"];
		}
		if(w == 0){
//			parms = parms+ "  Put On";
			for(var i = 0; i< locs.length; i++){
				p[1] = locs[i];
				t = updateArmor(t, p);
				if(p[2]==1){
					p[1] = "inner:"+p[1];
				}
				selContUpdate = updateSelectorToValue(d,p[1], p);
			}
		}else{
//			parms = parms+ "  Take Off";
			nullParams[0] = "";
			for( var i = 0; i<locs.length; i++){
				if(getArmorByLocation(t.body.hitLocations,locs[i],p[2])=="Barding"){
					blankParams[2] = p[2];
					blankParams[1] = locs[i];
					t = updateArmor(t, blankParams);
					if(locs[i] != p[1]){
						if(p[2]==1){
							locs[i] = "inner:"+locs[i];
						}
						selContUpdate = updateSelectorToValue(d, locs[i], nullParams);
					}	
				}
			}
		}
//		window.alert("jsRQCreatureGen.equipBarding: "+parms);		
		return t;
	}catch(err){
		window.alert("Error - jsRQCreatureGen.equipBarding: "+err);
	}
}

function getArmorByLocation(hl, location, inner){
	/*
	 * hl - array of Hit Locations from template, location l and boolean inner (0 - outer/1 - inner)
	 *  passed from getDressed
	 * returns armor sub type
	 */
	try{
		var armSubType= "";
		for(var i = 0; i< hl.length; i++){
			if(hl[i].location == location){
				if(inner > 0 ){
					armSubType = hl[i].armor.inner.subType;					
				}else{
					armSubType = hl[i].armor.outer.subType;
				}
			}
		}
		return armSubType;
	}catch(err){
		return "Error jsRQCreatureGen.getArmorByLocation: " + err;
	}
}


function RQdieRoller(dieObj){
	/*
	 * expects a 4 place Obj with the following properties nDice (Number of Dice), 
	 * szDice (Size of Dice) and mod (Modifiers to combined roll)
	 * Generates two numbers and selects the higher result to limit crap characters
	**/
	try{
		var rslt1 = 0;
		for(var i = 0; i < dieObj.nDice; i++){
			rslt1 = rslt1 + Math.ceil(Math.random()*dieObj.szDice);
		}
		rslt1 = rslt1+dieObj.mod;
		var rslt2 = 0;
		for(var i = 0; i < dieObj.nDice; i++){
			rslt2 = rslt2 + Math.ceil(Math.random()*dieObj.szDice);
		}
		rslt2 = rslt2+dieObj.mod;
		if(rslt1 < rslt2){return rslt2;}
		else{return rslt1;}
	}catch(err){
		return "Error jsRQCreatureGen.dieRoller: " + err;
	}	
}
