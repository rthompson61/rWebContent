/**
 * 
 */


function formatPreResults2(template, level){
	try{
		//case where Experience control hasn't been set on UI
		 if(level == 1){
			 level = getExperienceLevels(template.name)[3];
		 }
		 //set HP for level
		template = locationHitPointCalc(template, level);

//Test		window.alert("jsRQDisplay.formatPreResults TF "+template.tf);
		var r = template.name+"<br/><pre>";
		var hL ={label:"",roll:"",aphp:"", next:0};
		var lines = [{elements:[{type:"char", label:"STR", el:"str"},{type:"char", label:"CON", el:"con"}]},
		             {elements:[{type:"char", label:"SIZ", el:"siz"},{type:"char", label:"INT", el:"int"}]},
		             {elements:[{type:"char", label:"POW", el:"pow"},{type:"char", label:"DEX", el:"dex"}]},
		             {elements:[{type:"char", label:"CHA", el:"cha"},{type:"template",label:"HP ", el:"hp"}]},
		             {elements:[{type:"t_c",label:"Move", el:"move"},{type:"t_c",label:"ENC", el:"enc"}]},
		             {elements:[{type:"t_c",label:"Def", el:"defense"},{type:"template",label:"TF ", el:"tf"}]}
		             ];
		var line = "";
		var subEl = "";
		var colorStr = 0;
		var colors = [];
		var maxEnc = 0;  // lost track of where I'm setting values so using this kludge
		var baseDef = 0; //same kludge
		var armorDesc =""; //Holder for armor descriptions
		r = r +"<br/>";//12345678901234567890123456789012345678901<br/>";
		for(var ln = 0; ln < lines.length; ln++){
			for(var ele=0; ele<lines[ln].elements.length; ele++){
				if(lines[ln].elements[ele].type=="char"){
					if(template.characteristics[lines[ln].elements[ele].el].hasOwnProperty("alt")){
						subEl = formatFixedLengthElement(3,0,[template.characteristics[lines[ln].elements[ele].el].value[level]])+"("+template.characteristics[lines[ln].elements[ele].el].value.alt[level]+")";
					}else{
					subEl = formatFixedLengthElement(3,0,[template.characteristics[lines[ln].elements[ele].el].value[level]]);
					}
				}else if(lines[ln].elements[ele].type=="template"){
//test					 window.alert("display "+lines[ln].elements[ele].el+" > "+template.exp[level][lines[ln].elements[ele].el]+" : "+template[lines[ln].elements[ele].el]);
					if(typeof template.exp[level][lines[ln].elements[ele].el] !== 'undefined' ){
						subEl = formatFixedLengthElement(3,0,[template.exp[level][lines[ln].elements[ele].el]]);
					}else{
						subEl = formatFixedLengthElement(3,0,[template[lines[ln].elements[ele].el]]);
					}
				}else if(lines[ln].elements[ele].type=="t_c"){
					if(lines[ln].elements[ele].el == "enc"){
//						template.error = template.error +"<br/> jsRQCDisplay 4 "+Object.getOwnPropertyNames(template.enc);//+" 1>"+Object.values(template.enc);
//						if(template.enc.max !== 'undefined'){
//							template.error = template.error +" Max>"+template.enc.max;
//						}
						maxEnc = formatFixedLengthElement(3,0,[template.exp[level][lines[ln].elements[ele].el]]);
						if(template.enc.current !== 'undefined'){
//							template.error = template.error +" Current>"+template.enc.current;
							subEl = formatFixedLengthElement(3,0,[template.enc.current]);
						}else{
							subEl = formatFixedLengthElement(3,0,[template.exp[level][lines[ln].elements[ele].el]]);
						}
					}else if(lines[ln].elements[ele].el == "move"){
               if (template.move.current !== 'undefined') {
                 subEl = formatFixedLengthElement(3, 0, [template.move.current]);
//                 subEl = formatFixedLengthElement(3, 0, [template.exp[level][lines[ln].elements[ele].el]]);
      	//				template.error = template.error +" Current>"+template.move.current;
               } else {
                 subEl = formatFixedLengthElement(3, 0, [template.exp[level][lines[ln].elements[ele].el]]);
               }
					}else{
					  //Defense
					     if(template.defense.current !== 'undefined'){
					       subEl = formatFixedLengthElement(3,0, [template.exp[level].defenseCurrent]);
					     }else{
                 subEl = formatFixedLengthElement(3, 0, [template.exp[level][lines[ln].elements[ele].el]]);
					     }
					}
				}
				line = line+formatFixedLengthElement(12,1,[lines[ln].elements[ele].label,subEl]);
			}
			hL = getHitLocation(template.body.hitLocations, hL.next);
			line = formatFixedLengthElement(25,1,[line])+hL.roll+" "+formatFixedLengthElement(5,0,[hL.label])+" "+hL.aphp+"<br/>";
			r=r+line;
			line ="";
		}
		 if(template.body.hitLocations.length > hL.next){
			 for(var n=hL.next; n < template.body.hitLocations.length; n++){
				hL = getHitLocation(template.body.hitLocations, hL.next);
				r = r + formatFixedLengthElement(25,1,[line])+hL.roll+" "+formatFixedLengthElement(5,0,[hL.label])+" "+hL.aphp+"<br/>";
	//			armorDesc = armorDesc+hL.armor.inner.armorDesc+", "+hL.armor.inner.armorDesc+", ";
			 }
		 }
    armorDesc = getArmorDesc(template);
		 var equipKeys = template.equipment.keys;
		 var title = 0;
		 var name=[];
		 var sr = "";
		 var atk = "";
		 for(var key = 0; key < equipKeys.length; key++){
			 if(template.equipment[equipKeys[key]].name != "" && template.equipment[equipKeys[key]].name !== undefined ){
				 if(title == 0){
					 r=r+formatFixedLengthElement(15,1,["Weapon"])+formatFixedLengthElement(3,1,["SR"])+formatFixedLengthElement(5,1,["Atk%"])+formatFixedLengthElement(11,1,["Damage"])+formatFixedLengthElement(4,1,["Pry%"])+formatFixedLengthElement(4,1,["Pts"])+"<br/>";
					 title = 1;
				 }
//					window.alert("jsRQDisplay.formatPreResults2 1: "+equipKeys[key]+"  "+template.equipment[equipKeys[key]].name);
				 if(template.equipment[equipKeys[key]].name.length <15){
					 name[0] = formatFixedLengthElement(15,1,[template.equipment[equipKeys[key]].name]);
				 }else{
					 name = template.equipment[equipKeys[key]].name.split(",");
					 name[0] = formatFixedLengthElement(15,1,[name[0],","]);
				 }
//				 window.alert("Check jsRQCreatureGen.formatPreResults: "+ template.exp[level].damageBonus);
				 sr = formatFixedLengthElement(2,0,[formatFixedLengthElement(1,1,[template.equipment[equipKeys[key]].sr.current])]);
				 atk = formatFixedLengthElement(3,0,[template.equipment[equipKeys[key]].attack.current]);
				 r=r+name[0]+sr+" "+atk+" "+formatFixedLengthElement(11,1,["  ",template.equipment[equipKeys[key]].damage])+"  ";
				 if(template.equipment[equipKeys[key]].parry.base > -1){
					 r = r+formatFixedLengthElement(4,1,formatNA([template.equipment[equipKeys[key]].parry.current]));
				 }else{
					 r = r+formatFixedLengthElement(4,1,formatNA(1000));
				 }
				 r = r  +formatFixedLengthElement(2,0,[template.equipment[equipKeys[key]].ap])+"<br/>";
				 if(name[1] != undefined){
					 r=r+"  "+name[1];
				 }
				 if(equipKeys[key].substring(0,7)== "missile"){
//					 window.alert("display "+formatFixedLengthElement(3,0,[template.equipment[equipKeys[key]].attack.current])+"  ");
					 r = r +"  Range: "+formatFixedLengthElement(3,0,[template.equipment[equipKeys[key]].range])+"   Rate: "+template.equipment[equipKeys[key]].rate+" shots/round";
				 }
				 if(name[1] != undefined || equipKeys[key].substring(0,7)== "missile"){
					 r=r+"<br/>";
				 }
				 name=[];
			 }
			  
		 }
		 //convert Skill Obj array to string array
		 var skillAry = [];
		 for(var sks = 0; sks < template.skills.set.length; sks++){
			 if(template.skills.set[sks].pClass !== 4 && template.skills.set[sks].current > 0){
				 skillAry.push(template.skills.set[sks].name+" "+template.skills.set[sks].current);
			 }
		 }
		 
//		 window.alert("jsRQDisplay.formatPreResults2 "+level+" "+template.skills.set.length)
		 for(var sks = 0; sks < template.skills.set[level].length; sks++){
			 if( template.skills.set[level][sks].base > 0 && template.skills.set[level][sks].name != undefined && template.skills.set[level][sks].name !== "undefined"){
				 skillAry.push(template.skills.set[level][sks].name+" "+template.skills.set[level][sks].base);
			 }
		 }
	 	 r = r+"<br/>Skills: "+formatLongString(skillAry, 8, ", ", 40);//template.skills.set
		 var basicmagic = [];
//		 window.alert("Test jsRQDisplay.formatPreResults2 Basic Magic Array Size"+template.magic.basicMagic.length);
		 for(var bms = 0; bms < template.magic.basicMagic.length; bms++){
			 if(template.magic.basicMagic[bms].pow > 1){
				 basicmagic.push(template.magic.basicMagic[bms].name+" " + template.magic.basicMagic[bms].pow)
			 }else{
				 basicmagic.push(template.magic.basicMagic[bms].name);
			 }
		 }
		 basicmagic.sort();
		 if(template.magic.basicMagic.length>0){
			 r = r+"<br/>Basic Magic: "+formatLongString(basicmagic, 8, ", ", 40);
		 }
		 if(template.hasOwnProperty("special")){
			 var strAry = template.special.split(" ");
			 r = r+"<br/>Special: "+formatLongString(strAry, 9, " ", 40);
		 }
		 
		r = r+"<br/><br/>Armor Description: "+armorDesc;
		 r = r + "<br/><br/>Base Attack "+template.exp[level].attack+"&nbsp;&nbsp;Base Parry "+template.exp[level].parry+";";//"&nbsp;&nbsp;Base Defense "+template.defense.base+"&nbsp;&nbsp;Damage Bonus "+template.exp[level].damageBonus+"<br/>";
		 r = r + "Base Manipulation "+template.exp[level].manipulation+"&nbsp;&nbsp;Base Stealth "+template.exp[level].stealth+"&nbsp;&nbsp;Base Knowledge "+template.exp[level].knowledge+"<br/>";
		 r = r + "Base Perception "+template.exp[level].perception+"&nbsp;&nbsp;Base Oratory "+template.exp[level].oratory+" ";
		 r = r + "Base Move "+template.move.base+"&nbsp;&nbsp;Max Encumbrance "+maxEnc+"&nbsp;&nbsp;Base Defense "+template.exp[level].defense+"<br/>"; 
		 r = r + "<br/>Strike Rank (SIZ) "+template.exp[level].sr.siz+"&nbsp;&nbsp;Strike rank (DEX) "+template.exp[level].sr.dex;//+"&nbsp;&nbsp;Treasure Factors "+template.tf;

		r= r+ "</pre>";
		if(template.body.hasOwnProperty("skinColors")){
			r = r+"Skin colors are ";//
			for(var p = 0; p < template.body.skinColors.length; p++){
				r = r + "<span style=\"border:1px solid #000;color:"+template.body.skinColors[p].text+";background-color:"+template.body.skinColors[p].color+"\">"+template.body.skinColors[p].name+"</span>";
				if(p< template.body.skinColors.length -2){
					r = r +", "
				}else if(p == template.body.skinColors.length -2){
					r = r +" and "
				}
			}
		}
		return r;
	}catch(err){
		return "Error jsRQCreatureGen.formatPreResults2: " + err;
	}	
}

function getArmorDesc(template){
  try{
    var descInnerAry = [];
    var descOuterAry = [];
    var n = 0;
    var returnDesc = "";
    for(n = 0; n<template.body.hitLocations.length; n++){
      if(template.body.hitLocations[n].armor.inner.armorDesc !== undefined){
        if(descInnerAry.length == 0){
          descInnerAry.push(template.body.hitLocations[n].armor.inner.armorDesc);
        }else{
          for(var m=0; m < descInnerAry.length; m++){
  //          window.alert("jsRQDisplay.getArmorDesc 0: "+ descInnerAry[m]+" "+m+" "+descInnerAry.length);
            if(descInnerAry[m] == template.body.hitLocations[n].armor.inner.armorDesc){
              m = descInnerAry.length;
            }else{
              descInnerAry.push(template.body.hitLocations[n].armor.inner.armorDesc);
              m = descInnerAry.length;
            }
          }
        }
      }
      if(template.body.hitLocations[n].armor.outer.armorDesc !== undefined){
       if (descOuterAry.length == 0) {
         descOuterAry.push(template.body.hitLocations[n].armor.outer.armorDesc);
       } else {
         for (var l = 0; l < descOuterAry.length; l++) {
           if (descOuterAry[l] == template.body.hitLocations[n].armor.outer.armorDesc) {
             l = descOuterAry.length;
           } else {
             descOuterAry.push(template.body.hitLocations[n].armor.outer.armorDesc);
             l = descOuterAry.length;
           }
         }
       }
      }
    }
    if(descInnerAry.length >0 ){
      //clean the array there are some rogue loops I can' track down when armor covers more than one location
  //    window.alert("jsRQDisplay.getARmorDesc 1 "+ formatLongString(descInnerAry,0,", ", 40));
      var popAry = [];
      for(var k =0; k < descInnerAry.length - 1; k++){
        if (descInnerAry[k] == descInnerAry[k+1]){
          popAry.push(k+1);
        }
      }
      if(popAry.length>0){
//         window.alert("jsRQDisplay.getARmorDesc 2 "+ formatLongString(popAry,0,", ", 40));
        for(var j = popAry.length-1; j > -1; j-- ){
          
//         window.alert("jsRQDisplay.getARmorDesc 3 "+ j+ "|" +popAry[j]);
         descInnerAry.splice(popAry[j], 1); 
        }
      }
      returnDesc = "inner: " +formatLongString(descInnerAry,0,", ", 40);
    }
    if(descOuterAry.length >0 ){
      var popAry = [];
      for (var k = 0; k < descOuterAry.length - 1; k++) {
        if (descOuterAry[k] == descOuterAry[k + 1]) {
          popAry.push(k + 1);
        }
      }
      if (popAry.length > 0) {
        //         window.alert("jsRQDisplay.getARmorDesc 2 "+ formatLongString(popAry,0,", ", 40));
        for (var j = popAry.length - 1; j > -1; j--) {
      
          //         window.alert("jsRQDisplay.getARmorDesc 3 "+ j+ "|" +popAry[j]);
          descOuterAry.splice(popAry[j], 1);
        }
      }
      returnDesc = returnDesc + "Outer: "+formatLongString(descOuterAry,0,", ", 40);
//      window.alert("jsDisplay.getArmorDesc;"+returnDesc);
    }
    return returnDesc;
  }catch(err){
		window.alert("Error: jsRQDisplay.getArmorDesc "+err);
  }
}

function formatAlt(val, mult){
	try{
		return Math.ceil(Number(val)*Number(mult));
	}catch(err){
		window.alert("Error: jsRQDisplay.formatAlt "+val+" "+mult+" "+err);
	}
}

 function formatLongString(strAry, start, delimit, lineLen){
	 //strAry - array of text value
	 //start initail offset
	 //delimit - delimiter to be inserted betwen elements
	 //lineLen - maximum line length
	 try{
		 var tLine = "";
		 var rLines ="";
//		 window.alert("jsRQDisplay.formatLongString: input length: "+strAry[0].length)
		 for(var sa = 0; sa < strAry.length; sa++){
			 if(start + tLine.length+delimit.length+strAry[sa].length < lineLen){
				 if(tLine.length > 0){
					 tLine = tLine + delimit + strAry[sa];
				 }else{
					 tLine = strAry[sa];
				 }
				 
			 }else{
				 rLines = rLines + tLine + "<br/>";
				 tLine = strAry[sa];
				 start = 0;
			 }
		 }
		 rLines = rLines + tLine + "<br/>";
		 return rLines;
		 
	 }catch(err){
		 window.alert("Error: jsRQDisplay.formatLongString"+err);
	 }
 }
function formatFixedLengthElement(l, p, cat){
	/*
	 * l is the minimum length of the fixed length element
	 * cat is the list of strings to be concatenated
	 * p is adding direction 0 = left, 1 = right
	 * returns padded string as necessary
	 */
	var concated ="";
	var pad="";
	try{
		for(var s= 0; s < cat.length; s++){
			concated = concated+cat[s];
		}
		for(var q =0; q<(l - concated.length); q++){
			pad=pad+" ";
		}
		if(p == 1){
			concated = concated+pad;
		}else{
			concated = pad+ concated;
		}
		return concated;
	}catch(err){
		return "Error jsRQCreatureGen.formatFixedLengthElement: " + err;
	}	
}

function formatNA(skill){
	try{
	if(Number(skill) >999){
		skill = "-";
	}
	//window.alert("Check jsRQCreatureGen.formatNA: "+skill);
	return skill;
	}catch(err){
		window.alert("Error jsRQCreatureGen.formatNA: " + err);
	}
}
