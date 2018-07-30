/**
 * http://usejsdoc.org/
 */
/**
 * Utilities to create an NPC stat block
		
		 * [Weapons]
		 * [Spells]
		 * [Equipment]
 */
function buildRQNPC(level, sc){
	try{
		var npc= {name:"", 	str : 0,	con :0, sz : 0,	iq : 0,	pow : 0,	dex : 0,	cha : 0,
				atkBonus : 0,	parryBonus : 0, defense : 0,	hp : 0, damageBonus: 0,	
				knowledgeBonus : 0, stealthBonus : 0, manipulationBonus: 0, 
				socialClass: "Mystery", moneyGold: 0, moneySilver: 0, moneyCopper: 0, moneyLead: 0, moneyStipend: 0,
				equipment : [], encumbrance: 0, armor:{head:[0,0], lArm: [0,0], rArm:[0,0], chest:[0,0], abd: [0,0], lLeg:[0,0], rLeg:[0,0]},
				errors:""};
		var rtn = "";
		//npc.name = setName();
		//Set attributes
		npc.str = jsDieRoller(3, 6);
		npc.con = jsDieRoller(3, 6);
		npc.sz = jsDieRoller(3, 6);
		npc.iq = jsDieRoller(3, 6);
		npc.pow = jsDieRoller(3, 6);
		npc.dex = jsDieRoller(3, 6);
		npc.cha = jsDieRoller(3, 6);
		//set background
		npc.level = setCultLevelName(level);
		var background = setRQBackground();
		npc.socialClass =  background.name;
		npc.moneySilver = background.money;
		if(background.stipend > 0){
			npc.moneyStipend = background.money;
		}
		npc.culture = background.culture;
		npc.name = background.personName;
		npc.equipment = background.equipment;
		if((background.culture.name ==="Impala" || background.culture.name ==="Bolo Lizard Folk" || background.culture.name ==="Ostrich Clan") && npc.sz > 9 ){
			npc.sz = jsDieRoller(3, 3);
		}
		//calculate abilities
		npc.atkBonus = (setCharBonus(npc.str, 2) + setCharBonus(npc.iq, 1) + setCharBonus(npc.pow, 2) + setCharBonus(npc.dex, 1))*5;
		npc.parryBonus = (setCharBonus(npc.str, 2) + setCharBonus(npc.sz, 4) + setCharBonus(npc.pow, 2) + setCharBonus(npc.dex, 1))*5;
		npc.defense = (setCharBonus(npc.sz, 4) + setCharBonus(npc.iq, 1) + setCharBonus(npc.pow, 2) + setCharBonus(npc.dex, 1))*5;
		npc.hp = npc.con + setCharBonus(npc.sz, 1) + setCharBonus(npc.pow, 2);
		npc.damageBonus = setDamageBonus(npc.str, npc.sz);
		npc.knowledgeBonus = (setCharBonus(npc.iq, 1) + setCharBonus(npc.pow, 2))*5;
		npc.stealthBonus = (setCharBonus(npc.sz, 3) + setCharBonus(npc.iq, 1) + setCharBonus(npc.pow, 4) + setCharBonus(npc.dex, 1))*5; 
		npc.manipulationBonus = (setCharBonus(npc.sz, 2) + setCharBonus(npc.iq, 1) + setCharBonus(npc.pow, 2) + setCharBonus(npc.dex, 1))*5;
		npc.meleeMove = 8; //assumes huanoid
		npc.baseStrikeRank = setBaseStrikeRank(npc.sz, npc.dex);
		//Encumbrance based calculations
		npc.maxEncumbrance = Math.ceil((npc.str+npc.con)/2);
		if(npc.maxEncumbrance > npc.str){npc.maxEncumbrance > npc.str;}
		npc.encumbrance = setEncumbrance(npc.encumbrance, npc.equipment);
		if(npc.encumbrance > npc.maxEncumbrance){ 
			npc.meleeMove = npc.meleeMove - Math.ceil(npc.encumbrance-npc.maxEncumbrance);
			npc.defense = npc.defense -(Math.ceil(npc.encumbrance-npc.maxEncumbrance)*5);
			npc.baseStrikeRank = npc.baseStrikeRank + Math.ceil(npc.encumbrance-npc.maxEncumbrance)
		}
		npc.armor = setArmor(npc.armor, npc.equipment, npc.hp, "Humanoid");
		//adjust defense
		if(npc.defense < 0){npc.defense =0;}
		var tName=npc.name.split(" ");
		npc.cult = setRQCult(npc.culture.name, sc, tName[tName.length-1]);
		npc.cult.skills = getCultSkills(npc.cult.name, npc.str, npc.dex);
		rtn = formatNPCResponse(npc, background)+"<br />"+level+ " "+sc;
		delete npc;
		return rtn;
	}catch(err){
		return "Error in Build NPC: "+err.message;
	}
}
function jsDieRoller(nD, szD){
	try{
		var total = 0;
		for(var d = 0; d< nD; d++){
			total = total+Math.floor(Math.random()*szD)+1;
		}
		return total;
	}catch(err){
		return "Error in jsDieRoller: #Dice:"+nD+"  # Sides:"+szD+"  "+err.message;
	}
}

function countOccurances(ary, val){
	try{
		var cnt = 0;
		for(var c = 0; c<ary.length;c++){
			if(ary[c]===val){
				cnt = cnt+1;
			}
		}
		return cnt;
	}catch(err){
		return "Error in countOccurances: "+err.message;
	}
}

function formatNPCResponse(npc){
	try{
		var patt1 = /^Armor/;
		var patt2 = /^Weapon/;
		var strList = [];
		var tEquip = "";
		var rtn = "<table style=\"font-size: 75%;\">";
		rtn = rtn+"<tr><td>"+npc.name+" "+npc.culture.name+"  "+npc.socialClass+",  "+npc.level+" of "+npc.cult.name+" " +"</td></tr>";
		rtn = rtn+"<tr><td>Move "+npc.meleeMove+" POW "+npc.pow+ " Defense "+ npc.defense+"</td></tr>";
		rtn = rtn+"<tr><td>Head      "+npc.armor.head[0]+"/"+npc.armor.head[1]+"</td></tr>";
		rtn = rtn+"<tr><td>Left Arm  "+npc.armor.lArm[0]+"/"+npc.armor.lArm[1]+"</td></tr>";
		rtn = rtn+"<tr><td>Right Arm "+npc.armor.rArm[0]+"/"+npc.armor.rArm[1]+"</td></tr>";
		rtn = rtn+"<tr><td>Chest     "+npc.armor.chest[0]+"/"+npc.armor.chest[1]+"</td></tr>";
		rtn = rtn+"<tr><td>Abdomen   "+npc.armor.abd[0]+"/"+npc.armor.abd[1]+"</td></tr>";
		rtn = rtn+"<tr><td>Left Leg  "+npc.armor.lLeg[0]+"/"+npc.armor.lLeg[1]+"</td></tr>";
		rtn = rtn+"<tr><td>Right Leg "+npc.armor.rLeg[0]+"/"+npc.armor.rLeg[1]+"</td></tr>";
		rtn = rtn +"<tr><td>Perception "+npc.knowledgeBonus+"% Stealth Bonus "+ npc.stealthBonus+ "% Manipulation Bonus "+ npc.manipulationBonus+ "% Knowledge Bonus "+ npc.knowledgeBonus+"%</td></tr>";
		if(npc.cult.skills.weapons.length != NaN){
			rtn = rtn +"<tr><td>Weapons:<br/>";
			for( var i = 0; i < npc.cult.skills.weapons.length ; i++){
				rtn = rtn + npc.cult.skills.weapons[i].name +"<br/>"
			}
			rtn = rtn+"</td></tr>";
		}
		rtn = rtn+"<tr><td>Equipment: ";
 		for( var i = 0; i < npc.equipment.length ; i++){
 			if(i>0){rtn=rtn+", ";}
 			if(patt1.test(npc.equipment[i][0]) || patt2.test(npc.equipment[i][0])){
 				strList = npc.equipment[i][0].split(",");
 				if(strList[1] !=" Helm"){
 					for(var s = strList.length -1; s > 0; s--){
 						tEquip = tEquip + " "+ strList[s];
 					}
 				}else{
 					tEquip = strList[2];
 				}
 				rtn=rtn+tEquip;
 				tEquip = "";
 			}else{
 				rtn=rtn+npc.equipment[i][0];
 			}
 		}
		rtn = rtn+"</td></tr>";
		rtn = rtn+"<tr><td>Encumbrance "+npc.encumbrance+"</td></tr>";
		rtn = rtn+"<tr><td>ST "+npc.str+"  CON "+npc.con+"  SZ "+npc.sz+"  IQ "+npc.iq+"  POW "+npc.pow+"  DEX "+npc.dex+"  CHA "+npc.cha+"</td></tr>";
		rtn = rtn +"<tr><td>Attack Bonus "+npc.atkBonus+"% Parry Bonus "+ npc.parryBonus+ "% Base Strike Rank "+ npc.baseStrikeRank + "  Hit Points "+ npc.hp+" Damage Bonus "+ npc.damageBonus+"</td></tr>";
		rtn = rtn+"<tr><td>"+npc.moneyGold+"W "+npc.moneySilver+"L "+npc.moneyCopper+"C "+npc.moneyLead+"B</td></tr>";
		if(npc.moneyStipend > 0){rtn =rtn+"<tr><td>"+npc.moneyStipend+" L/year</td></tr>";}
		rtn = rtn+"<tr><td>Languages "+npc.culture.lang1+" "+npc.iq*5+"%  "+npc.culture.lang2+" "+npc.iq*3+"%  ";
		rtn = rtn+"<tr><td>Errors: "+npc.errors+"</td></tr>";
		rtn = rtn+"</table>";
		return rtn;
	}catch(err){
		return "Error in jsNPCCreator.formatResponse: "+err.message;
	}
}

function setCharBonus(char1, pattern){
	//patterns 1 -STrong, 2-Weak, 3 -Reversed Strong, 4- Reversed Week
	try{
	var rtn = 0;
	var char = Math.ceil(char1 /4);
		if((pattern == 2 || pattern == 4) && char != 3){
		rtn = char - 3 - (char-3)/Math.abs(char-3);
	}else{
		rtn = char -3;
	}
	if(pattern > 2){
		rtn = rtn * -1;
	}
	return rtn;
	}catch (err){
		return "Error in jsRQNPCCreator.setCharBonus: " + err.message+" "+ char1;
	}
}

function setDamageBonus(str, sz){
	try{
		var rtn = 0;
		var avg = Math.ceil((str+sz)/2);
		if(avg <7){
			rtn = "-1d4";
		}else if(avg < 13){
			rtn = "none";
		}else if(avg <17){
			rtn = "+1d4";
		}else if(avg < 21){
			rtn = "+1d6";
		}else{
			avg = Math.ceil((avg-20)/8)+1;
			rtn = "+"+avg+"d6";
		}
		return rtn;
	}catch(err){
		return "Error in jsRQNPCCreator.setHP - Level: " + lvl+"  Hit Die: "+hD+"  ConMod: "+cM+"  "+err.message;
	}
}

function setEncumbrance(enc, equip){
	try{
		for( var i = 0; i < equip.length ; i++){
			enc = enc + equip[i][1];
		}
		return enc;
	}catch(err){
		return "Error in jsRQNPCCreator.setEncumbrance " + err.message;
	}
}
function setBaseStrikeRank(sz, dex){
	try{
		var sr = 0;
		sz = parseInt(sz);
		dex = parseInt(dex);
		if(sz < 7){
			sr = sr+3;
		}else if(sz < 15){
			sr = sr+2;
		}else if(sz < 22){
			sr = sr+1;
		}
		
		if(dex < 6){
			sr = sr+5;
		}else if(sz < 9){
			sr = sr+4;
		}else if(sz < 13){
			sr = sr+3;
		}else if(sz < 16){
			sr = sr+2;
		}else if(sz < 19){
			sr = sr+1;
		}
		
		return sr;
	}catch(err){
		return "Error in jsRQNPCCreator.setBaseStrikeRank " + err.message;
	}
}

function setCultLevelName(lvl){
	try{
		var sr = "Potato";
		switch(parseInt(lvl)){
		case 1:
		case 2:
		case 3:
			sr = "Lay Member";
			break;
		case 6:
		case 7:
			sr = "Rune Lord";
			break;
		case 8:
		case 9:
			sr = "Rune Priest";
			break;
		case 10:
			sr = "Rune Lord Priest";
			break;
		default:
			sr = "Initiate";
		}
		return sr;
	}catch(err){
		return "Error in jsRQNPCCreator.setCultLevelName " + err.message+ " " + lvl;
	}
}

function setName(){
	try{
		//set social, gender and culture
		var rndSoc = Math.floor(Math.random()*100);
		if(rndSoc < 16){
			rndSoc = 8;
		}else if(rndSoc < 16){
			rndSoc = 7;
		}else if(rndSoc < 46){
			rndSoc = 6;
		}else if(rndSoc < 61){
			rndSoc = 5;
		}else if(rndSoc < 71){
			rndSoc = 4;
		}else if(rndSoc < 81){
			rndSoc = 3;
		}else if(rndSoc < 96){
			rndSoc = 2;
		}else{
			rndSoc = 1;
		}
		var rndCult = Math.floor(Math.random()*100);
		if(rndCult < 41){
			rndCult = 3;
		}else if(rndCult < 81){
			rndCult = 2;
		}else{
			rndCult = 1;
		}
		return generateName(rndSoc, 0, rndCult);
	}catch(err){
		return "Error in Set Name: "+err.message;
	}
}