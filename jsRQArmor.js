/**
 * http://usejsdoc.org/
 */
function setArmor(armor, equip, hp, body){
	try{
		var patt = /^Armor/;
		var strList = "";
		var ac = 0;
		for( var i = 0; i < equip.length ; i++){
 			if(patt.test(equip[i][0]) ){
 				strList = equip[i][0].split(",");
 				if(strList[2] ===" Leather" || strList[2] ===" Hood"){
 					ac = 1;
 				}else if(strList[2] ===" Thick Leather" || strList[2] ===" Cap"){
					ac = 2;
 				}else if(strList[2] ===" Cuirbolli" || strList[2] ===" Linen" || strList[2] ===" Composite Helm"){
 					ac = 3;
 				}else if(strList[2] ===" Light Scale" || strList[2] ===" Ring Mail" || strList[2] ===" Open Helm"){
 					ac = 4;
 				}else if(strList[2] ===" Chainmail" || strList[2] ===" Heavy Scale" || strList[2] ===" Brigandine" || strList[2] ===" Closed Helm"){
 	 				ac = 5;
 				}else if(strList[2] ===" Plate" || strList[2] ===" Full Helm"){
 					ac = 6;
 				}
 				//TO DO: Set location armor values
 				if(strList[1] === " Helm"){
 					armor.head[0] = armor.head[0]+ac;
 				}else if(strList[1] === " Greaves"){
 					armor.lLeg[0] = armor.lLeg[0]+ac;
 					armor.rLeg[0] = armor.rLeg[0]+ac;
 				}else if(strList[1] === " Pants" || strList[1] === " Trews" ){
 					armor.lLeg[0] = armor.lLeg[0]+ac;
 					armor.rLeg[0] = armor.rLeg[0]+ac;
					armor.abd[0] = armor.abd[0] + ac;
				}else if(strList[1] === " Skirts"){
 					armor.abd[0] = armor.abd[0] + ac;
 				}else if(strList[1] === " Hauberk"){
 					armor.chest[0] = armor.chest[0]+ac;
 					armor.abd[0] = armor.abd[0]+ac;
 				}else if(strList[1] === " Byrnie" || strList[1] === " Cuirass"){
 					armor.chest[0] = armor.chest[0] + ac;
 				}else if(strList[1] === " Sleeves" || strList[1] === " Vambraces"){
 					armor.lArm[0] = armor.lArm[0]+ac;
 					armor.rArm[0] = armor.rArm[0]+ac;
 				}
 				//TO DO: Set location HP values
 				var hpLvl = Math.ceil(hp /4);
 				hpLvl = hpLvl - 1;
 				if(hpLvl < 1){hpLvl = 0;}
 				if(body === "Humanoid"){
 					armor.lLeg[1] = 2 + hpLvl;
 					armor.rLeg[1] = 2 + hpLvl;
 					armor.abd[1] = 2 + hpLvl;
 					armor.chest[1] = 3 + hpLvl;
 					armor.lArm[1] = 1 + hpLvl;
 					armor.rArm[1] = 1 + hpLvl;
 					armor.head[1] = 2 + hpLvl;
 				}
 			}
		}
		return armor;
	}catch(err){
		return "Error in jsRQArmor.setArmor "+err.message;
	}
}