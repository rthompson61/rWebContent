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
					subEl = formatFixedLengthElement(3,0,[template.exp[level][lines[ln].elements[ele].el]]);
				}else if(lines[ln].elements[ele].type=="t_c"){
					subEl = formatFixedLengthElement(3,0,[template.exp[level][lines[ln].elements[ele].el]]);
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
			 }
		 }

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
				// window.alert("Check jsRQCreatureGen.formatPreResults: "+ template.equipment[equipKeys[key]].name +"  "+name[0]);
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
		 for(var bms = 0; bms < template.magic.basicMagic.length; bms++){
			 if(template.magic.basicMagic[bms].pow > 1){
				 basicmagic.push(template.magic.basicMagic[bms].name+" " + template.magic.basicMagic[bms].pow)
			 }else{
				 basicmagic.push(template.magic.basicMagic[bms].name);
			 }
		 }
		 basicmagic.sort();
		 r = r+"<br/>Basic Magic: "+formatLongString(basicmagic, 8, ", ", 40);
		 
		 if(template.hasOwnProperty("special")){
			 var strAry = template.special.split(" ");
			 r = r+"<br/>Special: "+formatLongString(strAry, 9, " ", 40);
		 }
		 
		 
		 r = r + "<br/><br/>Base Attack "+template.baseSkills.attack+"&nbsp;&nbsp;Base Parry "+template.baseSkills.parry+"&nbsp;&nbsp;Base Defense "+template.defense.base+"&nbsp;&nbsp;Damage Bonus "+template.damageBonus+"<br/>";
		 r = r + "Base Manipulation "+template.baseSkills.manipulation+"&nbsp;&nbsp;Base Stealth "+template.baseSkills.stealth+"&nbsp;&nbsp;Base Knowledge "+template.baseSkills.knowledge+"<br/>";
		 r = r + "Base Perception "+template.baseSkills.perception+"&nbsp;&nbsp;Base Oratory "+template.baseSkills.oratory+"<br/>";
		 r = r + "Base Move "+template.move.base+"&nbsp;&nbsp;Max Encumbrance "+template.enc.max+"<br/>";
		 r = r + "Strike Rank (SIZ) "+template.sr.siz+"&nbsp;&nbsp;Strike rank (DEX) "+template.sr.dex+"&nbsp;&nbsp;Treasure Factors "+template.tf;

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