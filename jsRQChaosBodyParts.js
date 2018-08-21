/** * 
 */
function getBodyPart(bodyPart, bodyType, rnd){
	try{
		var bodyPartObj= {hitLocs:[], chars:[], attacks:[], bonusSkills:[], desc:""};
		if(rnd < 1 || rnd > 100 || isNaN(rnd)){
			rnd = Math.floor(Math.random()*100);
		}
//		window.alert("jsRQChaosbodyPart.getbodyPart  1: " + bodyPart+" "+ bodyType);
		var oldLocs = getChaosOldLocations(bodyPart, bodyType);
		var actions = oldLocs[1];
		oldLocs = oldLocs[0];
//		window.alert("jsRQChaosbodyParts.getbodyPart 2: "+oldLocs.length+" "+oldLocs[0]+" | "+actions.length+" "+actions[0]);
		if(bodyPart == "arm" || bodyPart == "head" || bodyPart == "leg" || bodyPart == "torso" || bodyPart == "tail" || bodyPart == "wing" ){
			if(bodyPart == "arm"){
				bodyPartObj.attacks = [{melee1:0},{melee2:0},{melee3:0},{melee4:0},{melee5:0},{missile1:0},{missile2:0},{missile3:0}];
			}
//			rnd = 45;
//			window.alert("jsRQChaosDisease.getbodyPart: 3 "+bodyPart+" "+oldLocs[0]+bodyType+">"+rnd);
			if(rnd < 6 ){
				bodyPartObj	= getAnt(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else  if(rnd < 11 ){
				bodyPartObj	= getApe(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd <16){
				bodyPartObj	= getBat(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd <21){
				bodyPartObj	= getBear(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 26){
				bodyPartObj	= getBoar(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 31){
				bodyPartObj	= getBull(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 36){
				bodyPartObj	= getDeer(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 41){
				bodyPartObj	= getDog(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 46){
//				window.alert("jsRQChaosDisease.getbodyPart: 3 "+bodyPart+" "+oldLocs[0]+bodyType+">Crocodile");
				bodyPartObj	= getCrocodile(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 51){
				bodyPartObj	= getEagle(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 56){
				bodyPartObj	= getHorse(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd <61){
				bodyPartObj	= getLion(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd <66){
				bodyPartObj	= getRabbit(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 71){
				bodyPartObj	= getRaven(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 76){
				bodyPartObj	= getGoat(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 81){
				bodyPartObj	= getSnake(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 85){
				bodyPartObj	= getSpider(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd < 91){
				bodyPartObj	= getTiger(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else if(rnd <95){
				bodyPartObj	= getWeasel(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}else{
				bodyPartObj	= getRat(bodyPart, bodyPartObj, oldLocs, bodyType, actions);
			}
		}else if(bodyPart == "BiQuad"){
			if(bodyType == "Humanoid" || bodyType == "Walktapi" ){
//				oldLocs = ["rarm", "larm"];
				bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 0, 1, 0);
				bodyPartObj.desc = "The creature's arms have been replaced by another set of legs, it now travels on all fours.";
				bodyPartObj.attacks = [{shield:0},{melee1:0},{melee2:0},{melee3:0},{melee4:0},{melee5:0},{missile1:0},{missile2:0},{missile3:0}];			
			}else if(bodyType == "Quadruped" || bodyType == "Basilisk" ){
//				oldLocs = ["rfleg", "lfleg"];
				bodyPartObj.hitLocs = getChaosHitLocations(actions,["rarm", "larm"], oldLocs, ["R ARM", "L ARM"], 0, 1, 0);
				bodyPartObj.desc = "The creature's forelegs have been replaced by arms, it now travels upright.";
				bodyPartObj.attacks = getWeaponandShieldSlots("Humanoid");
			}
		}else if(bodyPart == "BatWings"){
			bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 0, 1, 0);	
			bodyPartObj.desc =  "The creature has bat wings and flies at 1.5 * Movement rate if unencumbered.";					
		}else if(bodyPart == "BeWeaponed"){
			var wpn ="";
			var limb = "";
			var loc = "";
			var lbl = "";
			rnd = Math.ceil(Math.random()*2);
			if(rnd == 1){
				limb = "r";
				loc = "right";
			}else{
				limb = "l";
				loc = "left";
			}
//			window.alert("jsRQChaosBodyPart.getBodyPart(Beweaponed) 2: "+loc);
			for(var l = 0; l < oldLocs.length; l++){
				if(limb !== oldLocs[l].substring(0,1)){
					oldLocs.splice(l,1);
				}
			}
			var weaponDef = getEquipByValue("melee", "1HShortSpear");
			//{name:"Short Spear", value:"1HShortSpear", ap:15, enc:2, attack:10, parry:10, minStr:9, minDex:7, damage:"1d6+1", sr:2 },
			rnd = Math.ceil(Math.random()*8);
			if(rnd < 2){
				wpn = "spear";
				lbl = "SPEAR";
				weaponDef = getEquipByValue("melee", "1HShortSpear");
			}else if(rnd < 4){
				wpn = "sword";
				lbl = "SWORD";
				weaponDef = getEquipByValue("melee", "1HScimitar");
			}else if(rnd < 5){
				wpn = "mace";
				lbl = "MACE";
				weaponDef = getEquipByValue("melee", "1HMaceLight");
			}else if(rnd < 6){
				wpn = "hammer";
				lbl = "HMMR";
				weaponDef = getEquipByValue("melee", "1HHammer");
			}else if(rnd < 8){
				wpn = "light crossbow";
				lbl = "LXBOW";
				weaponDef = getEquipByValue("missile", "LightXBow");
			}else{
				rnd = Math.ceil(Math.random()*4);
				if(rnd < 2){
					wpn = "assault rifle";
					lbl = "ASTRFL";
					weaponDef={name:"Assault Rifle", ap:15, enc:2, attack:{base:30, current:0, prof:0}, parry:{base:25, current:0, prof:0}, damage:"2d6", ammo:0, sr:{base:4, current:0},range:300, rate:-1, damBonus:0};
				}else if(rnd < 3){
					wpn = "bazooka";
					lbl = "BZKA";
					weaponDef={name:"Bazooka", ap:20, enc:2, attack:{base:30, current:0, prof:0}, parry:{base:25, current:0, prof:0}, damage:"4d6", ammo:0, sr:{base:4, current:0},range:75, rate:"1/3", damBonus:0};
				}else if(rnd < 4){
					wpn = "laser pistol";
					lbl = "LSR P";
					weaponDef={name:"Laser Pistol", ap:8, enc:2, attack:{base:30, current:0, prof:0}, parry:{base:25, current:0, prof:0}, damage:"2d6", ammo:0, sr:{base:4, current:0},range:150, rate:-1, damBonus:0};
				}else{
					wpn = "chainsaw";
					lbl = "CHNSW";
					weaponDef={name:"Chainsaw", ap:15, enc:2, attack:30, parry:25, damage:"3d6", ammo:0, sr:4};
				}
			}
//			window.alert("jsRQChaosBodyPart.getBodyPart(Beweaponed) 1: "+weaponDef.name);
			var attackDef = {name:weaponDef.name, ap:weaponDef.ap, enc:weaponDef.enc, attack:{base:weaponDef.attack+30, current:0, prof:0}, parry:{base:weaponDef.parry+25, current:0, prof:0}, damage:weaponDef.damage, ammo:0, sr:{base:weaponDef.sr, current:0}};
			if(weaponDef.hasOwnProperty("range")){
				attackDef.attack.base = weaponDef.attack.base;
				attackDef.sr.base = weaponDef.sr.base;  
				attackDef.range=weaponDef.range;
				attackDef.rate = weaponDef.rate;
				attackDef.damBonus = weaponDef.damBonus;
			}
			bodyPartObj.attacks.push({naturalMut1:attackDef});
			bodyPartObj.hitLocs = getChaosHitLocations(actions,[wpn], oldLocs, [lbl], 0, 1, 0);	
			bodyPartObj.desc =  "The creature's "+loc+" forelimb has been replaced by "+setAnA(wpn)+" "+wpn+".";					
		}else if(bodyPart == "ears"){
			rnd = Math.floor(Math.random()*6);
			if(rnd < 2){
				bodyPartObj.desc = "The creature has enormous ears." 
			}else if(rnd < 5){
				bodyPartObj.desc = "The creature has rabbit ears."
			}else if(rnd < 6){
				bodyPartObj.desc = "The creature has elephant ears."
			}else{
				bodyPartObj.desc = "The creature has donkey ears."
			}
			bodyPartObj.bonusSkills=[{Listen:20}];
		}else if(bodyPart== "BirdLegs"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rleg", "lleg"], oldLocs, ["R LEG", "L LEG"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalMut1:{name:"Kick", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "bird", bodyPart, "legs", "If the creature uses it's Kick attack, it may not use Defense in the same round.");
		}else if(bodyPart== "BirdTail"){
//			window.alert("jsRQChaosbodyPart.getbodyPart  1: " + oldLocs[0]+" "+ oldLocs[1]);
			bodyPartObj.bonusSkills=[{Tumbling:20}];
			rnd = Math.floor(Math.random()*6);
			if(rnd < 3){
				bodyPartObj.desc = "The creature has a duck tail." ;
			}else if(rnd < 5){
				bodyPartObj.desc = "The creature has a chicken tail.";
			}else if(rnd < 6){
				bodyPartObj.desc = "The creature has a eagle tail.";
			}else{
				bodyPartObj.desc = "The creature has a seagull tail.";
			}
			bodyPartObj.hitLocs = getChaosHitLocations(["a"],["tail"], oldLocs, ["TAIL"], 0, 1, 0);
		}else  if(bodyPart== "BisonHorns"){
			bodyPartObj.attacks.push({naturalMut1:{name:"Butt", ap:0, enc:0, attack:{base:50, current:50, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d10", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = "The creature has bison horns."
		}else if(bodyPart== "Blood"){
			rnd = Math.floor(Math.random()*6);
			bodyPartObj.desc = "The creature's blood has been replaced by "
			if(rnd < 2){
				bodyPartObj.desc = bodyPartObj.desc+"electricity. (Successful melee attacks do 1d3 Electrical damage to the attacker)"; 
			}else if(rnd < 3){
				bodyPartObj.desc = bodyPartObj.desc+"acid. (Successful melee attacks do 1d3 Acid damage to the attacker)";
			}else if(rnd < 4){
				bodyPartObj.desc = bodyPartObj.desc+"fire. (Successful melee attacks do 1d3 Fire damage to the attacker)";
			}else if(rnd < 5){
				bodyPartObj.desc = bodyPartObj.desc+"poison gas. (Resist or fall unconscious after each successful melee attack.)";
			}else if(rnd < 6){
				bodyPartObj.desc = bodyPartObj.desc+"maggots.";
				bodyPartObj.chars = [{con:2}];
			}else{
				bodyPartObj.desc = bodyPartObj.desc+"molten metal. (Successful melee attacks do 1d3 Fire damage to the attacker for two rounds.)";
			}
		}else  if(bodyPart== "BreatheFire"){
			bodyPartObj.attacks.push({naturalMut1:{name:"Breathe Fire", ap:0, enc:0, attack:{base:30, current:30, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"3d4", ammo:0, sr:{base:4, current:4}, range: 20, rate:"1/5", damBonus:0 }});
			bodyPartObj.desc = "The creature can breathe fire twice a day.  Range as Throwing Axe"
		}else if(bodyPart == "ChickenWings"){
			bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 0, 1, 0);	
			bodyPartObj.desc =  "The creature has chicken wings and only takes 1 pt per die of damage from falling.";					
		}else if(bodyPart== "ClovenHooves"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rleg", "lleg"], oldLocs, ["R LEG", "L LEG"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalMut1:{name:"Kick", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = "The creature has Cloven Hooves instead of regular feet. If the creature uses it's Kick attack, it may not use Defense in the same round.";
		}else if(bodyPart== "DualMinds"){
			rnd = Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6);
			bodyPartObj.desc = "Dual Minds.  The creature has two fully functional brains.  The second brain has INT "+rnd+" and POW ";
			rnd = Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6);
			bodyPartObj.desc = bodyPartObj.desc + rnd +" and can take separate actions. i.e. One brain can attack while the other casts a spell.";
		}else if(bodyPart == "EagleWings"){
			bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 0, 1, 0);	
			bodyPartObj.desc =  "The creature has eagle wings and flies at 2 * Movement rate if unencumbered.";					
		}else if(bodyPart == "FalconWings"){
			bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 0, 1, 0);	
			bodyPartObj.desc =  "The creature has falcon wings and flies at 3 * Movement rate if unencumbered.";					
		}else if(bodyPart == "Headless"){
			bodyPartObj.hitLocs = getChaosHitLocations(["r" ],[""], oldLocs, [""], 0, 0, 0);
			bodyPartObj.bonusSkills=[{"Spot Hidden":-40}, {"Spot Trap":-40}, {"Listen":-40}];
			bodyPartObj.desc = "The creature has no head. It's features appear in it's chest.";
		}else if(bodyPart == "Hopper"){
			bodyPartObj.hitLocs = getChaosHitLocations(["s", "r"],["leg"], oldLocs, ["LEG"], 0, 1, 0);
			bodyPartObj.desc = "The creature has a single leg and moves by hopping.";
		}else if(bodyPart== "LizardTail"){
			bodyPartObj.bonusSkills=[{Tumbling:20}];
			bodyPartObj.desc = "The creature has the scaly tapered tail of a lizard." ;
			bodyPartObj.hitLocs = getChaosHitLocations(["a"],["tail"], oldLocs, ["TAIL"], 2, 1, 0);
		}else if(bodyPart == "Mannikin"){
			bodyPartObj.hitLocs = getChaosHitLocations(["s" ],["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d10", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = "The creature's head is mostly a large mouth. Out of the top of the head grows a miniature head, arms and torso of the original creature which does all of the talking and thinking for creature. The manikin may be armed with diminutive weapons, but the creature may only make Bite attacks.";
		}else if(bodyPart == "MechanicalWings"){
			bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 3, 1, 0);	
			bodyPartObj.desc =  "Glittering pinions of sliver and brass allow the creature to fly at it's walking speed, regardless of the armor it carries.";					
		}else if(bodyPart == "JetWings"){
			bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 4, 1, 0);	
			bodyPartObj.desc =  "Swept back silvery wings make the creature as wide as it is tall. Jet engines under the wings roar like an F-14 Tomcat. The creature flys four times as fast as it can walk, regardless of Armor or Load.";					
		}else if(bodyPart == "B17Wings"){
			bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 6, 1, 0);	
			bodyPartObj.desc =  "Fixed olive drab wings make the creature one and a half times as wide as it is tall. Radial engines under the wings drone like a B-17's.  The sound of freedom, baby! The creature flies twice as fast as it can walk, regardless of Armor or Load. Creatures larger than SIZ 24 with this mutation get four engines.";					
		}else if(bodyPart == "MultipleArms"){
			if(bodyType == "Humanoid" || bodyType == "Walktapi" ){
				bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rarm2", "larm2"], oldLocs, ["RARM2", "LARM2"], 0, 1, 0);
				bodyPartObj.desc = "The creature has two sets of arms.";
			}else if(bodyType == "Quadruped" || bodyType == "Basilisk" ){
				bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rarm", "larm"], oldLocs, ["R ARM", "L ARM"], 0, 1, 0);
				bodyPartObj.desc = "The creature has gained arms.";
				bodyPartObj.attacks = getWeaponandShieldSlots("Humanoid");
			}
		}else if(bodyPart == "MultipleLegs"){
			if(bodyType == "Humanoid" || bodyType == "Walktapi" ){
				bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rleg2", "lleg2"], oldLocs, ["RLEG2", "LLEG2"], 0, 1, 0);
				bodyPartObj.desc = "The creature has two sets of legs.";
			}else if(bodyType == "Quadruped" || bodyType == "Basilisk" ){
				bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rcleg", "lcleg"], oldLocs, ["RCLEG", "LCLEG"], 0, 1, 0);
				bodyPartObj.desc = "The creature has three sets of legs.";
			}
		}else if(bodyPart== "PeacockTail"){
			bodyPartObj.bonusSkills=[{Tumbling:20}];
			bodyPartObj.desc = "The creature has a peacock tail.  Pretty isn't it?." ;
			bodyPartObj.hitLocs = getChaosHitLocations(["a"],["tail"], oldLocs, ["TAIL"], 2, 1, 0);
		}else if(bodyPart == "PointyHead"){
			bodyPartObj.hitLocs = getChaosHitLocations(["s" ],["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalGore:{name:"Gore", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = "The creature's head rises to a sharp point.";
		}else if(bodyPart== "PoorDualMinds"){
			rnd = Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6);
			bodyPartObj.desc = "Poor Dual Minds.  The creature has two fully functional brains.  The second brain has INT "+rnd+" and POW ";
			rnd = Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6);
			bodyPartObj.desc = bodyPartObj.desc + rnd +" and may take separate actions. i.e. One brain can attack while the other casts a spell.  However the brains will attempt to dominate each other, roll d6 each round the creature is in combat to determine which brain dominates.  The brains will ALWAYS act against each other.";
		}else if(bodyPart== "PrehensileTail"){
			bodyPartObj.bonusSkills=[{Tumbling:20}];
			bodyPartObj.desc = "The creature has a prehensile tail like a monkey or oppossum.  It may use it to hold a shield or wield an off hand weapon." ;
			bodyPartObj.hitLocs = getChaosHitLocations(["a"],["tail"], oldLocs, ["TAIL"], 0, 1, 0);
		}else if(bodyPart == "RamsHorns"){
			bodyPartObj.hitLocs = getChaosHitLocations(["s" ],["head"], oldLocs, ["HEAD"], 4, 1, 0);
			bodyPartObj.attacks.push({naturalButt:{name:"Butt", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = "The creature's head has large curly ram's horns.";
		}else if(bodyPart== "ScorpionTail"){
			bodyPartObj.desc = "The creature has a scorpion's tail, including the sting.  The tail injects a systemic poison with a potency equal to the creature's CON." ;
			bodyPartObj.attacks.push({naturalSting:{name:"Sting", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.hitLocs = getChaosHitLocations(["a"],["tail"], oldLocs, ["TAIL"], 0, 1, 0);
		}else if(bodyPart == "SeagullWings"){
			bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 0, 1, 0);	
			bodyPartObj.desc =  "The creature has seagull wings and flies at 1.5 * Movement rate if unencumbered.";					
		}else if(bodyPart == "SiameseTwins"){
			bodyPartObj.hitLocs = getChaosHitLocations(["s", "a"],["rhead", "lhead"], ["head", "rhead"], ["RHEAD", "LHEAD"], 3, 2, 0);
			bodyPartObj.bonusSkills=[{"Spot Hidden":20}, {"Spot Trap":20}, {"Listen":20}];
			bodyPartObj.desc = "Two creatures in a single body, each controls one side.";
			if(rnd <91){
				bodyPartObj.desc = bodyPartObj.desc + "  "+getBodyPart("DualMinds", bodyType, rnd).desc;
			}else{
				bodyPartObj.desc = bodyPartObj.desc + "  "+getBodyPart("PoorDualMinds", bodyType, rnd).desc;
			}
		}else if(bodyPart== "TailSnake"){
			bodyPartObj.bonusSkills=[{Tumbling:10}];
			bodyPartObj.desc = "The creature has 5 foot snake for a tail. The bite injects a systemic poison with a potency equal to the creature's CON." ;
			bodyPartObj.attacks.push({naturalSting:{name:"Tail Snake", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d2", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.hitLocs = getChaosHitLocations(["a"],["tail"], oldLocs, ["TAIL"], 0, 1, 0);
		}else if(bodyPart == "Tentacles4Arms"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rtent", "ltent"], oldLocs, ["RTENT", "LTENT"], 0, 1, 0);	
			bodyPartObj.desc =  "The creature has tentacles instead of arms.";					
		}else if(bodyPart == "ThreeHeads"){
			var bPO = Object.create(bodyPartObj);
//			window.alert("jsRQChaosBpdyPart.getBodyPart:Threeheads 1");
			actions = ["s", "a", "a"];
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["chead", "rhead", "lhead"], ["head", "chead", "rhead"], ["CHEAD","RHEAD", "LHEAD"], 3, 2, 0);
//			window.alert("jsRQChaosBpdyPart.getBodyPart:Threeheads 2");
			bodyPartObj.bonusSkills=[{"Spot Hidden":20}, {"Spot Trap":20}, {"Listen":20}];
			bodyPartObj.desc = "The creature has three heads.";
			rnd = Math.floor(Math.random()*100);
			if(rnd < 50){
				rnd = Math.floor(Math.random()*4)-1;
				if(rnd == 0){
					bodyPartObj.desc = bodyPartObj.desc + "  All of the heads are male.";	
				}else if(rnd == 1){
					bodyPartObj.desc = bodyPartObj.desc + "  One head is male and two heads are female.";
				}else if(rnd == 2){
					bodyPartObj.desc = bodyPartObj.desc + "  Two heads are male and one heads is female.";
				}else{
					bodyPartObj.desc = bodyPartObj.desc + "  All of the heads are female.";	
				}
			}else{
				rnd = Math.floor(Math.random()*100);
				if(rnd < 51){
					rnd = Math.floor(Math.random()*100);
					bodyPartObj = thanatar(bodyPartObj, bodyType, "chead", rnd, ["s"]);
				}
				rnd = Math.floor(Math.random()*100);
				if(rnd < 51){
					rnd = Math.floor(Math.random()*100);
					bodyPartObj = thanatar(bodyPartObj, bodyType, "rhead", rnd, ["s"]);
				}
				rnd = Math.floor(Math.random()*100);
				if(rnd < 51){
					rnd = Math.floor(Math.random()*100);
					bodyPartObj = thanatar(bodyPartObj, bodyType, "lhead", rnd, ["s"]);
				}
			}
			rnd = Math.floor(Math.random()*100);
			if(rnd <51){
				bodyPartObj.desc = bodyPartObj.desc + "  "+getBodyPart("DualMinds", bodyType, rnd).desc;
			}else if(rnd > 90){
				bodyPartObj.desc = bodyPartObj.desc + "  "+getBodyPart("PoorDualMinds", bodyType, rnd).desc;
			}
		}else if(bodyPart == "TwoHeads"){
			var bPO = Object.create(bodyPartObj);
			actions = ["s", "a"];
			bodyPartObj.hitLocs = getChaosHitLocations(actions,[ "rhead", "lhead"], ["head", "rhead"], ["RHEAD", "LHEAD"], 3, 2, 0);
			bodyPartObj.bonusSkills=[{"Spot Hidden":20}, {"Spot Trap":20}, {"Listen":20}];
			bodyPartObj.desc = "The creature has two heads.";
			rnd = Math.floor(Math.random()*100);
			if(rnd < 50){
				rnd = Math.floor(Math.random()*3)-1;
				if(rnd == 0){
					bodyPartObj.desc = bodyPartObj.desc + "  All of the heads are male.";	
				}else if(rnd == 1){
					bodyPartObj.desc = bodyPartObj.desc + "  One head is male and one head is female.";
				}else{
					bodyPartObj.desc = bodyPartObj.desc + "  All of the heads are female.";	
				}
			}else{
				rnd = Math.floor(Math.random()*100);
				if(rnd < 51){
					rnd = Math.floor(Math.random()*100);
					bodyPartObj = thanatar(bodyPartObj, bodyType, "rhead", rnd, ["s"]);
				}
				rnd = Math.floor(Math.random()*100);
				if(rnd < 51){
					rnd = Math.floor(Math.random()*100);
					bodyPartObj = thanatar(bodyPartObj, bodyType, "lhead", rnd, ["s"]);
				}
			}
			rnd = Math.floor(Math.random()*100);
			if(rnd <25){
				bodyPartObj.desc = bodyPartObj.desc + "  "+getBodyPart("DualMinds", bodyType, rnd).desc;
			}else if(rnd > 74){
				bodyPartObj.desc = bodyPartObj.desc + "  "+getBodyPart("PoorDualMinds", bodyType, rnd).desc;
			}
		}else if(bodyPart == "VultureWings"){
			bodyPartObj.hitLocs = getChaosHitLocations(["a", "a"],["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 0, 1, 0);	
			bodyPartObj.desc =  "The creature has vulture wings and flies at 1.5 * Movement rate if at less than half encumbrance.";					
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getbodyPart: "+bodyPart+" "+err);
	}	
}

function getChaosOldLocations(part, bodyType){
	try{
//		window.alert("jsRQChaosbodyPart.getChaosLocations  1: " + part+" "+ bodyType);
		var oldLocs = [];
		if(part == "arm" || part == "BiQuad" || part == "BatWings" 
			|| part == "ChickenWings" || part == "EagleWings" || part == "FalconWings"
				|| part == "MechanicalWings" || part == "JetWings" || part == "B17Wings"
					|| part == "MultipleArms" || part == "SeagullWings" || part == "Tentacles4Arms"
						|| part == "VultureWings" || part == "BeWeaponed"){
//			window.alert("jsRQChaosbodyPart.getChaosLocations  2: " + part+" "+ bodyType);
			if(bodyType == "Humanoid" || bodyType == "Walktapi" || bodyType == "Centaur"
				|| bodyType == "BoloLizard" || bodyType == "Dragonewt" ){
				oldLocs = [["rarm", "larm"], ["s","s"]];
			}else if(bodyType == "Quadruped" || bodyType == "Dragon"){
				oldLocs = [["rfleg", "lfleg"], ["s","s"]];
			}else if(bodyType == "Demi-bird" || bodyType == "Basilisk" ){
				oldLocs = [["rwing", "lwing"], ["s","s"]];
			}else if(bodyType == "Dragonsnail"){
				oldLocs = [["forebody", "forebody"], ["a","a"]];
			}
		}else if(part == "BirdLegs" || part == "ClovenHooves" || part == "Hopper" 
			|| part =="leg" || part =="MultipleLegs" ){
			if(bodyType == "Humanoid" || bodyType == "Walktapi" || bodyType == "BoloLizard"
				|| bodyType == "Demi-bird" || bodyType == "Dragonewt"){
				oldLocs = [["rleg", "lleg"], ["s","s"]];
			}else if(bodyType == "Quadruped" || bodyType == "Basilisk"  || bodyType == "Centaur" 
				 || bodyType == "Dragon"){
				oldLocs = [["rhleg", "lhleg"], ["s","s"]];
			}else if(bodyType == "Dragonsnail"){
				oldLocs = [["forebody", "forebody"], ["a","a"]];
			}
		}else if(part == "BirdTail" || part == "LizardTail" || part == "PeacockTail"
			|| part == "PrehensileTail" || part == "ScorpionTail" || part == "TailSnake"){
//			window.alert("jsRQChaosbodyPart.getChaosLocations  3: " + part+" "+ bodyType);
			if(bodyType == "Humanoid" || bodyType == "Walktapi" || bodyType == "BoloLizard"
				|| bodyType == "Demi-bird"){
				oldLocs = [["abdom"],["a"]];
			}else if(bodyType == "Quadruped" || bodyType == "Basilisk"  || bodyType == "Centaur"){
				oldLocs = [["hndqtr"], ["a"]];
			}else if (bodyType == "Dragon" || bodyType == "Dragonewt"){
				oldLocs = [["tail"],["s"]];
			}else if(bodyType == "Dragonsnail"){
				oldLocs = [["shell"], ["a"]];
			}
		}else if(part == "head" || part == "Headless" || part == "Mannikin"
			|| part == "PointyHead" || part == "RamsHorns"  ){
			oldLocs = [["head"], ["s"]];
		}else if(part == "SiameseTwins"){
				oldLocs = [["head", "rhead"],["s", "a"]];
		}else if(part == "torso"){
			if(bodyType == "Humanoid" || bodyType == "Walktapi" || bodyType == "BoloLizard"
				|| bodyType == "Demi-bird" || bodyType == "Dragonewt"){
				oldLocs = [["chest","abdom"], ["s","s"]];
			}else if(bodyType == "Quadruped" || bodyType == "Basilisk"  || bodyType == "Centaur"
				|| bodyType == "Dragon"){
				oldLocs = [["foreqtr","hndqtr"], ["s","s"]];
			}else if( bodyType == "Dragonsnail"){
				oldLocs = [["forebody"], ["s"]];
			}
		}else if(part == "wing"){
			if(bodyType == "Humanoid" || bodyType == "Walktapi" || bodyType == "BoloLizard" 
				|| bodyType == "Dragonewt" ){
				oldLocs = [["chest", "chest"], ["a","a"]];
			}else if(bodyType == "Quadruped"  || bodyType == "Centaur"){
				oldLocs = [["foreqtr", "foreqtr"], ["a","a"]];
			}else if( bodyType == "Basilisk" || bodyType == "Demi-bird" || bodyType == "Dragon"){
				oldLocs = [["rwing", "lwing"], ["s","s"]];
			}else if(bodyType == "Dragonsnail"){
				oldLocs = [["forebody", "forebody"], ["a","a"]];
			}
		}else if(part == "tail"){
			if(bodyType == "Humanoid" || bodyType == "Walktapi" || bodyType == "BoloLizard"
				|| bodyType == "Demi-bird"){
				oldLocs = [[""],["a"]];
			}else if(bodyType == "Quadruped" || bodyType == "Basilisk"  || bodyType == "Centaur"){
				oldLocs = [[""],["a"]];
			}else if(bodyType == "Dragon"	|| bodyType == "Dragonewt"){
				oldLocs = [["tail"], ["s"]];
			}else if(bodyType == "Dragonsnail"){
				oldLocs = [["shell"], ["a"]];
			}
		}
		return oldLocs;
	}catch(err){
		window.alert("Error. jsRQChaosDisease.getChaosOldLocations  "+err);
	}
}

function getNewBodyPart(template, bodyPart, rnd){
	try{
		var bodyPartObj = {hitLocs:[], chars:[], attacks:[], bonusSkills:[], desc:""};
		var tempBPO;
		var chaos = "";
		tempBPO = Object.create(bodyPartObj);
		tempBPO = getBodyPart(bodyPart, template.body.type, rnd);
		template = updateTemplateBodyParts(template, tempBPO);
		chaos =  chaos+"  "+tempBPO.desc;
		if(template.hasOwnProperty("special")){
			template.special = template.special + "  "+chaos;
		}else{
			template.special = chaos;
		}
		return template;
	}catch(err){
		window.alert("Error. jsRQChaosDisease.getNewBodyPart  "+err);
	}
}

function getAnt(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 5, 1, 0);	
			bodyPartObj.chars = [{str:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "ant", bodyPart, "forelegs", "");
		}else if(bodyPart == "head"){
			bodyPartObj.chars = [{int:-2}];			
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 5, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d10", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "ant", bodyPart, "head", "");
			bodyPartObj.bonusSkills=[{"Track by Smell":20}];
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 5, 1, 0);	
			bodyPartObj.chars = [{str:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "ant", bodyPart, "hindlegs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["thorax", "abdom"], oldLocs, ["THRX", "ABDOM"], 5, 1, 0);	
			bodyPartObj.chars = [{str:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "ant", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rwing", "lwing"], oldLocs, ["RWING", "LWING"], 0, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "ant", setBodyPartForDesc(bodyPart, oldLocs), "wings", "The creature can fly at walking speed");
		}else if(bodyPart == "tail"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["tail"], oldLocs, ["TAIL"], 5, 1, 0);	
			bodyPartObj.attacks.push({naturalSting:{name:"Stinger", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d3+Poison", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "ant", setBodyPartForDesc(bodyPart, oldLocs), "tail", "The stinger injects a systemic poison with a potency equal to CON-2.");
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getAnt: "+bodyPart+" "+err);
	}
}

function getApe(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rarm", "larm"], oldLocs, ["R ARM", "L ARM"], 0, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "ape", bodyPart, "arms", "");			
			bodyPartObj.bonusSkills=[{Climb:10}];
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d10", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "ape", bodyPart, "head", "");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rleg", "lleg"], oldLocs, ["R LEG", "L LEG"], 0, 1, 0);	
			bodyPartObj.bonusSkills=[{Climb:10}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "ape", bodyPart, "legs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["chest", "abdom"], oldLocs, ["CHEST", "ABDOM"], 0, 1, 0);	
			bodyPartObj.chars = [{str:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "ape", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getApe: "+bodyPart+" "+err);
	}
}
function getBat(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm" || bodyPart == "wing"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 0, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "bat", bodyPart, "wings", "The creature flies at 1.5 * Movement rate");
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d8", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "bat", bodyPart, "head", "The creature can See Invisible and in the dark without expending POW, but is disoriented by loud noises.");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rleg", "lleg"], oldLocs, ["R LEG", "L LEG"], 0, 1, 0);	
			bodyPartObj.bonusSkills=[{Climb:10}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "bat", bodyPart, "legs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["chest", "abdom"], oldLocs, ["CHEST", "ABDOM"], 0, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "bat", bodyPart, "body", "");	
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "bat", setBodyPartForDesc(bodyPart, oldLocs), "stubby tail", "");
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getBat: "+bodyPart+" "+err);
	}
}

function getBear(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 3, 1, 0);	
			bodyPartObj.chars = [{str:2}];
			bodyPartObj.attacks.push({naturalClaw:{name:"Claw", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "bear", bodyPart, "forelegs", "");
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 3, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d10", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "bear", bodyPart, "head", "");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 3, 1, 0);	
			bodyPartObj.bonusSkills=[{Climb:10}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "bear", bodyPart, "hindlegs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hndqtr"], oldLocs, ["FOREQ", "HINDQ"], 3, 1, 0);	
			bodyPartObj.chars = [{str:2, con:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "bear", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "bear", setBodyPartForDesc(bodyPart, oldLocs), "stub tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getBear: "+bodyPart+" "+err);
	}
}

function getBoar(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 2, 1, 0);	
			bodyPartObj.attacks.push({naturalHooves:{name:"Hooves", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d3+1", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "boar", bodyPart, "forelegs", "Hooves attack as a light cestus");
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 2, 1, 0);
			bodyPartObj.attacks.push({naturalGore:{name:"Gore", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "boar", bodyPart, "head", "");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 2, 1, 0);	
			bodyPartObj.chars = [{str:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "boar", bodyPart, "hindlegs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hndqtr"], oldLocs, ["FOREQ", "HINDQ"], 2, 1, 0);	
			bodyPartObj.chars = [{str:2, con:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "boar", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "boar", setBodyPartForDesc(bodyPart, oldLocs), "curly tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getBoar: "+bodyPart+" "+err);
	}
}

function getBull(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 4, 1, 0);	
			bodyPartObj.chars = [{str:2}];
			bodyPartObj.attacks.push({naturalHooves:{name:"Hooves", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d3+2", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "bull", bodyPart, "forelegs", "Hooves attack as a heavy cestus");
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 4, 1, 0);
			bodyPartObj.attacks.push({naturalGore:{name:"Gore", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d10", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "bull", bodyPart, "head", "");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 4, 1, 0);	
			bodyPartObj.attacks.push({naturalTrample:{name:"Trample", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d3+2", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.chars = [{str:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "bull", bodyPart, "hindlegs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hindqtr"], oldLocs, ["FOREQ", "HINDQ"], 4, 1, 0);	
			bodyPartObj.chars = [{str:4}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "bull", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> 1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "bull", setBodyPartForDesc(bodyPart, oldLocs), "flywhisk tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getBull: "+bodyPart+" "+err);
	}
}

function getDeer(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 1, 1, 0);	
			bodyPartObj.attacks.push({naturalHooves:{name:"Hooves", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d3+1", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "deer", bodyPart, "forelegs", "Hooves attack as a light cestus");
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 1, 1, 0);
			bodyPartObj.attacks.push({naturalButt:{name:"Butt", ap:5, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:10, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:1, current:1}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "deer", bodyPart, "head", "");			
			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 1, 1, 0);	
			bodyPartObj.attacks.push({naturalTrample:{name:"Trample", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d3+1", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "deer", bodyPart, "hindlegs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hindqtr"], oldLocs, ["FOREQ", "HINDQ"], 1, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "deer", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "deer", setBodyPartForDesc(bodyPart, oldLocs), "white tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getDeer: "+bodyPart+" "+err);
	}
}

function getDog(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 0, 1, 0);	
			bodyPartObj.attacks.push({naturalMut1:{name:"Claw", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "dog", bodyPart, "forelegs", "");		
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d8", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "dog", bodyPart, "head", "");
			bodyPartObj.bonusSkills=[{"Track by Smell":20}];
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 0, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "dog", bodyPart, "hindlegs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hindqtr"], oldLocs, ["FOREQ", "HINDQ"], 0, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "dog", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "dog", setBodyPartForDesc(bodyPart, oldLocs), "waggily tail", "The creature suffers a -20% penalty to any skill checks involving decieving an opponent.");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getDog: "+bodyPart+" "+err);
	}
}

function getCrocodile(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 5, 1, 0);
			bodyPartObj.attacks.push({naturalClaw:{name:"Claw", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "crocodile", bodyPart, "forelegs", "");
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 5, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d10", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "crocodile", bodyPart, "head", "");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 5, 1, 0);	
			bodyPartObj.bonusSkills=[{Jump:10}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "crocodile", bodyPart, "hindlegs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hindqtr"], oldLocs, ["FOREQ", "HINDQ"], 5, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "crocodile", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
//			window.alert("jsRQChaosbodyParts.getCrocodile 1: "+oldLocs.length+">"+oldLocs[0]+">"+oldLocs[1]);
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["tail"], oldLocs, ["TAIL"], 5, 1, 0);
			bodyPartObj.desc = setChaosSpecial(bodyType, "crocodile", setBodyPartForDesc(bodyPart, oldLocs), "tail", "");
			bodyPartObj.bonusSkills=[{Swim:20}];
			bodyPartObj.attacks.push({naturalTail:{name:"Tail Slap", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d8", ammo:0, sr:{base:4, current:4}}});
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getCrocodile: "+bodyPart+" "+err);
	}
}

function getEagle(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm" ){
			bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
			bodyPartObj.desc = "";		
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d8", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "eagle", bodyPart, "head", "");
			bodyPartObj.bonusSkills=[{"Spot Hidden":10}];
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rleg", "lleg"], oldLocs, ["R LEG", "L LEG"], 0, 1, 0);	
			bodyPartObj.attacks.push({naturalClaw:{name:"Claw", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "eagle", bodyPart, "legs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["chest", "abdom"], oldLocs, ["CHEST", "ABDOM"], 0, 1, 0);			
			bodyPartObj.desc = setChaosSpecial(bodyType, "eagle", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 0, 1, 0);
			bodyPartObj.desc = setChaosSpecial(bodyType, "eagle", setBodyPartForDesc(bodyPart, oldLocs), "wings", "The creature flies at 1.5 * Movement rate and may soar indefinately");		
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.bonusSkills=[{Tumbling:10}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "eagle", setBodyPartForDesc(bodyPart, oldLocs), "feathered tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getEagle: "+bodyPart+" "+err);
	}
}

function getHorse(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 2, 1, 0);
			bodyPartObj.attacks.push({naturalHooves:{name:"Hooves", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d3+2", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "horse", bodyPart, "forelegs", "Hooves attack as a heavy cestus");		
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 2, 1, 0);
			bodyPartObj.desc = setChaosSpecial(bodyType, "horse", bodyPart, "head", "The creature gets a 10% bonus to Spot Hidden rolls to find animal or vegetable objects.");
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 2, 1, 0);
			bodyPartObj.attacks.push({naturalTrample:{name:"Trample", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d3+2", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "horse", bodyPart, "hindlegs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hindqtr"], oldLocs, ["FOREQ", "HINDQ"], 2, 1, 0);	
			bodyPartObj.chars = [{con:4}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "horse", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "horse", setBodyPartForDesc(bodyPart, oldLocs), "stringy tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getHorse: "+bodyPart+" "+err);
	}
}

function getLion(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 2, 1, 0);
			bodyPartObj.chars = [{str:2}];
			bodyPartObj.attacks.push({naturalClaw:{name:"Claw", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "lion", bodyPart, "forelegs", "");		
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 4, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d10", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "lion", bodyPart, "head", "Note: Females have no mane and need to deduct 2 pts of armor from the head.");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 2, 1, 0);	
			bodyPartObj.attacks.push({naturalRake:{name:"Rake", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.bonusSkills=[{Jump:10}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "lion", bodyPart, "hindlegs", "Can only execute a rake attack against a prone opponent.");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hindqtr"], oldLocs, ["FOREQ", "HINDQ"], 2, 1, 0);	
			bodyPartObj.chars = [{con:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "lion", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "lion", setBodyPartForDesc(bodyPart, oldLocs), "tufted tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getLion: "+bodyPart+" "+err);
	}
}

function getRabbit(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 0, 1, 0);
			bodyPartObj.chars = [{str:-2}];
			bodyPartObj.attacks.push({naturalClaw:{name:"Claw", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "rabbit", bodyPart, "forelegs", "");		
		}else if(bodyPart == "head"){
			bodyPartObj.bonusSkills=[{Listen:20}];
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.desc = setChaosSpecial(bodyType, "lion", bodyPart, "head", "");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 0, 1, 0);	
			bodyPartObj.bonusSkills=[{Jump:20}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "rabbit", bodyPart, "hindlegs", "Can leap 20'");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hindqtr"], oldLocs, ["FOREQ", "HINDQ"], 0, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "rabbit", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "rabbit", setBodyPartForDesc(bodyPart, oldLocs), "cotton tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getRabbit: "+bodyPart+" "+err);
	}
}

function getRaven(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm" || bodyPart == "wing"){
			bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
			bodyPartObj.desc = "";				
		}else if(bodyPart == "head"){
			bodyPartObj.chars = [{pow:2}];
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d3", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "raven", bodyPart, "head", "");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rleg", "lleg"], oldLocs, ["R LEG", "L LEG"], 0, 1, 0);	
			bodyPartObj.attacks.push({naturalClaw:{name:"Claw", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "raven", bodyPart, "legs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["chest", "abdom"], oldLocs, ["CHEST", "ABDOM"], 0, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "raven", bodyPart, "body", "");
		}if(bodyPart == "wing"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rwing", "lwing"], oldLocs, ["R WNG", "L WNG"], 0, 1, 0);
			bodyPartObj.desc = setChaosSpecial(bodyType, "raven", setBodyPartForDesc(bodyPart, oldLocs), "wings", "The creature flies at 2 * Movement rate");		
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.bonusSkills=[{Tumbling:10}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "raven", setBodyPartForDesc(bodyPart, oldLocs), "black feathered tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getRaven: "+bodyPart+" "+err);
	}
}

function getGoat(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 2, 1, 0);	
			bodyPartObj.attacks.push({naturalHooves:{name:"Hooves", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d3+1", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "goat", bodyPart, "forelegs", "Hooves attack as a light cestus");
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 2, 1, 0);	
			bodyPartObj.attacks.push({naturalButt:{name:"Butt", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "goat", bodyPart, "head", "");
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 2, 1, 0);	
			bodyPartObj.bonusSkills=[{Climb:10}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "goat", bodyPart, "hindlegs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hindqtr"], oldLocs, ["FOREQ", "HINDQ"], 2, 1, 0);	
			bodyPartObj.chars = [{con:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "goat", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "goat", setBodyPartForDesc(bodyPart, oldLocs), "stub tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getGoate: "+bodyPart+" "+err);
	}
}

function getSpider(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(["s", "s", "a", "a"],["rfleg1", "lfleg1","rfleg2", "lfleg2"], oldLocs, ["RFOR1", "LFOR1", "RFOR2", "LFOR2"], 0, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "spider", bodyPart, "forelegs", "The creature can climb webs without becoming stuck.");
			bodyPartObj.bonusSkills=[{Climb:10}];
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "spider", bodyPart, "head", "");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(["s", "s", "a", "a"],["rhleg1", "lhleg1","rhleg2", "lhleg2"], oldLocs, ["RHND1", "LHND1", "RHND2", "LHND2"], 0, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "spider", bodyPart, "hindlegs", "The creature can climb webs without becoming stuck.");
			bodyPartObj.bonusSkills=[{Climb:10}];
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["thorax", "abdom"], oldLocs, ["THRX", "ABDOM"], 2, 1, 0);	
			bodyPartObj.desc = setChaosSpecial(bodyType, "spider", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "spider", setBodyPartForDesc(bodyPart, oldLocs), "web spinners", "The creature can create a web with a breaking strength equal to it's CON.  It cannot project the webs");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getSpider: "+bodyPart+" "+err);
	}
}

function getTiger(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 2, 1, 0);
			bodyPartObj.chars = [{str:2}];
			bodyPartObj.attacks.push({naturalClaw:{name:"Claw", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "tiger", bodyPart, "forelegs", "");
			bodyPartObj.bonusSkills=[{Swim:10}];
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 2, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d10", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "tiger", bodyPart, "head", "");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 2, 1, 0);	
			bodyPartObj.attacks.push({naturalRake:{name:"Rake", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"2d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.bonusSkills=[{Swim:10}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "tiger", bodyPart, "hindlegs", "Can only execute a rake attack against a prone opponent.");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hindqtr"], oldLocs, ["FOREQ", "HINDQ"], 2, 1, 0);	
			bodyPartObj.chars = [{str:4}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "tiger", bodyPart, "striped body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "tiger", setBodyPartForDesc(bodyPart, oldLocs), "striped tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getTiger: "+bodyPart+" "+err);
	}
}

function getSnake(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 0, 0);
			bodyPartObj.desc = "";
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:25, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d4", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "snake", bodyPart, "head", "A successful bite that penetrates armor injects blade venom of "+Math.floor(Math.random()*6)+ " potency.");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["body"], oldLocs, ["BODY"], 0, 1, 0);	
			bodyPartObj.chars = [{dex:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "ant", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail" || bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(["s", "r"],["tail", ""], oldLocs, ["TAIL", ""], 0, 1, 0);
			bodyPartObj.desc = setChaosSpecial(bodyType, "snake", setBodyPartForDesc(bodyPart, oldLocs), "sinuous tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getSnake: "+bodyPart+" "+err);
	}
}

function getWeasel(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 0, 1, 0);
			bodyPartObj.chars = [{str:-2}];
			bodyPartObj.attacks.push({naturalClaw:{name:"Claw", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "weasel", bodyPart, "forelegs", "");
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:25, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d4", ammo:0, sr:{base:4, current:4}}});
			bodyPartObj.desc = setChaosSpecial(bodyType, "weasel", bodyPart, "head", "A successful bite that penetrates armor drains 1d4 STR (blood) every round it stays attached to the victim.");			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 0, 1, 0);
			bodyPartObj.desc = setChaosSpecial(bodyType, "weasel", bodyPart, "hindlegs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hindqtr"], oldLocs, ["FOREQ", "HINDQ"], 0, 1, 0);	
			bodyPartObj.chars = [{dex:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "weasel", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["tail"], oldLocs, ["TAIL"], 0, 1, 0);
			bodyPartObj.bonusSkills=[{Tumbling:10}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "weasel", setBodyPartForDesc(bodyPart, oldLocs), "bushy tail", "The creature has a strong musky odor, opponents with scent abilities recievie +10 on skill checks to find the creature.");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getWeasel: "+bodyPart+" "+err);
	}
}

function getRat(bodyPart, bodyPartObj, oldLocs, bodyType, actions){
	try{
		var disease = "";
		if(bodyPart == "arm"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rfleg", "lfleg"], oldLocs, ["R FOR", "L FOR"], 0, 1, 0);
			bodyPartObj.chars = [{str:-2}];
			bodyPartObj.attacks = [{naturalClaw:{name:"Claw", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:4, current:4}}}];
			if(Math.floor(Math.random()*6)<4){
				disease = "If the Claw attack penetrates armor, the character has been exposed to "+getDisease()+".";
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "rat", bodyPart, "forelegs", disease);
		}else if(bodyPart == "head"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["head"], oldLocs, ["HEAD"], 0, 1, 0);
			bodyPartObj.attacks.push({naturalBite:{name:"Bite", ap:0, enc:0, attack:{base:25, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d4", ammo:0, sr:{base:4, current:4}}});if(Math.floor(Math.random()*6)<4){
				disease = "If the Bite attack penetrates armor, the character has been exposed to "+getDisease()+".";
			}
			bodyPartObj.desc = setChaosSpecial(bodyType, "rat", bodyPart, "head", disease);			
		}else if(bodyPart == "leg"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["rhleg", "lhleg"], oldLocs, ["R HND", "L HND"], 0, 1, 0);
			bodyPartObj.desc = setChaosSpecial(bodyType, "rat", bodyPart, "hindlegs", "");
		}else if(bodyPart == "torso"){
			bodyPartObj.hitLocs = getChaosHitLocations(actions,["foreqtr", "hindqtr"], oldLocs, ["FOREQ", "HINDQ"], 0, 1, 0);	
			bodyPartObj.chars = [{con:2}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "rat", bodyPart, "body", "");
		}else if(bodyPart == "wing"){
			if(oldLocs[0].indexOf("wing")> 1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r", "r"],["", ""], oldLocs, ["", ""], 0, 1, 0);
				bodyPartObj.desc = "Unexpectedly, the creature has no wings."
			}
		}else if(bodyPart == "tail"){
			if(oldLocs[0].indexOf("tail")> -1){
				bodyPartObj.hitLocs = getChaosHitLocations(["r"],[""], oldLocs, [""], 0, 1, 0);
			}
			bodyPartObj.bonusSkills=[{Tumbling:10}];
			bodyPartObj.desc = setChaosSpecial(bodyType, "rat", setBodyPartForDesc(bodyPart, oldLocs), "naked tail", "");	
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getRat: "+bodyPart+" "+err);
	}
}


function setBodyPartForDesc(bP, oL){
	try{
//		window.alert("jsRQChaosbodyParts.setBodyPartForDesc: "+bP +" "+oL[0]);
	if(oL[0] == ""){
		bP = "";
	}
//	window.alert("jsRQChaosbodyParts.setBodyPartForDesc: "+bP);
	return bP;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.setBodyPartForDesc: "+bodyPart+" "+err);
	}
}

function getPalette(palette){
	try{
		var skinColors = "";
		for(var p = 0; p < palette.length; p++){
			skinColors = skinColors + palette[p].name;
			if(p< palette.length -2){
				skinColors = skinColors +", ";
			}else if(p == palette.length -2){
				skinColors = skinColors +" and ";
			}
		}
		return skinColors;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getPalette: "+" "+err);
	}
}

function selectChaosColors(nColors){
	try{
		var colors=[];
		var newColor={};
		var dup = 0;
		var iter = 0;
		var rnd = Math.ceil(Math.random()*12);
		if(nColors == null || nColors == 0 || nColors == undefined){
			if(rnd < 7){
				nColors = 2;
			}else if(rnd < 10){
				nColors = 3;
			}else if(rnd < 12){
				nColors = 4
			}else{
				nColors = 5;
			}		}
		for(var c = 0; c < nColors; c++){
			newColor = {color:"#000000", name:"DefaultBlack", text:"#FFFFFF"};
			newColor = getChaosColor(); //
			for(var cc =0; cc < 10 && cc < colors.length; cc++){
				if(newColor.name == colors[cc].name){
					dup = 1;
				}
			}
			if(dup == 0){
				colors.push(newColor);
			}else{
				if(iter == 10){
					c = nColors+10;
//					window.alert("jsRQChaosbodyParts.selectChaosColors: "+"Too mnay chances! "+ colors.length + " " + c);
					break;
				}else{
					c--;
				}
			}
//			window.alert("jsRQChaosbodyParts.selectChaosColors: "+" "+ colors[c].name + " " + c);
			iter++;
			//dup =0;
		}

		return colors;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.selectChaosColors: "+" "+err);
	}
}

function getChaosColor(){
	try{
		var color = {color:"", name:"", text:""};
		var rnd = Math.floor(Math.random()*141);
		switch(rnd){
		case 0:
			color.color="#F0F8FF";
			color.name="Alice Blue";
			color.text = "#000000";
			break;
		case 1:
			color.color="#FAEBD7";
			color.name="Antique White";
			color.text = "#000000";
			break;
		case 2:
			color.color="#00FFFF";
			color.name="Aqua";
			color.text = "#000000";
			break;
		case 3:
			color.color="#7FFFD4";
			color.name="Aquamarine";
			color.text = "#000000";
			break;
		case 4:
			color.color="#F0FFFF";
			color.name="Azure";
			color.text = "#000000";
			break;
		case 5:
			color.color="#F5F5DC";
			color.name="Beige";
			color.text = "#000000";
			break;
		case 6:
			color.color="#FFE4C4";
			color.name="Bisque";
			color.text = "#000000";
			break;
		case 7:
			color.color="#000000";
			color.name="Black";
			color.text = "#FFFFFF";
			break;
		case 8:
			color.color="#FFEBCD";
			color.name="Blanched Almond";
			color.text = "#000000";
			break;
		case 9:
			color.color="#0000FF";
			color.name="Blue";
			color.text = "#FFFFFF";
			break;
		case 10:
			color.color="#8A2BE2";
			color.name="Blue Violet";
			color.text = "#FFFFFF";
			break;
		case 11:
			color.color="#A52A2A";
			color.name="Brown";
			color.text = "#FFFFFF";
			break;
		case 12:
			color.color="#DEB887";
			color.name="Burly Wood";
			color.text = "#FFFFFF";
			break;
		case 13:
			color.color="#5F9EA0";
			color.name="Cadet Blue";
			color.text = "#000000";
			break;
		case 14:
			color.color="#7FFF00";
			color.name="Chartreuse";
			color.text = "#000000";
			break;
		case 15:
			color.color="#D2691E";
			color.name="Chocolate";
			color.text = "#FFFFFF";
			break;
		case 16:
			color.color="#FF7F50";
			color.name="Coral";
			color.text = "#000000";
			break;
		case 17:
			color.color="#6495ED";
			color.name="Cornflower Blue";
			color.text = "#000000";
			break;
		case 18:
			color.color="#5F9EA0";
			color.name="Cadet Blue";
			color.text = "#000000";
			break;
		case 19:
			color.color="#FFF8DC";
			color.name="Cornsilk";
			color.text = "#000000";
			break;
		case 20:
			color.color="#DC143C";
			color.name="Crimson";
			color.text = "#FFFFFF";
			break;
		case 21:
			color.color="#00FFFF";
			color.name="Cyan";
			color.text = "#000000";
			break;
		case 22:
			color.color="#00008B";
			color.name="Dark Blue";
			color.text = "#FFFFFF";
			break;
		case 23:
			color.color="#008B8B";
			color.name="Dark Cyan";
			color.text = "#FFFFFF";
			break;
		case 24:
			color.color="#B8860B";
			color.name="Dark Golden Rod";
			color.text = "#FFFFFF";
			break;
		case 25:
			color.color="#A9A9A9";
			color.name="Dark Gray";
			color.text = "#FFFFFF";
			break;
		case 26:
			color.color="#006400";
			color.name="Dark Green";
			color.text = "#FFFFFF";
			break;
		case 27:
			color.color="#BDB76B";
			color.name="Dark Khaki";
			color.text = "#000000";
			break;
		case 28:
			color.color="#8B008B";
			color.name="Dark Magenta";
			color.text = "#FFFFFF";
			break;
		case 29:
			color.color="#556B2F";
			color.name="Dark Olive Green";
			color.text = "#FFFFFF";
			break;
		case 20:
			color.color="#FF8C00";
			color.name="Dark Orange";
			color.text = "#000000";
			break;
		case 31:
			color.color="#9932CC";
			color.name="Dark Orchid";
			color.text = "#000000";
			break;
		case 32:
			color.color="#8B0000";
			color.name="Dark Red";
			color.text = "#000000";
			break;
		case 33:
			color.color="#E9967A";
			color.name="Dark Salmon";
			color.text = "#000000";
			break;
		case 34:
			color.color="#8FBC8F";
			color.name="Dark Sea Green";
			color.text = "#FFFFFF";
			break;
		case 35:
			color.color="#483D8B";
			color.name="Dark Slate Blue";
			color.text = "#FFFFFF";
			break;
		case 36:
			color.color="#2F4F4F";
			color.name="Dark Slate Gray";
			color.text = "#FFFFFF";
			break;
		case 37:
			color.color="#00CED1";
			color.name="Dark Turquoise";
			color.text = "#000000";
			break;
		case 38:
			color.color="#9400D3";
			color.name="Dark Violet";
			color.text = "#FFFFFF";
			break;
		case 39:
			color.color="#FF1493";
			color.name="Deep Pink";
			color.text = "#000000";
			break;
		case 40:
			color.color="#00BFFF";
			color.name="Deep Sky Blue";
			color.text = "#000000";
			break;
		case 41:
			color.color="#696969";
			color.name="DimGray";
			color.text = "#FFFFFF";
			break;
		case 42:
			color.color="#1E90FF";
			color.name="Dodger Blue";
			color.text = "#FFFFFF";
			break;
		case 43:
			color.color="#B22222";
			color.name="Fire Brick";
			color.text = "#FFFFFF";
			break;
		case 44:
			color.color="#FFFAF0";
			color.name="Floral White";
			color.text = "#000000";
			break;
		case 45:
			color.color="#228B22";
			color.name="Forest Green";
			color.text = "#FFFFFF";
			break;
		case 46:
			color.color="#FF00FF";
			color.name="Fuchsia";
			color.text = "#000000";
			break;
		case 47:
			color.color="#DCDCDC";
			color.name="Gainsboro";
			color.text = "#000000";
			break;
		case 48:
			color.color="#F8F8FF";
			color.name="Ghost White";
			color.text = "#000000";
			break;
		case 49:
			color.color="#FFD700";
			color.name="Gold";
			color.text = "#000000";
			break;
		case 50:
			color.color="#DAA520";
			color.name="Golden Rod";
			color.text = "#FFFFFF";
			break;
		case 51:
			color.color="#808080";
			color.name="Gray";
			color.text = "#FFFFFF";
			break;
		case 52:
			color.color="#008000";
			color.name="Green";
			color.text = "#FFFFFF";
			break;
		case 53:
			color.color="#ADFF2F";
			color.name="Green Yellow";
			color.text = "#000000";
			break;
		case 54:
			color.color="#F0FFF0";
			color.name="Honey Dew";
			color.text = "#000000";
			break;
		case 55:
			color.color="#FF69B4";
			color.name="Hot Pink";
			color.text = "#000000";
			break;
		case 56:
			color.color="#CD5C5C";
			color.name="Indian Red";
			color.text = "#000000";
			break;
		case 57:
			color.color="#4B0082";
			color.name="Indigo";
			color.text = "#FFFFFF";
			break;
		case 58:
			color.color="#FFFFF0";
			color.name="Ivory";
			color.text = "#000000";
			break;
		case 59:
			color.color="#F0E68C";
			color.name="Khaki";
			color.text = "#000000";
			break;
		case 60:
			color.color="#E6E6FA";
			color.name="Lavender";
			color.text = "#000000";
			break;
		case 61:
			color.color="#FFF0F5";
			color.name="Lavender Blush";
			color.text = "#000000";
			break;
		case 62:
			color.color="#7CFC00";
			color.name="Lawn Green";
			color.text = "#000000";
			break;
		case 63:
			color.color="#FFFACD";
			color.name="Lemon Chiffon";
			color.text = "#000000";
			break;
		case 64:
			color.color="#ADD8E6";
			color.name="Light Blue";
			color.text = "#000000";
			break;
		case 65:
			color.color="#F08080";
			color.name="Light Coral";
			color.text = "#000000";
			break;
		case 66:
			color.color="#E0FFFF";
			color.name="Light Cyan";
			color.text = "#000000";
			break;
		case 67:
			color.color="#FAFAD2";
			color.name="Light Golden Rod Yellow";
			color.text = "#000000";
			break;
		case 68:
			color.color="#D3D3D3";
			color.name="Light Gray";
			color.text = "#000000";
			break;
		case 69:
			color.color="#90EE90";
			color.name="Light Green";
			color.text = "#000000";
			break;
		case 70:
			color.color="#FFB6C1";
			color.name="Light Pink";
			color.text = "#000000";
			break;
		case 71:
			color.color="#FFA07A";
			color.name="Light Salmon";
			color.text = "#000000";
			break;
		case 72:
			color.color="#20B2AA";
			color.name="Light Sea Green";
			color.text = "#000000";
			break;
		case 73:
			color.color="#87CEFA";
			color.name="Light Sky Blue";
			color.text = "#000000";
			break;
		case 74:
			color.color="#778899";
			color.name="Light Slate Gray";
			color.text = "#FFFFFF";
			break;
		case 75:
			color.color="#B0C4DE";
			color.name="Light Steel Blue";
			color.text = "#000000";
			break;
		case 76:
			color.color="#FFFFE0";
			color.name="Light Yellow";
			color.text = "#000000";
			break;
		case 77:
			color.color="#00FF00";
			color.name="Lime";
			color.text = "#000000";
			break;
		case 78:
			color.color="#32CD32";
			color.name="Lime Green";
			color.text = "#000000";
			break;
		case 79:
			color.color="#FAF0E6";
			color.name="Linen";
			color.text = "#000000";
			break;
		case 80:
			color.color="#FF00FF";
			color.name="Magenta";
			color.text = "#000000";
			break;
		case 81:
			color.color="#800000";
			color.name="Maroon";
			color.text = "#FFFFFF";
			break;
		case 82:
			color.color="#66CDAA";
			color.name="Medium Aqua Marine";
			color.text = "#000000";
			break;
		case 83:
			color.color="#0000CD";
			color.name="Medium Blue";
			color.text = "#FFFFFF";
			break;
		case 84:
			color.color="#BA55D3";
			color.name="Medium Orchid";
			color.text = "#000000";
			break;
		case 85:
			color.color="#9370DB";
			color.name="Medium Purple";
			color.text = "#000000";
			break;
		case 86:
			color.color="#3CB371";
			color.name="Medium Sea Green";
			color.text = "#000000";
			break;
		case 87:
			color.color="#7B68EE";
			color.name="Medium Slate Blue";
			color.text = "#000000";
			break;
		case 88:
			color.color="#00FA9A";
			color.name="Medium Spring Green";
			color.text = "#000000";
			break;
		case 89:
			color.color="#48D1CC";
			color.name="Medium Turquoise";
			color.text = "#000000";
			break;
		case 90:
			color.color="#C71585";
			color.name="Medium Violet Red";
			color.text = "#000000";
			break;
		case 91:
			color.color="#191970";
			color.name="Midnight Blue";
			color.text = "#FFFFFF";
			break;
		case 92:
			color.color="#F5FFFA";
			color.name="Mint Cream";
			color.text = "#000000";
			break;
		case 93:
			color.color="#FFE4E1";
			color.name="Misty Rose";
			color.text = "#000000";
			break;
		case 94:
			color.color="#FFE4B5";
			color.name="Moccasin";
			color.text = "#000000";
			break;
		case 95:
			color.color="#FFDEAD";
			color.name="Navajo White";
			color.text = "#000000";
			break;
		case 96:
			color.color="#000080";
			color.name="Navy";
			color.text = "#FFFFFF";
			break;
		case 97:
			color.color="#FDF5E6";
			color.name="Old Lace";
			color.text = "#000000";
			break;
		case 98:
			color.color="#808000";
			color.name="Olive";
			color.text = "#FFFFFF";
			break;
		case 99:
			color.color="#FFA500";
			color.name="Orange";
			color.text = "#000000";
			break;
		case 100:
			color.color="#FF4500";
			color.name="Orange Red";
			color.text = "#000000";
			break;
		case 101:
			color.color="#DA70D6";
			color.name="Orchid";
			color.text = "#000000";
			break;
		case 102:
			color.color="#EEE8AA";
			color.name="Pale Golden Rod";
			color.text = "#000000";
			break;
		case 103:
			color.color="#98FB98";
			color.name="Pale Green";
			color.text = "#000000";
			break;
		case 104:
			color.color="#AFEEEE";
			color.name="Pale Turquoise";
			color.text = "#000000";
			break;
		case 105:		
			color.color="#DB7093";
			color.name="Pale Violet Red";
			color.text = "#000000";
			break;
		case 106:
			color.color="#FFEFD5";
			color.name="Papaya Whip";
			color.text = "#000000";
			break;
		case 107:
			color.color="#FFDAB9";
			color.name="Peach Puff";
			color.text = "#000000";
			break;
		case 108:		
			color.color="#CD853F";
			color.name="Peru";
			color.text = "#000000";
			break;
		case 109:
			color.color="#FFC0CB";
			color.name="Pink";
			color.text = "#000000";
			break;
		case 110:
			color.color="#DDA0DD";
			color.name="Plum";
			color.text = "#000000";
			break;
		case 111:		
			color.color="#B0E0E6";
			color.name="Powder Blue";
			color.text = "#000000";
			break;
		case 112:
			color.color="#800080";
			color.name="Purple";
			color.text = "#FFFFFF";
			break;
		case 113:
			color.color="#663399";
			color.name="Rebecca Purple";
			color.text = "#FFFFFF";
			break;
		case 114:		
			color.color="#FF0000";
			color.name="Red";
			color.text = "#000000";
			break;
		case 115:
			color.color="#BC8F8F";
			color.name="Rosy Brown";
			color.text = "#000000";
			break;
		case 116:
			color.color="#4169E1";
			color.name="RoyalBlue";
			color.text = "#FFFFFF";
			break;
		case 117:		
			color.color="#8B4513";
			color.name="Saddle Brown";
			color.text = "#FFFFFF";
			break;
		case 118:
			color.color="#FA8072";
			color.name="Salmon";
			color.text = "#000000";
			break;
		case 119:
			color.color="#F4A460";
			color.name="Sandy Brown";
			color.text = "#FFFFFF";
			break;
		case 120:		
			color.color="#2E8B57";
			color.name="Sea Green";
			color.text = "#000000";
			break;
		case 121:
			color.color="#FFF5EE";
			color.name="Sea Shell";
			color.text = "#000000";
			break;
		case 122:
			color.color="#A0522D";
			color.name="Sienna";
			color.text = "#FFFFFF";
			break;
		case 123:		
			color.color="#C0C0C0";
			color.name="Silver";
			color.text = "#000000";
			break;
		case 124:
			color.color="#87CEEB";
			color.name="SkyBlue";
			color.text = "#000000";
			break;
		case 125:
			color.color="#6A5ACD";
			color.name="Slate Blue";
			color.text = "#000000";
			break;
		case 126:		
			color.color="#708090";
			color.name="Slate Gray";
			color.text = "#FFFFFF";
			break;
		case 127:
			color.color="#FFFAFA";
			color.name="Snow";
			color.text = "#000000";
			break;
		case 128:
			color.color="#00FF7F";
			color.name="Spring Green";
			color.text = "#000000";
			break;
		case 129:		
			color.color="#4682B4";
			color.name="Steel Blue";
			color.text = "#FFFFFF";
			break;
		case 130:
			color.color="#D2B48C";
			color.name="Tan";
			color.text = "#000000";
			break;
		case 131:
			color.color="#008080";
			color.name="Teal";
			color.text = "#000000";
			break;
		case 132:		
			color.color="#D8BFD8";
			color.name="Thistle";
			color.text = "#000000";
			break;
		case 133:
			color.color="#FF6347";
			color.name="Tomato";
			color.text = "#000000";
			break;
		case 134:
			color.color="#40E0D0";
			color.name="Turquoise";
			color.text = "#000000";
			break;
		case 135:		
			color.color="#EE82EE";
			color.name="Violet";
			color.text = "#000000";
			break;
		case 136:
			color.color="#F5DEB3";
			color.name="Wheat";
			color.text = "#000000";
			break;
		case 137:
			color.color="#FFFFFF";
			color.name="White";
			color.text = "#000000";
			break;
		case 138:		
			color.color="#F5F5F5";
			color.name="White Smoke";
			color.text = "#000000";
			break;
		case 139:
			color.color="#FFFF00";
			color.name="Yellow";
			color.text = "#000000";
			break;
		case 140:
			color.color="#9ACD32";
			color.name="Yellow Green";
			color.text = "#000000";
			break;
		default:
			color.color="#6B8E23";
			color.name="Olive Drab";
			color.text = "#FFFFFF";
			break;

		}
		
		return color;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.getChaosColors: "+" "+err);
	}
}

function thanatar(bodyPartObj, bodyType, nHead, rnd, actions){
	//replaces heads
	try{
		var bPO= {hitLocs:[], chars:[], attacks:[], bonusSkills:[], desc:""};
//		bPO = getAnt("head", bPO, [nHead], bodyType);
		var oldLocs = [nHead];
//		window.alert("jsRQChaosbodyParts.thanatar: 3hd - "+actions.length);
		if(rnd < 6 ){
			bPO	= getAnt("head", bPO, oldLocs, bodyType, actions);
		}else  if(rnd < 11 ){
			bPO	= getApe("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd <16){
			bPO	= getBat("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd <21){
			bPO	= getBear("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 26){
			bPO	= getBoar("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 31){
			bPO	= getBull("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 36){
			bPO	= getDeer("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 41){
			bPO	= getDog("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 46){
			bPO	= getCrocodile("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 51){
			bPO	= getEagle("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 56){
			bPO	= getHorse("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd <61){
			bPO	= getLion("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd <66){
			bPO	= getRabbit("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 71){
			bPO	= getRaven("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 76){
			bPO	= getGoat("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 81){
			bPO	= getSnake("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 85){
			bPO	= getSpider("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd < 91){
			bPO	= getTiger("head", bPO, oldLocs, bodyType, actions);
		}else if(rnd <95){
			bPO	= getWeasel("head", bPO, oldLocs, bodyType, actions);
		}else{
			bPO	= getRat("head", bPO, oldLocs, bodyType, actions);
		}

		for(var h = 0; h< bPO.hitLocs.length; h++){
			if(bPO.hitLocs[h].locationName == "head"){
//				window.alert("jsRQChaosbodyParts.thanatar: 3hd - "+bPO.hitLocs[h].armor);
				for(var i = 0; i< bodyPartObj.hitLocs.length; i++){
					if(bodyPartObj.hitLocs[i].locationName == nHead){
//						window.alert("jsRQChaosbodyParts.thanatar: 3hd (inner) - "+bodyPartObj.hitLocs[i].armor);
						bodyPartObj.hitLocs[i].armor = bPO.hitLocs[h].armor;
					}
				}
			}
		}
		for(var a =0; a < bPO.attacks.length; a++){
			bodyPartObj.attacks.push(bPO.attacks[a]);
		}
		for(var b =0; b < bPO.bonusSkills.length; b++){
			bodyPartObj.bonusSkills.push(bPO.bonusSkills[b]);
		}
		for(var c =0; c < bPO.chars.length; c++){
			bodyPartObj.chars.push(bPO.chars[c]);
		}
		if(nHead == "chead"){
			bodyPartObj.desc  = bodyPartObj.desc +"  "+bPO.desc.replace("head", "center head");
		}else if(nHead == "rhead"){
			bodyPartObj.desc  = bodyPartObj.desc +"  "+bPO.desc.replace("head", "right head");
		}else if(nHead == "lhead"){
			bodyPartObj.desc  = bodyPartObj.desc +"  "+bPO.desc.replace("head", "left head");
		}
		return bodyPartObj;
	}catch(err){
		window.alert("Error. jsRQChaosbodyParts.thantar: "+" "+err);
	}
}