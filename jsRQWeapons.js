/**
 * http://usejsdoc.org/
 */

function selectWeapon(wpnList){
	try{
		var wpn = {name:""};
		var tSelect = [];
		var stopper = 0;
		while(wpn.name ===""){
			tSelect = selectFromWeightedArray(wpnList.list,0)
			wpn = getWeapon(tSelect[0], tSelect[1]);
			if(wpn.str > wpnList.str || wpn.dex > wpnList.dex){
				wpn = {name:""};
				stopper++;
				if(stopper>9){
					wpn = {name: "Dagger, One Handed", str: 1, dex: 1, damage:"1d4+2", hp: 12};
				}
			}
		} 
		return wpn;

		return "Error in jsRQWeapons.selectWeapon " + wpnList;
	}catch(err){
		return "Error in jsRQWeapons.selectWeapon " + err.message;
	}
}

function getWeapon(wpn, hnds){
	try{
		var weapon = {};
		switch(wpn){
		case "Battle Axe":
			if(hnds == 1){
				weapon = {sname: "Battle Axe, One handed", str: 13, dex: 9, damage:"1d8+2", hp: 15};
			}else{
				weapon = {name: "Battle Axe, Two Handed", str: 9, dex: 9, damage:"1d8+2", hp: 15};
			}
			break;
		case "Hatchet":
			weapon = {name: "Hatchet, One Handed", str: 7, dex: 9, damage:"1d6+1", hp: 15};
			break;
		case "Great Axe":
			weapon = {name: "Great Axe, Two Handed", str: 11, dex: 9, damage:"2d6+2", hp: 15};
			break;
		case "Pole Axe":
			weapon = {name: "Pole Axe, Two Handed", str: 13, dex: 11, damage:"3d6", hp: 12};
			break;
		case "Rhomphia":
			weapon = {name: "Rhomphia, Two Handed", str: 11, dex: 11, damage:"2d6+2", hp: 12};
			break;
		case "Claw":
			weapon = {name: "Claw, One Handed", str: 7, dex: 9, damage:"1d4+1", hp: 5};
			break;
		case "Heavy Cestus":
			weapon = {name: "Heavy Cestus, One Handed", str: 11, dex: 1, damage:"1d3+2", hp: 10};
			break;
		case "Light Cestus":
			weapon = {name: "Light Cestus, One Handed", str: 7, dex: 1, damage:"1d3+1", hp: 5};
			break;
		case "Grain Flail":
			weapon = {name: "Grain Flail, One Handed", str: 8, dex: 1, damage:"1d6", hp: 8};
			break;
		case "War Flail":
			weapon = {name: "War Flail, One Handed", str: 11, dex: 1, damage:"1d6+2", hp: 12};
			break;
		case "Military Flail":
			weapon = {name: "Military Flail, Two Handed", str: 9, dex: 1, damage:"2d6+2", hp: 15};
			break;
		case "War Hammer/Pick":
			weapon = {name: "Warhammer/Pick, One Handed", str: 11, dex: 9, damage:"1d6+2", hp: 20};
			break;
		case "Great Hammer":
			weapon = {name: "Great Hammer, Two Handed", str: 9, dex: 9, damage:"1d12+2", hp: 15};
			break;
		case "Heavy Mace":
			if(hnds == 1){
				weapon = {name: "Heavy Mace, One Handed", str: 13, dex: 7, damage:"1d8+2", hp: 20};
			}else{
				weapon = {name: "Heavy Mace, Two Handed", str: 9, dex: 7, damage:"1d8+2", hp: 20};
			}
			break;
		case "Light Mace":
			weapon = {name: "Light Mace, One Handed", str: 7, dex: 7, damage:"1d6+2", hp: 20};
			break;
		case "Singlestick":
			weapon = {name: "Singlestick, One Handed", str: 1, dex: 9, damage:"1d6", hp: 10};
			break;
		case "Maul":
			weapon = {name: "Maul, Two Handed", str: 11, dex: 7, damage:"2d8", hp: 15};
			break;
		case "Quarterstaff":
			weapon = {name: "Quarterstaff, Two Handed", str: 9, dex: 9, damage:"1d8", hp: 15};
			break;
		case "Morning Star Flail":
			weapon = {name: "Morning Star Flail, One Handed", str: 11, dex: 11, damage:"1d10+1", hp: 12};
			break;
		case "Pike":
			weapon = {name: "Pike, Two Handed", str: 11, dex: 7, damage:"1d12+1", hp: 15};
			break;
		case "Rapier":
			weapon = {name: "Rapier, One Handed", str: 7, dex: 13, damage:"1d6+1", hp: 12};
			break;
		case "Shortsword":
			weapon = {name: "Shortsword, One Handed", str: 1, dex: 1, damage:"1d6+1", hp: 20};
			break;
		case "Sickle":
			weapon = {name: "Sickle, One Handed", str: 1, dex: 1, damage:"1d6+1", hp: 15};
			break;
		case "Long Spear":
			if(hnds == 1){
				weapon = {name: "Long Spear, One Handed", str: 11, dex: 9, damage:"1d8+1", hp: 15};
			}else{
				weapon = {name: "Long Spear, Two Handed", str: 9, dex: 7, damage:"1d10+1", hp: 15};
			}
			break;
		case "Short Spear":
			if(hnds == 1){
				weapon = {name: "Short Spear, One Handed", str: 9, dex: 7, damage:"1d6+1", hp: 15};
			}else{s
				weapon = {name: "Short Spear, Two Handed", str: 7, dex: 7, damage:"1d8+1", hp: 15};
			}
			break;
		case "Lance":
			weapon = {name: "Lance, One Handed", str: 9, dex: 7, damage:"1d10+1", hp: 20};
			break;
		case "Bastard Sword":
			if(hnds == 1){
				weapon = {name: "Bastard Sword, One Handed", str: 13, dex: 9, damage:"1d10+1", hp: 20};
			}else{
				weapon = {name: "Bastard Sword, Two Handed", str: 9, dex: 9, damage:"1d10+1", hp: 20};
			}
			break;
		case "Broadsword":
			weapon = {name: "Broadsword, One Handed", str: 9, dex: 7, damage:"1d8+1", hp: 20};
			break;
		case "Scimitar":
			weapon = {name: "Scimitar, One Handed", str: 9, dex: 9, damage:"1d8+1", hp: 20};
			break;
		case "Greatsword":
			weapon = {name: "Greatsword, Two Handed", str: 11, dex: 13, damage:"2d8", hp: 15};
			break;
		default:
			weapon = {name: "Dagger, One Handed", str: 1, dex: 1, damage:"1d4+2", hp: 12};
		}
	
		return weapon;
	}catch(err){
		return "Error in jsRQWeapons.getWeapon " + err.message+"> "+wpn+"> "+hnds;
	}
}
