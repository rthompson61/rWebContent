/**
 * Templates to generate RuneQuest NPCs and Monsters.  
 * Along with associated utilities
 */
function getTemplateNames(){
	try{
		var templates = getTemplates();
		var names = [];
		for( var i = 0; i< templates.length; i++){
			names.push(templates[i].name);
		}
		return names;
	}catch(err){
		return "error: jsRQTemplates.getTemplateNames: " + err;
	}
}

function getTemplateByName(templateName){
	try{
		var templates = getTemplates();
		for( var i = 0; i< templates.length; i++){
			if(templates[i].name === templateName){
				var template = templates[i];
				i = templates.length+1;
			}else{
				template = {name: templates[i].name+":"+templateName};
			}
		}
		template = setCalculatedElements(template);
		template.body.hitLocations = setHitLocations(template.body.type, template.body.naturalArmor);
		 var equip = setAttacks(template.equipment);
		//Set Advancement Objects
		var keys = equip.keys;
//		  window.alert("jsRQTemplates.getTemplateByName - call Attacks");
		for(var k = 0; k < equip.keys.length; k++){
			if(keys[k].substring(0,7) !== "natural"){
				equip[keys[k]].attack = getAdvObj();
				equip[keys[k]].parry = getAdvObj();
				switch(keys[k]){
					case "shield":
						equip[keys[k]].attack.prof = 30;
						equip[keys[k]].parry.prof =0;
						break;
					case "melee1":
					case "missile1":
						equip[keys[k]].attack.prof = 0;
						equip[keys[k]].parry.prof = 5;
						break;
					case "melee2":
						equip[keys[k]].attack.prof = 5;
						equip[keys[k]].parry.prof = 10;
						break;
					case "melee5":
						equip[keys[k]].attack.prof = 30;
						equip[keys[k]].parry.prof = 30;
						break;
					default:
						equip[keys[k]].attack.prof = 15;
						equip[keys[k]].parry.prof = 15;
						break;
				}
			}
		}
		for (var key in template.characteristics){
			if(!template.characteristics.hasOwnProperty(key)) continue;
			template.characteristics[key].value = getAdvObj();
		}
		template.equipment = equip;
			template = getSpecialRulesForTemplates (template);
		return template;
	}catch(err){
		window.alert("error: jsRQTemplates.getTemplateByName: "+"<"+templateName+"> " + err);
		return "error: jsRQTemplates.getTemplateByName: "+"<"+templateName+"> " + err;
	}
}


function getTemplates(){
	try{
		var templates = [
		             {name: "Human",
		              source:"RuneQuest 2",
		              characteristics:{
		            	  str:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  con:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  siz:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  int:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
		              },
		              move:{base:8, current:8},
  				      body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:0},
		              equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
	            	  equipmentList:"",
	            	  skills:{lists:["all", "sentient", "animal"], set:[], required:[], prohibited:[]},
	            	  magic:{uses:1, basicMagic:[]},
		              treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              error:""
		             },
		             {name: "Baboon",
			          source:"RuneQuest 2",
			          characteristics:{
			            str:{value:{}, nDice:3, szDice:6, mod: 6},
			            con:{value:{}, nDice:3, szDice:6, mod: 0},
			            siz:{value:{}, nDice:3, szDice:6, mod: 0},
			            int:{value:{}, nDice:3, szDice:6, mod: 0},
			            pow:{value:{}, nDice:2, szDice:6, mod: 6},
			            dex:{value:{}, nDice:2, szDice:6, mod: 6},
			            cha:{value:{}, nDice:3, szDice:6, mod: 0}
			           },
			          move:{base: 10, current:10},
					  body:{type:"Humanoid",hitLocations:[], attacks:"Baboon", naturalArmor:1},
					  equipment:{keys:["shield","melee1","melee3","melee4","missile1","missile2","naturalTeeth","naturalClaw"]},
		              equipmentList:"",
		              skills:{lists:["all", "sentient", "civil"], set:[], required:[{name:"Tracking", type:"p", base:30}, {name:"Spot Hidden", type:"p", base:25}, {name:"Spot Trap", type:"p", base:25}, {name:"Move Quietly", type:"s", base:25}], prohibited:["Boating"]},
		              magic:{uses:1, basicMagic:[]},
		              treasureFactors:{multiAttack:1, special:0},
		              mutations:{eBP:[]},
			          error:""
			         },
			         {name: "Mostali",
				      source:"RuneQuest 2",
				      characteristics:{
				            str:{value:{}, nDice:4, szDice:6, mod: 0},
				            con:{value:{}, nDice:2, szDice:6, mod: 6},
				            siz:{value:{}, nDice:2, szDice:6, mod: 0},
				            int:{value:{}, nDice:3, szDice:6, mod: 0},
				            pow:{value:{}, nDice:3, szDice:6, mod: 0},
				            dex:{value:{}, nDice:3, szDice:6, mod: 0},
				            cha:{value:{}, nDice:3, szDice:6, mod: 0}
				      },
				      move:{base: 6, current:6},
					  body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:0},
					  equipment:{},
					  equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
			          skills:{lists:["all", "sentient", "animal","dwarf"], set:[], required:[{name:"Armor Making", type:"m", base:40}, {name:"Evaluate Treasure", type:"k", base:50} ,{name:"Spot Hidden Items", type:"p", base:25},{name:"Spot Trap", type:"p", base:50},{name:"Disarm Trap", type:"m", base:50}], prohibited:[]},
			          magic:{uses:1, basicMagic:[]},
		              treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
				      error:""
				     },
				     {name: "Duck",
				      source:"RuneQuest 2",
					  characteristics:{
					        str:{value:{}, nDice:2, szDice:6, mod: 1},
					        con:{value:{}, nDice:2, szDice:6, mod: 6},
					        siz:{value:{}, nDice:1, szDice:6, mod: 2},
					        int:{value:{}, nDice:3, szDice:6, mod: 0},
					        pow:{value:{}, nDice:3, szDice:6, mod: 0},
					        dex:{value:{}, nDice:2, szDice:6, mod: 6},
					        cha:{value:{}, nDice:3, szDice:6, mod: 0}
					  },
					  move:{base: 5, current:5},
   					  body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:0},
   					equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
   		              equipmentList:"",
   		              skills:{lists:["all", "sentient", "animal", "duck"], set:[], required:[{name:"Hide in Cover", type:"s", base:35},{name:"Swimming", type:"m", base:85}], prohibited:[]},
   		              magic:{uses:1, basicMagic:[]},
		              treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
   			          error:""
					 },
					 {name: "Troll, Dark",
				      source:"RuneQuest 2",
					  characteristics:{
					      str:{value:{}, nDice:3, szDice:6, mod: 6},
					      con:{value:{}, nDice:3, szDice:6, mod: 0},
					      siz:{value:{}, nDice:3, szDice:6, mod: 6},
					      int:{value:{}, nDice:3, szDice:6, mod: 0},
					      pow:{value:{}, nDice:3, szDice:6, mod: 0},
					      dex:{value:{}, nDice:3, szDice:6, mod: 0},
					      cha:{value:{}, nDice:3, szDice:6, mod: 0}
					  },
				      move:{base: 8, current:8},
					  body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:0},
					  equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
			          equipmentList:"",
			          skills:{lists:["all", "sentient", "animal"], set:[], required:[], prohibited:[]},
			          magic:{uses:1, basicMagic:[]},
		              treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
				      error:""
					 },
					 {name: "Gorp",
				      source:"RuneQuest 2",
				      characteristics:{
				          	  str:{value:{}, nDice:0, szDice:0, mod: 0},
				          	  con:{value:{}, nDice:3, szDice:6, mod: 0},
				           	  siz:{value:{}, nDice:6, szDice:6, mod: 0},
				           	  int:{value:{}, nDice:0, szDice:0, mod: 0},
				           	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
				           	  dex:{value:{}, nDice:0, szDice:0, mod: 0},
				           	  cha:{value:{}, nDice:0, szDice:0, mod: 0}
				      },
				      move:{base: 5, current:5},
				      body:{type:"Ameboid",hitLocations:[], attacks:"Ameboid", naturalArmor:0},
				      equipment:{keys:["naturalEnvelope"]},
			          equipmentList:"",
			          skills:{lists:[], set:[], required:[], prohibited:[]},
			          magic:{uses:0, basicMagic:[]},
		              treasureFactors:{multiAttack:0, special:1},
		              mutations:{eBP:[]},
		              special:"Gorp attack by moving next to a victim during movement phase.  If the victim fails a DEX roll the Gorp has enveloped it.  if the victim can still move on the second round, the victim can try another DEX roll.",
	            	  chaos:1,
				      error:""
				     },
					 {name: "Giant Centipede",
				      source:"D&D",
				      characteristics:{
				          	  str:{value:{}, nDice:2, szDice:6, mod: 0},
				          	  con:{value:{}, nDice:2, szDice:6, mod: 0},
				           	  siz:{value:{}, nDice:1, szDice:6, mod: 0},
				           	  int:{value:{}, nDice:0, szDice:0, mod: 1},
				           	  pow:{value:{}, nDice:1, szDice:6, mod: 0},
				           	  dex:{value:{}, nDice:2, szDice:6, mod: 0},
				           	  cha:{value:{}, nDice:0, szDice:0, mod: 0}
				      },
				      move:{base: 8, current:8},
				      body:{type:"Snake",hitLocations:[], attacks:"Snake", naturalArmor:0},
				      equipment:{keys:["naturalBite2"]},
			          equipmentList:"",
			          skills:{lists:[], set:[], required:[], prohibited:[]},
			          magic:{uses:0, basicMagic:[]},
		              treasureFactors:{multiAttack:0, special:1},
		              mutations:{eBP:[]},
		              special:"The bite injects a very weak Manticore poison. If a character's CON is reduced to or below 0, they are incapacitated, but not dead.  They recover at the normal rate.",
	            	  chaos:1,
				      error:""
				     },
				     {name: "Walktapus",
					  source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:2, szDice:6, mod: 18},
					       	  con:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  siz:{value:{}, nDice:2, szDice:6, mod: 18},
					       	  int:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
					  },
					  move:{base: 8, current:8},
					  body:{type:"Walktapi",hitLocations:[], attacks:"Walktapi", naturalArmor:4},
					  equipment:{keys:["naturalTentacle4"]},
				      equipmentList:"",
				      skills:{lists:["all", "sentient", "animal"], set:[], required:[], prohibited:[]},
				      magic:{uses:0, basicMagic:[]},
		              treasureFactors:{multiAttack:3, special:1, poison:"CON"},
		              mutations:{eBP:[]},
				      special:" Can use four at once. If two have struck the same target, they will constrict every round. Armor will protect only until its absorption rate is overcome, then it is broken.   Gas cloud of systemic poison in 3 meter circle. Potency equal to CON.",
					  error:""
					 },
					 {name: "Basilisk",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:2, szDice:6, mod: 0},
					      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  siz:{value:{}, nDice:2, szDice:6, mod: 0},
					       	  int:{value:{}, nDice:0, szDice:6, mod: 0},
					       	  pow:{value:{}, nDice:1, szDice:6, mod: 12},
					       	  dex:{value:{}, nDice:2, szDice:6, mod: 0},
					       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
					  },
					  move:{base: 4, current:4},
					  body:{type:"Basilisk",hitLocations:[], attacks:"Basilisk", naturalArmor:2},
					  equipment:{keys:["naturalGlance","naturalClaw3"]},
					  equipmentList:"",
					  skills:{lists:["all"], set:[], required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
		              treasureFactors:{multiAttack:1, special:1},
		              mutations:{eBP:[]},
		              special:"If the gaze of the basilisk overcomes the target's POW, the target dies.  The gaze acts as a 3 point Rune magic spell for COuntermagic.",
					  error:""
				     },
			         {name: "Bearwalker",
					  source:"RuneQuest 2",
			          characteristics:{
			          	  str:{value:{}, nDice:2, szDice:6, mod: 6, alt:2},
			           	  con:{value:{}, nDice:3, szDice:6, mod: 0},
			           	  siz:{value:{}, nDice:1, szDice:6, mod: 12},
		            	  int:{value:{}, nDice:3, szDice:6, mod: 0, alt:0.667},
		            	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
			           	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
			          },
			          move:{base:8, alt:10, current:8},
	  				  body:{type:"Humanoid",hitLocations:[], attacks:"Bear", naturalArmor:1},
			          equipment:{keys:["naturalClaw6","naturalBite10","naturalHug4d6"]},
		              equipmentList:"",
		              skills:{lists:["all", "sentient"], set:[], required:[{name:"Track by Smell", type:"p", base:55},{name:"Spot Hidden", type:"p", base:55}, {name:"Spot Trap", type:"p", base:55}, {name:"Move Quietly", type:"s", base:55}, {name:"Hide in Cover", type:"s", base:45}], prohibited:[]},
		           	  magic:{uses:1, basicMagic:[]},
		              treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"The bearwalker can't use offensive magic in animal form.", 
			          error:""
			         },
					 {name: "Bison",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:3, szDice:6, mod: 24},
					      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  siz:{value:{}, nDice:3, szDice:6, mod: 24},
					       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
					       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  dex:{value:{}, nDice:2, szDice:6, mod: 0},
					       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
					  },
					  move:{base: 12, current:12},
					  body:{type:"Quadruped",hitLocations:[], attacks:"Bison", naturalArmor:3},
					  equipment:{keys:["naturalButt2d10","naturalTrample6d6"]},
					  equipmentList:"",
					  skills:{lists:["all", "animal"], set:[], required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
		              treasureFactors:{multiAttack:0, special:0},
		              special:"Bison cannot butt and trample in the same melee round",
		              mutations:{eBP:[]},
					  error:""
					 },
				     {name: "Bolo Lizard",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:2, szDice:6, mod: 12},
					      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  siz:{value:{}, nDice:2, szDice:6, mod: 12},
					       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
					       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  dex:{value:{}, nDice:1, szDice:6, mod: 12},
					       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
					  },
					  move:{base: 12, current:12},
					  body:{type:"BoloLizard",hitLocations:[], attacks:"BoloLizard", naturalArmor:1},
					  equipment:{keys:["naturalBite6","naturalKick8"]},
					  equipmentList:"",
					  skills:{lists:["all", "animal"], set:[], required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
		              treasureFactors:{multiAttack:1, special:0},
		              mutations:{eBP:[]},
		              special:"A bolo lizard attacks with both bite and kick in the same melee round.",
					  error:""
					 },
					 {name: "Broo",
			          source:"RuneQuest 2",
			          characteristics:{
			            str:{value:{}, nDice:2, szDice:6, mod: 6},
			            con:{value:{}, nDice:1, szDice:6, mod: 12},
			            siz:{value:{}, nDice:2, szDice:6, mod: 6},
			            int:{value:{}, nDice:3, szDice:6, mod: 0},
			            pow:{value:{}, nDice:3, szDice:6, mod: 0},
			            dex:{value:{}, nDice:3, szDice:6, mod: 0},
			            cha:{value:{}, nDice:2, szDice:6, mod: 0}
			           },
			          move:{base: 10, current:10},
					  body:{type:"Humanoid",hitLocations:[], attacks:"Broo", naturalArmor:0},
					  equipment:{keys:["shield","melee1","melee3","melee4","missile1","missile2","naturalButt6"]},
		              equipmentList:"",
		              skills:{lists:["all", "sentient", "animal", "baboon"], set:[], required:[ {name:"Tracking", type:"p", base:40}], prohibited:[]},
		              magic:{uses:1, basicMagic:[]},
		              treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
		              chaos:3,
		              disease:50,
			          error:""
			         },
				     {name: "Centaur",
					      source:"RuneQuest 2",
						  characteristics:{
						       	  str:{value:{}, nDice:3, szDice:6, mod: 6},
						      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
						       	  siz:{value:{}, nDice:4, szDice:6, mod: 12},
						       	  int:{value:{}, nDice:3, szDice:6, mod: 0},						       	  
						       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
						       	  dex:{value:{}, nDice:3, szDice:6, mod: 3},
						       	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
						  },
						  move:{base: 12, current:12},
						  body:{type:"Centaur",hitLocations:[], attacks:"Centaur", naturalArmor:0},
						  equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3","naturalHoof"]},
						  equipmentList:"",
						  skills:{lists:["all", "sentient", "animal", "centaur"], set:[], required:[{name:"Play Lyre", type:"m", base:70},{name:"Tracking", type:"p", base:50}], prohibited:[]},
						  magic:{uses:1, basicMagic:[]},
			              treasureFactors:{multiAttack:1, special:0},
			              mutations:{eBP:[]},
			              special:"A centaur can kick with a hoof at the same time as striking with a melee weapon.",
						  error:""
				     },
					 {name: "Cliff Toad",
					      source:"RuneQuest 2",
						  characteristics:{
						       	  str:{value:{}, nDice:3, szDice:6, mod: 0},
						      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
						       	  siz:{value:{}, nDice:3, szDice:6, mod: 0},
						       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
						       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
						       	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
						       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
						  },
						  move:{base: 1, current:1},
						  body:{type:"Quadruped",hitLocations:[], attacks:"Cliff Toad", naturalArmor:0},
						  equipment:{keys:["naturalTongue","naturalSwallow"]},
						  equipmentList:"",
						  skills:{lists:["all",  "animal"], set:[], required:[], prohibited:[]},
						  magic:{uses:0, basicMagic:[]},
			              treasureFactors:{multiAttack:0, special:2},
			              mutations:{eBP:[]},
			              special:"On the turn after the tongue hits, it will zip the target into its mouth 80% of the time. As the tongue sticks to the victim, a miss in swallowing means the victim takes 1D6+damage bonus in constriction damage, with an 80% chance of being swallowed next time. Digestive acid has 2 levels of potency per D6 of SIZ.",
						  error:""
						 },
						 {name: "Cockatrice",
					      source:"RuneQuest 2",
						  characteristics:{
						       	  str:{value:{}, nDice:2, szDice:6, mod: 0},
						      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
						       	  siz:{value:{}, nDice:2, szDice:6, mod: 0},
						       	  int:{value:{}, nDice:0, szDice:6, mod: 0},
						       	  pow:{value:{}, nDice:1, szDice:6, mod: 12},
						       	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
						       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
						  },
						  move:{base: 4, current:4},
						  body:{type:"Basilisk",hitLocations:[], attacks:"Cockatrice", naturalArmor:2},
						  equipment:{keys:["naturalPeck10"]},
						  equipmentList:"",
						  skills:{lists:["all",  "animal"], set:[], required:[], prohibited:[]},
						  magic:{uses:0, basicMagic:[]},
						  treasureFactors:{multiAttack:0, special:1},
			              mutations:{eBP:[]},
			              special:"The peck injects a poison into the body of the victim. This poison is just a conductor for the “attack” of the cockatrice’s POW versus the victim’s. If the cockatrice is successful, the victim turns to stone",
						  error:""
					     },
					 {name: "Demi-bird",
					      source:"RuneQuest 2",
						  characteristics:{
						       	  str:{value:{}, nDice:3, szDice:6, mod: 18},
						      	  con:{value:{}, nDice:2, szDice:6, mod: 6},
						       	  siz:{value:{}, nDice:3, szDice:6, mod: 12},
						       	  int:{value:{}, nDice:0, szDice:6, mod: 0},
						       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
						       	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
						       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
						  },
						  move:{base: 4, current:4},
						  body:{type:"Demi-bird",hitLocations:[], attacks:"Demi-bird", naturalArmor:2},
						  equipment:{keys:["naturalPeck8","naturalKick2d6"]},
						  equipmentList:"",
						  skills:{lists:["all",  "animal"], set:[], required:[], prohibited:[]},
						  magic:{uses:0, basicMagic:[]},
						  treasureFactors:{multiAttack:1, special:0},
			              mutations:{eBP:[]},
			              special:"A demi-bird will peck and kick one or two foes at the same time.",
						  error:""
					     },
					 {name: "A3-Demon, Manes",
				      source:"AD&D",
					  characteristics:{
					      str:{value:{}, nDice:3, szDice:6, mod: 6},
					      con:{value:{}, nDice:3, szDice:6, mod: 0},
					      siz:{value:{}, nDice:2, szDice:4, mod: 6},
					      int:{value:{}, nDice:3, szDice:6, mod: 0},
					      pow:{value:{}, nDice:1, szDice:6, mod: 0},
					      dex:{value:{}, nDice:3, szDice:6, mod: 0},
					      cha:{value:{}, nDice:1, szDice:6, mod: 0}
					  },
				      move:{base: 8, current:8},
					  body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:4},
					  equipment:{keys:["naturalBite4","naturalClaw3","naturalClaw3"]},
			          equipmentList:"",
				 skills:{lists:["all",  "animal"], set:[], required:[], prohibited:[]},
			          magic:{uses:0, basicMagic:[]},
		              treasureFactors:{multiAttack:2, special:0},
		              mutations:{eBP:[]},
   			      special:"A Manes demon can only be damaged by magic weapons, or weapons with Bladesharp, Bludgeon, etc cast on them. Only the magically created missiles in a Multimissile spell can cause damage.",
				      error:""
					 },
				 {name: "Dream Dragon",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:6, szDice:6, mod: 0},
					      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  siz:{value:{}, nDice:6, szDice:6, mod: 0},
					       	  int:{value:{}, nDice:4, szDice:6, mod: 0},
					       	  pow:{value:{}, nDice:4, szDice:6, mod: 3},
					       	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
					  },
					  move:{base: 7, current:7},
					  body:{type:"Dragon",hitLocations:[], attacks:"Dream Dragon", naturalArmor:4},
					  equipment:{keys:["naturalClaw6", "naturalBreath"]},
					  equipmentList:"",
					  skills:{lists:["all",  "animal"], set:[], required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:1, special:1},
		              mutations:{eBP:[]},
		              special:"",
					  error:""
				     },
			    {name: "Dragonewt",
		              source:"RuneQuest 2",
		              characteristics:{
		            	  str:{value:{}, nDice:2, szDice:6, mod: 0},
		            	  con:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  siz:{value:{}, nDice:2, szDice:6, mod: 0},
		            	  int:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  pow:{value:{}, nDice:2, szDice:6, mod: 0},
		            	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
		            	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
		              },
		              move:{base:7, current:7},
  				      body:{type:"Dragonewt",hitLocations:[], attacks:"Humanoid", naturalArmor:1},
		              equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
	            	  equipmentList:"",
	            	  skills:{lists:["all", "sentient", "animal", "dragonewt"], set:[], required:[{name:"Hide in Cover", type:"s", base:20}, {name:"Move Quietly", type:"s", base:20}, {name:"Camoflage", type:"s", base:20}], prohibited:[]},
	            	  magic:{uses:1, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
		              error:""
		             },
				 {name: "Dragonsnail",
			          source:"RuneQuest 2",
			          characteristics:{
			            str:{value:{}, nDice:4, szDice:6, mod: 12},
			            con:{value:{}, nDice:3, szDice:6, mod: 0},
			            siz:{value:{}, nDice:4, szDice:6, mod: 12},
			            int:{value:{}, nDice:0, szDice:6, mod: 0},
			            pow:{value:{}, nDice:3, szDice:6, mod: 0},
			            dex:{value:{}, nDice:2, szDice:6, mod: 0},
			            cha:{value:{}, nDice:0, szDice:6, mod: 0}
			           },
			          move:{base: 3, current:3},
					  body:{type:"Dragonsnail",hitLocations:[], attacks:"Dragonsnail", naturalArmor:4},
					  equipment:{keys:["naturalBite6"]},
		              equipmentList:"",
		              skills:{lists:["all",  "animal"], set:[], required:[], prohibited:["Jumping"]},
		              magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
		              chaos:300,
		              error:""
			         },
		         {name: "Dryad",
		              source:"RuneQuest 2",
		              characteristics:{
		            	  str:{value:{}, nDice:2, szDice:6, mod: 0},
		            	  con:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  siz:{value:{}, nDice:2, szDice:6, mod: 0},
		            	  int:{value:{}, nDice:4, szDice:6, mod: 0},
		            	  pow:{value:{}, nDice:2, szDice:6, mod: 8},
		            	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
		            	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
		              },
		              move:{base:9, current:9},
  				      body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:0},
		              equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
	            	  equipmentList:"",
	            	  skills:{lists:["all", "sentient", "animal", "dragonewt","dryad"], set:[], required:[{name:"Move Quietly", type:"s", base:30}, {name:"Camouflage", type:"s", base:30},{name:"Hide in Cover", type:"s", base:30},{name:"Listen", type:"p", base:35},{name:"Spot Plant", type:"p", base:75}], prohibited:[]},
	            	  magic:{uses:1, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
		              error:""
		             },
	         {name: "Elf",
	              source:"RuneQuest 2",
	              characteristics:{
	            	  str:{value:{}, nDice:2, szDice:6, mod: 2},
	            	  con:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  siz:{value:{}, nDice:2, szDice:6, mod: 4},
	            	  int:{value:{}, nDice:4, szDice:6, mod: 0},
	            	  pow:{value:{}, nDice:2, szDice:6, mod: 6},
	            	  dex:{value:{}, nDice:3, szDice:6, mod: 3},
	            	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
	              },
	              move:{base:9, current:9},
			      body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:0},
	              equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
            	  equipmentList:"",
            	  skills:{lists:["all", "sentient", "animal", "dragonewt","dryad", "elf"], set:[], required:[{name:"Hide in Cover", type:"s", base:25}, {name:"Camouflage", type:"s", base:25},{name:"Move Quietly", type:"s", base:25},{name:"Listen", type:"p", base:30},{name:"Spot Hidden Items", type:"p", base:25}], prohibited:[]},
            	  magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"",
	              error:""
	             },
         {name: "Gargoyle",
              source:"RuneQuest 2",
              characteristics:{
            	  str:{value:{}, nDice:5, szDice:6, mod: 12},
            	  con:{value:{}, nDice:3, szDice:6, mod: 0},
            	  siz:{value:{}, nDice:5, szDice:6, mod: 0},
            	  int:{value:{}, nDice:1, szDice:6, mod: 0},
            	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
            	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
            	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
              },
              move:{base:8, current:8},
		      body:{type:"Gargoyle",hitLocations:[], attacks:"Gargoyle", naturalArmor:6},
              equipment:{keys:["shield","melee1","melee3","melee4","missile1","missile2","naturalClaw"]},
        	  equipmentList:"",
        	  skills:{lists:["all", "sentient", "animal"], set:[], required:[], prohibited:[]},
        	  magic:{uses:1, basicMagic:[]},
			  treasureFactors:{multiAttack:0, special:0},
              mutations:{eBP:[]},
              special:"",
              error:""
             },
	         {name: "Ghost",
				  source:"RuneQuest 2",
		          characteristics:{
		          	  str:{value:{}, nDice:0, szDice:6, mod: 0},
		           	  con:{value:{}, nDice:0, szDice:6, mod: 0},
		           	  siz:{value:{}, nDice:0, szDice:6, mod: 0},
	            	  int:{value:{}, nDice:1, szDice:6, mod: 0},
	            	  pow:{value:{}, nDice:1, szDice:6, mod: 0},
	            	  dex:{value:{}, nDice:0, szDice:6, mod: 0},
		           	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
		          },
		          move:{base:0, current:0},
 				  body:{type:"Incorporeal",hitLocations:[], attacks:"", naturalArmor:3},
		          equipment:{keys:["Incorporeal"]},
	              equipmentList:"",
	              skills:{lists:[], set:[], required:[], prohibited:[]},
	           	  magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:1},
	              mutations:{eBP:[]},
	              special:"",
	           	  chaos:0,
		          error:""
		         },
             {name: "Ghoul",
	              source:"RuneQuest 2",
	              characteristics:{
	            	  str:{value:{}, nDice:4, szDice:6, mod: 0},
	            	  con:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  siz:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  int:{value:{}, nDice:2, szDice:6, mod: 0},
	            	  pow:{value:{}, nDice:2, szDice:6, mod: 6},
	            	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
	              },
	              move:{base:8, current:8},
				      body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:0},
	              equipment:{keys:["shield","melee2","melee4","melee5","missile2","missile3","naturalClaw6","naturalBite6","naturalGhoulHowl"]},
           	  equipmentList:"",
           	  skills:{lists:["all",  "animal"], set:[], required:[], prohibited:[]},
           	  magic:{uses:1, basicMagic:[]},
			  treasureFactors:{multiAttack:1, special:2},
              mutations:{eBP:[]},
              special:"* Bite injects a paralyzing poison of potency equal to the CON of the ghoul. If successful versus CON of victim, he will be paralyzed until counteracted by an antidote. Spider antidote will counteract the poison of the ghoul. Victim will live as many days as he has points of CON, losing 1 each day. † The howl of the ghoul actually matches the POW of the ghoul versus the INT of his victim. It has the same effect as a Demoralize spell, but is not strictly magic and is not affected by Shield, Countermagic or Dispel Magic spells. When a party of ghouls attacks a party of Adventurers, compare the POW of the most powerful ghoul against the INTs of each member of the party every round. If a party member resists the howl for five consecutive rounds, he will be immune to a ghoul’s howl until a week has passed without hearing it",
	              error:""
	             },
	             {name: "Giant",
		              source:"RuneQuest 2",
		              characteristics:{
		            	  str:{value:{}, nDice:3, szDice:6, mod: 18},
		            	  con:{value:{}, nDice:1, szDice:6, mod: 12},
		            	  siz:{value:{}, nDice:3, szDice:6, mod: 18},
		            	  int:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
		              },
		              move:{base:12, current:12},
 				      body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:6},
		              equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
	            	  equipmentList:"",
	            	  skills:{lists:["all", "sentient", "animal"], set:[], required:[], prohibited:[]},
	            	  magic:{uses:1, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
	            	  chaos:1,
		              error:""
		             },
				 {name: "Griffin",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:8, szDice:6, mod: 0},
					      	  con:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  siz:{value:{}, nDice:8, szDice:6, mod: 0},
					       	  int:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  pow:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
					  },
					  move:{base: 8, current:8},
					  body:{type:"Basilisk",hitLocations:[], attacks:"Basilisk", naturalArmor:4},
					  equipment:{keys:["naturalClaw6", "naturalPeck8"]},
					  equipmentList:"",
					  skills:{lists:["all", "sentient", "animal"], set:[], required:[], prohibited:[]},
					  magic:{uses:1, basicMagic:[]},
					  treasureFactors:{multiAttack:2, special:0},
		              mutations:{eBP:[]},
		              special:" A griffin can claw and peck at three or fewer foes at the same time.",
					  error:""
				     },
				 {name: "High Llama",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:2, szDice:6, mod: 24},
					      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  siz:{value:{}, nDice:2, szDice:6, mod: 24},
					       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
					       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  dex:{value:{}, nDice:2, szDice:6, mod: 0},
					       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
					  },
					  move:{base: 12, current:12},
					  body:{type:"Quadruped",hitLocations:[], attacks:"", naturalArmor:2},
					  equipment:{keys:["naturalBite2d8","naturalKick2d6"]},
					  equipmentList:"",
					  skills:{lists:["all",  "animal"], set:[], required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:1, special:0},
		              mutations:{eBP:[]},
		              special:" A high llama will bite and kick one or two foes at the same time",
					  error:""
					 },
				 {name: "Horse",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:3, szDice:6, mod: 18},
					      	  con:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  siz:{value:{}, nDice:4, szDice:6, mod: 12},
					       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
					       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
					  },
					  move:{base: 12, current:12},
					  body:{type:"Quadruped",hitLocations:[], attacks:"", naturalArmor:1},
					  equipment:{keys:["naturalBite10","naturalKick8", "naturalRearAndPlunge", "naturalTrample4d6"]},
					  equipmentList:"",
					  skills:{lists:["all",  "animal"], set:[], required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:2, special:0},
		              mutations:{eBP:[]},
		              special:"",
					  error:""
					 },
				 {name: "Horse, War",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:3, szDice:6, mod: 18},
					      	  con:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  siz:{value:{}, nDice:4, szDice:6, mod: 12},
					       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
					       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
					  },
					  move:{base: 12, current:12},
					  body:{type:"Quadruped",hitLocations:[], attacks:"", naturalArmor:1},
					  equipment:{keys:["naturalBite10","naturalKick8", "naturalRearAndPlunge", "naturalTrample4d6"]},
					  equipmentList:"",
					  skills:{lists:["all",  "animal"], set:[], required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:2, special:0},
		              mutations:{eBP:[]},
		              special:"Warhorses without riders have a natural attack of 25% with Bite, Kick, and Trample. However, they only have a 5% chance with these skills when working in coordination with a rider. They must be trained to use these skills with a rider.",
					  error:""
					 },
				 {name: "Impala",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:2, szDice:6, mod: 6},
					      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  siz:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
					       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
					  },
					  move:{base: 10, current:10},
					  body:{type:"Quadruped",hitLocations:[], attacks:"", naturalArmor:0},
					  equipment:{keys:["naturalKick2d4"]},
					  equipmentList:"",
					  skills:{lists:["all",  "animal"], set:[], required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
					  error:""
					 },
		         {name: "Jack O'Bear",
					  source:"RuneQuest 2",
			          characteristics:{
			          	  str:{value:{}, nDice:3, szDice:6, mod: 6},
			           	  con:{value:{}, nDice:2, szDice:6, mod: 6},
			           	  siz:{value:{}, nDice:3, szDice:6, mod: 6},
		            	  int:{value:{}, nDice:2, szDice:6, mod: 0},
		            	  pow:{value:{}, nDice:4, szDice:6, mod: 0},
		            	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
			           	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
			          },
			          move:{base:8, current:8},
	  				  body:{type:"Humanoid",hitLocations:[], attacks:"Bear", naturalArmor:3},
			          equipment:{keys:["naturalClaw6"]},
		              equipmentList:"",
		              skills:{lists:["all", "animal", "jackobear"], set:[], required:[{name:"Hide in Cover", type:"s", base:65},{name:"Move Quietly", type:"s", base:65}], prohibited:[]},
		           	  magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:1, special:1},
		              mutations:{eBP:[]},
		              special:"These creatures can attack with two claw attacks in the same SR.  The Jack O'Bear can ensnare another's mind in a version of the Harmonize spell, grabbing one victim a melee round up to a limit of one for every 2 points of POW it has. These victims whose magic resistance are overcome are frozen in place and helpless unless the Jack O'Bear dies or a 2 point Dispel Magic is used against the Harmonize. The Jack O'Bear's Harmonize acts as a 1 point Rune magic spell, acting without draining the jack's POW. ",
		           	  chaos:0.35,
			          error:""
			         },
				 {name: "Manticore",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:4, szDice:6, mod: 12},
					      	  con:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  siz:{value:{}, nDice:4, szDice:6, mod: 12},
					       	  int:{value:{}, nDice:2, szDice:6, mod: 0},
					       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  dex:{value:{}, nDice:2, szDice:6, mod: 3},
					       	  cha:{value:{}, nDice:2, szDice:6, mod: 0}
					  },
					  move:{base: 9, current:9},
					  body:{type:"Dragon",hitLocations:[], attacks:"Dream Dragon", naturalArmor:4},
					  equipment:{keys:["naturalClaw6", "naturalSting6"]},
					  equipmentList:"",
					  skills:{lists:["all", "sentient",  "animal", "jackobear"], set:[], required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:1, special:0, poison:"CON"},
		              mutations:{eBP:[]},
		              special:"A manticore will use both attacks at once, at one or two opponents. The sting has a systemic poison of potency equal to its CON, usually 13.",
					  error:""
				     },
		         {name: "Minotaur",
					  source:"RuneQuest 2",
			          characteristics:{
			          	  str:{value:{}, nDice:3, szDice:6, mod: 12},
			           	  con:{value:{}, nDice:2, szDice:6, mod: 6},
			           	  siz:{value:{}, nDice:3, szDice:6, mod: 12},
		            	  int:{value:{}, nDice:2, szDice:6, mod: 0},
		            	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
			           	  cha:{value:{}, nDice:2, szDice:6, mod: 0}
			          },
			          move:{base:10, current:10},
	  				  body:{type:"Humanoid",hitLocations:[], attacks:"Bear", naturalArmor:3},
			          equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
		              equipmentList:"",
		              skills:{lists:["all", "sentient", "animal", "jackobear"], set:[], required:[], prohibited:[]},
		           	  magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
			          error:""
			         },
		         {name: "Morokanth",
					  source:"RuneQuest 2",
			          characteristics:{
			          	  str:{value:{}, nDice:3, szDice:6, mod: 6},
			           	  con:{value:{}, nDice:3, szDice:6, mod: 0},
			           	  siz:{value:{}, nDice:3, szDice:6, mod: 6},
		            	  int:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  dex:{value:{}, nDice:3, szDice:6, mod: 3},
			           	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
			          },
			          move:{base:8, current:8},
	  				  body:{type:"Humanoid",hitLocations:[], attacks:"Bear", naturalArmor:4},
			          equipment:{keys:["naturalClaw6", "shield","melee2","melee3","melee4","melee5","missile2","missile3"]},
		              equipmentList:"",
		              skills:{lists:["all", "animal", "sentient", "jackobear"], set:[], required:[{name:"Tracking", type:"p", base:75}, {name:"Hide in Cover", type:"s", base:55}], prohibited:[]},
		           	  magic:{uses:1, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
			          error:""
			         },
		         {name: "Newtling",
					  source:"RuneQuest 2",
			          characteristics:{
			          	  str:{value:{}, nDice:3, szDice:6, mod: 0},
			           	  con:{value:{}, nDice:3, szDice:6, mod: 0},
			           	  siz:{value:{}, nDice:2, szDice:6, mod: 0},
		            	  int:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
			           	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
			          },
			          move:{base:6, current:6},
	  				  body:{type:"Humanoid",hitLocations:[], attacks:"Bear", naturalArmor:0},
			          equipment:{keys:["shield", "melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
		              equipmentList:"",
		              skills:{lists:["all", "animal", "sentient", "newtling"], set:[], required:[{name:"Swimming", type:"m", base:75},{name:"Tracking", type:"p", base:50},{name:"Spot Traps", type:"p", base:40},{name:"Hide in Cover", type:"s", base:40}], prohibited:[]},
		           	  magic:{uses:1, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
			          error:""
			         },
		         {name: "Ogre",
					  source:"RuneQuest 2",
			          characteristics:{
			          	  str:{value:{}, nDice:2, szDice:6, mod: 12},
			           	  con:{value:{}, nDice:2, szDice:6, mod: 6},
			           	  siz:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  int:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  pow:{value:{}, nDice:2, szDice:6, mod: 6},
		            	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
			           	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
			          },
			          move:{base:6, current:6},
	  				  body:{type:"Humanoid",hitLocations:[], attacks:"Bear", naturalArmor:0},
			          equipment:{keys:["shield", "melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
		              equipmentList:"",
		              skills:{lists:["all", "animal", "sentient", "ogre"], set:[], required:[{name:"Disguise", type:"k", base:50},{name:"Move Quietly", type:"s", base:35}], prohibited:[]},
		           	  magic:{uses:1, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
		           	  chaos:0.385,
			          error:""
			         },
		         {name: "Pixie",
					  source:"RuneQuest 2",
			          characteristics:{
			          	  str:{value:{}, nDice:2, szDice:4, mod: 0},
			           	  con:{value:{}, nDice:3, szDice:6, mod: 0},
			           	  siz:{value:{}, nDice:1, szDice:6, mod: 0},
		            	  int:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  pow:{value:{}, nDice:2, szDice:6, mod: 6},
		            	  dex:{value:{}, nDice:4, szDice:6, mod: 0},
			           	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
			          },
			          move:{base:6, current:6},
	  				  body:{type:"Humanoid",hitLocations:[], attacks:"Bear", naturalArmor:0},
			          equipment:{keys:["shield", "melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
		              equipmentList:"",
		              skills:{lists:["all", "animal", "sentient", "pixie", "elf"], set:[], required:[{name:"Move Quietly", type:"s", base:35},{name:"Spot Hidden Items", type:"p", base:40},{name:"Set Trap", type:"m", base:35},{name:"Disarm Trap", type:"m", base:35}], prohibited:[]},
		           	  magic:{uses:1, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
			          error:""
			         },
				 {name: "Rhino",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:2, szDice:6, mod: 30},
					      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  siz:{value:{}, nDice:2, szDice:6, mod: 30},
					       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
					       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
					       	  dex:{value:{}, nDice:2, szDice:6, mod: 0},
					       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
					  },
					  move:{base: 8, current:8},
					  body:{type:"Quadruped",hitLocations:[], attacks:"", naturalArmor:5},
					  equipment:{keys:["naturalButt10","naturalBite10", "naturalTrample8d6"]},
					  equipmentList:"",
					  skills:{lists:["all",  "animal"], set:[],  required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"",
					  error:""
					 },
				 {name: "Rock Lizard",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:2, szDice:6, mod: 6},
					      	  con:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  siz:{value:{}, nDice:4, szDice:6, mod: 0},
					       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
					       	  pow:{value:{}, nDice:2, szDice:6, mod: 3},
					       	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
					  },
					  move:{base: 8, current:8},
					  body:{type:"Quadruped",hitLocations:[], attacks:"", naturalArmor:3},
					  equipment:{keys:["naturalBite10", "naturalClaw6"]},
					  equipmentList:"",
					  skills:{lists:["all",  "animal"], set:[],  required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:1, special:0},
		              mutations:{eBP:[]},
		              special:" Will strike with both claws at once until one hits, then hold with that one, strike with the other, and bite.",
					  error:""
					 },
				 {name: "Rubble Runner",
				      source:"RuneQuest 2",
					  characteristics:{
					       	  str:{value:{}, nDice:1, szDice:6, mod: 6},
					      	  con:{value:{}, nDice:3, szDice:6, mod: 6},
					       	  siz:{value:{}, nDice:1, szDice:4, mod: 0},
					       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
					       	  pow:{value:{}, nDice:1, szDice:6, mod: 6},
					       	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
					       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
					  },
					  move:{base: 6, current:6},
					  body:{type:"Quadruped",hitLocations:[], attacks:"", naturalArmor:2},
					  equipment:{keys:["naturalBite6"]},
					  equipmentList:"",
					  skills:{lists:["all",  "animal"], set:[],  required:[], prohibited:[]},
					  magic:{uses:0, basicMagic:[]},
					  treasureFactors:{multiAttack:0, special:0},
		              mutations:{eBP:[]},
		              special:"When they hit with a bite, the rubble runner will hold on and continue to bite. Roll each round to see if the 'hit' is critical and will get through armor.",
					  error:""
					 },
	         {name: "Runner",
	              source:"RuneQuest 2",
	              characteristics:{
	            	  str:{value:{}, nDice:2, szDice:6, mod: 0},
	            	  con:{value:{}, nDice:2, szDice:6, mod: 6},
	            	  siz:{value:{}, nDice:2, szDice:6, mod: 0},
	            	  int:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
	            	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
	              },
	              move:{base:9, current:9},
			      body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:0},
	              equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
            	  equipmentList:"",
            	  skills:{lists:["all", "sentient", "animal", "dragonewt","dryad", "elf"], set:[],  required:[{name:"Move Quietly", type:"s", base:20},{name:"Spot Hidden Items", type:"p", base:30},{name:"Camouflage", type:"s", base:20},{name:"Listen", type:"p", base:30},{name:"Hide in Cover", type:"s", base:20}], prohibited:[]},
            	  magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"",
	              error:""
	             },
			 {name: "Sable",
			      source:"RuneQuest 2",
				  characteristics:{
				       	  str:{value:{}, nDice:3, szDice:6, mod: 12},
				      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
				       	  siz:{value:{}, nDice:3, szDice:6, mod: 12},
				       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
				       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
				       	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
				       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
				  },
				  move:{base: 12, current:12},
				  body:{type:"Quadruped",hitLocations:[], attacks:"", naturalArmor:2},
				  equipment:{keys:["naturalButt2d6","naturalKick6","naturalBite2d4"]},
				  equipmentList:"",
				  skills:{lists:["all",  "animal"], set:[],  required:[], prohibited:[]},
				  magic:{uses:0, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"A sable will either: butt; or bite and kick in a melee round.",
				  error:""
				 },
			 {name: "Scorpion Man",
			      source:"RuneQuest 2",
				  characteristics:{
				       	  str:{value:{}, nDice:2, szDice:6, mod: 12},
				      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
				       	  siz:{value:{}, nDice:2, szDice:4, mod: 12},
				       	  int:{value:{}, nDice:2, szDice:6, mod: 0},						       	  
				       	  pow:{value:{}, nDice:2, szDice:6, mod: 0},
				       	  dex:{value:{}, nDice:3, szDice:6, mod: 3},
				       	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
				  },
				  move:{base: 8, current:8},
				  body:{type:"Scorpionman",hitLocations:[], attacks:"", naturalArmor:3},
				  equipment:{keys:["naturalSting6","shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
				  equipmentList:"",
				  skills:{lists:["all", "sentient", "animal", "scorpionman"], set:[],  required:[{name:"Climbing", type:"m", base:45},{name:"Set Trap", type:"m", base:35}], prohibited:["Boating", "Riding", "Sailing"]},
				  magic:{uses:0, basicMagic:[]},
				  treasureFactors:{multiAttack:1, special:0, poison:"CON"},
	              mutations:{eBP:[]},
	              special:"A scorpion man can attack with club and sting at the same time. The sting injects a systemic poison equal to the CON of the scorpion man in potency.",
				  error:""
				 },
			 {name: "Shadow Cat",
			      source:"RuneQuest 2",
				  characteristics:{
				       	  str:{value:{}, nDice:2, szDice:6, mod: 0},
				      	  con:{value:{}, nDice:2, szDice:6, mod: 6},
				       	  siz:{value:{}, nDice:1, szDice:6, mod: 0},
				       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
				       	  pow:{value:{}, nDice:2, szDice:6, mod: 12},
				       	  dex:{value:{}, nDice:2, szDice:6, mod: 12},
				       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
				  },
				  move:{base: 12, current:12},
				  body:{type:"Quadruped",hitLocations:[], attacks:"", naturalArmor:2},
				  equipment:{keys:["naturalBite6","naturalRip2d6","naturalBite2d4"]},
				  equipmentList:"",
				  skills:{lists:["all",  "animal"], set:[],  required:[{name:"Move Quietly", type:"s", base:45},{name:"Hide in Cover", type:"s", base:35}], prohibited:[]}, //
				  magic:{uses:0, basicMagic:[]},
				  treasureFactors:{multiAttack:1, special:0},
	              mutations:{eBP:[]},
	              special:"",
				  error:""
				 },
	         {name: "Skeleton",
	              source:"RuneQuest 2",
	              characteristics:{
	            	  str:{value:{}, nDice:1, szDice:4, mod: 8},
	            	  con:{value:{}, nDice:0, szDice:1, mod: 0},
	            	  siz:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  int:{value:{}, nDice:0, szDice:6, mod: 0},
	            	  pow:{value:{}, nDice:1, szDice:1, mod: 0},
	            	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
	              },
	              move:{base:8, current:8},
			      body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:0},
	              equipment:{keys:["shield","melee1"]},
            	  equipmentList:"",
            	  skills:{lists:[""], set:[],  required:[], prohibited:[]},
            	  magic:{uses:0, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"A skeleton is so brittle that when a location is hit, it shatters. Thus, hit points and CON are irrelevant. A blow to the head will deprogram a skeleton and cause it to fall apart immediately",
            	  chaos:0,
	              error:""
	             },
			 {name: "Sky Bull",
			      source:"RuneQuest 2",
				  characteristics:{
				       	  str:{value:{}, nDice:4, szDice:6, mod: 12},
				      	  con:{value:{}, nDice:2, szDice:6, mod: 6},
				       	  siz:{value:{}, nDice:8, szDice:6, mod: 12},
				       	  int:{value:{}, nDice:0, szDice:6, mod: 0},
				       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
				       	  dex:{value:{}, nDice:2, szDice:6, mod: 0},
				       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
				  },
				  move:{base: 11, current:11},
				  body:{type:"Basilisk",hitLocations:[], attacks:"Basilisk", naturalArmor:3},
				  equipment:{keys:["naturalButt2d10", "naturalStomp2d6"]},
				  equipmentList:"",
				  skills:{lists:["all", "animal"], set:[],  required:[], prohibited:["Climbing", "Feign Death", "Jumping"]},
				  magic:{uses:0, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"Sky bulls will swoop down on a foe from above and stomp them into the ground. They only butt in air combat or if caught on the ground.",
				  error:""
			     },
			 {name: "Snake",
			      source:"RuneQuest 2",
				  characteristics:{
				       	  str:{value:{}, nDice:1, szDice:6, mod: 0},
				      	  con:{value:{}, nDice:2, szDice:6, mod: 6},
				       	  siz:{value:{}, nDice:1, szDice:6, mod: 0},
				       	  int:{value:{}, nDice:0, szDice:6, mod: 0},
				       	  pow:{value:{}, nDice:1, szDice:6, mod: 6},
				       	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
				       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
				  },
				  move:{base: 4, current:4},
				  body:{type:"Snake",hitLocations:[], attacks:"Basilisk", naturalArmor:0},
				  equipment:{keys:["naturalBite4"]},
				  equipmentList:"",
				  skills:{lists:["all"], set:[],  required:[], prohibited:["Jumping"]},
				  magic:{uses:0, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"",
				  error:""
			     },
	         {name: "Tiger Son",
				  source:"RuneQuest 2",
		          characteristics:{
		          	  str:{value:{}, nDice:3, szDice:6, mod: 0, alt:2.5},
		           	  con:{value:{}, nDice:3, szDice:6, mod: 0},
		           	  siz:{value:{}, nDice:2, szDice:6, mod: 6},
	            	  int:{value:{}, nDice:3, szDice:6, mod: 0, alt:0.5},
	            	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
		           	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
		          },
		          move:{base:8, alt:10, current:8},
  				  body:{type:"Humanoid",hitLocations:[], attacks:"Bear", naturalArmor:1},
		          equipment:{keys:["naturalClaw6","naturalBite10"]},
	              equipmentList:"",
	              skills:{lists:["all", "sentient", "animal", "bearwalker"], set:[],  required:[{name:"Move Quietly", type:"s", base:45},{name:"Hide in Cover", type:"s", base:45}, {name:"Spot Trap", type:"p", base:40},{name:"Track by Smell", type:"p", base:40}, {name:"Spot Hidden Items", type:"p", base:40}], prohibited:[]},
	           	  magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:1, special:0},
	              mutations:{eBP:[]},
	              special:"Will bite if a claw hits in the previous round. If bite connects with flesh, will hang on, continuing to bite while hind legs claw victim.",
		          error:""
		         },
			 {name: "Troll, Cave",
			      source:"RuneQuest 2",
				  characteristics:{
				      str:{value:{}, nDice:3, szDice:6, mod: 12},
				      con:{value:{}, nDice:2, szDice:6, mod: 6},
				      siz:{value:{}, nDice:4, szDice:6, mod: 12},
				      int:{value:{}, nDice:2, szDice:6, mod: 0},
				      pow:{value:{}, nDice:2, szDice:6, mod: 0},
				      dex:{value:{}, nDice:2, szDice:6, mod: 3},
				      cha:{value:{}, nDice:1, szDice:6, mod: 0}
				  },
			      move:{base: 7, current:7},
				  body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:3},
				  equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3", "naturalClaw6"]},
		          equipmentList:"",
		          skills:{lists:["all", "sentient", "animal"], set:[],  required:[], prohibited:[]},
		          magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:1, special:0},
	              mutations:{eBP:[]},
	              special:"Usual tactic is to hit with the club then strike with the claw, but they cannot parry if they do so.  The cave troll heals 1HP per Hit Location per Round.",
			      error:"" 
				 },
			 {name: "Troll, Great",
			      source:"RuneQuest 2",
				  characteristics:{
				      str:{value:{}, nDice:4, szDice:6, mod: 12},
				      con:{value:{}, nDice:1, szDice:4, mod: 14},
				      siz:{value:{}, nDice:4, szDice:6, mod: 12},
				      int:{value:{}, nDice:2, szDice:6, mod: 2},
				      pow:{value:{}, nDice:3, szDice:6, mod: 0},
				      dex:{value:{}, nDice:3, szDice:6, mod: 0},
				      cha:{value:{}, nDice:2, szDice:6, mod: 0}
				  },
			      move:{base: 7, current:7},
				  body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:2},
				  equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
		          equipmentList:"",
		          skills:{lists:["all", "sentient", "animal"], set:[],  required:[], prohibited:[]},
		          magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"",
			      error:""
				 },
			 {name: "Troll, Mistress Race",
			      source:"RuneQuest 2",
				  characteristics:{
				      str:{value:{}, nDice:4, szDice:6, mod: 6},
				      con:{value:{}, nDice:2, szDice:6, mod: 6},
				      siz:{value:{}, nDice:3, szDice:6, mod: 12},
				      int:{value:{}, nDice:2, szDice:6, mod: 6},
				      pow:{value:{}, nDice:4, szDice:6, mod: 0},
				      dex:{value:{}, nDice:2, szDice:6, mod: 6},
				      cha:{value:{}, nDice:2, szDice:6, mod: 6}
				  },
			      move:{base: 7, current:7},
				  body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:2},
				  equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
		          equipmentList:"",
		          skills:{lists:["all", "sentient", "animal"], set:[],  required:[{name:"Oratory", type:"o", base:70}, {name:"Set Traps", type:"m", base:45}, {name:"Camouflage", type:"s", base:80}, {name:"Spot Hidden Items", type:"p", base:55}, {name:"Spot Trap", type:"p", base:55}], prohibited:[]},
		          magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"",
			      error:""
				 },
			 {name: "Trollkin",
			      source:"RuneQuest 2",
				  characteristics:{
				      str:{value:{}, nDice:2, szDice:6, mod: 3},
				      con:{value:{}, nDice:3, szDice:6, mod: 0},
				      siz:{value:{}, nDice:1, szDice:6, mod: 6},
				      int:{value:{}, nDice:2, szDice:6, mod: 3},
				      pow:{value:{}, nDice:2, szDice:6, mod: 0},
				      dex:{value:{}, nDice:3, szDice:6, mod: 3},
				      cha:{value:{}, nDice:2, szDice:6, mod: 0}
				  },
			      move:{base: 7, current:7},
				  body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:1},
				  equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
		          equipmentList:"",
		          skills:{lists:["all", "sentient", "animal"], set:[],  required:[ {name:"Spot Hidden Items", type:"p", base:45}], prohibited:[]},
		          magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"",
			      error:""
				 },
	         {name: "Tusk Brother",
				  source:"RuneQuest 2",
		          characteristics:{
		          	  str:{value:{}, nDice:2, szDice:6, mod: 6, alt:2},
		           	  con:{value:{}, nDice:3, szDice:6, mod: 0},
		           	  siz:{value:{}, nDice:2, szDice:6, mod: 6},
	            	  int:{value:{}, nDice:3, szDice:6, mod: 0, alt:0.5},
	            	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  dex:{value:{}, nDice:3, szDice:6, mod: 0, alt:0.667},
		           	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
		          },
		          move:{base:8, alt:10, current:8},
  				  body:{type:"Humanoid",hitLocations:[], attacks:"Bear", naturalArmor:11},
		          equipment:{keys:["naturalGore2d6","naturalStomp6"]},
	              equipmentList:"",
	              skills:{lists:["all", "sentient", "animal", "bearwalker"], set:[],  required:[ {name:"Sniffing Out Food", type:"p", base:90},  {name:"Move Quietly", type:"s", base:35},  {name:"Hide in Cover", type:"s", base:55}], prohibited:[]},
	           	  magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"If a foe is knocked down, a tusk brother will stomp him with its very hard hooves in the next round.",
		          error:""
		         },
			 {name: "Tusk Rider",
			      source:"RuneQuest 2",
				  characteristics:{
				      str:{value:{}, nDice:2, szDice:6, mod: 6},
				      con:{value:{}, nDice:2, szDice:6, mod: 6},
				      siz:{value:{}, nDice:3, szDice:6, mod: 0},
				      int:{value:{}, nDice:3, szDice:6, mod: 0},
				      pow:{value:{}, nDice:3, szDice:6, mod: 0},
				      dex:{value:{}, nDice:3, szDice:6, mod: 0},
				      cha:{value:{}, nDice:1, szDice:6, mod: 0}
				  },
			      move:{base: 8, current:8},
				  body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:1},
				  equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
		          equipmentList:"",
		          skills:{lists:["all", "sentient", "animal", "tuskrider"], set:[],  required:[ {name:"Riding", type:"m", base:90},  {name:"Tracking", type:"p", base:50},  {name:"Camouflage", type:"s", base:45},  {name:"Spot Traps", type:"p", base:50}], prohibited:[]},
		          magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"",
			      error:""
				 },
			 {name: "Tusker",
			      source:"RuneQuest 2",
				  characteristics:{
				       	  str:{value:{}, nDice:3, szDice:6, mod: 12},
				      	  con:{value:{}, nDice:1, szDice:6, mod: 12},
				       	  siz:{value:{}, nDice:4, szDice:6, mod: 12},
				       	  int:{value:{}, nDice:0, szDice:6, mod: 0},						       	  
				       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
				       	  dex:{value:{}, nDice:1, szDice:6, mod: 0},
				       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
				  },
				  move:{base: 10, current:10},
				  body:{type:"Quadruped",hitLocations:[], attacks:"", naturalArmor:4},
				  equipment:{keys:["naturalGore2d6","naturalTrample4d6"]},
				  equipmentList:"",
				  skills:{lists:["all",  "animal"], set:[],  required:[], prohibited:[]},
				  magic:{uses:0, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"A Tusker cannot gore and trample one opponent in the same melee round.",
				  error:""
				 },
			 {name: "Unicorn",
			      source:"RuneQuest 2",
				  characteristics:{
				       	  str:{value:{}, nDice:2, szDice:6, mod: 24},
				      	  con:{value:{}, nDice:2, szDice:6, mod: 6},
				       	  siz:{value:{}, nDice:2, szDice:6, mod: 18},
				       	  int:{value:{}, nDice:3, szDice:6, mod: 0},						       	  
				       	  pow:{value:{}, nDice:2, szDice:6, mod: 12},
				       	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
				       	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
				  },
				  move:{base:12 , current:12},
				  body:{type:"Quadruped",hitLocations:[], attacks:"", naturalArmor:1},
				  equipment:{keys:["naturalBite10","naturalKick8", "naturalRearAndPlunge", "naturalTrample3d6"]},
				  equipmentList:"",
				  skills:{lists:["all", "animal"], set:[],  required:[], prohibited:[]},
				  magic:{uses:0, basicMagic:[]},
				  treasureFactors:{multiAttack:2, special:0},
	              mutations:{eBP:[]},
	              special:"Unicorns without riders have a natural attack of 25% with Bite, Kick, and Trample. However, they only have a 5% chance with these skills when working in coordination with a rider. They must be trained to use these skills with a rider.  They can cure wounds with their horns, and will gore a foe at the same time the amazon is lancing it. When using their horn to cure, they must touch the wound with the horn. Each point cured takes 1 point from the POW of the unicorn as in a Healing spell.",
				  chaos:0,
				  error:""
				 },
			 {name: "Vampire",
			      source:"RuneQuest 2",
				  characteristics:{
				      str:{value:{}, nDice:6, szDice:6, mod: 0},
				      con:{value:{}, nDice:2, szDice:6, mod: 6},
				      siz:{value:{}, nDice:3, szDice:6, mod: 0},
				      int:{value:{}, nDice:3, szDice:6, mod: 0},
				      pow:{value:{}, nDice:2, szDice:6, mod: 6},
				      dex:{value:{}, nDice:3, szDice:6, mod: 0},
				      cha:{value:{}, nDice:3, szDice:6, mod: 0}
				  },
			      move:{base: 10, current:10},
				  body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:1},
				  equipment:{keys:["naturalBite4","naturalVampireTouch","shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
		          equipmentList:"",
		          skills:{lists:["all", "sentient", "animal"], set:[],  required:[], prohibited:[]},
		          magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:1, special:2},
	              mutations:{eBP:[]},
	              special:" The touch of a vampire will reach through armor and attack a character's POW, just as a ghost does. If the vampire wins, the character loses POW. If the bite of a vampire penetrates armor, it drains 1D6 in STR (blood) from the victim per melee round. It will stay attached until the victim is dead or vampire destroyed.If the vampire can catch the glance of a character, it can attempt to Harmonize him with no loss of POW. A roll of the target's character's POWx5 or less must be made on D100 to see if he was lucky enough to avoid the glance at the vampire.", 
			      error:"",
				 },
	         {name: "Wind Child",
	              source:"RuneQuest 2",
	              characteristics:{
	            	  str:{value:{}, nDice:2, szDice:6, mod: 0},
	            	  con:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  siz:{value:{}, nDice:2, szDice:6, mod: 0},
	            	  int:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  pow:{value:{}, nDice:2, szDice:6, mod: 6},
	            	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
	            	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
	              },
	              move:{base:6, current:6},
			      body:{type:"Gargoyle",hitLocations:[], attacks:"Gargoyle", naturalArmor:0},
	              equipment:{keys:["shield","melee1","melee3","melee4","missile1","missile2"]},
	        	  equipmentList:"",
	        	  skills:{lists:["all", "sentient", "animal", "windchild"], set:[],  required:[], prohibited:["Boating", "Riding", "Sailing", "Climbing", "Tumbling"]},
	        	  magic:{uses:1, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"",
	              error:""
	             },
			 {name: "Wyrm",
			      source:"RuneQuest 2",
				  characteristics:{
				       	  str:{value:{}, nDice:10, szDice:6, mod: 0},
				      	  con:{value:{}, nDice:3, szDice:6, mod: 0},
				       	  siz:{value:{}, nDice:10, szDice:6, mod: 0},
				       	  int:{value:{}, nDice:3, szDice:6, mod: 0},						       	  
				       	  pow:{value:{}, nDice:3, szDice:6, mod: 6},
				       	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
				       	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
				  },
				  move:{base: 10, current:10},
				  body:{type:"Wyrm",hitLocations:[], attacks:"", naturalArmor:8},
				  equipment:{keys:["naturalBite10"]},
				  equipmentList:"",
				  skills:{lists:["all",  "animal"], set:[],  required:[], prohibited:[]},
				  magic:{uses:0, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"",
				  error:""
				 },
			 {name: "Wyvern",
			      source:"RuneQuest 2",
				  characteristics:{
				       	  str:{value:{}, nDice:4, szDice:6, mod: 12},
				      	  con:{value:{}, nDice:2, szDice:6, mod: 6},
				       	  siz:{value:{}, nDice:2, szDice:6, mod: 24},
				       	  int:{value:{}, nDice:2, szDice:6, mod: 0},						       	  
				       	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
				       	  dex:{value:{}, nDice:2, szDice:6, mod: 6},
				       	  cha:{value:{}, nDice:2, szDice:6, mod: 0}
				  },
				  move:{base: 6, current:6},
				  body:{type:"Wyvern",hitLocations:[], attacks:"", naturalArmor:8},
				  equipment:{keys:["naturalBite8","naturalSting6"]},
				  equipmentList:"",
				  skills:{lists:["all",  "animal"], set:[],  required:[], prohibited:[]},
				  magic:{uses:0, basicMagic:[]},
				  treasureFactors:{multiAttack:1, special:0, poison:"CON"},
	              mutations:{eBP:[]},
	              special:"A wyvern will bite and sting one or two foes at one time. The sting injects systemic poison equal to the CON of the wyvern in potency.",
				  error:""
				 },
			 {name: "Zombie",
	              source:"RuneQuest 2",
	              characteristics:{
	            	  str:{value:{}, nDice:4.5, szDice:6, mod: 0},
	            	  con:{value:{}, nDice:4.5, szDice:6, mod: 0},
	            	  siz:{value:{}, nDice:3, szDice:6, mod: 0},
	            	  int:{value:{}, nDice:0, szDice:6, mod: 0},
	            	  pow:{value:{}, nDice:1, szDice:1, mod: 0},
	            	  dex:{value:{}, nDice:2, szDice:6, mod: 0},
	            	  cha:{value:{}, nDice:0, szDice:6, mod: 0}
	              },
	              move:{base:6, current:6},
			      body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:0},
	              equipment:{keys:["shield","melee1"]},
            	  equipmentList:"",
            	  skills:{lists:[], set:[],  required:[], prohibited:[]},
            	  magic:{uses:0, basicMagic:[]},
				  treasureFactors:{multiAttack:0, special:0},
	              mutations:{eBP:[]},
	              special:"A zombie must be destroyed by destroying every limb or its chest or it will continue to fight. Destroying the head, of course, destroys its ability to see an opponent and it will cease action.",
	              error:""
	             }
		          ];
		return templates;
	}catch(err){
		return "Error: RQTemplates.getTempaltes: "+err;
	}
}


function getHLTemplates(shape){
	try{
		var selHLTemplate = [];
		selHLTemplate[0] = shape;
		var hlTemplates = [{type:"Walktapi",
					        hitLocations:[
		            		 {location:"rleg", label:"R LEG", roll:"01-02",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"lleg", label:"L LEG", roll:"03-04",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"abdom", label:"ABDOM", roll:"05",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"abdom2", label:"ABDOM2", roll:"",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:1},
		            		 {location:"chest", label:"CHEST", roll:"06",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"rarm", label:"R ARM", roll:"07-08",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"larm", label:"L ARM", roll:"09-10",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"tentacle1", label:"TENT1", roll:"11",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"tentacle2", label:"TENT2", roll:"12",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"tentacle3", label:"TENT3", roll:"13",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"tentacle4", label:"TENT4", roll:"14",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"tentacle5", label:"TENT5", roll:"15",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"tentacle6", label:"TENT6", roll:"16",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"tentacle7", label:"TENT7", roll:"17",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"tentacle8", label:"TENT8", roll:"18",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"head", label:"HEAD", roll:"19-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
		            		 ]},
	            		 {type:"Ameboid",
			              hitLocations:[
			                 {location:"body", label:"BODY", roll:"01-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:0, current:0}, hidden:0}
			            	 ]},
			             {type:"Humanoid",
				          hitLocations:[
  		            		 {location:"rleg", label:"R LEG", roll:"01-04",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"lleg", label:"L LEG", roll:"05-08",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"abdom", label:"ABDOM", roll:"09-11",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"abdom2", label:"ABDOM2", roll:"",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:1},
		            		 {location:"chest", label:"CHEST", roll:"12",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"rarm", label:"R ARM", roll:"13-15",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"larm", label:"L ARM", roll:"16-18",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"head", label:"HEAD", roll:"19-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
		            		 ]},
		             {type:"Basilisk",
					          hitLocations:[
	  		            		 {location:"rhleg", label:"R HND", roll:"01-02",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
			            		 {location:"lhleg", label:"L HND", roll:"03-04",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
			            		 {location:"hndqtr", label:"HINDQ", roll:"05-07",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
			            		 {location:"foreqtr", label:"FOREQ", roll:"08-10",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
			            		 {location:"rwing", label:"R WNG", roll:"11-12",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
			            		 {location:"lwing", label:"L WNG", roll:"13-14",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
			            		 {location:"rfleg", label:"R FOR", roll:"15-16",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
			            		 {location:"lfleg", label:"L FOR", roll:"17-18",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
			            		 {location:"head", label:"HEAD", roll:"19-20",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
			            		 ]},
		             {type:"Quadruped",
				          hitLocations:[
  		            		 {location:"rhleg", label:"R HND", roll:"01-02",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"lhleg", label:"L HND", roll:"03-04",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"hndqtr", label:"HINDQ", roll:"05-07",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"foreqtr", label:"FOREQ", roll:"08-10",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"rfleg", label:"R FOR", roll:"11-13",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"lfleg", label:"L FOR", roll:"14-16",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"head", label:"HEAD", roll:"17-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
		            		 ]},
		             {type:"Centaur",
				          hitLocations:[
  		            		 {location:"rhleg", label:"R HND", roll:"01-02",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"lhleg", label:"L HND", roll:"03-04",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"hndqtr", label:"HINDQ", roll:"05-06",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"foreqtr", label:"FOREQ", roll:"07-09",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"rfleg", label:"R FOR", roll:"10-11",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"lfleg", label:"L FOR", roll:"12-13",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"chest", label:"CHEST", roll:"14",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"rarm", label:"R ARM", roll:"15-16",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"larm", label:"L ARM", roll:"17-18",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"head", label:"HEAD", roll:"19-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
	            		 ]},
		             {type:"BoloLizard",
				          hitLocations:[
  		            		 {location:"rleg", label:"R LEG", roll:"01-04",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"lleg", label:"L LEG", roll:"05-08",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"abdom", label:"ABDOM", roll:"09-10",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"chest", label:"CHEST", roll:"11-13",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"rarm", label:"R ARM", roll:"14-15",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"larm", label:"L ARM", roll:"16-17",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"head", label:"HEAD", roll:"18-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
		            		 ]},
		             {type:"Demi-bird",
				          hitLocations:[
  		            		 {location:"rleg", label:"R LEG", roll:"01-04",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"lleg", label:"L LEG", roll:"05-08",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"abdom", label:"ABDOM", roll:"09-10",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"chest", label:"CHEST", roll:"11-13",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"rwing", label:"R WNG", roll:"14-15",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"lwing", label:"L WNG", roll:"16-17",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"head", label:"HEAD", roll:"18-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
		            		 ]},
		             {type:"Dragon",
				          hitLocations:[
  		            		 {location:"rhleg", label:"R HND", roll:"01-02",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"lhleg", label:"L HND", roll:"03-04",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"hndqtr", label:"HINDQ", roll:"05-06",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"tail", label:"TAIL", roll:"07-08",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"foreqtr", label:"FOREQ", roll:"09-10",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
		            		 {location:"rwing", label:"R WNG", roll:"11-12",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"lwing", label:"L WNG", roll:"13-14",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		            		 {location:"rfleg", label:"R FOR", roll:"15-16",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"lfleg", label:"L FOR", roll:"17-18",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
		            		 {location:"head", label:"HEAD", roll:"19-20",armor:{natural:2, current:2, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
		            		 ]},
	             {type:"Dragonewt",
			          hitLocations:[
	            		 {location:"rleg", label:"R LEG", roll:"01-04",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
	            		 {location:"lleg", label:"L LEG", roll:"05-08",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
	            		 {location:"tail", label:"TAIL", roll:"09",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
	            		 {location:"abdom", label:"ABDOM", roll:"10-11",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
	            		 {location:"abdom2", label:"ABDOM2", roll:"",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:1},
	            		 {location:"chest", label:"CHEST", roll:"12",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
	            		 {location:"rarm", label:"R ARM", roll:"13-15",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
	            		 {location:"larm", label:"L ARM", roll:"16-18",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
	            		 {location:"head", label:"HEAD", roll:"19-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
	            		 ]},
	             {type:"Inhuman King",
		          hitLocations:[
            		 {location:"rleg", label:"R LEG", roll:"01-04",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
            		 {location:"lleg", label:"L LEG", roll:"05-08",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
            		 {location:"tail", label:"TAIL", roll:"09",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
            		 {location:"abdom", label:"ABDOM", roll:"10-11",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
            		 {location:"abdom2", label:"ABDOM2", roll:"",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:1},
            		 {location:"chest", label:"CHEST", roll:"12",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
            		 {location:"rarm", label:"R ARM", roll:"13-14",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
            		 {location:"rwing", label:"R WNG", roll:"15",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
            		 {location:"larm", label:"L ARM", roll:"16-17",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
            		 {location:"lwing", label:"R WNG", roll:"18",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
            		 {location:"head", label:"HEAD", roll:"19-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
            		 ]},
    		 {type:"Dragonsnail",
	              hitLocations:[{location:"shell", label:"SHELL", roll:"01-08",armor:{natural:8, current:8, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:4, current:0}, hidden:0},
	                 {location:"forebody", label:"F BDY", roll:"09-14",armor:{natural:4, current:4, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
	                 {location:"head", label:"HEAD", roll:"15-20",armor:{natural:4, current:4, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
	            	 ]},
             {type:"Gargoyle",
		          hitLocations:[
            		 {location:"rleg", label:"R LEG", roll:"01-03",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
            		 {location:"lleg", label:"L LEG", roll:"04-06",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
            		 {location:"abdom", label:"ABDOM", roll:"07-09",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
            		 {location:"abdom2", label:"ABDOM2", roll:"",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:1},
            		 {location:"chest", label:"CHEST", roll:"10",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
            		 {location:"rwing", label:"R WNG", roll:"11-12",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
            		 {location:"lwing", label:"L WNG", roll:"13-14",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
            		 {location:"rarm", label:"R ARM", roll:"15-16",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
            		 {location:"larm", label:"L ARM", roll:"17-18",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
            		 {location:"head", label:"HEAD", roll:"19-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
            		 ]},
        		 {type:"Incorporeal",
		              hitLocations:[
		                 {location:"spirit", label:"", roll:"",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:0, current:0}, hidden:1}
		            	 ]},
	             {type:"Scorpionman",
			          hitLocations:[
	            		 {location:"rhleg", label:"R HND", roll:"01",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
	            		 {location:"rcleg", label:"R CTR", roll:"02",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
	            		 {location:"rfleg", label:"R FOR", roll:"03-04",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
	            		 {location:"lhleg", label:"L HND", roll:"05",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
	            		 {location:"lcleg", label:"L CTR", roll:"06",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
	            		 {location:"lfleg", label:"L FOR", roll:"07-08",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
	            		 {location:"tail", label:"TAIL", roll:"09-10",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
	            		 {location:"thorax", label:"THRX", roll:"11-12",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
	            		 {location:"chest", label:"CHEST", roll:"13-14",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
	            		 {location:"rarm", label:"R ARM", roll:"15-16",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
	            		 {location:"larm", label:"L ARM", roll:"17-18",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
	            		 {location:"head", label:"HEAD", roll:"19-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
            		 ]},
            		 {type:"Snake",
       	              hitLocations:[{location:"tail", label:"TAIL", roll:"01-06",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:4, current:0}, hidden:0},
       	                 {location:"body", label:"BODY", roll:"07-14",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
       	                 {location:"head", label:"HEAD", roll:"15-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
       	            	 ]},
            		 {type:"Wyrm",
          	              hitLocations:[{location:"tail", label:"TAIL", roll:"01-04",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:4, current:0}, hidden:0},
         	       	         {location:"abdom", label:"ABDOM", roll:"05-08",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
          	       	         {location:"chest", label:"CHEST", roll:"09-12",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
                    		 {location:"rwing", label:"R WNG", roll:"13-14",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
                    		 {location:"lwing", label:"L WNG", roll:"15-16",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
          	                 {location:"head", label:"HEAD", roll:"17-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
          	            	 ]},
            		 {type:"Wyvern",
  	       	              hitLocations:[{location:"rleg", label:"R LEG", roll:"01-03",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
  	       	              		 {location:"lleg", label:"L LEG", roll:"04-06",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
  	                  		     {location:"abdom", label:"ABDOM", roll:"07-08",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0},
  	       	            		 {location:"chest", label:"CHEST", roll:"09-11",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:3, current:0}, hidden:0},
  	       	            		 {location:"tail", label:"TAIL", roll:"12",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:4, current:0}, hidden:0},
  	       	            		 {location:"rwing", label:"R WNG", roll:"13-14",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
  	       	            		 {location:"lwing", label:"L WNG", roll:"15-16",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
  	       	                     {location:"head", label:"HEAD", roll:"15-20",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:2, current:0}, hidden:0}
  	       	            	 ]}
						];
		for(var h = 0; h< hlTemplates.length; h++){
			if(hlTemplates[h].type == shape){
				selHLTemplate = hlTemplates[h].hitLocations;
			}
		}
		if(shape == "Snake"){
			var testAC = "";
			for(var hl =0; hl<selHLTemplate.length; hl++){
				  testAC = testAC + "</p>"+selHLTemplate[hl].location+" Natural: "+selHLTemplate[hl].armor.natural+" Current: "+selHLTemplate[hl].armor.current;
			  }
//			window.alert("Test jsRQTemplate.getHLTempates Snake: "+testAC);

		}
		return selHLTemplate;
	}catch(err){
		return "Error: RQTemplates.getHLTemplates: "+err;
	}
}


function getAdvObj(){
	/*
	 * Return standardized Advacment object
	 */
	try{
		var AO = {base:0, current:0, prof:0};
		//{Novice:0,Trained:0,Blooded:0,Experienced:0, Veteran:0,Master:0,Exemplar:0};
		return AO;
	}catch(err){
		return "Error: RQTemplates.getAdvObj: "+err;
	}
}

function getSpecialRulesForTemplates(t){
	//special logic for templates that don't follow a happy pattern
	try{
		var rndVal = 0;
		var rndTxt = "";
		if(t.name == "Broo"){
		  for(var hl =0; hl<t.body.hitLocations.length; hl++){
			  if(t.body.hitLocations[hl].location == "head" ){
				  t.body.hitLocations[hl].armor.natural = 3;
				  t.body.hitLocations[hl].armor.current = 3;
			  }
		  }
		}else if(t.name == "Cliff Toad"){
			t.characteristics.str.nDice = Math.floor(Math.random()*6)+Math.floor(Math.random()*6);
			t.characteristics.siz.nDice = Math.floor(Math.random()*6)+Math.floor(Math.random()*6);
			if(t.characteristics.str.nDice < 4){
				t.equipment.naturalTongue.damage = "1d4";
			}else if(t.characteristics.str.nDice < 7){
				t.equipment.naturalTongue.damage = "2d4";
			}else if(t.characteristics.str.nDice < 11){
				t.equipment.naturalTongue.damage = "3d4";
			}else{
				t.equipment.naturalTongue.damage = "4d4";
			}
// Moved to base template definition			t.special = "80% of swallowing each turn after a tongue hit, else 1d6 + Damage Bonus in constriction damage.  If swallowed, digestive acid has Potency "+(t.characteristics.siz.nDice*2)+".  Movement hopping rate is "+t.characteristics.siz.nDice+".";
		}else if(t.name == "Cockatrice"){
			// Moved to base template definition				t.special = "A successful attack by the cocktrice petrifies the opponent if it fails a POW vs POW resistance test.";
		}else if(t.name == "Dream Dragon"){
			t.characteristics.str.nDice = Math.floor(Math.random()*8)+Math.floor(Math.random()*8)+4;
			t.characteristics.siz.nDice = Math.floor(Math.random()*8)+Math.floor(Math.random()*8)+4;
			rndVal = Math.floor(Math.random()*4)+Math.floor(Math.random()*4)+2;
			for(var hl =0; hl<t.body.hitLocations.length; hl++){
					  t.body.hitLocations[hl].armor.natural = rndVal;
					  t.body.hitLocations[hl].armor.current = rndVal;
			  }
			rndVal = Math.floor(Math.random()*100);
			if(rndVal < 14){
				rndTxt = "The dragon breathes a jet of acid.";
			}else if(rndVal < 28){
				rndTxt = "The dragon breathes a jet of sleep gas.  Opponents failing to resist will fall asleep for 1d4 turns at no POW cost to the dragon.  Gas is a systemic poison which is matched versus CON of the victim.";
			}else if(rndVal < 42){
				rndTxt = "The dragon breathes a jet of repulsion gas.  Opponents are affected as if by a Demoralize spell, although at no POW cost to the dragon.  Gas is a systemic poison which is matched versus CON of the victim.";
			}else if(rndVal < 56){
				rndTxt = "The dragon breathes a jet of slow gas.  Opponents are affected as if by a Binding spell, although at no POW cost to the dragon.  Gas is a systemic poison which is matched versus CON of the victim.";
			}else if(rndVal < 70){
				rndTxt = "The dragon breathes a jet of poison gas.  Gas is a systemic poison which is matched versus CON of the victim.";
			}else if(rndVal < 86){
				rndTxt = "The dragon breathes a jet of flame.";
			}else{
				rndTxt = "The dragon breathes a jet of frost.  Metal armor is only half effective against it.";
			}
			t.special = rndTxt+"  The jet is a 1m by 15m with a potency equal to the Dream Dragon's POW.";
		}else if(t.name == "Dragonsnail"){
		  for(var hl =0; hl<t.body.hitLocations.length; hl++){
			  if(t.body.hitLocations[hl].location == "shell" ){
				  t.body.hitLocations[hl].armor.natural = 8;
				  t.body.hitLocations[hl].armor.current = 8;
			  }
		  }
		}else if(t.name == "Gargoyle"){
			t.characteristics.str.nDice = Math.floor(Math.random()*5);
			t.characteristics.siz.nDice = Math.floor(Math.random()*5);
		}else if(t.name=="Ghost"){
			rndVal = Math.ceil(Math.random()*100);
			if(rndVal < 11){
				t.characteristics.int = {value:{}, nDice:1, szDice:3, mod: 0};						       	  
				t.characteristics.pow = {value:{}, nDice:1, szDice:6, mod: 0};
			}else if(rndVal < 21){
				t.characteristics.int = {value:{}, nDice:1, szDice:6, mod: 0};						       	  
				t.characteristics.pow = {value:{}, nDice:2, szDice:6, mod: 0};
			}else if(rndVal < 36){
				t.characteristics.int = {value:{}, nDice:2, szDice:6, mod: 3};						       	  
				t.characteristics.pow = {value:{}, nDice:3, szDice:6, mod: 0};
			}else if(rndVal < 76){
				t.characteristics.int = {value:{}, nDice:3, szDice:6, mod: 0};						       	  
				t.characteristics.pow = {value:{}, nDice:3, szDice:6, mod: 6};
			}else if(rndVal < 91){
				t.characteristics.int = {value:{}, nDice:3, szDice:6, mod: 3};						       	  
				t.characteristics.pow = {value:{}, nDice:4, szDice:6, mod: 6};
			}else if(rndVal < 96){
				t.characteristics.int = {value:{}, nDice:3, szDice:3, mod: 6};						       	  
				t.characteristics.pow = {value:{}, nDice:5, szDice:6, mod: 6};
			}else if(rndVal < 98){
				t.characteristics.int = {value:{}, nDice:3, szDice:3, mod: 6};						       	  
				t.characteristics.pow = {value:{}, nDice:7, szDice:6, mod: 6};
			}else if(rndVal < 99){
				t.characteristics.int = {value:{}, nDice:3, szDice:3, mod: 6};						       	  
				t.characteristics.pow = {value:{}, nDice:8, szDice:6, mod: 6};
			}else{
				t.characteristics.int = {value:{}, nDice:3, szDice:3, mod: 6};						       	  
				t.characteristics.pow = {value:{}, nDice:10, szDice:6, mod: 6};
			}

		}else if(t.name == "Giant"){
			rndVal = Math.ceil(Math.random()*6)+ Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6);
			rndVal = rndVal - 3;
			if(rndVal < 3){rndVal == 3;}
			t.characteristics.str.nDice = Math.ceil(rndVal/2)*3;
			t.characteristics.siz.nDice = Math.ceil(rndVal/2)*3;
			t.special = "The giant is "+rndVal+" meters tall."

		}else if (t.name == "Horse"){
			t.equipment.naturalBite10.attack.base = 05;
			t.equipment.naturalBite10.attack.current = 05;
			t.equipment.naturalKick8.attack.base = 05;
			t.equipment.naturalKick8.attack.current = 05;
		}else if (t.name == "Horse, War"){
			t.equipment.naturalRearAndPlunge.attack.base = 25;
			t.equipment.naturalRearAndPlunge.attack.current = 25;
		}else if(t.name == "Jack O'Bear"){
			//Moved to base template t.special = "The Jack O'Bear can Harmonize one victim per round with a maximum number of victims equaling POW/2."
		}else if(t.name=="Manticore"){
			//Moved to base template t.special = "The manticore may use both attacks at once.  The sting injects a poison of potency equal to the manticore's CON.";
		}else if(t.name=="Snake"){
			rndVal = Math.ceil(Math.random()*12);
			if(rndVal < 3){
				rndVal = Math.ceil(Math.random()*100);
				if(rndVal < 51){
					t.name = "Snake, Weapon (Male)";
					t.equipment ={keys:["naturalSword6"]};
					t.equipment = setAttacks(t.equipment);
				}else{
					t.name = "Snake, Weapon (Female)";
					t.equipment ={keys:["naturalMace6"]};
					t.equipment = setAttacks(t.equipment);
				}
			}else if(rndVal < 5){
				rndVal = Math.ceil(Math.random()*6);
				t.name = "Snake, Fang";
				t.treasureFactors.poison =  Math.ceil(rndVal/5);
				t.special = "A bite that penetrates armor injects Blade Venom of potency "+rndVal+".";				
			}else if(rndVal < 6){
				rndVal = Math.ceil(Math.random()*100);
				t.equipment ={keys:["naturalSpit","naturalBite4"]};
				t.equipment = setAttacks(t.equipment);
				if(rndVal < 51){
					t.name = "Snake, Spit (Male)";
					rndVal = Math.ceil(Math.random()*6);
					t.treasureFactors.poison = Math.ceil(rndVal/5);
					t.special = "The snake spits a wad of Acid of potency "+rndVal+"."
				}else{
					t.name = "Snake, Spit (Female)";
					t.special = "The snake spits a wad of skunk-like acrid oil."
				}
			}else if(rndVal < 7){
				t.name = "Snake, Stake";
				t.equipment ={keys:["naturalSpring"]};
				t.equipment = setAttacks(t.equipment);
			}else{
				t.name = "Snake, Adder";
				t.special = "A bite that penetrates armor injects Wyvern Venom of potency equal to CON of the snake.";
			}
		}
		return t;
	}catch(err){
		window.alert("Error: RQTemplates.getSpecialRulesForTemplates: "+err);
	}
}

function setHitLocations(bodyType, naturalArmor){
	try{
		var hitLocations =  getHLTemplates(bodyType);
		  for(var hl =0; hl<hitLocations.length; hl++){
//			  window.alert("jsRQTemplates.setHitLocations "+bodyType+"  "+naturalArmor+"  "+ hitLocations[hl].location );
			  if(hitLocations[hl].location !== "abdom2"){
				hitLocations[hl].armor.natural = naturalArmor;
			  	hitLocations[hl].armor.current = naturalArmor;
			  }
		  }
		  return hitLocations;
	}catch(err){
		window.alert("Error: RQTemplates.setHitLocations: "+err);
	}
}

function setCalculatedElements(template){
	try{
		 template.baseSkills = {attack:0, parry:0, manipulation:0,
        	 stealth:0, perception:0, knowledge:0, oratory:0};
          template.alt = {alt:0, str:0, con:0, siz:0, int:0, pow:0, dex:0, cha:0, damageBonus:0,
        	 attack:0, parry:0, manipulation:0, stealth:0, perception:0, knowledge:0, oratory:0};
          template.damageBonus = 0;
          template.defense = {base:0, current:0};
          template.sr = {siz:0, dex:0};
          template.hp= 0;
          template.enc ={max:0, current:0};

		return template;
	}catch(err){
		window.alert("Error - jsRQTemplates.setCalculatedElements: "+err)
	}
}

function setAttacks(equipment){
	try{
		var meleeAtk = {name:"", ap:0, enc:0, attack:{}, parry:{}, damage:"", ammo:0, sr:{base:0, current:0}};
		var missileAtk = {name:"", ap:0, enc:0, attack:{}, parry:{}, damage:"", ammo:0, sr:{base:0, current:0}};
//		window.alert("jsRQTemplates.setAttacks 1: "+equipment.keys.length);
		for(var k = 0; k < equipment.keys.length; k++){
//			window.alert("jsRQTemplates.setAttacks 2: "+equipment.keys[k]+" "+k);
			if(equipment.keys[k].indexOf("shield")> -1 || equipment.keys[k].indexOf("melee")> -1  ){
				equipment[equipment.keys[k]] = Object.create(meleeAtk);
			}else if(equipment.keys[k].indexOf("missile")> -1 ){
				equipment[equipment.keys[k]] = Object.create(missileAtk);
			}else if(equipment.keys[k].indexOf("Incorporeal")> -1){
				equipment[equipment.keys[k]] = {name:"", ap:0, enc:0, attack:{base:0, current:0, prof:10}, parry:{base:-1, current:0, prof:0}, damage:"", ammo:0, sr:{base:4, current:4}};
			}else if(equipment.keys[k].indexOf("natural")> -1){
				if(equipment.keys[k] == "naturalBite10"){
					equipment[equipment.keys[k]] = {name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:10}, parry:{base:-1, current:0, prof:0}, damage:"1d10", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalBite2"){
					equipment[equipment.keys[k]] = {name:"Bite", ap:0, enc:0, attack:{base:15, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d2", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalBite4"){
					equipment[equipment.keys[k]] = {name:"Bite", ap:0, enc:0, attack:{base:15, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d4", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalBite2d4"){
					equipment[equipment.keys[k]] = {name:"Bite", ap:0, enc:0, attack:{base:15, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d4", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalBite2d8"){
					equipment[equipment.keys[k]] = {name:"Bite", ap:0, enc:0, attack:{base:15, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d8", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalBite8"){
					equipment[equipment.keys[k]] = {name:"Bite", ap:0, enc:0, attack:{base:15, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d8", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalBite6"){
					equipment[equipment.keys[k]] = {name:"Bite", ap:0, enc:0, attack:{base:15, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalBreath"){
					equipment[equipment.keys[k]] = {name:"Breath", ap:0, enc:0, attack:{base:40, current:40, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"", ammo:0, sr:{base:1, current:1}};
				}else if(equipment.keys[k] == "naturalButt10"){
					equipment[equipment.keys[k]] = {name:"Butt", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d10", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalButt2d10"){
					equipment[equipment.keys[k]] = {name:"Butt", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d10", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalButt2d6"){
					equipment[equipment.keys[k]] = {name:"Butt", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalButt6"){
					equipment[equipment.keys[k]] = {name:"Butt", ap:0, enc:0, attack:{base:25, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:5, current:5}, loc:["head"]};
				}else if(equipment.keys[k] == "naturalClaw"){
					equipment[equipment.keys[k]] = {name:"Claws", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d8", ammo:0, sr:{base:3, current:8}};
				}else if(equipment.keys[k] == "naturalClaw3"){
					equipment[equipment.keys[k]] = {name:"Claw", ap:0, enc:0, attack:{base:25, current:0, prof:0}, parry:{base:0, current:0, prof:0}, damage:"1d3", ammo:0, sr:{base:10, current:10}};
				}else if(equipment.keys[k] == "naturalClaw6"){
					equipment[equipment.keys[k]] = {name:"Claw", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:0, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalEnvelope"){
					equipment[equipment.keys[k]] = {name:"Envelope", ap:0, enc:0, attack:{base:100, current:100, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"8 pt Acid", ammo:0, sr:{base:1, current:1}};
				}else if(equipment.keys[k] == "naturalGhoulHowl"){
					equipment[equipment.keys[k]] = {name:"Breath", ap:0, enc:0, attack:{base:-1, current:-1, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"Special", ammo:0, sr:{base:1, current:1}};
				}else if(equipment.keys[k] == "naturalGlance"){
					equipment[equipment.keys[k]] = {name:"Glance", ap:0, enc:0, attack:{base:100, current:100, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"Death", ammo:0, sr:{base:1, current:1}};
				}else if(equipment.keys[k] == "naturalGore10"){
					equipment[equipment.keys[k]] = {name:"Gore", ap:0, enc:0, attack:{base:30, current:0, prof:20}, parry:{base:-1, current:0, prof:0}, damage:"1d!0", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalGore2d6"){
					equipment[equipment.keys[k]] = {name:"Gore", ap:0, enc:0, attack:{base:30, current:0, prof:20}, parry:{base:-1, current:0, prof:0}, damage:"2d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalHoof"){
					equipment[equipment.keys[k]] = {name:"Hoof", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d8", ammo:0, sr:{base:3, current:8}};
				}else if(equipment.keys[k] == "naturalHug4d6"){
					equipment[equipment.keys[k]] = {name:"Hug", ap:0, enc:0, attack:{base:30, current:0, prof:20}, parry:{base:-1, current:0, prof:0}, damage:"4d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalKick2d4"){
					equipment[equipment.keys[k]] = {name:"Kick", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d4", ammo:0, sr:{base:3, current:3}};
				}else if(equipment.keys[k] == "naturalKick2d6"){
					equipment[equipment.keys[k]] = {name:"Kick", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d6", ammo:0, sr:{base:3, current:3}};
				}else if(equipment.keys[k] == "naturalKick6"){
					equipment[equipment.keys[k]] = {name:"Kick", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:3, current:3}};
				}else if(equipment.keys[k] == "naturalKick8"){
					equipment[equipment.keys[k]] = {name:"Kick", ap:0, enc:0, attack:{base:15, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d8", ammo:0, sr:{base:3, current:3}};
				}else if(equipment.keys[k] == "naturalMace6"){
					equipment[equipment.keys[k]] = {name:"Mace", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalPeck10"){
					equipment[equipment.keys[k]] = {name:"Peck", ap:0, enc:0, attack:{base:30, current:30, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d10", ammo:0, sr:{base:1, current:1}};
				}else if(equipment.keys[k] == "naturalPeck8"){
					equipment[equipment.keys[k]] = {name:"Peck", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d8", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalRearAndPlunge"){
					equipment[equipment.keys[k]] = {name:"Rear & Plunge", ap:0, enc:0, attack:{base:05, current:05, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d8", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalRearAndPlunge2d10"){
					equipment[equipment.keys[k]] = {name:"Rear & Plunge", ap:0, enc:0, attack:{base:05, current:05, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d10", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalRip2d6"){
					equipment[equipment.keys[k]] = {name:"Rip", ap:0, enc:0, attack:{base:80, current:80, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalSpit"){
					equipment[equipment.keys[k]] = {name:"Spit", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"Wad", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalSpring"){
					equipment[equipment.keys[k]] = {name:"Spring", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6+1", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalSting6"){
					equipment[equipment.keys[k]] = {name:"Sting", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:1, current:1}};
				}else if(equipment.keys[k] == "naturalStomp2d6"){
					equipment[equipment.keys[k]] = {name:"Stomp", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalStomp6"){
					equipment[equipment.keys[k]] = {name:"Stomp", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalSwallow"){
					equipment[equipment.keys[k]] = {name:"Swallow", ap:0, enc:0, attack:{base:80, current:80, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"4d6", ammo:0, sr:{base:1, current:1}};
				}else if(equipment.keys[k] == "naturalSword6"){
					equipment[equipment.keys[k]] = {name:"Sword", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalTeeth"){
					equipment[equipment.keys[k]] = {name:"Teeth", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:3, current:8}};
				}else if(equipment.keys[k] == "naturalTentacle4"){
					equipment[equipment.keys[k]] = {name:"Tentacle *4", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d6", ammo:0, sr:{base:1, current:1}};
				}else if(equipment.keys[k] == "naturalTongue"){
					equipment[equipment.keys[k]] = {name:"Tongue", ap:0, enc:0, attack:{base:35, current:35, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d4", ammo:0, sr:{base:1, current:1}};
				}else if(equipment.keys[k] == "naturalTrample3d6"){
					equipment[equipment.keys[k]] = {name:"Trample", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"3d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalTrample4d6"){
					equipment[equipment.keys[k]] = {name:"Trample", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"4d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalTrample6d6"){
					equipment[equipment.keys[k]] = {name:"Trample", ap:0, enc:0, attack:{base:25, current:25, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"6d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalTrample8d6"){
					equipment[equipment.keys[k]] = {name:"Trample", ap:0, enc:0, attack:{base:50, current:50, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"8d6", ammo:0, sr:{base:4, current:4}};
				}else if(equipment.keys[k] == "naturalVampireTouch"){
					equipment[equipment.keys[k]] = {name:"Touch", ap:0, enc:0, attack:{base:50, current:50, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d4", ammo:0, sr:{base:4, current:4}};
				}
			}

		}
		return equipment;
	}catch(err){
		window.alert("Error-jsRQTemplates.setAttacks: "+err);
	}
}
/*
*  Sample template
*  {name: "Human",
		              source:"RuneQuest 2",
		              characteristics:{
		            	  str:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  con:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  siz:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  int:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  pow:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  dex:{value:{}, nDice:3, szDice:6, mod: 0},
		            	  cha:{value:{}, nDice:3, szDice:6, mod: 0}
		              },
		              move:{base:8, current:8},
  				      body:{type:"Humanoid",hitLocations:[], attacks:"Humanoid", naturalArmor:0},
		              equipment:{keys:["shield","melee1","melee2","melee3","melee4","melee5","missile1","missile2","missile3"]},
	            	  equipmentList:"",
	            	  skills:{lists:["all", "sentient", "animal"], set:[], required:[], prohibited:[]},
	            	  magic:{uses:1, basicMagic:[]},
		              treasureFactors:{multiAttack:0, special:0}, - sets vaues for additional TFs.  Include poison as needed, value is numeric or CON
		              mutations:{eBP:[]}, - eBP = list of excuve Body Parts.  used to ensure that only one mutation is selected for a body part
		              error:""
*/
