/**
 * RQ2/CRQ Random Basic Magic 
 */
function getBasicMagic(template){
	try{
		template.magic.basicMagic = [];
		var level = "Novice"; //Placeholder
		var rnd = Math.floor(Math.random()*100);
		var tempList = getBasicMagicList("healing");
		var pow = 1;
		var tPow = 0;
		var spell = {};
		var spellTypes = ["powGain", "combat", "defense","nonCombat"];
		var tSpell = {};
		var listSpell = {name:"", pow:0, type:""};
		var tempLS = Object.create(listSpell);
		if(rnd <96 && tempList.length > 0){
			pow = variablePower(tempList[0].minPoints,tempList[0].maxPoints, template.characteristics.int.value.base, tPow);
			tPow = tPow +pow;
			tempLS.name = tempList[0].name;
			tempLS.pow = pow;
			tempLS.type = "healing";
			template.magic.basicMagic.push(tempLS);
			pow = 1;
		}
//		window.alert("Test jsRQMagic.getBasicMagic Healing"+template.magic.basicMagic[0].name+" "+template.magic.basicMagic[0].pow);
		for(var s = 0; s<spellTypes.length;s++){
//			window.alert("Test jsRQMagic.getBasicMagic Random Generation of non-healing spells"+template.characteristics.int.value.base+" - "+tPow)
			if(template.characteristics.int.value.base - tPow > 0){
				var tempLS = Object.create(listSpell);
				tSpell = getSpell(spellTypes[s]);
				pow = variablePower(tSpell.minPoints,tSpell.maxPoints, template.characteristics.int.value.base, tPow);
				tPow = tPow +pow;
				tempLS.name = tSpell.name;
				tempLS.pow = pow;
				tempLS.type = spellTypes[s];
				template.magic.basicMagic.push(tempLS);
				pow = 1;
			}
		}
		if(template.characteristics.int.value.current - tPow > 0){
			var dup = 0;
			for(var m = tPow; m < template.characteristics.int.value.current; m++ ){
				rnd = Math.floor(Math.random()*spellTypes.length);
				tSpell = getSpell(spellTypes[rnd]);
				var tempLS = Object.create(listSpell);
				for(var i = 0; i < template.magic.basicMagic.length; i++){
					if(tSpell.name == template.magic.basicMagic[i].name){
						dup = 1;
					}
				}
				if(dup < 1){
					pow = variablePower(tSpell.minPoints,tSpell.maxPoints, template.characteristics.int.value.current, tPow);
					tPow = tPow + pow;
					tempLS.name = tSpell.name;
					tempLS.pow = pow;
					template.magic.basicMagic.push(tempLS);
				}
				pow = 1;
			}
		}
		return template;
	}catch(err){ 
		window.alert("jsRQMagic.getBasicMagic "+err);
		return template;
	}
}

function getSpell(spellList){
	try{
		var tempList = getBasicMagicList(spellList);
		var rnd = Math.floor(Math.random()*tempList.length);
		return tempList[rnd];
	}catch(err){
		window.alert("jsRQMagic.getSpell "+spellList+"  "+err);
	}
}

function variablePower(min, max, int, tPow){
	try{
		var delta = Number(max)-Number(min);
		var pow = 1;
		var rP = Math.ceil(Math.random()*12);
		if((delta == 5 && rP < 4)||(delta == 4 && rP <6)||(delta== 3 && rP < 7)){
			pow = min;
		}else if((delta == 5 && rP < 7)||(delta == 4 && rP <9)||(delta== 3 && rP < 10)){
			pow = min+1;
		}else if((delta == 5 && rP < 9)||(delta == 4 && rP <11)||(delta== 3 && rP < 12)){
			pow = min+2;
		}else if((delta == 5 && rP < 11)||(delta == 4 && rP <12)){
			pow = min+3;
		}else if(delta == 5 && rP < 12){
			pow = min+4;
		}else{
			pow = max;
		}
		if(pow > int - tPow){
			pow = int - tPow;
		}
		return pow;
	}catch(err){
		window.alert("Error:  jsRQMagic.variablePower: "+min+"  "+max+"  "+err);
	}
}
function getBasicMagicList(list){
	try{
		/*
		 * Type: p - spells that may gather a POW roll 
		 * 		 c - other spells useful in combay
		 */
		var r = [];
		var spellLists ={
		             powGain:[{name:"Befuddle", minPoints:1, maxPoints:1},
		                      {name:"Binding", minPoints:1, maxPoints:1},
		                      {name:"Demoralize", minPoints:1, maxPoints:1},
		                      {name:"Dispel Magic", minPoints:1, maxPoints:6},
		                      {name:"Disruption", minPoints:1, maxPoints:1},
		                      {name:"Dullblade", minPoints:1, maxPoints:6},
		                      {name:"Glue", minPoints:1, maxPoints:6},
		                      {name:"Harmonize", minPoints:2, maxPoints:2},
		                      {name:"Ignite", minPoints:1, maxPoints:1}
		             ],
					combat:[{name:"Bladesharp", minPoints:1, maxPoints:4},
		                      {name:"Bludgeon", minPoints:1, maxPoints:4},
		                      {name:"Coordination", minPoints:2, maxPoints:2},
		                      {name:"Fanaticism", minPoints:1, maxPoints:6},
		                      {name:"Firearrow", minPoints:2, maxPoints:2},
		                      {name:"Fireblade", minPoints:4, maxPoints:4},
		                      {name:"Ironhand", minPoints:1, maxPoints:4},
		                      {name:"Mobility", minPoints:1, maxPoints:1},
		                      {name:"Multimissile", minPoints:1, maxPoints:4},
		                      {name:"Speedart", minPoints:1, maxPoints:1},
		                      {name:"Strength", minPoints:2, maxPoints:2},
		                      {name:"Vigor", minPoints:4, maxPoints:4}
		                      ],
		            defense:[{name:"Countermagic", minPoints:1, maxPoints:6},
		                     {name:"Darkwall", minPoints:2, maxPoints:2},
		                      {name:"Detect Detection", minPoints:1, maxPoints:1},
		                      {name:"Detect Enemies", minPoints:1, maxPoints:1},
		                      {name:"Detect Life", minPoints:1, maxPoints:1},
		                      {name:"Detect Spirit", minPoints:1, maxPoints:1},
		                      {name:"Detect Traps", minPoints:2, maxPoints:2},
		                      {name:"Detect Undead", minPoints:1, maxPoints:1},
		                      {name:"Detection Blank", minPoints:1, maxPoints:6},
		                      {name:"Farsee", minPoints:1, maxPoints:1},
		                      {name:"Invisibility", minPoints:3, maxPoints:3},
		                      {name:"Lightwall", minPoints:4, maxPoints:4},
		                      {name:"Protection", minPoints:1, maxPoints:6},
		                      {name:"Shimmer", minPoints:1, maxPoints:6},
		                      {name:"Silence", minPoints:1, maxPoints:1},
		                      {name:"Spirit Shield", minPoints:1, maxPoints:6}
		 		             ],
 					nonCombat:[{name:"Detect Gems", minPoints:2, maxPoints:2},
		                      {name:"Detect Gold", minPoints:1, maxPoints:1},
		                      {name:"Detect Magic", minPoints:1, maxPoints:1},
		                      {name:"Detect Silver", minPoints:1, maxPoints:1},
		                      {name:"Extinguish", minPoints:2, maxPoints:2},
		                      {name:"Light", minPoints:1, maxPoints:1},
		                      {name:"Mindspeech", minPoints:1, maxPoints:6},
		                      {name:"Repair", minPoints:2, maxPoints:2},
		                      {name:"Spirit Binding", minPoints:1, maxPoints:1},
			                  {name:"XenoHealing", minPoints:2, maxPoints:6}
		                      ],
		           healing:[{name:"Healing", minPoints:2, maxPoints:6}]
		};

		if(spellLists.hasOwnProperty(list)){ r = spellLists[list];
		}else{
			window.alert("Error: jsRQMagic.getBasicMagicList. List name ="+list+" not found.")
		}
		return r;
		return spells;
	}catch(err){
		window.alert("jsRQMagic.getBasicMagicList "+list+" "+err);
	}
}