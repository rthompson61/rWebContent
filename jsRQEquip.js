/**
 * Templates to generate  Equipment for RuneQuest NPCs and Monsters.  
 * Along with associated utilities
 * 
 * TO DO add str and dex as optional inputs, then disable weapon options
 */
function getEquipOptionObj(type, location, inner, str, dex){
	try{
		var equipment = getEquip();
		var equipObjs = [];
		var equipGrpObj = {label:"", options:[]};
		var equipObj = {name:"", value:"", disabled:0, selected:0};
		var tempGrp;
		var temp;
		if(isNaN(str)){str = 1;}
		if(isNaN(dex)){dex = 1;}
		for( var i = 0; i< equipment.length; i++){
			if(equipment[i].type === type && equipment[i].locations.indexOf(location)>-1 ){
				if(inner ==0 || equipment[i].inner == inner){
					tempGrp = Object.create(equipGrpObj);
					tempGrp.label = equipment[i].subType;
					tempGrp.options = [];
					for(var n = 0; n< equipment[i].individual.length; n++){
						if(inner ==0 || equipment[i].individual[n].inner == inner){
							temp = Object.create(equipObj);
							temp.name = equipment[i].individual[n].name;
							if(type=="armor"){
								temp.value = equipment[i].type+"-"+location+"-"+inner+"-"+equipment[i].subType+"-"+equipment[i].individual[n].ap+"-"+equipment[i].individual[n].enc+"-"+equipment[i].individual[n].silent;
							}else{
								if(type == "missile"){
									temp.value = equipment[i].type+"-"+location+"-"+equipment[i].individual[n].value;
								}else{
									temp.value = equipment[i].type+"-"+location+"-"+inner+"-"+equipment[i].subType+"-"+equipment[i].individual[n].ap+"-"+equipment[i].individual[n].enc+"-"+equipment[i].individual[n].attack+"-"+equipment[i].individual[n].parry+"-"+equipment[i].individual[n].minStr+"-"+equipment[i].individual[n].minDex+"-"+equipment[i].individual[n].damage+"-"+equipment[i].individual[n].sr+"-"+equipment[i].subType+", "+equipment[i].individual[n].name;
								}
								//Disable option if character doesn't meet minimum STR and DEX to wield
								if(equipment[i].individual[n].minStr > str || (dex + (str - equipment[i].individual[n].minStr)/2) < equipment[i].individual[n].minDex){
									temp.disabled = 1;
								}
							}
							tempGrp.options.push(temp);
						}
					}
					equipObjs.push(tempGrp);
				}
			}
		
		}

		return equipObjs;
	}catch(err){
		return "error: jsRQEquip.getEquipOptionObj: " + err;
	}
}

function getEquipLocations(equipType, equipSubType){
	try{
		var equip = getEquip();
		var locs = [];
		for( var i = 0; i< equip.length; i++){
			if(equip[i].type == equipType && equip[i].subType == equipSubType ){
				locs = equip[i].locations;
			}
		}
		return locs;
	}catch(err){
		locs[0] = "error: jsRQEquip.getEquipLocations: " + err;
		return locs; 
		
	}
}

function getEquipByValue(t, v){
	try{
		var equip = getEquip();
		var e = {};
		for( var i = 0; i< equip.length; i++){
			if(equip[i].type == t ){
				for(var n = 0 ; n < equip[i].individual.length; n++){
					if(equip[i].individual[n].value == v){
						e = equip[i].individual[n];
					}
				}
			}
		}
//		window.alert("jsRSEquip.getEquipByValue: "+v+"  "+e.name);
		return e;
	}catch(err){
		window.alert("Error: jsRSEquip.getEquipByValue: "+v+"  "+err);
	}
}

function getRateOfFire(dAdj){
	//dAdj - dex adjustment for Strike rank
	try{
		var rate =0;
		var smr =1+dAdj;
		for(var smr=0; smr < 13; smr++){
			smr = smr + 5+ dAdj;
			rate++;
		}
		return rate;
	}catch(err){
		window.alert("Error: jsRSEquip.getRateOfFire: "+dAdj+"  "+err);
	}
}

function getEquip(){
	try{
		var equipment = [
		     {type:"armor", subType:"Greaves", locations:["lleg", "rleg"], inner:1,
		    	 individual:[{name:"Leather", value:"greaveLeather", ap:1, enc:.5, silent:0, inner:1 },
		    	             {name:"Cuirbolli", value:"greaveCuirbolli", ap:3, enc:1, silent:0, inner:0 },
		    	             {name:"Plate", value:"greavePlate", ap:6, enc:2, silent:7.5, inner:0 }
		    	 ]
		     },
		     {type:"armor", subType:"Trews", locations:["lleg", "rleg", "abdom"], inner:1,
		    	 individual:[{name:"Thin Leather", value:"trewsThin", ap:1, enc:.167, silent:0, inner:1 },
		    	             {name:"Thick Leather", value:"trewsThick", ap:2, enc:.33, silent:0, inner:1 },
		    	             {name:"Chainmail", value:"trewsChain", ap:5, enc:1, silent:5, inner:0 }
		    	 ]
		      },
		     {type:"armor", subType:"Barding", locations:["lfleg", "rfleg", "foreqtr"], inner:1,
		    	 individual:[{name:"Thin Leather", value:"bardfThin", ap:1, enc:.5, silent:0, inner:1 },
		    	             {name:"Thick Leather", value:"bardfThick", ap:2, enc:.75, silent:0, inner:1 },
		    	             {name:"Chainmail", value:"bardfChain", ap:5, enc:2, silent:10, inner:0 }
		    	 ]
		      },
		     {type:"armor", subType:"Barding", locations:["lhleg", "rhleg", "hndqtr"], inner:1,
		    	 individual:[{name:"Thin Leather", value:"bardThin", ap:1, enc:.5, silent:0, inner:1 },
		    	             {name:"Thick Leather", value:"bardThick", ap:2, enc:.75, silent:0, inner:1 },
		    	             {name:"Chainmail", value:"bardChain", ap:5, enc:2, silent:10, inner:0 }
		    	 ]
		      },
		     {type:"armor", subType:"Skirts", locations:["abdom"], inner:0,
		    	 individual:[{name:"Thin Leather", value:"skirtThin", ap:1, enc:.5, silent:0, inner:0 },
		    	             {name:"Thick Leather", value:"skirtThick", ap:2, enc:1, silent:0, inner:0 },
		    	             {name:"Linen", value:"skirtLinen", ap:3, enc:1, silent:5, inner:0 },
		    	             {name:"Light Scale", value:"skirtLight", ap:4, enc:2, silent:35, inner:0 },
		    	             {name:"Heavy Scale", value:"skirtHeavy", ap:5, enc:3, silent:30, inner:0 },
		    	             {name:"Chainmail", value:"skirtChain", ap:5, enc:2, silent:25, inner:0 }
		    	 ]
		     },
		     {type:"armor", subType:"Hauberk", locations:["chest","abdom","abdom2"], inner:1,
		    	 individual:[{name:"Thin Leather", value:"hauberkThin", ap:1, enc:.25, silent:0, inner:1 },
		    	             {name:"Thick Leather", value:"hauberkThick", ap:2, enc:.5, silent:0, inner:1 },
		    	             {name:"Linen", value:"hauberkLinen", ap:3, enc:.5, silent:2.5, inner:0 },
		    	             {name:"Ring Mail", value:"hauberkRing", ap:4, enc:1, silent:7.5, inner:0 },
		    	             {name:"Light Scale", value:"hauberkLight", ap:4, enc:1, silent:15, inner:0 },
		    	             {name:"Heavy Scale", value:"hauberkHeavy", ap:5, enc:1.5, silent:12.5, inner:0 },
		    	             {name:"Chainmail", value:"hauberkChain", ap:5, enc:1, silent:10, inner:0 }
		    	 ]
		     },
		     {type:"armor", subType:"Byrnie", locations:["chest"], inner:1,
		    	 individual:[{name:"Thin Leather", value:"byrnieThin", ap:1, enc:.5, silent:0, inner:1 },
		    	             {name:"Thick Leather", value:"byrnieThick", ap:2, enc:1, silent:0, inner:1 },
		    	             {name:"Ring Mail", value:"byrnieRing", ap:4, enc:1, silent:5, inner:0 },
		    	             {name:"Chainmail", value:"byrnieChain", ap:5, enc:1, silent:15, inner:0 }
		    	 ]
		     },
		     {type:"armor", subType:"Cuirass", locations:["chest"], inner:0,
		    	 individual:[{name:"Cuirbolli", value:"cuirassCuirbolli", ap:3, enc:1, silent:5, inner:0 },
		    	             {name:"Linen", value:"cuirassLinen", ap:3, enc:1, silent:5, inner:0 },
		    	             {name:"Heavy Scale", value:"cuirassHeavy", ap:5, enc:3, silent:25, inner:0 },
		    	             {name:"Brigandine", value:"cuirassBrigandine", ap:5, enc:2, silent:15, inner:0 },
		    	             {name:"Plate", value:"cuirassPlate", ap:6, enc:3, silent:15, inner:0 }
		    	 ]
		     },
		     {type:"armor", subType:"Sleeves", locations:["larm","rarm"], inner:0,
		    	 individual:[{name:"Chain", value:"sleevesChain", ap:5, enc:1, silent:15, inner:0 }
		    	 ]
		     },
		     {type:"armor", subType:"Vambraces", locations:["larm","rarm"], inner:1,
		    	 individual:[{name:"Leather", value:"vambracesLeather", ap:1, enc:0, silent:0, inner:1 },
		    	             {name:"Cuirbolli", value:"vambracesCuirbolli", ap:3, enc:.5, silent:0, inner:0 },
		    		    	 {name:"Plate", value:"vambracesPlate", ap:6, enc:1, silent:5, inner:0 }
		    	 ]
		     },
		     {type:"armor", subType:"Helm", locations:["head"], inner:1,
		    	 individual:[{name:"Leather Hood", value:"helmHood", ap:1, enc:.5, silent:0, inner:1 },
		    	             {name:"Cap", value:"helmCap", ap:2, enc:.5, silent:0, inner:1 },
		    	             {name:"Composite", value:"helmComposite", ap:3, enc:.5, silent:0, inner:1 },
		    	             {name:"Open", value:"helmOpen", ap:4, enc:1, silent:0, inner:0 },
		    	             {name:"Closed", value:"helmClosed", ap:5, enc:1, silent:0, inner:0 },
		    	             {name:"Full", value:"helmFull", ap:6, enc:2, silent:0, inner:0 }
		    	 ]
		     },
		     {type:"shield", subType:"Shield", locations:["shield"], inner:0,
		    	 individual:[{name:"Small", value:"shieldSmall", ap:8, enc:1, attack:5, parry:5, minStr:5, minDex:1, damage:"1d4", sr:4 },
		    	             {name:"Medium", value:"shieldMedium", ap:12, enc:2, attack:5, parry:10, minStr:9, minDex:1, damage:"1d6", sr:4 },
		    	             {name:"Large", value:"shieldLarge", ap:16, enc:3, attack:5, parry:20, minStr:12, minDex:1, damage:"1d8", sr:4 }
		    	 ]
		     },
		     {type:"melee", subType:"1H Axe", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Hatchet", value:"1hAxeHatchet", ap:15, enc:1, attack:20, parry:20, minStr:7, minDex:7, damage:"1d6+1", sr:4 },
		    	             {name:"Battle Axe", value:"1hAxwBattle", ap:15, enc:2, attack:20, parry:20, minStr:13, minDex:1, damage:"1d8+2", sr:3 }
		    	 ]
		     },
		     {type:"melee", subType:"2H Axe", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Battle Axe", value:"2hAxwBattle", ap:15, enc:2, attack:15, parry:15, minStr:9, minDex:7, damage:"1d8+2", sr:3 },
		    	             {name:"Great Axe", value:"2hAxeGreat", ap:15, enc:2, attack:15, parry:15, minStr:11, minDex:7, damage:"2d6+2", sr:2 },
		    	             {name:"Pole Axe", value:"2hAxePole", ap:12, enc:3, attack:15, parry:15, minStr:13, minDex:9, damage:"3d6", sr:1 },
		    	             {name:"Rhomphia", value:"2hAxeRhomphia", ap:12, enc:2, attack:15, parry:15, minStr:11, minDex:9, damage:"2d6+2", sr:2 }
		    	 ]
		     },
		     {type:"melee", subType:"Butt", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Head Butt", value:"headButt", ap:"head", enc:0, attack:10, parry:1000, minStr:1, minDex:1, damage:"1d4", sr:4 }
		    	 ]
		     },
		     {type:"melee", subType:"1H Dagger", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Dagger", value:"dagger", ap:12, enc:.25, attack:25, parry:25, minStr:1, minDex:1, damage:"1d4+2", sr:4 }
		    	 ]
		     },
		     {type:"melee", subType:"1H Fist", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Fist", value:"fistFist", ap:"arm", enc:0, attack:25, parry:1000, minStr:0, minDex:0, damage:"1d3", sr:4 },
		    	             {name:"Claw", value:"fistClaw", ap:5, enc:1, attack:25, parry:1000, minStr:7, minDex:9, damage:"1d4+1", sr:4 },
		    	             {name:"Heavy Cestus", value:"fistHCestus", ap:10, enc:1, attack:25, parry:1000, minStr:11, minDex:1, damage:"1d3+2", sr:4 },
		    	             {name:"Light Cestus", value:"fistLCestus", ap:5, enc:.5, attack:25, parry:1000, minStr:7, minDex:1, damage:"1d3+1", sr:4 }
		    	 ]
		     },
		     {type:"melee", subType:"1H Flail", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Grain Flail", value:"1HFlailGrain", ap:8, enc:1, attack:15, parry:15, minStr:9, minDex:1, damage:"1d6", sr:3 },
		    	             {name:"War Flail", value:"1HFlailWar", ap:12, enc:2, attack:15, parry:15, minStr:11, minDex:1, damage:"1d6+2", sr:3 }
		    	 ]
		     },
		     {type:"melee", subType:"2H Flail", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Military Flail", value:"2HFlailMilitary", ap:15, enc:3, attack:15, parry:15, minStr:9, minDex:1, damage:"2d6+2", sr:0 }
		    	 ]
		     },
		     {type:"melee", subType:"Grapple", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Grapple", value:"Grapple", ap:"n/a", enc:0, attack:25, parry:1000, minStr:1, minDex:1, damage:"Special", sr:4 }
		    	 ]
		     },
		     {type:"melee", subType:"1H Hammer", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"War Hammer/Pick", value:"1HHammer", ap:20, enc:1, attack:20, parry:20, minStr:11, minDex:9, damage:"1d6+2", sr:3 }
		    	 ]
		     },
		     {type:"melee", subType:"2H Hammer", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Great Hammer", value:"2HHammer", ap:15, enc:3, attack:5, parry:5, minStr:9, minDex:9, damage:"1d12+2", sr:1 }
		    	 ]
		     },
		     {type:"melee", subType:"Kick", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Kick", value:"Kick", ap:"leg", enc:0, attack:25, parry:1000, minStr:1, minDex:1, damage:"1d6", sr:4 }
		    	 ]
		     },
		     {type:"melee", subType:"1H Mace", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Club", value:"1HClub", ap:15, enc:2, attack:15, parry:15, minStr:11, minDex:7, damage:"2d8", sr:1 },
		    	             {name:"Heavy Mace", value:"1HMaceHeavy", ap:20, enc:2, attack:25, parry:25, minStr:13, minDex:7, damage:"1d8+2", sr:3 },
		    	             {name:"Light Mace", value:"1HMaceLight", ap:20, enc:1, attack:25, parry:25, minStr:7, minDex:7, damage:"1d6+2", sr:3 },
		    	             {name:"Single Stick", value:"1HMaceStick", ap:10, enc:0, attack:25, parry:25, minStr:1, minDex:9, damage:"1d6", sr:4 }
		    	 ]
		     },
		     {type:"melee", subType:"2H Maul", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Heavy Mace", value:"2HMaulHeavy", ap:20, enc:3, attack:25, parry:25, minStr:7, minDex:7, damage:"1d8+2", sr:3 },
		    	             {name:"Maul", value:"2HMaul", ap:15, enc:2, attack:15, parry:15, minStr:11, minDex:7, damage:"2d8", sr:1 },
		    	             {name:"Quarter Staff", value:"2HMaulStaff", ap:15, enc:1, attack:20, parry:20, minStr:9, minDex:9, damage:"1d8", sr:0 }
		    	 ]
		     },
		     {type:"melee", subType:"1H Morningstar", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Flail", value:"1HMorningstar", ap:12, enc:2, attack:15, parry:15, minStr:11, minDex:7, damage:"1d10+2", sr:2 }
		    	 ]
		     },
		     {type:"melee", subType:"2H Pike", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Pike", value:"2HPike", ap:15, enc:3, attack:10, parry:10, minStr:11, minDex:7, damage:"1d10+1", sr:0 }
		    	 ]
		     },
		     {type:"melee", subType:"1H Rapier", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Rapier", value:"1HRapier", ap:12, enc:1, attack:5, parry:5, minStr:7, minDex:13, damage:"1d6+1", sr:2 }
		    	 ]
		     },
		     {type:"melee", subType:"Shortsword", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Shortsword", value:"1HShortsword", ap:20, enc:1, attack:15, parry:15, minStr:1, minDex:11, damage:"1d6+1", sr:3 }
		    	 ]
		     },
		     {type:"melee", subType:"Sickle", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Sickle", value:"1HSickle", ap:15, enc:1, attack:15, parry:15, minStr:1, minDex:1, damage:"1d6+1", sr:3 }
		    	 ]
		     },
		     {type:"melee", subType:"1H Spear", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Long Spear", value:"1HLongSpear", ap:15, enc:3, attack:10, parry:10, minStr:11, minDex:9, damage:"1d8+1", sr:1 },
		    	             {name:"Short Spear", value:"1HShortSpear", ap:15, enc:2, attack:10, parry:10, minStr:9, minDex:7, damage:"1d6+1", sr:2 },
		    	             {name:"Lance", value:"1HLance", ap:20, enc:3, attack:10, parry:10, minStr:9, minDex:7, damage:"1d10+1", sr:0 },
		    	             {name:"Trident", value:"1HTrident", ap:12, enc:2, attack:10, parry:10, minStr:9, minDex:7, damage:"1d6+1", sr:2 }
		    	 ]
		     },
		     {type:"melee", subType:"2H Spear", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Long Spear", value:"2HLongSpear", ap:15, enc:3, attack:20, parry:20, minStr:9, minDex:7, damage:"1d10+1", sr:1 },
		    	             {name:"Short Spear", value:"2HShortSpear", ap:15, enc:2, attack:20, parry:20, minStr:7, minDex:7, damage:"1d8+1", sr:2 }
		    	 ]
		     },
		     {type:"melee", subType:"1H Sword", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Bastard Sword", value:"1HBastardSword", ap:20, enc:1, attack:10, parry:10, minStr:13, minDex:9, damage:"1d10+1", sr:2 },
		    	             {name:"Broadsword", value:"1HBroadSword", ap:20, enc:1, attack:10, parry:10, minStr:9, minDex:7, damage:"1d8+1", sr:2 },
		    	             {name:"Klanth", value:"1HKlanth", ap:20, enc:1, attack:5, parry:5, minStr:13, minDex:9, damage:"1d10+1", sr:2 },
		    	             {name:"Scimitar", value:"1HScimitar", ap:20, enc:1, attack:10, parry:10, minStr:9, minDex:9, damage:"1d8+1", sr:2 }
		    	 ]
		     },
		     {type:"melee", subType:"2H Sword", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Bastard Sword", value:"2HBastardSword", ap:20, enc:1, attack:5, parry:5, minStr:9, minDex:9, damage:"1d10+1", sr:2 },
		    	             {name:"Great Sword", value:"2HGreat Sword", ap:15, enc:2, attack:5, parry:5, minStr:11, minDex:13, damage:"2d8", sr:1 },
		    	             {name:"Klanth", value:"2HKlanth", ap:20, enc:1, attack:5, parry:5, minStr:9, minDex:9, damage:"1d10+1", sr:2 }
		    	 ]
		     },
		     {type:"melee", subType:"1H Whip", locations:["melee1","melee2","melee3","melee4","melee5"], inner:0,
		    	 individual:[{name:"Whipstick", value:"1HWhipstick", ap:20, enc:1, attack:15, parry:5, minStr:1, minDex:9, damage:"1d6", sr:2 }
		    	 ]
		     },
		     {type:"missile", subType:"Bow", locations:["missile1","missile2","missile3"], inner:0,
		    	 individual:[{name:"Composite Bow", value:"CompositeBow", ap:10, enc:2, attack:{base:10, current:0, prof:0}, parry:{base:20, current:0, prof:0}, minStr:13, minDex:9, damage:"1d8+1", sr:{base:0, current:0}, range:100, rate:-1, damBonus:0 },
		    	             {name:"Elf Bow", value:"ElfBow", ap:10, enc:2, attack:{base:10, current:0, prof:0}, parry:{base:20, current:0, prof:0}, minStr:1, minDex:1, damage:"1d8+1", sr:{base:0, current:0}, range:120, rate:-1, damBonus:0 },
		    	 			 {name:"Self Biw", value:"SelfBow", ap:6, enc:2, attack:{base:10, current:0, prof:0}, parry:{base:20, current:0, prof:0}, minStr:9, minDex:9, damage:"1d6+1", sr:{base:0, current:0}, range:80, rate:-1, damBonus:0 }
		    	 ]
		     },
		     {type:"missile", subType:"Crossbow", locations:["missile1","missile2","missile3"], inner:0,
		    	 individual:[{name:"Arbalest", value:"Arbalest", ap:10, enc:3, attack:{base:20, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, minStr:13, minDex:7, damage:"3d6+1", sr:{base:0, current:0}, range:150, rate:"1/5", damBonus:0 },
		    	             {name:"Heavy Crossbow", value:"HeavyXBow", ap:10, enc:2, attack:{base:20, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, minStr:11, minDex:7, damage:"2d6+2", sr:{base:0, current:0}, range:120, rate:"1/3", damBonus:0 },
		    	 			 {name:"Light Crossbow", value:"LightXBow", ap:6, enc:2, attack:{base:20, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, minStr:7, minDex:7, damage:"2d4+2", sr:{base:0, current:0}, range:100, rate:"1/2", damBonus:0 }
		    	 ]
		     },
		     {type:"missile", subType:"Javelin", locations:["missile1","missile2","missile3"], inner:0,
		    	 individual:[{name:"Dart", value:"Dart", 		ap:8, enc:.5, attack:{base:15, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, minStr:1, minDex:9, damage:"1d6", sr:{base:0, current:0}, range:20, rate:-1, damBonus:1 },
		    	 			 {name:"Javelin", value:"Javelin", ap:10, enc:1, attack:{base:15, current:0, prof:0}, parry:{base:10, current:0, prof:0}, minStr:9, minDex:9, damage:"1d10", sr:{base:0, current:0}, range:20, rate:1, damBonus:1 }
		    	 ]
		     },
		     {type:"missile", subType:"Sling", locations:["missile1","missile2","missile3"], inner:0,
		    	 individual:[{name:"Sling", value:"Sling", 		      ap:0, enc:1, attack:{base:10, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, minStr:1, minDex:9, damage:"1d8", sr:{base:0, current:0}, range:80, rate:-1, damBonus:0 },
		    	 			 {name:"Staff Sling", value:"StaffSling", ap:10, enc:2, attack:{base:5, current:0, prof:0}, parry:{base:20, current:0, prof:0}, minStr:9, minDex:9, damage:"1d10", sr:{base:0, current:0}, range:100, rate:1, damBonus:0 }
		    	 ]
		     },
		     {type:"missile", subType:"Thrown Weapons", locations:["missile1","missile2","missile3"], inner:0,
		    	 individual:[{name:"Throwing Axe", value:"ThrowingAxe", ap:15, enc:1, attack:{base:10, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, minStr:9, minDex:11, damage:"1d6", sr:{base:0, current:0}, range:20, rate:-1, damBonus:1 },
		    	             {name:"Throwing Dagger", value:"ThrowingDagger", ap:12, enc:.25, attack:{base:15, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, minStr:1, minDex:9, damage:"1d4", sr:{base:0, current:0}, range:20, rate:-1, damBonus:1 },
		    	 			 {name:"Rock", value:"Rock", ap:25, enc:.25, attack:{base:25, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, minStr:1, minDex:1, damage:"1d4", sr:{base:0, current:0}, range:20, rate:-1, damBonus:1 }
		    	 ]
		     }
		];
		return equipment;
	}catch(err){
		return "Error: jsRQEquip.getEquipment: "+err;
	}
}

function getTreasureFactors(t, level){
	//t = template
	try{
		var tf = 0;
		var eKeys = Object.keys(t.equipment);
		var atkTf = 0;
		var apTf = 99;
		var mTf = 0;
		var dbTf =0;
		
		for(var k = 0; k < eKeys.length; k++){
			if(t.equipment[eKeys[k]].hasOwnProperty("attack") ){
				if(t.equipment[eKeys[k]].attack.current == 0){
					t.equipment[eKeys[k]].attack.current = t.equipment[eKeys[k]].attack.base;
				}
				if(Math.ceil(t.equipment[eKeys[k]].attack.current/25 ) > atkTf){
					atkTf = Math.ceil(t.equipment[eKeys[k]].attack.current/25);
				}
			}
		}
//Test		window.alert("jsEquip.getTreasureFactors() Attack: "+atkTf);
		for(var hl =0; hl<t.body.hitLocations.length; hl++){
			  if(t.body.hitLocations[hl].armor.current < apTf && t.body.hitLocations[hl].hidden < 1){
				  apTf =t.body.hitLocations[hl].armor.current;
			  }
		  }
//Test		window.alert("jsEquip.getTreasureFactors() Armor "+apTf);
		for(var m = 0; m < t.magic.basicMagic.length; m++){
			if(t.magic.basicMagic[m].type !== "nonCombat"){
				mTf++;
			}
		}
		//dbTf Damage Bonus Treasure Factor
		if(t.exp[level].damageBonus.indexOf('+') > -1){
			dbTf = Number(t.exp[level].damageBonus.substring(t.exp[level].damageBonus.indexOf('+')+1,t.exp[level].damageBonus.indexOf('d')));
		}
		tf = Math.ceil(t.exp[level].hp/5) + atkTf + apTf+ mTf + dbTf;
//		window.alert("Test jsEquip.getTreasureFactors() "+tf + " = HP:"+ Math.ceil(t.hp/5)+" + Best Attack:"+atkTf+" + Minimum Protection:"+apTf);
		return(tf)
	}catch(err){
		window.alert("Error: jsEquip.getTreasureFactors() "+err);
	}
}

function setEquipment(type, equipment, template, document, searchTerm){
	//type 0 - melee
	//equipment - equipment object
	try{
		var txt = "";
		var equipSlots= [];
		var controlVal = "";
		var controlAry = [];
		var controls = getControlsByForm(document, "NPC_Config_Shield", searchTerm);
		var selContUpdate;
		var hasWeapon = false;
		if(type == 0){
			//get equipment melee slots, bump existing equipment down
			var keys = Object.keys(template.equipment);
			for (var k in keys){
				if(keys[k].substring(0,5)=="melee"){
					equipSlots.push(keys[k]);
					if(template.equipment[keys[k]].name == equipment[12].split(", ")[1]){
						hasWeapon = true;
					}
					if(template.name == "Dragonewt" && template.equipment[keys[k]].damage.indexOf(template.damageBonus)>1){
						template.equipment[keys[k]].damage = template.equipment[keys[k]].damage.replace(template.damageBonus, "");
					}
				}
			}
			equipSlots.reverse();
			controls.reverse();
			if(hasWeapon == false){
				for(var es = 0; es < equipSlots.length; es++){
					if(es < equipSlots.length-1){
						var keys = Object.keys(template.equipment[equipSlots[es]]);
						for(var k in keys){
							template.equipment[equipSlots[es]][keys[k]] = template.equipment[equipSlots[es+1]][keys[k]];
						}
						controlVal = document.getElementById(controls[es+1]).value;
						txt = txt + ", "+es+": "+equipSlots[es]+"<-"+equipSlots[es+1]+" ("+controlVal+")";
						controlAry = controlVal.split("-");
						controlAry[1] = equipSlots[es];
						selContUpdate = updateSelectorToValue(document,equipSlots[es], controlAry);
					}else{
						selContUpdate = updateSelectorToValue(document,equipSlots[es], equipment);
						txt = txt + ", "+es+": "+equipSlots[es]+"<-"+equipment[12].split(", ")[1];
	//					equipAry.push(subType,equip.ap,equip.enc,equip.attack,equip.parry,equip.minStr,equip.minDex,equip.damage,equip.sr, subTxt);
						template.equipment[equipSlots[es]].name = equipment[12].split(", ")[1];
						template.equipment[equipSlots[es]].ap = equipment[4];
						template.equipment[equipSlots[es]].enc = equipment[5];
						template.equipment[equipSlots[es]].attack.base = equipment[6];
						template.equipment[equipSlots[es]].attack.current = equipment[6];
						template.equipment[equipSlots[es]].attack.prof = 0;
						template.equipment[equipSlots[es]].parry.base = equipment[7];
						template.equipment[equipSlots[es]].parry.current = equipment[7];
						template.equipment[equipSlots[es]].parry.prof = 0;
						//add damage bonus if applicable
						if(template.damageBonus !=="undefined" && template.damageBonus !==0){
							template.equipment[equipSlots[es]].damage = equipment[10]+":"+template.damageBonus;
						}else{
							template.equipment[equipSlots[es]].damage = equipment[10];
						}
						template.equipment[equipSlots[es]].sr.base = equipment[11];
						template.equipment[equipSlots[es]].sr.current = equipment[11];
					}
				}
			}
		}
//		getControlsByForm(document, "NPC_Config_Shield", searchTerm);
//		window.alert("jsEquip.setEquipment() "+txt);
		return template;
	}catch(err){
		window.alert("Error: jsEquip.setEquipment() "+err);
	}
}