/**
 * http://usejsdoc.org/
 */
function setRQBackground(){
	try{
		var bgRoll = jsDieRoller(1,100);
		var bkgrnd = {};
		if(bgRoll < 26){
			bkgrnd = {name:"Peasant", money:0, stipend:0, equipment:[["Clothes", 0], ["Adventurer's Pack", .2], ["Armor, Hauberk, Leather", 0], ["Armor, Pants, Leather", 0], ["Armor, Sleeves, Leather", 0],["Armor, Helm, Hood", 0]]};
			bkgrnd.money = jsDieRoller(1,100);
			bkgrnd.culture = getCulture();
		}else if(bgRoll < 61){
			bkgrnd = {name:"Townsman", money:0, stipend:0,  equipment:[["Clothes", 0], ["Adventurer's Pack", .2], ["Armor, Hauberk, Leather", 0], ["Armor, Pants, Leather", 0], ["Armor, Sleeves, Leather", 0],["Armor, Helm, Hood", 0]]};
			bkgrnd.money = jsDieRoller(2,100);
			bkgrnd.culture = getCulture();
		}else if(bgRoll < 86){
			bkgrnd = {name:"Barbarian", money:0, stipend:0,  equipment:[["Clothes", 0], ["Adventurer's Pack", .2], ["Armor, Hauberk, Thick Leather", 1], ["Armor, Pants, Leather", 0], ["Armor, Sleeves, Leather", 0],["Armor, Helm, Hood", 0],["Weapon, Broadsword", 1] ]};
			bkgrnd.money = jsDieRoller(1,100);
			bkgrnd.culture = getBarbarianCulture();
		}else if(bgRoll < 96){
			bkgrnd = {name:"Poor Noble", money:0, stipend:1, equipment:[["Clothes", 0], ["Adventurer's Pack", .2], ["Armor, Hauberk, Leather", 0], ["Armor, Pants, Leather", 0], ["Armor, Sleeves, Leather", 0],["Armor, Helm, Hood", 0], ["Armor, Hauberk, Ring Mail", 2], ["Armor, Helm, Open Helm", 1], ["Weapon, Broadsword", 1], ["Weapon, Javelin", 2] ]};
			bkgrnd.money = jsDieRoller(5,100);
			bkgrnd.culture = getCulture();
		}else if(bgRoll < 100){
			bkgrnd = {name:"Rich Noble", money:0, stipend:1, equipment:[["Clothes", 0], ["Adventurer's Pack", .2], ["Armor, Hauberk, Leather", 0], ["Armor, Pants, Leather", 0], ["Armor, Sleeves, Leather", 0],["Armor, Helm, Hood", 0], ["Armor, Hauberk, Chainmail", 2], ["Armor, Pants, Chainmail", 3], ["Armor, Sleeves, Chainmail", 2], ["Armor, Helm, Closed Helm", 1], ["Weapon, Broadsword", 1], ["Weapon, Javelin", 2] ]};
			bkgrnd.money = jsDieRoller(10,100);
			bkgrnd.culture = getCulture();
		}else {
			bkgrnd = {name:"Very Rich Noble", money:0, stipend:1, equipment:[["Clothes", 0], ["Adventurer's Pack", .2], ["Armor, Hauberk, Leather", 0], ["Armor, Pants, Leather", 0], ["Armor, Sleeves, Leather", 0],["Armor, Helm, Hood", 0], ["Armor, Hauberk, Chainmail", 2], ["Armor, Pants, Chainmail", 3], ["Armor, Sleeves, Chainmail", 2], ["Armor, Helm, Closed Helm", 1], ["Weapon, Broadsword", 1], ["Weapon, Javelin", 2] ]};
			bkgrnd.money = jsDieRoller(20,100);
			bkgrnd.culture = getCulture();
		}
		bkgrnd.personName = setRQName(name, bkgrnd.culture.name);
		return bkgrnd;
	}catch(err){
		return " Error in js.RQBackground.setRQBackground "+err.message;
	}
}
function getCulture(){
	try{
		var culture={name:"", lang1:"", lang2:""};
		var cultureRoll = jsDieRoller(1,100);
		var langRoll = jsDieRoller(1,100);
		if(cultureRoll < 31){
			culture.name = "Sartarite";
			culture.lang1 = "Sartarite";
			if(langRoll < 67){
				culture.lang2= "Tradetalk";
			}else if(langRoll < 95){
				culture.lang2= "Praxian";
			}else{
				culture.lang2= "Old Pavic";
			}
		}else if(cultureRoll < 46){
			culture.name = "Pavic";
			culture.lang1 = "Old Pavic";
			if(langRoll < 67){
				culture.lang2= "Tradetalk";
			}else if(langRoll < 95){
				culture.lang2= "Praxian";
			}else{
				culture.lang2= "Sartarite";
			}
		}else if(cultureRoll < 51){
			culture.name = "Yelmalion";
			culture.lang1 = "Sartarite";
			if(langRoll < 67){
				culture.lang2= "Praxian";
			}else if(langRoll < 95){
				culture.lang2= "Tradetalk";
			}else{
				culture.lang2= "Old Pavic";
			}
		}else if(cultureRoll < 54){
			culture.name = "Carmanian";
			culture.lang1 = "Carmanian";
			if(langRoll < 67){
				culture.lang2= "New Pelorian";
			}else if(langRoll < 95){
				culture.lang2= "Tradetalk";
			}else{
				culture.lang2= "Praxian";
			}
		}else if(cultureRoll < 61){
			culture.name = "Talastar";
			culture.lang1 = "Old Pelorian";
			if(langRoll < 67){
				culture.lang2= "New Pelorian";
			}else if(langRoll < 95){
				culture.lang2= "Tradetalk";
			}else{
				culture.lang2= "Sartarite";
			}
		}else if(cultureRoll < 64){
			culture.name = "Redlands";
			culture.lang1 = "New Pelorian";
			if(langRoll < 67){
				culture.lang2= "Old Pelorian";
			}else if(langRoll < 95){
				culture.lang2= "Tradetalk";
			}else{
				culture.lang2= "Sartarite";
			}
		}else{
			culture.name = "Native Fisherman";
			culture.lang1 = "Old Pavic";
			if(langRoll < 67){
				culture.lang2= "Riverspeech";
			}else if(langRoll < 95){
				culture.lang2= "Tradetalk";
			}else{
				culture.lang2= "Sartarite";
			}
		}
		return culture;
	}catch(err){
		return "Error in jsRQBackground.getCulture " + err.message;
	}
}

function getBarbarianCulture(){
	try{
		var culture={name:"", lang1:"", lang2:""};
		var cultureRoll = jsDieRoller(1,100);
		var cultureRoll2 = jsDieRoller(1,100);
		var langRoll = jsDieRoller(1,100);
		if(cultureRoll < 24){
			culture.name = "Impala";
			culture.lang1 = "Praxian";
			if(langRoll < 67){
				culture.lang2= "Tradetalk";
			}else if(langRoll < 95){
				culture.lang2= "Sartarite";
			}else{
				culture.lang2= "Esrolian";
			}
		}else if(cultureRoll < 40){
			culture.name = "High Lama";
			culture.lang1 = "Praxian";
			if(langRoll < 67){
				culture.lang2= "Tradetalk";
			}else if(langRoll < 95){
				culture.lang2= "Sartarite";
			}else{
				culture.lang2= "Esrolian";
			}
		}else if(cultureRoll < 79){
			culture.name = "Sable";
			culture.lang1 = "Praxian";
			if(langRoll < 67){
				culture.lang2= "New Pelorian";
			}else if(langRoll < 95){
				culture.lang2= "Tradetalk";
			}else{
				culture.lang2= "Sartarite";
			}
		}else if(cultureRoll < 95){
			culture.name = "Bison";
			culture.lang1 = "Praxian";
			if(langRoll < 67){
				culture.lang2= "Tradetalk";
			}else if(langRoll < 95){
				culture.lang2= "Sartarite";
			}else{
				culture.lang2= "New Pelorian";
			}
		}else{
			if(cultureRoll2 < 4){
				culture.name = "Zebra Rider";
				culture.lang1 = "Old Pavic";
				if(langRoll < 67){
					culture.lang2= "New Pelorian";
				}else if(langRoll < 95){
					culture.lang2= "Tradetalk";
				}else{
					culture.lang2= "Sartarite";
				}
			}else if(cultureRoll2 < 7){
				culture.name = "Unicorn Rider";
				culture.lang1 = "Sartarite";
				if(langRoll < 67){
					culture.lang2= "Tradetalk";
				}else if(langRoll < 95){
					culture.lang2= "Praxian";
				}else{
					culture.lang2= "New Pelorian";
				}
			}else if(cultureRoll2 < 37){
				culture.name = "Pol Joni";
				culture.lang1 = "Sartarite";
				if(langRoll < 67){
					culture.lang2= "Tradetalk";
				}else if(langRoll < 95){
					culture.lang2= "Praxian";
				}else{
					culture.lang2= "New Pelorian";
				}
			}else if(cultureRoll2 < 43){
				culture.name = "Bolo Lizard Folk";
				culture.lang1 = "Praxian";
				if(langRoll < 67){
					culture.lang2= "Tradetalk";
				}else if(langRoll < 95){
					culture.lang2= "Sartarite";
				}else{
					culture.lang2= "Esrolian";
				}
			}else if(cultureRoll2 < 45){
				culture.name = "Ostrich Clan";
				culture.lang1 = "Praxian";
				if(langRoll < 67){
					culture.lang2= "Tradetalk";
				}else if(langRoll < 95){
					culture.lang2= "New Pelorian";
				}else{
					culture.lang2= "Sartarite";
				}
			}else{
				culture.name = "Rhinoceros Tribe";
				culture.lang1 = "Praxian";
				if(langRoll < 67){
					culture.lang2= "Tradetalk";
				}else if(langRoll < 95){
					culture.lang2= "Sartarite";
				}else{
					culture.lang2= "Esrolian";
				}
			}
		}
		return culture;
	}catch(err){
		return "Error in jsRQBackground.getCulture " + err.message;
	}
}
function setRQName(sc, culture){
	try{
		var soc = 0;
		var cult = 1;
		if(sc === "Peasant" || sc === "Barbarian"|| sc === "Native Fisherman"){
			soc = 8;
		}else if(sc === "Townsman"){
			soc = 6;
		}else if(sc === "Poor Noble"){
			soc = 6;
		}else if(sc === "Rich Noble"){
			soc = 2;
		}else{
			soc = 1;
		}
		
		if(culture = "Sartarite"){
			cult = 3;
		}else if(culture = "Pavic"){
			cult = 3;
		}else if(culture = "Yelmalion"){
			cult = 2;
		}else if(culture = "Carmanian"){
			cult = 1;
		}else if(culture = "Talastar"){
			cult = 2;
		}else if(culture = "Redlands"){
			cult = 1;
		}else{
			cult = 3;
		}
		
		if(sc === "Barbarian"){
			cult = 3;
		}


		return generateName(soc, 0, cult);
	}catch(err){
		return "Error in jsRQBackground.setRQName " + err.message + "> "+sc+"> "+culture;
	}
}