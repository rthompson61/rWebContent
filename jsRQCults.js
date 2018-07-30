/**
 * http://usejsdoc.org/
 */
function setRQCult(culture, sc, g){
	try{
		var cult = {name: "Personality"};
		var cSartarite = {male: [[45, "Orlanth"], [10,"Issaries"], [10, "Odayla"], [10, "Humakt"], [5, "Lhankor Mhy"], [15,"Minor"]], 
				female: [[45, "Ernalda"], [10, "Vinga"], [10, "Chalana Arroy"], [5,"Issaries"], [5, "Odayla"], [5, "Humakt"], [5, "Lhankor Mhy"], [10,"Minor"]],
				minor: [[1, "Yinkin"], [1, "Valind"], [1,"Donander"],[3, "Storm Bull"], [1, "Eurmal"], [1, "Geo"],[2, "Uleria"], [1, "Lanbril"],[9,"Other"] ]};
		var cImpala = {male: [[48, "Waha"], [7, "Daka Fal"], [5,"Storm Bull"],[2, "Humakt"], [3, "Seven Mothers"], [13, "Yelmalio"], [2, "Issaries"], [16, "Orlanth"], [4,"Other"]],
				female:[[48, "Eiritha"], [7, "Daka Fal"], [5,"Storm Bull"],[2, "Humakt"], [3, "Seven Mothers"], [13, "Yelmalio"], [2, "Issaries"], [2, "Chalana Arroy"], [16, "Vinga"], [2,"Other"]]};
		var cHighLama = {male: [[74, "Waha"], [3, "Daka Fal"], [5,"Storm Bull"],[5, "Humakt"], [1, "Seven Mothers"], [1, "Yelmalio"], [3, "Issaries"], [5, "Orlanth"],[1,"Zorak Zoran"], [4,"Other"]],
				female:[[74, "Eiritha"], [3, "Daka Fal"], [5,"Storm Bull"],[5, "Humakt"], [1, "Seven Mothers"], [1, "Yelmalio"], [3, "Issaries"],[2, "Chalana Arroy"], [5, "Vinga"],[1,"Xiola Umbar"], [2,"Other"]]};
		var cSable = {male: [[45, "Waha"], [8, "Daka Fal"],  [20, "Seven Mothers"], [15, "Yelmalio"], [2, "Issaries"],[1, "Lhankor Mhy"], [1, "Orlanth"],[3,"Zorak Zoran"], [7,"Other"]],
				female:[[45, "Eiritha"], [8, "Daka Fal"],  [20, "Seven Mothers"], [15, "Yelmalio"], [2, "Issaries"],[1, "Lhankor Mhy"],[2, "Chalana Arroy"], [1, "Vinga"],[3,"Xiola Umbar"], [5,"Other"]]};
		var cBison = {male: [[68, "Waha"], [7, "Daka Fal"], [7,"Storm Bull"],[7, "Humakt"], [1, "Seven Mothers"], [1, "Yelmalio"], [2, "Issaries"], [3, "Orlanth"],[3,"Zorak Zoran"], [4,"Other"]],
				female:[[68, "Eiritha"], [7, "Daka Fal"], [7,"Storm Bull"],[7, "Humakt"], [1, "Seven Mothers"], [1, "Yelmalio"], [2, "Issaries"], [2, "Chalana Arroy"], [3, "Vinga"],[3,"Xiola Umbar"], [2,"Other"]]};
		var cUnicorn = {male: [[10, "Waha"], [2, "Daka Fal"], [2,"Storm Bull"],[2, "Humakt"], [20, "Pavis"], [40, "Yelmalio"], [2, "Issaries"], [4, "Orlanth"], [18,"Other"]],
				female:[[10, "Eiritha"], [2, "Daka Fal"], [2,"Storm Bull"],[2, "Humakt"], [20, "Pavis"], [40, "Yelorna"], [2, "Issaries"], [8, "Chalana Arroy"], [4, "Vinga"], [10,"Other"]]};
		var cZebra = {male: [ [7, "Daka Fal"], [2,"Storm Bull"],[12, "Humakt"], [25, "Pavis"], [17, "Yelmalio"], [5, "Issaries"], [1, "Lhankor Mhy"],[5, "Orlanth"],[26,"Other"]],
				female:[ [7, "Daka Fal"], [2,"Storm Bull"],[12, "Humakt"],  [25, "Pavis"], [17, "Yelmalio"], [5, "Issaries"], [1, "Lhankor Mhy"], [2, "Chalana Arroy"], [5, "Vinga"],[24,"Other"]]};
		var cRhino = {male: [[70, "Waha"], [3, "Daka Fal"], [10,"Storm Bull"],[1, "Humakt"], [1, "Seven Mothers"], [1, "Yelmalio"], [1, "Issaries"], [7, "Orlanth"],[5,"Zorak Zoran"], [2,"Other"]],
				female:[[70, "Eiritha"], [3, "Daka Fal"], [10,"Storm Bull"],[1, "Humakt"], [1, "Seven Mothers"], [1, "Yelmalio"], [1, "Issaries"], [1, "Chalana Arroy"], [7, "Vinga"],[5,"Xiola Umbar"], [1,"Other"]]};
		var cPolJoni = {male: [[17, "Waha"], [4, "Daka Fal"], [7,"Storm Bull"],[7, "Humakt"],  [6, "Yelmalio"], [3, "Issaries"], [2, "Lhankor Mhy"],[3, "Chalana Arroy"],[20, "Orlanth"],[7,"Zorak Zoran"], [17,"Other"]],
				female:[[17, "Eiritha"], [7, "Daka Fal"], [7,"Storm Bull"],[7, "Humakt"],  [6, "Yelmalio"], [3, "Issaries"], [2, "Lhankor Mhy"],[5, "Chalana Arroy"], [20, "Vinga"],[7,"Xiola Umbar"], [17,"Other"]]};
		var cBoloLizard = {male: [[48, "Waha"], [7, "Daka Fal"], [15,"Storm Bull"],[10, "Humakt"], [2, "Seven Mothers"], [1, "Lhankor Mhy"], [8, "Orlanth"],[5,"Zorak Zoran"], [4,"Other"]],
				female:[[48, "Eiritha"], [7, "Daka Fal"], [15,"Storm Bull"],[10, "Humakt"], [2, "Seven Mothers"], [1, "Lhankor Mhy"], [2, "Chalana Arroy"], [8, "Vinga"],[5,"Xiola Umbar"], [2,"Other"]]};
		var cOstrich = {male: [[50, "Waha"], [7, "Daka Fal"], [10,"Storm Bull"],[5, "Humakt"], [7, "Seven Mothers"], [2, "Yelmalio"], [1, "Issaries"], [10, "Orlanth"],[1,"Zorak Zoran"], [7,"Other"]],
				female:[[50, "Eiritha"], [7, "Daka Fal"], [10,"Storm Bull"],[5, "Humakt"], [7, "Seven Mothers"], [2, "Yelmalio"], [1, "Issaries"], [3, "Chalana Arroy"], [10, "Vinga"],[1,"Xiola Umbar"], [4,"Other"]]};
		var cYelm = {male :	[[10, "Yelm"],[10, "Polaris"], [39, "Lodril"], [5, "Chalan Arroy"], [10, "Lokarnos"],
		                   	[10, "Seven Mothers"],[7, "Yelmalio"]],
		                   	 female : [[10, "Dendara"],[10, "Polaris"], [39, "Lodril"], [5, "Chalana Arroy"], [10, "Lokarnos"],
		  		                   	 [10, "Seven Mothers"], [7, "Yelmalio"], [1, "Yelorna"]],
		                   	 minor :[[5, "Ancestors"],[1, "Ratslaff"], [1, "Donandar"], [5, "Orenoar"], [2, "Uleria"], [3, "Golden Bow"], [1, "Lanbril"], [13, "Other"]]};
		var cYelmalion = [[70, "Yelm"], [10, "Bison"], [20,"Yelm"]];
		var cPavis = [[70, "Pavis"], [10, "Yelmalion"], [20,"Sable"]];
		var cZolaFel = [[70, "Zola Fel"], [10, "Yelmalion"], [20,"Ostrich"]];
		var cCarmanian = {male:[[45, "Lodril"], [10, "Daxdarius"],[1, "Uleria"],[20, "Seven Mothers"], [10, "Other"]],
				female:[[45, "Oria"], [10, "Uleria"],[20, "Seven Mothers"], [3, "Chalana Arroy"],[10, "Other"]]};
		var cOther = [ [1, "Argan Argar"], [1, "Bagog"],[1, "Cacodemon"], [1, "Caladra & Aurelion"], [1, "Chalana Arroy"], [1,"Daka Fal"],[1,"Dendara"], [1,"Donander"], [1,"Eiritha"],[1, "Ernalda"], [1, "Foundchild"], [1, "Geo"],[1, "Golden Bow"], [1, "Humakt"],  [1,"Issaries"], 
		               [1, " Krarsht"],  [1, "Lanbril"], [1, "Lhankor Mhy"], [1,"Lodril"],[1, "Lokarnos"], [1,"Mallia"],[1, "Nysalor"], [1, "Odayla"], [1, "Orenoar"], [1, "Orlanth"],[1, "Pavis"],[1,"Polaris"],
		               [1, "Ratslaff"], [1, "Seven Mothers"], [1, "Storm Bull"],[1, "Thanatar"],[1, "Thed"],[1, "Uleria"], [1, "Valind"],[1, "Vinga"],[1,"Vivamort"],[1,"Waha"], [1, "Xiola Umbar"], [1, "Yelm"], [1, "Yelmalio"], [1,"Yelorna"], [1, "Yinkin"], [1,"Zorak Zoran"]];

		var tempC = "";
		if(culture === "Impala"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cImpala.male, 0);
			}else{
				tempC = selectFromWeightedArray(cImpala.female, 0);
			}
		}else if(culture === "High Lama"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cHighLama.male, 0);
			}else{
				tempC = selectFromWeightedArray(cHighLama.female, 0);
			}
		}else if(culture === "Sable"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cSable.male, 0);
			}else{
				tempC = selectFromWeightedArray(cSable.female, 0);
			}
		}else if(culture === "Bison"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cBison.male, 0);
			}else{
				tempC = selectFromWeightedArray(cBison.female, 0);
			}
		}else if(culture === "Zebra Rider"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cZebra.male, 0);
			}else{
				tempC = selectFromWeightedArray(cZebra.female, 0);
			}
		}else if(culture === "Unicorn Rider"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cUnicorn.male, 0);
			}else{
				tempC = selectFromWeightedArray(cUnicorn.female, 0);
			}
		}else if(culture === "Rhinoceros Tribe"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cRhino.male, 0);
			}else{
				tempC = selectFromWeightedArray(cRhino.female, 0);
			}
		}else if(culture === "Pol Joni"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cPolJoni.male, 0);
			}else{
				tempC = selectFromWeightedArray(cPolJoni.female, 0);
			}
		}else if(culture === "Bolo Lizard Folk"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cBoloLizard.male, 0);
			}else{
				tempC = selectFromWeightedArray(cBoloLizard.female, 0);
			}
		}else if(culture === "Ostrich Clan"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cOstrich.male, 0);
			}else{
				tempC = selectFromWeightedArray(cOstrich.female, 0);
			}
		}else  if(culture === "Carmanian"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cCarmanian.male, 0);
			}else{
				tempC = selectFromWeightedArray(cCarmanian.female, 0);
			}
		}else if(culture === "Talastar" || culture === "Redlands"){
			if(g === "m."){
				tempC = selectFromWeightedArray(cYelm.male, 0);
				if(sc < 4){
					if( jsDieRoller(1,100) <71){
						tempC = "Yelm";
					}
				}
			}else{
				tempC = selectFromWeightedArray(cYelm.female, 0);
			}
			if(tempC == "Minor"){
				tempC = selectFromWeightedArray(cYelm.minor, 0);
			}
		}else if(culture === "Yelmalion"){
			tempC = selectFromWeightedArray(cYelmalion, 0);
			if(tempC == "Yelm"){
				if(g === "m."){
					tempC = selectFromWeightedArray(cYelm.male, 0);
					if(sc < 4){
						if( jsDieRoller(1,100) <71){
							tempC = "Yelm";
						}
					}
				}else{
					tempC = selectFromWeightedArray(cYelm.female, 0);
				}
				if(tempC == "Minor"){
					tempC = selectFromWeightedArray(cYelm.minor, 0);
				}
			}else if(tempC === "Bison"){
				if(g === "m."){
					tempC = selectFromWeightedArray(cBison.male, 0);
				}else{
					tempC = selectFromWeightedArray(cBison.female, 0);
				}
			}
		}else  if(culture === "Pavic"){
			tempC = selectFromWeightedArray(cPavis, 0);
			if(tempC === "Yelmalion"){
				if(tempC == "Yelm"){
					if(g === "m."){
						tempC = selectFromWeightedArray(cYelm.male, 0);
						if(sc < 4){
							if( jsDieRoller(1,100) <71){
								tempC = "Yelm";
							}
						}
					}else{
						tempC = selectFromWeightedArray(cYelm.female, 0);
					}
					if(tempC == "Minor"){
						tempC = selectFromWeightedArray(cYelm.minor, 0);
					}
				}else if(tempC === "Bison"){
					if(g === "m."){
						tempC = selectFromWeightedArray(cBison.male, 0);
					}else{
						tempC = selectFromWeightedArray(cBison.female, 0);
					}
				}
			}else if(tempC === "Sable"){
				if(g === "m."){
					tempC = selectFromWeightedArray(cSable.male, 0);
				}else{
					tempC = selectFromWeightedArray(cSable.female, 0);
				}
			}
		}else if(culture === "Native Fisherman"){
			tempC = selectFromWeightedArray(cZolaFel, 0);
			if(tempC === "Yelmalion"){
				if(tempC == "Yelm"){
					if(g === "m."){
						tempC = selectFromWeightedArray(cYelm.male, 0);
						if(sc < 4){
							if( jsDieRoller(1,100) <71){
								tempC = "Yelm";
							}
						}
					}else{
						tempC = selectFromWeightedArray(cYelm.female, 0);
					}
					if(tempC == "Minor"){
						tempC = selectFromWeightedArray(cYelm.minor, 0);
					}
				}else if(tempC === "Bison"){
					if(g === "m."){
						tempC = selectFromWeightedArray(cBison.male, 0);
					}else{
						tempC = selectFromWeightedArray(cBison.female, 0);
					}
				}
			}else if(tempC === "Ostrich"){
				if(g === "m."){
					tempC = selectFromWeightedArray(cOstrich.male, 0);
				}else{
					tempC = selectFromWeightedArray(cOstrich.female, 0);
				}
			}
		}else{
			if(g === "m."){
				tempC = selectFromWeightedArray(cSartarite.male, 0);
			}else{
				tempC = selectFromWeightedArray(cSartarite.female, 0);
			}
			if(tempC == "Minor"){
				tempC = selectFromWeightedArray(cSartarite.minor, 0);
			}
		}
		if(tempC == "Other"){
			tempC = selectFromWeightedArray(cOther, 0);
		}
		cult.name = tempC
		return cult;
	}catch(err){
		return "Error in jsRQCults.setRQCult " + err.message+"> "+culture+"> "+sc+"> "+g;
	}
}

function getCultSkills(cultName, st, dx){
	try{
		var skills = {weapons:[{name:"Test Weapon"}], strange:""};
	 	var tObj = {str:0, dex:0, list:[]};
		tObj.str = st;
		tObj.dex = dx;
		var priWpns = [];
		var wpnNames = [];
		var tWpn = {};
		if(cultName ==="Argan Argar"){
			
		}else if(cultName === "Zola Fel"){	
			
		}else{
			//orlanth
			priWpns = [[30, ["Bastard Sword", 1]],[30,["Broadsword", 1]],[5,["Scimitar", 1]],[20,["Bastard Sword", 2]],[10,["Greatsword", 2]],[10,["Shortsword", 1]],[5,["Dagger", 1]],[20,["Rapier", 1]]];
			//var secWpns =[[1,["Throwing Axe", 1]],[1,["Composite Bow", 2]],[1,["Self Bow", 2]],[1,["Arbalest", 2]],[1,["Heavy Crossbow", 2]],[1,["Light Crossbow", 2]],[1,["Throwing Dagger", 1]],[1,["Dart", 1]],[1,["Javelin", 1]],[1,["Sling", 1]],[1,["Staff Sling", 2]],[1,["Rock", 1]]];
			//var terWpns = [[1,["Battle Axe", 1]],[1,["Hatchet", 1]],[1,["Dagger", 1]],[1,["War Flail", 1]],[1,["Warhammer/Pick", 1]],[1,["Heavy Mace", 1]],[1,["Light Mace", 1]],[1,["Single Stick", 1]],[1,["Morningstar Flail", 1]],[1,["Sickle", 1]],[1,["Long Spear", 1]],[1,["Short Spear", 1]],[1,["Lance", 1]],[1,["D agger", 2]]];
			tObj.list = priWpns;
			tWpn = selectWeapon(tObj);
			skills.weapons.push(tWpn);
			wpnNames.push(tWpn.name);
			tWpn = selectWeapon(tObj);
			if(wpnNames.indexOf(tWpn.name)< 0){skills.weapons.push(tWpn);}
			
			//skills.weapons[0] ={name: "Greatsword, Two Handed", str: 11, dex: 13, damage:"2d8", hp: 15};
			//skills.skills = [];
			//skills.restrictedSkills=[];
			//skills.prohibitedSkills=[];
		}
		//[1, "Bagog"],[1, "Cacodemon"], [1, "Caladra & Aurelion"], [1, "Chalana Arroy"], [1,"Daka Fal"],[1,"Dendara"], [1,"Donander"], [1,"Eiritha"],[1, "Ernalda"], [1, "Foundchild"], [1, "Geo"],[1, "Golden Bow"], [1, "Humakt"],  [1,"Issaries"], 
//        [1, " Krarsht"],  [1, "Lanbril"], [1, "Lhankor Mhy"], [1,"Lodril"],[1, "Lokarnos"], [1,"Mallia"],[1, "Nysalor"], [1, "Odayla"], [1, "Orenoar"], [1, "Orlanth"],[1, "Pavis"],[1,"Polaris"],
//        [1, "Ratslaff"], [1, "Seven Mothers"], [1, "Storm Bull"],[1, "Thanatar"],[1, "Thed"],[1, "Uleria"], [1, "Valind"],[1, "Vinga"],[1,"Vivamort"],[1,"Waha"], [1, "Xiola Umbar"], [1, "Yelm"], [1, "Yelmalio"], [1,"Yelorna"], [1, "Yinkin"], [1,"Zorak Zoran"]];

		return skills;
	}catch(err){
		return "Error in jsRQCults.getCult "+cultName+ " " + err.message+"> "+cultName+"> "+st+"> "+dx;
	}
} 