 /**
 * 
 */
function setSkills(level, bonus, skillBase, proficiency, type){
	//type: w-weapon, n-natural weapon, s-skill
	try{
		var skill = 0;
		var rslt1 = 0;
		var base = 0;
		for(var i = 0; i < 2; i++){
			rslt1 = rslt1 + Math.ceil(Math.random()*6);
		}
		if(skillBase == undefined ){skillBase = 5;}
		if(proficiency == undefined ){proficiency = 0;}
		bonus = Number(bonus);
		skillBase = Number(skillBase);
		proficiency = Number(proficiency);
		
		switch(level){
		case "Trained":
		case "Mature":
			if(type == "n"){
				base = skillBase+5;
			}else{
				base = 35;
			}
			break;
		case "Blooded":
		case "Beaked":
			if(type == "n"){
				base = skillBase+10;
			}else{
				base = 50;
			}
			break;
		case "Experienced":
		case "Tailed Priest":
		case "Old and Canny":
			if(type == "n"){
				base = skillBase+15;
			}else{
				base = 65;
			}
			break;
		case "Veteran":
			if(type == "n"){
				base = skillBase+20;
			}else{
				base = 80;
			}
			break;
		case "Master":
		case "Full Priest":
			if(type == "n"){
				base = skillBase+25;
			}else{
				base = 95;
			}
			break;		
		case "Exemplar":
		case "Inhuman King":
			if(type == "n"){
				base = skillBase+35;
			}else{
				base = 110;
			}
			break;
		default:
			if(type == "n"){
				base = skillBase;
			}else{
				base = 5;
			}
			break;		}
		if(base < skillBase){base = skillBase;}
		switch(rslt1){
		case 2:
			if(level != "Novice"){
				skill = base +bonus -proficiency -5;
			}
			break;
		case 12:
			if(level != "Novice"){
				skill = base +bonus -proficiency +15;
			}
			break;
		case 11:
			skill = base +bonus -proficiency +10;
			break;
		case 10:
			if(level != "Novice"){
				skill = base +bonus -proficiency +5;
			}
			break;
		case 9:
		case 8:
			skill = base +bonus-proficiency +5;
			break;
		case 7:
		case 6:
			if(level != "Novice"){
				skill = base +bonus-proficiency +5;
			}
			break;
		default:
			skill =  base +bonus-proficiency;
		}
		if(skill <5 && (type =="w" || type == "n")){
			skill = 5;
		}
		if(skill < skillBase +bonus-proficiency && type == "n"){
			skill = skillBase +bonus-proficiency;
		}
		if(level == "Tailed Priest" && (type == "m" || type == "s") && skill > 65 ){
			skill == 65;
//			window.alert("setSkills: "+level+"  BONUS"+bonus+"  BASE"+base+"  Prof"+proficiency+"  SB"+skillBase+"  SK"+skill);
		}
		if(skillBase == -1){
			skill = -1;
		}
		return skill;
		
	}catch(err){
		return "Error: jsRQSkills.setSkills: "+err;
	}
}

function updateByExperience(template, level, document){
	/*
	 * Iterates through skill structures, sets current skill level
	 */
	try{
		//Characteristics
//		template = updateCharacteristics(template, level);
		if(template.name == "Dragonewt"){
			template = updateDragonewt(template, level, document);
		}
			//Base Skills
//		template = generalStatCalc(template);
//		if(template.defense.current >0){
//			template.defense.current = template.defense.current + updateDefense(level);
//		}
		//Equipment skills
		var keys = template.equipment.keys;
		for(var k = 0; k<keys.length; k++){
			if(template.equipment[keys[k]].name !=""){
				if(keys[k].substring(0,7) != "natural" ){
					template.equipment[keys[k]].attack.current = setSkills(level, template.exp[level].attack,template.equipment[keys[k]].attack.base, template.equipment[keys[k]].attack.prof, "w");
					template.equipment[keys[k]].parry.current = setSkills(level, template.exp[level].parry,template.equipment[keys[k]].parry.base, template.equipment[keys[k]].parry.prof, "w");
					if(template.name == "Dragonewt" && level == "Tailed Priest" ){
						if(template.equipment[keys[k]].attack.current>65){template.equipment[keys[k]].attack.current=65;}
						if(template.equipment[keys[k]].parry.current>65){template.equipment[keys[k]].parry.current=65;}
					}
					if(template.name == "Morokanth" && level == "Novice"  ){
						template.equipment[keys[k]].attack.current=05;
						template.equipment[keys[k]].parry.current=05;
					}
					if(template.name == "Dragonewt"){
						if(template.damageBonus != "none" && template.equipment[keys[k]].damage.indexOf(template.damageBonus) == -1){
							template.equipment[keys[k]].damage= template.equipment[keys[k]].damage+template.damageBonus;
						}
					}
				}else{
					template.equipment[keys[k]].attack.current = setSkills(level, template.exp[level].attack,template.equipment[keys[k]].attack.base, template.equipment[keys[k]].attack.prof, "n");
					template.equipment[keys[k]].parry.current = setSkills(level, template.exp[level].parry,template.equipment[keys[k]].parry.base, template.equipment[keys[k]].parry.prof, "n");
				}
			}
		}
//		template = updateSkillsList(template, level);
		if(template.name == "Dragonewt"){
			var skillsObjAry = [{name:"Camouflage", min:50}, {name:"Hide in Cover", min:50},{name:"Move Quietly", min:50}, {name:"Riding (Demi-bird)", min:75}];
			if(level == "Beaked"){
				template.skills.set = setAddIndividualSkill(template.skills.set, skillsObjAry);
			}
		}
		return template;
	}catch(err){
		return "Error: jsRQSkills.updateSkills: "+err;
	}
}

function updateDefense(level){
	try{
		var expLvls = ["Novice","Trained","Blooded","Experienced","Veteran","Master","Exemplar"];
		var defPlus = 0;
		for(var el in expLvls){
			defPlus = defPlus + (Math.ceil(Math.random()*3)-1)*5;
		}
		return defPlus;
	}catch(err){
		window.alert("Error: jsRQSkills.updateDefense: "+err);
		return "Error: jsRQSkills.updateDefense: "+err;
	}	
}

function updateCharacteristics(template, level){
	try{
		var delta = 0;
		var rslt1 = 0;
		var min = 0;
		var max = 0;
		var alert = "";
		var maxAry = [template.characteristics.str.value.current, template.characteristics.con.value.current, template.characteristics.siz.value.current];
		var expLvls = getExperienceLevels(template.name);
			//["Novice","Trained","Blooded","Experienced","Veteran","Master","Exemplar"];
		for(var char in template.characteristics){
			template.characteristics[char].value.current = template.characteristics[char].value.base;
		}
		for(var el =3; el < expLvls.length; el++){
			for(var char in template.characteristics){
				alert = alert + char+ " Start: "+ template.characteristics[char].value.current;
				rslt1 =0;
				for(var i = 0; i < 3; i++){
					rslt1 = rslt1 + Math.ceil(Math.random()*6);
				}
				switch(rslt1){
				case 3:
					delta = -1;
					break;
				case 4:
				case 5:
					if(char == "pow" || char == "char"){
						delta = Math.ceil(Math.random()*-3);
					}
					break;
				case 11:
				case 12:
				case 13:
					if(char == "str" || char == "con" || char == "pow" || char == "cha"){
						delta = 1;
					}
					break;
				case 14:
				case 15:
				case 16:
					if(char == "str" || char == "con" || char == "pow" || char == "cha"){
						delta = Math.ceil(Math.random()*2);
					}
					break;
				case 17:
					if(char == "str" || char == "con" || char == "pow" || char == "cha"){
						delta = Math.ceil(Math.random()*3);
					}
					break;
				case 18:
					delta = Math.ceil(Math.random()*3);
					break;
				default:
					delta = 0;
				}
				//getMin(t.c, char)

				min = template.characteristics[char].nDice + template.characteristics[char].mod;

				if(char == "int" || char == "siz"){
					max = template.characteristics[char].value.current;
				}else if(char == "dex" || char == "pow" || char == "cha"){
					max = (template.characteristics[char].nDice * template.characteristics[char].szDice) + template.characteristics[char].mod+ template.characteristics[char].nDice;
				}else{
					max = maxAry.sort(function(a,b){return b-a})[0];
				}
				if(template.characteristics[char].nDice == 0){max =0;}
				if(template.characteristics[char].value.current + delta < min){
					template.characteristics[char].value.current = min;
				}else if((template.characteristics[char].value.current + delta > max && rslt1 == 18 && max > 0) || template.characteristics[char].value.current + delta <= max ){
					template.characteristics[char].value.current = template.characteristics[char].value.current + delta;
				}else{
					template.characteristics[char].value.current = max;
				}	
				alert = alert + " rslt1:"+rslt1+" delta:"+delta+" min"+min+" max:"+max+ " End: "+ template.characteristics[char].value.current+  "nDice: "+template.characteristics[char].nDice+"\n<br/>";
			}
			if(expLvls[el] == level){
				el = expLvls.length;
			}
		}
	//	window.alert("jsRQSkills.updateCharacteristics: "+alert);
		return template;
	}catch(err){
		window.alert( "Error: jsRQSkills.updateCharacteristics: "+err);
	}
}

function updateDragonewt(template, level, document){
	try{
		var equip = {};
		var equipAry = ["melee","melee1","0"];
		var subTxt = "";
		var subType = "";
		
	switch(level){
	case "Beaked":
		template.body.type="Dragonewt";
		template.body.naturalArmor = 3;
		template.body.hitLocations = setHitLocations(template.body.type, template.body.naturalArmor);
		template.characteristics.str.value.current = template.characteristics.str.value.base+12;
		template.characteristics.con.value.current = template.characteristics.con.value.base+6;
		template.characteristics.siz.value.current = template.characteristics.siz.value.base+12;
		if(template.characteristics.dex.value.current <9){template.characteristics.dex.value.current=9;}
		if(template.characteristics.str.value.current > 12 && template.characteristics.dex.value.current >8){
			equip = getEquipByValue("melee", "1HKlanth");
			subType = "1H Sword";
		}else{
			equip = getEquipByValue("melee", "2HKlanth");
			subType = "2H Sword";
		}
		subTxt = subType+", "+equip.name;
		equipAry.push(subType,equip.ap,equip.enc,equip.attack,equip.parry,equip.minStr,equip.minDex,equip.damage,equip.sr, subTxt);
		template = setEquipment(0, equipAry, template, document, "melee");
//		template.skills.set = setAddIndividualSkill(template.skills.set, skillsObjAry);
		break;
	case "Tailed Priest":
		template.body.naturalArmor = 2;
		template.body.type="Dragonewt";
		template.body.hitLocations = setHitLocations(template.body.type, template.body.naturalArmor);
		template.characteristics.str.value.current = template.characteristics.str.value.base+6;
		template.characteristics.con.value.current = template.characteristics.con.value.base+6;
		template.characteristics.siz.value.current = template.characteristics.siz.value.base+6;
		if(template.characteristics.pow.value.current <18){template.characteristics.pow.value.current=18;}
		equip = getEquipByValue("melee", "2hAxePole");
		subType = "2H Axe";
		subTxt = subType+", "+equip.name;
		equipAry.push(subType,equip.ap,equip.enc,equip.attack,equip.parry,equip.minStr,equip.minDex,equip.damage,equip.sr, subTxt);
		template = setEquipment(0, equipAry, template, document, "melee");
		break;
	case "Full Priest":
		template.body.naturalArmor = 5;
		template.body.type="Humanoid";
		template.body.hitLocations = setHitLocations(template.body.type, template.body.naturalArmor);
		template.characteristics.str.value.current = (template.characteristics.str.value.base+6)*2;
		template.characteristics.con.value.current = template.characteristics.con.value.base+6;
		template.characteristics.siz.value.current = (template.characteristics.siz.value.base+6)*2;
		if(template.characteristics.pow.value.current <18){template.characteristics.pow.value.current=18;}
		break;
	case "Inhuman King":
		template.body.naturalArmor = 5;
		template.body.type="Inhuman King";
		template.body.hitLocations = setHitLocations(template.body.type, template.body.naturalArmor);
		template.characteristics.str.value.current = (template.characteristics.str.value.base+6)*2;
		template.characteristics.con.value.current = template.characteristics.con.value.base+6;
		template.characteristics.siz.value.current = (template.characteristics.siz.value.base+6)*2;
		if(template.characteristics.pow.value.current <18){template.characteristics.pow.value.current=18;}
		break;
	default:
		template.body.naturalArmor = 1;
	template.body.type="Dragonewt";
	template.body.hitLocations = setHitLocations(template.body.type, template.body.naturalArmor);
		for(var char in template.characteristics){
			template.characteristics[char].value.current = template.characteristics[char].value.base;
		}
	break;
	}
	return template;
	}catch(err){
		window.alert("jsRQSkills.updateDragonewt "+level+" "+err);
	}
}

function getSkillList(listName){
	try{
		//skillObj {name:"", type:"", base:5, pClass:3}
		//type: k = knowledge, m = manipulation, p = perception, o = oratory, s = stealth
		//pClass - proficiency class: 0 = best, 1 = -10% 2 = -20%, 3 = -30%, 4 = base
		var r = [];
		var skillLists = {
			sentient:[{name:"Acting", type:"k", base:5, pClass:4, current:0,  adj:5},
			          {name:"Bargaining", type:"o", base:5, pClass:4, current:0,  adj:0},
			          {name:"Boating", type:"m", base:10, pClass:4, current:0,  adj:10},
			          {name:"Bribery",type:"k", base:5, pClass:4, current:0,  adj:0}, 
			          {name:"Camouflage",type:"s", base:10, pClass:4, current:0,  adj:0}, 
			          {name:"Dancing",type:"m", base:10, pClass:4, current:0,  adj:10}, 
			          {name:"Disguise", type:"k", base:5, pClass:4, current:0,  adj:0},
			          {name:"Evaluate Treasure", type:"k", base:5, pClass:4, current:0,  adj:0},
			          {name:"Fast Talk", type:"o", base:20, pClass:4, current:0,  adj:0},
			          {name:"Feign Death", type:"m", base:10, pClass:4, current:0,  adj:0},
			          {name:"Hide Item", type:"m", base:10, pClass:4, current:0,  adj:0},
			          {name:"Identify Mineral", type:"p", base:5, pClass:4, current:0,  adj:15},
			          {name:"Identify Plant", type:"p", base:5, pClass:4, current:0,  adj:15},
			          {name:"Know Locks", type:"k", base:5, pClass:4, current:0,  adj:5},
			          {name:"Map Making", type:"m", base:10, pClass:4, current:0,  adj:0},
			          {name:"Masonry", type:"m", base:10, pClass:4, current:0,  adj:15},
			          {name:"Net Making", type:"m", base:5, pClass:4, current:0,  adj:15},
			          {name:"Pick Pockets", type:"s", base:5, pClass:4, current:0,  adj:0},
			          {name:"Riding", type:"m", base:5, pClass:4, current:0,  adj:0},
			          {name:"Sailing", type:"m", base:5, pClass:4, current:0,  adj:5},
			          {name:"Shadowing", type:"s", base:10, pClass:4, current:0,  adj:0},
			          {name:"Singing", type:"o", base:5, pClass:4, current:0,  adj:0},
			          {name:"Trap", type:"p", base:5, pClass:4, current:0,  adj:0},
			          {name:"Streetwise", type:"p", base:5, pClass:4, current:0,  adj:0},
			          {name:"Swim", type:"m", base:15, pClass:4, current:0,  adj:0},
			          {name:"Tracking", type:"p", base:10, pClass:4, current:0,  adj:0},
			          {name:"Trap Set/Disarm", type:"m", base:5, pClass:4, current:0,  adj:0},
			          {name:"Tumbling", type:"m", base:15, pClass:4, current:0,  adj:0},
			          {name:"Voice Mimicry", type:"o", base:5, pClass:4, current:0,  adj:5}
			          ],
			animal:[{name:"Climbing",type:"m", base:15, pClass:30, current:0},
			          {name:"Hide in Cover", type:"s", base:5, pClass:4, current:0,  adj:0},
			          {name:"Jumping", type:"m", base:15, pClass:4, current:0,  adj:0},
			          {name:"Listen", type:"p", base:25, pClass:20, current:0,  adj:0},
			          {name:"Move Quietly", type:"s", base:5, pClass:4, current:0,  adj:0},
			          {name:"Spot Hidden", type:"p", base:5, pClass:20, current:0,  adj:0}],
		    baboon:[{name:"Tracking", type:"p", base:30, pClass:10, current:0,  adj:0},
		            {name:"Spot Hidden", type:"p", base:25, pClass:10, current:0,  adj:0},
			        {name:"Spot Trap", type:"p", base:25, pClass:10, current:0,  adj:0},
			        {name:"Move Quietly", type:"s", base:25, pClass:10, current:0,  adj:0}],
		    bearwalker:[{name:"Track by Smell", type:"p", base:55, pClass:10, current:0,  adj:0},
		            {name:"Spot Hidden", type:"p", base:55, pClass:10, current:0,  adj:0},
			        {name:"Spot Trap", type:"p", base:55, pClass:10, current:0,  adj:0},
			        {name:"Move Quietly", type:"s", base:55, pClass:10, current:0,  adj:0},
			        {name:"Hide in Cover", type:"s", base:45, pClass:10, current:0,  adj:0}],
	       centaur:[{name:"Play Lyre", type:"m", base:76, pClass:10, current:0,  adj:0},
	                {name:"Tracking", type:"p", base:50, pClass:10, current:0,  adj:0}],		
		   duck:[{name:"Swim", type:"m", base:90, pClass:0, current:0,  adj:0},
			     {name:"Hide in Cover", type:"s", base:40, pClass:10, current:0,  adj:0}],
		   dwarf:[{name:"Armor", type:"m", base:40, pClass:10, current:0,  adj:0},
		          {name:"Spot Hidden", type:"p", base:25, pClass:10, current:0,  adj:0},
		    	  {name:"Spot Trap", type:"p", base:50, pClass:10, current:0,  adj:0},
		    	  {name:"Evaluate Treasure", type:"k", base:50, pClass:10, current:0,  adj:0},
		    	  {name:"Trap Set/Disarm", type:"m", base:50, pClass:10, current:0,  adj:0}],
		   dragonewt:[{name:"Camouflage",type:"s", base:25, pClass:10, current:0,  adj:0},
		              {name:"Move Quietly", type:"s", base:25, pClass:10, current:0,  adj:0},
    			      {name:"Hide in Cover", type:"s", base:25, pClass:10, current:0,  adj:0}],
    	   dryad:[{name:"Spot Plant", type:"p", base:50, pClass:10, current:0,  adj:0},
		          {name:"Listen", type:"p", base:25, pClass:20, current:0,  adj:0}],
           elf:[{name:"Spot Hidden", type:"p", base:30, pClass:10, current:0,  adj:0}],
           jackobear:[{name:"Move Quietly", type:"s", base:25, pClass:10, current:0,  adj:0},
    			      {name:"Hide in Cover", type:"s", base:25, pClass:10, current:0,  adj:0}],
		   netwling:[{name:"Swim", type:"m", base:80, pClass:10, current:0,  adj:0},
		             {name:"Tracking", type:"p", base:50, pClass:10, current:0,  adj:0},
		             {name:"Hide in Cover", type:"s", base:50, pClass:10, current:0,  adj:0},
			    	  {name:"Spot Trap", type:"p", base:40, pClass:10, current:0,  adj:0}],
           ogre:[{name:"Move Quietly", type:"s", base:35, pClass:10, current:0,  adj:0},
                 {name:"Disguise", type:"k", base:50, pClass:10, current:0,  adj:0}],
  		   pixie:[{name:"Move Quietly", type:"s", base:50, pClass:10, current:0,  adj:0},
  		          {name:"Trap Set/Disarm", type:"m", base:40, pClass:10, current:0,  adj:0}],	
           scorpionman:[{name:"Climbing",type:"m", base:50, pClass:10, current:0},
		          {name:"Trap Set/Disarm", type:"m", base:40, pClass:10, current:0,  adj:0}],
		   tuskrider:[{name:"Tracking", type:"p", base:50, pClass:10, current:0,  adj:0},
		              {name:"Camouflage",type:"s", base:40, pClass:10, current:0,  adj:0},
			          {name:"Spot Trap", type:"p", base:50, pClass:10, current:0,  adj:0},
			          {name:"Riding", type:"m", base:90, pClass:10, current:0,  adj:0}],
           windchild:[{name:"Flight", type:"m", base:80, pClass:1, current:0,  adj:0}]
			   
		};
		if(skillLists.hasOwnProperty(listName)){ 
			r = skillLists[listName];
		}else{
			r = Object.keys(skillLists);
		}
		return r;
	}catch(err){
		window.alert("Error: jsSkills.skillList. List name ="+listname+".  "+err);
		return;
	}
}

function setSkillList(t){ 

//	window.alert("jsSKills1 - skill array length: "+t.skills.set.length);
	try{
		//   	 skills:{lists:["sentient", "animal"], set:""},
		var tempList = [];
		var nextList = [];
		var ml = false;
		for(var l in t.skills.lists){
			nextList = getSkillList(t.skills.lists[l]);
			for(var nl in nextList){
				for(var tl in tempList){
					if(tempList[tl].name == nextList[nl].name){
						ml = true;
						if(tempList[tl].base <nextList[nl].base){
							tempList[tl].base = nextList[nl].base;
							tempList[tl].pClass = nextList[nl].pClass;
						}
						//window.alert(tempList[tl].name);
					}
				}
				if(ml == false){
					tempList.push(nextList[nl]);
				}else{
					ml=false;
				}
			}
//			tempList = tempList.concat(getSkillList(t.skills.lists[l]));
		}
		//check to see if bonus skills are in array
		var bonusSkillExists = 0;
		var keyAry= {};
		var skillLists = [];
//		template.skills.set[level][sks].name
		if(t.skills.hasOwnProperty("bonusSkills")){
			for(var b = 0; b < t.skills.bonusSkills.length; b++){
				keyAry = Object.keys(t.skills.bonusSkills[b]);
				for(var sk = 0; sk < tempList.length; sk++){ 
					if(keyAry[0] == tempList[sk].name){
						bonusSkillExists =1;
					}
				}
				if(bonusSkillExists == 0){
					//add to tempList
					skillLists = getSkillList();
					for(var skL = 0; skL < skillLists.length; skL++){
						nextList = getSkillList(skillLists[skL]);
						for(var nl in nextList){
							if(keyAry[0] == nextList[nl].name){
								tempList.push(nextList[nl]);
							}
						}
					}
				}
			}
		}
		//start randomly in the array, so that the best skills don't tend to be front loaded
		var start = Math.floor(Math.random()*tempList.length) ;
		var rollOver = 0;
		var rsl = 0;
		var maxCnt = 1 + Math.ceil(t.characteristics.int.value.base/3);
		var baseSkill = 0;
		var cnt0 = 0;
		var cnt1 = 0;
		var cnt2 = 0;
		var cnt3 = 0;
		var tCnt = 0;
		var maxTot = maxCnt*3;
		var alert = "";
		for(var s = start; s<tempList.length; s++){
			//10% L1, 10% L2, 10% L3, 10% L4 ->  random + base + BaseSkill
			if(tempList[s].type == "k"){baseSkill = t.baseSkills.knowledge;}
			else if(tempList[s].type == "m"){baseSkill = t.baseSkills.manipulation;}
			else if(tempList[s].type == "o"){baseSkill = t.baseSkills.oratory;}
			else if(tempList[s].type == "p"){baseSkill = t.baseSkills.perception;}
			else if(tempList[s].type == "s"){baseSkill = t.baseSkills.stealth;}
			rsl = Math.floor(Math.random()*100) + Number(baseSkill)+ tempList[s].base -tempList[s].adj  ;
			if(rsl > 90 && cnt0 <maxCnt && tCnt < maxTot){tempList[s].pClass = 0; cnt0++; tCnt++; }
			else if(rsl > 80 && cnt1 < maxCnt && tCnt < maxTot){tempList[s].pClass = 20; cnt1++; tCnt++; }
			else if(rsl > 70 && cnt2 < maxCnt && tCnt < maxTot){tempList[s].pClass = 40; cnt2++; tCnt++; }
			else if(rsl > 60  && cnt3 < maxCnt && tCnt < maxTot){tempList[s].pClass = 60; cnt3++; tCnt++; }
			else if(tempList[s].pClass != 4){
				tCnt++;
			}
			// for if not L5, set current skill level
			t.skills.set.push(tempList[s]);//
			//loop back to the beginning of the array and prevent duplication
			if(start > 0 &&  rollOver < 1 && s == tempList.length -1){
				s = -1;
				rollOver = 1;
			}else if(rollOver > 0  && s == start-1){
				s = tempList.length + 1;
			}
		}
		//window.alert("Skills: "+alert+" "+maxTot+" "+maxCnt+" "+cnt0+" "+cnt1+" "+cnt2+" "+cnt3);
		
		return t;
	}catch(err){ 
		window.alert("Error: jsSkills.setSkills "+err);
	}
}

function updateSkillsList(t, el){
	//t - template
	//el - level
	try{
		var bonus = 0;
		var alert = "";
		var keyAry = [];
		for(var skl = 0; skl <t.skills.set.length; skl++){
			if(t.skills.set[skl].pClass != 4){
				if(t.skills.set[skl].type == "k"){bonus = t.baseSkills.knowledge;}
				else if(t.skills.set[skl].type == "m"){bonus = t.baseSkills.manipulation;}
				else if(t.skills.set[skl].type == "o"){bonus = t.baseSkills.oratory;}
				else if(t.skills.set[skl].type == "p"){bonus = t.baseSkills.perception;}
				else if(t.skills.set[skl].type == "s"){bonus = t.baseSkills.stealth;}
				if(t.skills.hasOwnProperty("bonusSkills")){
					for(var b = 0; b < t.skills.bonusSkills.length; b++){
						keyAry = Object.keys(t.skills.bonusSkills[b]);
						if(keyAry[0] == t.skills.set[skl].name){
							bonus = bonus + t.skills.bonusSkills[b][keyAry[0]];
						}
					}
				}
				t.skills.set[skl].current = setSkills(el, bonus, t.skills.set[skl].base, t.skills.set[skl].pClass, t.skills.set[skl].type);
			}
			if(t.skills.hasOwnProperty("bonusSkills")){
				for(var b = 0; b < t.skills.bonusSkills.length; b++){
					keyAry = Object.keys(t.skills.bonusSkills[b]);
					if(keyAry[0] == t.skills.set[skl].name){
						t.skills.set[skl].pClass = 0;
//						window.alert("jsSkills.updateSkillsList: "+keyAry[0]);
						if(t.skills.set[skl].type == "k"){bonus = t.baseSkills.knowledge;}
						else if(t.skills.set[skl].type == "m"){bonus = t.baseSkills.manipulation;}
						else if(t.skills.set[skl].type == "o"){bonus = t.baseSkills.oratory;}
						else if(t.skills.set[skl].type == "p"){bonus = t.baseSkills.perception;}
						else if(t.skills.set[skl].type == "s"){bonus = t.baseSkills.stealth;}
						bonus = bonus + t.skills.bonusSkills[b][keyAry[0]];
						t.skills.set[skl].current = setSkills(el, bonus, t.skills.set[skl].base, t.skills.set[skl].pClass, t.skills.set[skl].type);
					}
				}
			}
		}
		
		
		//window.alert(alert);
		return t;
	}catch(err){
		window.alert("Error jsSkills.updateSkillsList: "+ err);
	}
}


function setAddIndividualSkill(skillset, skillObjList){
	//skillObjList[{name, min}
	try{
		var keys =[];
		var ktxt="";
		var skillObjExistAry = [];
		for(var so in skillObjList){
			skillObjExistAry.push(0);
		}
		for(var s = 0; s < skillset.length; s++){
			for(var e = 0; e < skillObjList.length; e++){
				if(skillset[s].name == skillObjList[e].name){
					if(skillset[s].current < skillObjList[e].min){
						skillset[s].current = skillObjList[e].min;
						skillObjExistAry[e]=1;
						ktxt = ktxt+",B "+skillObjList[e].name+"="+skillObjList[e].min;
//					}else{
//						ktxt = ktxt+",C "+skillObjList[e].name+"="+skillObjList[e].min;
					}
					if(skillset[s].pClass > 1){
						skillset[s].pClass = 1;
					}
				}else{
//					ktxt = ktxt+",D "+skillset[s].name+"="+skillObjList[e].name;
				}
			}
		}
		for(var ex =0; ex < skillObjExistAry.length; ex++){
			if(skillObjExistAry[ex]==0){
//				ktxt = ktxt+",(F) " + ex+"<>"+skillObjList[ex].name;
				var skillLists = getSkillList();
				var thislist = [];
				for(var sl = 0; sl < skillLists.length; sl++){
					thislist = getSkillList(skillLists[sl]);
					for(var tl = 0; tl < thislist.length; tl++){
						if(skillObjList[ex].name.indexOf(thislist[tl].name)> -1){
							thislist[tl].current = skillObjList[ex].min;
							thislist[tl].pClass = 1;
							thislist[tl].name = skillObjList[ex].name;
//		  					ktxt = ktxt+",(A) " + thislist[tl].name+"<>"+skillObjList[ex].name;
							skillset.push(thislist[tl]);
						}
					}
				}
				
			}
		}

//		window.alert("jsSkills.setAddIndividualSkill: "+ktxt);
		return skillset;
	}catch(err){
		window.alert("Error jsSkills.setAddIndividualSkill: "+ err);
	}
}

function setSkillsList2(ts, race, tb, int){
	//ts = template.skills structure Object lists[], set[], required[obj{name, type, base}], prohibited[]
	//race - template.name
	//tb- template.baseSkills {attack:0, parry:0, manipulation:0, stealth:0, perception:0, knowledge:0, oratory:0};
	//int template.characteristics.int
	try{
		//add expereince levels as objects in set
		var test = "";
//		var rnd = 0;
		var obj;
		var explvls = getExperienceLevels(race);
		var skillList = [];
		for(var el = 3; el < explvls.length; el++){
			ts.set.push([explvls[el]]);
			ts.set[explvls[el]] = [];
		}
		//place required skills in set.explvl - 85% lowest, else 2nd lowest
		for(var r = 0; r < ts.required.length; r++){
			if(Math.ceil(Math.random()*20) < 18){
				ts.set[explvls[3]].push(ts.required[r]);
			}else{
				ts.set[explvls[4]].push(ts.required[r]);
			}
		}
		//randomly add skills from lists, do not add prohibited skills
		skillList = getSkillList2(ts.lists, ts.prohibited);
		
		//iterate over required skills and remove from skillList
		if(skillList.length > 0){
			for(var s = 0; s < skillList.length; s++){
				for(var r = 0; r < ts.required.length; r++){
					if(skillList[s].name == ts.required[r].name){
						skillList.splice(s, 1);
					}
				}
			}
		//		window.alert("setSkillsList2 1: "+explvls[3]+" "+ ts.set[explvls[3]].length);
			while(ts.set[explvls[3]].length < 3 && skillList.length > 0){
				//add skills until there are three
				obj = getRandomObj(skillList, "base");
				skillList = removeObj(skillList, obj, "name");
				ts.set[explvls[3]].push(obj);
			}
		//		window.alert("setSkillsList2 2: "+explvls[3]+" "+ ts.set[explvls[3]].length);
		
			//set initial values
			ts.set[explvls[3]] = setSkillLevel([], ts.set[explvls[3]], 0, tb[explvls[3]]);
			for(var el = 4; el < explvls.length; el++){
				//add skills from ts.set[explvls[previous]]
				
				for(var t = 0; t < ts.set[explvls[el-1]].length; t++){
					ts.set[explvls[el]].push(ts.set[explvls[el-1]][t]);
				}
				//add additional skills 1 per level
				// if el = 4, add skills = 4 + Math.floor(int/6)
				while(el == 4 && ts.set[explvls[el]].length <(4+Math.floor(int/6)) && skillList.length > 0 ){
					obj = getRandomObj(skillList, "base");
					skillList = removeObj(skillList, obj, "name");
					ts.set[explvls[el]].push(obj);
				}
				//if el == 5, # skills = 5 + Math.floor(int/4)
				while(el == 5 && ts.set[explvls[el]].length <(5+Math.floor(int/6))&& skillList.length > 0 ){
					obj = getRandomObj(skillList, "base");
					skillList = removeObj(skillList, obj, "name");
					ts.set[explvls[el]].push(obj);
				}
				// else # skills = # skills +1 
				if(el > 5){
					obj = getRandomObj(skillList, "base");
					skillList = removeObj(skillList, obj, "name");
					ts.set[explvls[el]].push(obj);				
				}
				//set skill values		 
		 		//starting with the lowest explvl, generate skill % for each skill
//					window.alert("setSkillList2: "+explvls[el-1]+"> "+explvls[el])
				ts.set[explvls[el]] = setSkillLevel(ts.set[explvls[el-1]], ts.set[explvls[el]], 1, tb[explvls[el]]);
			}
		}
		//change display logic
		

//		for(var el = 3; el < explvls.length; el++){
//			test = test + explvls[el]+"(";
//			for(var t = 0; t < ts.set[explvls[el]].length; t++){
//				test = test + ts.set[explvls[el]][t].name+": "+ts.set[explvls[el]][t].base+", ";
//			}
//			test = test +")";
//		}

//		window.alert("jsSkills.setSkillsList2:" +test);
		return ts;  //future return and replace template.skills
	}catch(err){
		window.alert("Error jsSkills.setSkillsList2: "+ err);
	}
}

function getSkillList2(listNames, prohibited){
	try{
		//skillObj {name:"", type:"", base:5, pClass:3}
		//type: k = knowledge, m = manipulation, p = perception, o = oratory, s = stealth
		//pClass - proficiency class: 0 = best, 1 = -10% 2 = -20%, 3 = -30%, 4 = base
		var resultList = [];
		var prohibit = false;
		var skillObj = {name:"", type:"", base:0};
		var tempSkill;
		var exists = false;
		var skillList = [{name:"Acting", type:"k", list:{sentient:5}},
			          {name:"Bargaining", type:"o", list:{sentient:5}},
			          {name:"Boating", type:"m", list:{sentient:5, civil:10}},
			          {name:"Bribery",type:"k", list:{sentient:5}}, 
			          {name:"Camouflage",type:"s", list:{sentient:10}},
			          {name:"Climbing",type:"m", list:{all:15}}, 
			          {name:"Dancing",type:"m", list:{sentient:10}}, 
			          {name:"Disguise", type:"k", list:{sentient:5}},
			          {name:"Evaluate Treasure", type:"k", list:{sentient:5}},
			          {name:"Fast Talk", type:"o", list:{sentient:20}},
			          {name:"Feign Death", type:"m", list:{sentient:10, all:5}},
			          {name:"Hide in Cover", type:"s", list:{all:5}},
			          {name:"Hide Item", type:"m", list:{sentient:10}},
			          {name:"Identify Mineral", type:"p", list:{sentient:5}},
			          {name:"Identify Plant", type:"p", list:{sentient:5}},
			          {name:"Jumping", type:"m", list:{all:15}},
			          {name:"Know Locks", type:"k", list:{sentient:5}},
			          {name:"Listen", type:"p", list:{all:25}},
			          {name:"Map Making", type:"m", list:{sentient:15}},
			          {name:"Masonry", type:"m", list:{sentient:5, civil:10}},
			          {name:"Move Quietly", type:"s", list:{all:5}},
			          {name:"Net Making", type:"m", list:{sentient:5}},
			          {name:"Pick Pockets", type:"s", list:{sentient:5}},
			          {name:"Riding", type:"m", list:{sentient:5}},
			          {name:"Sailing", type:"m", list:{sentient:5}},
			          {name:"Shadowing", type:"s", list:{sentient:10}},
			          {name:"Singing", type:"o", list:{sentient:5}},
			          {name:"Spot Hidden", type:"p", list:{all:5}},
			          {name:"Trap", type:"p", list:{sentient:5}},
			          {name:"Streetwise", type:"p", list:{sentient:5}},
			          {name:"Swim", type:"m", list:{sentient:15}},
			          {name:"Tracking", type:"p", list:{sentient:10}},
			          {name:"Trap Set/Disarm", type:"m", list:{sentient:5}},
			          {name:"Tumbling", type:"m", list:{sentient:15}},
			          {name:"Voice Mimicry", type:"o", list:{sentient:5}}
			          ];
		for(var ln = 0; ln < listNames.length; ln++){
			for(var s = 0; s < skillList.length; s++){
				if(skillList[s].list.hasOwnProperty(listNames[ln])){
					prohibit = false;
//					window.alert("jsSkills.getskillList2 - List Names: "+listNames.length);
//					window.alert("jsSkills.getskillList2 - Skill List: "+skillList.length);
//					window.alert("jsSkills.getskillList2 - Prohibited: "+prohibited.length);
					for(var p = 0; p < prohibited.length; p++){
						if(prohibited[p] == skillList[s].name ){
							prohibit = true;
//							window.alert("jsSkills.getskillList2 - Prohibited: "+prohibited[p]+" > "+ skillList[s].name +" "+ prohibit);
						}
					}
//					window.alert("jsSkills.getskillList2 - Prohibited: "+skillList[s].name +" "+ prohibit);
					if(prohibit === false){
						exists = false;
						for(var r = 0; r < resultList.length; r++){
							if(resultList[r].name == skillList[s].name ){
								resultList[r].base = skillList[s].list[listNames[ln]];
								exists = true;
							}	
						}
						if(exists == false){
							tempSkill = Object.create(skillObj);
							tempSkill.name = skillList[s].name;
							tempSkill.type = skillList[s].type;
							tempSkill.base = skillList[s].list[listNames[ln]];
							resultList.push(tempSkill);
						}

					}
				}
				
			}
		}
		
		return resultList;
	}catch(err){
		window.alert("Error: jsSkills.getskillList2. List name ="+listNames+".  "+err);
		return;
	}
}

function getRandomObj(objAry, weightName){
	//objAry is an array of objects
	//weightName is the object property with a numeric value that is weights the chace of returning each object
	try{
		var totalWght = 0;
		var obj;
		if(weightName == ""){
			totalWght = objAry.length; //equal chance of selecting any object
		}else{
			for(var o = 0; o < objAry.length; o++){
				totalWght = totalWght + objAry[o][weightName];
			}
		}
		var rndVal = Math.floor(Math.random()*totalWght)+1;
		  if( isNaN(rndVal)){
			  rndVal = 0;
		  }
		  for (var o = 0; o < objAry.length; o++){
		   if( !isNaN(objAry[o][weightName])){
		    if(rndVal <= objAry[o][weightName] ){
		     obj = objAry[o];//+"::"+a+"::"+ary.length;
		     o = objAry.length+111;
		    }else{
		     rndVal = rndVal - objAry[o][weightName]; 
		    }
		   }
		  }
//		window.alert("jsSkills.getRandomObj "+ obj.name);
		return obj;
	}catch(err){
		window.alert("Error: jsSkills.getRandomObj.  "+err);
		return;
	}
}

function removeObj(objAry, obj, match){
	//objAry list of objects
	//obj an object in objAry
	//match - the object property to match on
	try{
		for(var o = 0; o < objAry.length; o++){
			if(objAry[o][match] == obj[match]){ objAry.splice(o, 1);}
		}
		return objAry;
	}catch(err){
		window.alert("Error: jsSkills.removeObj.  "+err);
		return;
	}
}

function setSkillLevel(prevObjAry, curObjAry, step, baseSkills){
	//prevObjAry - the previous skill array
	//curObjAry - the current skill array
	//step - number of increments the previous skills should be advanced
	//baseSkills - template.baseSkills
	try{
		var skillObj = {name:"", type:"", base:0};
		var objAry = [];
		var tObj;
		var txt = "";
		var cx = -1;
		var px = -1;
		var newSkill = false;
		for(var c = 0; c < curObjAry.length; c++){
			txt = txt+c+":"+ curObjAry[c].name+", ";
		}

		if(step == 0){
			for(var c = 0; c < curObjAry.length; c++){
				cx = c;
				window.alert("setSkillLevel 1: "+curObjAry.length+" "+c+" "+curObjAry[c].name);
				tObj = Object.create(skillObj);
				tObj.base = curObjAry[c].base+getBaseSkillModifier(curObjAry[c].type, baseSkills);
				tObj.name = curObjAry[c].name;
				tObj.type = curObjAry[c].type;
				objAry.push(tObj);
				txt = txt+c+":"+ curObjAry[c].name+", ";
				window.alert("setSkillLevel 2: "+curObjAry.length+" "+c+" "+curObjAry[c].name);
			}
		}else{
			for(var c = 0; c < curObjAry.length; c++){
				newSkill = true;
				window.alert("setSkillLevel 3: "+curObjAry.length+" "+c+" "+curObjAry[c].name+" "+txt);
				cx = c;
				for(var p = 0; p < prevObjAry.length; p++){
					px = p;
					window.alert(cx+":"+px);
					if(prevObjAry[p] !== undefined){
					window.alert("setSkillLevel 4: "+prevObjAry.length+" "+p+" "+prevObjAry[p].name);
						if(prevObjAry[p].name == curObjAry[c].name ){
							newSkill = false;
							for(var i = 0; i < step; i++){
								prevObjAry[p].base = prevObjAry[p].base+getRandomSkillIncrease();
								
							}
							tObj = Object.create(skillObj);
							tObj.base = prevObjAry[p].base;
							tObj.name = prevObjAry[p].name;
							tObj.type = prevObjAry[p].type;
							objAry.push(tObj);
//							window.alert("setSkillLevel 5: "+prevObjAry.length+" "+p+" "+prevObjAry[p].name);
						}
					}
				}
				if(newSkill == true){
//					window.alert("setSkillLevel 6: "+curObjAry.length+" "+c+" "+curObjAry[c].name);
					tObj = Object.create(skillObj);
					tObj.base = curObjAry[c].base+getBaseSkillModifier(curObjAry[c].type, baseSkills);
					tObj.name = curObjAry[c].name;
					tObj.type = curObjAry[c].type;
					objAry.push(tObj);
//					window.alert("setSkillLevel 7: "+curObjAry.length+" "+c+" "+curObjAry[c].name);
				}
			}
		}
		
		return objAry;
	}catch(err){
		window.alert("Error: jsSkills.setSkillLevel.  "+err+" "+txt+" Cur:"+cx+"/"+curObjAry.length+" Prv:"+px+"/"+prevObjAry.length);
		return;
	}
}

function getBaseSkillModifier(type, baseSkills){
	//type = skill type
	//baseSkills = template.baseSkills
	try{
		var bonus = 0;
		if(type == "k"){bonus = baseSkills.knowledge;}
		else if(type == "m"){bonus = baseSkills.manipulation;}
		else if(type == "o"){bonus = baseSkills.oratory;}
		else if(type == "p"){bonus = baseSkills.perception;}
		else if(type == "s"){bonus = baseSkills.stealth;}
		return bonus;
	}catch(err){
		window.alert("Error: jsSkills.getBaseSkillModifier.  "+err);
		return;
	}
}

function getRandomSkillIncrease(){
	try{
		var rndVal = Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6);
		var inc = 0;
		if(rndVal < 3){
			inc = -5;
		}else if(rndVal < 5){
			inc = 0;
		}else if(rndVal < 9){
			inc = 15;
		}else if(rndVal < 11){
			inc = 10;
		}else{
			inc = 20;
		}
		return inc;
	}catch(err){
		window.alert("Error: jsSkills.getRandomSkillIncrease.  "+err);
		return;
	}
}
