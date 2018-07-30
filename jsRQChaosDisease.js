/**
 * 
 */
function getChaoticFeature(template){
	try{
		var chaos = "";
		var bodyPartObj = {hitLocs:[], chars:[], attacks:[], bonusSkills:[], desc:""};
		var tempBPO;
		var rnd = Math.floor(Math.random()*100);
		var palette = [];
		var skinColors = "";
		var powM = 0;
		if(template.hasOwnProperty("chaos")){
			powM = template.chaos;
		}else{
			powM = .1;
		}
		if(rnd <= Number(template.characteristics.pow.value.current)*powM || 1==1 ){
			rnd = Math.floor(Math.random()*1000);
			rnd  = 191;
			if(rnd < 5){
				chaos = "Acid Touch: Anything that the creature touches or touches the creature takes 1d2 damage";
			}else if(rnd < 7 ){
				chaos= " Acidic Skin: The creature exudes Acid from it's skin. Creatures it touches or which succeed in touching it take 1d4 acid damage";
			}else if(rnd < 9 ){
				chaos= "Albino: The creature's skin is dull white and it has red eyes. ";
				template.characteristics.con.value = setCharacteristicValue(template.characteristics.con.value, -2, getAlt(template.characteristics.con), template.name);
			}else if(rnd < 14 ){
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, -2);
			}else if(rnd < 19 ){
				chaos = "The creatures hide is thickly studded with metal nodules";
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 12);
			}else if(rnd < 24 ){
				chaos = "The creatures hide is studded with boney nodules";
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 2);
			}else if(rnd < 29 ){
				chaos = "The creatures hide is studded with boney nodules";
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 4);
			}else if(rnd < 34 ){
				chaos = "The creatures hide is thickly studded with boney nodules";
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 8);
			}else if(rnd < 54 ){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("arm", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 57 ){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("BiQuad", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 72 ){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("BatWings", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 74 ){
				rnd = Math.floor(Math.random()*6);
				if(rnd < 3){
					chaos = "The creature has a duck beak in place of it's mouth and nose." 
				}else if(rnd < 5){
					chaos = "The creature has a chicken beak in place of it's mouth and nose."
				}else if(rnd < 6){
					chaos = "The creature has a eagle beak in place of it's mouth and nose."
				}else{
					chaos = "The creature has a pelican beak in place of it's mouth and nose."
				}
			}else if(rnd < 78 ){
				chaos = "Berserker: The creature is capable of combat rages where it gains 2 HP per hit location and increases it's attack bonus by the value of it's parry and defense bonuses.  The creature cannot parry or use defense when enraged."
			}else if(rnd < 89 ){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("BeWeaponed", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
				template = updateNaturalWeapons(template, "Novice");
			}else if(rnd < 91 ){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("ears", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;				
			}else if(rnd < 98 ){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("BirdLegs", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;				
			}else if(rnd < 103 ){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("BirdTail", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 105){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("BisonHorns", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 109){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("Blood", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 112){
				rnd = Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6)+Math.ceil(Math.random()*6);
				rnd = rnd *100;
				chaos =  "Cutting open the creature's body reveals a "+rnd+"L gem inside.";
			}else if(rnd < 113){
				rnd = Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4);
				chaos =  "The creature's body is studded with "+rnd+" gems with an average value of "+Math.ceil(Math.random()*4)+"L apiece.";
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 2);
			}else if(rnd < 113){
				template.characteristics.dex.value = setCharacteristicValue(template.characteristics.dex.value, 2, getAlt(template.characteristics.dex), template.name);
				chaos = "The creature's bones have been replaced by catrilage, making it quite limber and dexterous."
			}else if(rnd < 122){
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 2);
				chaos = "The creature's (exo-)skeleton is made of brass.  It is immune to Electrical attacks."
			}else if(rnd < 125){
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 4);
				chaos = "The creature's (exo-)skeleton is made of iron.  Bludgeoning weapons do half damage."
			}else if(rnd < 130){
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 2);
				chaos = "The creature's (exo-)skeleton is made of stone."
			}else if(rnd < 132){
				chaos = "Bowling Ball Head.  The creature's head is a perfect sphere with two round eyes, a round mouth and no nose or ears.";
			}else if(rnd < 136){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("BreatheFire", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 138){
				chaos ="The creature has bulging eyes, like a frog.  It can see in the dark, but must subtract 10% from all attacks, parries and skill rolls in broad daylight.";
			}else if(rnd < 143){
				chaos = "The creature bursts into flames when killed.  Everyone within 1m takes 1d6 Fire damage to one hit location."
			}else if(rnd < 145){
				rnd = Math.ceil(Math.random()*6);
				if(rnd < 4){
					rnd = 2;
				}else if(rnd < 6){
					rnd = 3;
				}else{
					rnd = 4;
				}
				palette = selectChaosColors(rnd);
				var skinColors = "";
				for(var p = 0; p < palette.length; p++){
					skinColors = skinColors + palette[p].name;
					if(p< palette.length -2){
						skinColors = skinColors +", ";
					}else if(p == palette.length -2){
						skinColors = skinColors +" and ";
					}
				}
				template.body.skinColors = palette;
				chaos = "The creature's skin is camouflage patterned in "+skinColors+".  Creature must be nearly nude in order to benefit from camouflage.";
			}else if(rnd < 147){
				chaos = "The creature is covered with a hard carapace like a beetle";
				template.move.base = Math.ceil(template.move.base/4);
				template = updateMoveByLevel(template, template.move.base);
			}else if(rnd < 149){
				template.characteristics.cha.value = setCharacteristicValue(template.characteristics.cha.value, -2, getAlt(template.characteristics.cha), template.name);
			}else if(rnd < 151){
				template.characteristics.cha.value = setCharacteristicValue(template.characteristics.cha.value, 4, getAlt(template.characteristics.cha), template.name);
			}else if(rnd < 156){
				template.characteristics.cha.value = setCharacteristicValue(template.characteristics.cha.value, 6, getAlt(template.characteristics.cha), template.name);
			}else if(rnd < 161){
				chaos = "Charisn'tma. 	(Hat tip: Terry Pratchett) This creature s cursed with the opposite of charisma. Any other creature when encountering it for the first time must make use their INT to resist the creature's POW or attack it immediately. ";
			}else if(rnd < 168){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("ChickenWings", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd<175){
				if(hasBodyPart(["leg"], template.body.hitLocations)){
					tempBPO = Object.create(bodyPartObj);
					tempBPO = getBodyPart("ClovenHooves", template.body.type);
					template = updateTemplateBodyParts(template, tempBPO);
					chaos =  tempBPO.desc;
				}
			}else if(rnd < 177){

				palette = selectChaosColors(1);
				template.body.skinColors = palette;
				chaos = "The creature's skin is colored "+getPalette(palette)+".";				
			}else if(rnd < 179){
				palette = selectChaosColors(0);
				template.body.skinColors = palette;
				chaos = "The creature's skin is is a confusing pattern in "+getPalette(palette)+". The pattern acts like a Befuddlement spell against all viewers. Creature must be nearly nude in order to benefit from the confusion effect.";
			}else if(rnd < 181){
				template.characteristics.con.value = setCharacteristicValue(template.characteristics.con.value, -2, getAlt(template.characteristics.con), template.name);
			}else if(rnd < 184){
				template.characteristics.con.value = setCharacteristicValue(template.characteristics.con.value, 4, getAlt(template.characteristics.con), template.name);
			}else if(rnd < 187){
				template.characteristics.con.value = setCharacteristicValue(template.characteristics.con.value, 6, getAlt(template.characteristics.con), template.name);
			}else if(rnd < 189){
				template.characteristics.con.value = setCharacteristicValue(template.characteristics.con.value, 2, getAlt(template.characteristics.con), template.name);
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 1);
				chaos = "The creature's body is made of copper.  It is immune to electrical, acid and fire based attacks.";
			}else if(rnd < 191){
				rnd = Math.ceil(Math.random()*6);
				if(rnd < 5){
					chaos = "The creature has a crest like a rooster's comb on it's head.";
				}else{
					chaos = "The creature has a wattles like a turkey dangling from it's face.";
				}
			}else if(rnd < 192){
				rnd = Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4);
				tempBPO = Object.create(bodyPartObj);
				tempBPO.bonusSkills=[{Listen:20}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  "Crown of Ears.  The creature's head has "+rnd+" extra ears.";				
			}else if(rnd < 194){
				rnd = Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4);
				tempBPO = Object.create(bodyPartObj);
				tempBPO.bonusSkills=[{"Spot Hidden":20}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  "Crown of Eyestalks.  The creature's head has "+rnd+" eyestalks.";
			}else if(rnd < 195){
				rnd = Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4);
				tempBPO = Object.create(bodyPartObj);
				tempBPO.bonusSkills=[{"Singing":20}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  "Crown of Mouths.  The creature's head has "+rnd+" extra mouths.  It doesn't need backup singers.";
			}else if(rnd < 196){
				rnd = Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4);
				tempBPO = Object.create(bodyPartObj);
				tempBPO.bonusSkills=[{"Track by Smell":20}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  "Crown of Noses.  The creature's head has "+rnd+" extra noses.";
			}else if(rnd < 198){
				template.characteristics.dex.value = setCharacteristicValue(template.characteristics.dex.value, 2, getAlt(template.characteristics.dex), template.name);
				rnd = Math.ceil(Math.random()*4)+Math.ceil(Math.random()*4);
				chaos =  "Crown of Tentacles.  The creature's head has "+rnd+" tentacles growing from it.";			
			}else if(rnd < 200){
				chaos = "Cryokinesis.  The creature can cause extreme cold up to 25 feet away.  Treat as a Disruption spell, 1d3 damage + 1 point for every point of metal armor worn on the Hit Location.";
			}else if(rnd < 202){
				template.characteristics.con.value = setCharacteristicValue(template.characteristics.con.value, 3, getAlt(template.characteristics.con), template.name);
				template.characteristics.cha.value = setCharacteristicValue(template.characteristics.cha.value, 2, getAlt(template.characteristics.cha), template.name);
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 2);
				chaos = "Crystal Body.  The creature's body is made of translucent crystal. Takes double damage from sonic based attacks.";
			}else if(rnd <204){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.bonusSkills=[{"Spot Hidden":-40}, {"Spot Trap":-40}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "Cyclopoid. The creature has a single eye. Subtract 10% from all ranged attacks.";
			}else if(rnd < 206){
				chaos = "De-evolution.The creature causes mutants, demi-humans and humanoids to devolve towards the base creature. When first met treat as a POW vs POW attack, those failing to resist lose one mutation or racial ability until they are pure human.";
			}else if(rnd < 208){
				palette = [{color:"#141414", name:"Matte Black", text:"#FFFFFF"}];
				template.body.skinColors = palette;
				chaos = "The creature's skin is dead black, with black eyeballs.";
			}else if(rnd < 210){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.attacks=[{naturalGaze:{name:"Death Gaze", ap:0, enc:0, attack:{base:100, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"Death", ammo:0, sr:{base:1, current:1}}}];
				template = updateTemplateBodyParts(template, tempBPO);
			}else if(rnd < 212){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.attacks=[{naturalButt:{name:"Butt", ap:5, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:10, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:1, current:1}}}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "The creature has deer antlers.";
			}else if(rnd < 214){
				template.characteristics.dex.value = setCharacteristicValue(template.characteristics.dex.value, -2, getAlt(template.characteristics.dex), template.name);
			}else if(rnd < 217){
				template.characteristics.dex.value = setCharacteristicValue(template.characteristics.dex.value, 4, getAlt(template.characteristics.dex), template.name);
			}else if(rnd < 220){
				template.characteristics.dex.value = setCharacteristicValue(template.characteristics.dex.value, 6, getAlt(template.characteristics.dex), template.name);
			}else if(rnd < 224){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.bonusSkills=[{"Spot Hidden":-40}, {"Spot Trap":-40}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "Double Vision. The creature sees double. Subtract 40% from all ranged attacks and 10% from all melee attacks.";
			}else if(rnd < 228){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("DualMinds", template.body.type);
				chaos =  tempBPO.desc;
			}else if(rnd < 248){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("EagleWings", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 253){
				if(hasBodyPart(["arm"], template.body.hitLocations)){
					chaos = "Elastic Arms. The creature can double or halve the length of it's arms at will.";
				}
			}else if(rnd < 253){
				if(hasBodyPart(["leg"], template.body.hitLocations)){
					chaos = "Elastic Legs. The creature can double or halve the length of it's legs at will.";
				}
			}else if(rnd < 262){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.attacks=[{naturalMut1:{name:"Discharge, Electrical", ap:0, enc:0, attack:{base:10, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"3d6", ammo:0, sr:{base:1, current:1}}}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "The creature can discharge a bolt of lightning (40m Range) 3 times a day.";
			}else if(rnd < 264){
				chaos = "Emaciated.	The creature's body is thin and wasted.";
			}else if(rnd < 266){
				chaos = "Evil Eye.	The creature can cast a a 1pt Demoralize spell without draining POW.";
			}else if (rnd < 271){
				chaos = "When killed the creature explodes.  All other creatures within 5m take 1d6 points of damage to 1d3 random hit locations.";
			}else if(rnd < 276){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.bonusSkills=[{"Climb":20}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "The creature has extra joints in it's arms.";
			}else if(rnd < 281){
				if(hasBodyPart(["leg"], template.body.hitLocations)){
					tempBPO = Object.create(bodyPartObj);
					tempBPO.bonusSkills=[{"Climb":20}];
					template = updateTemplateBodyParts(template, tempBPO);
					chaos = "The creature has extra joints in it's legs.";
				}
			}else if(rnd < 283){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.bonusSkills=[{"Spot Hidden":20}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "The creature has bulging faceted eyes like an insect.";
			}else if(rnd < 288){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("FalconWings", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if (rnd < 290){
				chaos = "The creature is covered in feathers.";
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 1);
			}else if (rnd < 292){
				chaos = "The creature's face is covered by blank skin. Despite this the creature perceives everything normally.";
			}else if (rnd < 296){
				chaos = "The creature is subject to epileptic fits. When first wounded or first attempting to cast a spell in combat roll the creature must make a resistance test of the POW of the spell or damage received against it's current POW, if the creature fails it is incapacitated by a seizure.";
			}else if (rnd < 299){
				template.characteristics.cha.value = setCharacteristicValue(template.characteristics.cha.value, -4, getAlt(template.characteristics.cha), template.name);
				tempBPO = Object.create(bodyPartObj);
				tempBPO.attacks=[{naturalMut1:{name:"Butt", ap:0, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:1, current:1}}}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
				chaos = chaos + "Flaming Skull Face. 	The creature's head is a naked skull, wreathed in Flames. Butt and Gore attacks do an additonal 1d4 Fire damage.";
			}else if(rnd < 301){
				chaos = "The creature has a flat head. Convenient for placing drinks.";
			}else if(rnd < 306){
				if(hasBodyPart(["arm", "fleg"], template.body.hitLocations)){
					chaos = "Flying Squirrel Membranes. The creature has loose skin membranes like a flying squirrel and can glide long distances, if it is not wearing armor. If the player is from Minnesota, the creature can take off and fly acrobatically. cf. Rocky the Flying Squirrel.";
				}
			}else if(rnd < 308){
				chaos = "Force Field Generation. The creature generates a field which prevents physical intrusion within 5 feet of it.";
			}else if(rnd < 310){
				chaos = "The creature is covered in a furry hide.";
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 2);
			}else if(rnd < 314){
				chaos = "The creature ";
				var gas = "";
				var gas2 = "Creatures in the area of the gas must resist a Systemic Poison or ";
				rnd = Math.ceil(Math.random()*6);
				if(rnd < 3){
					gas = "stink gas";
					gas2 = gas2 + "be incapacitated retching for 2d4 rounds.  No attacks or defense allowed during that period.  Parry at 1/4 ability.";
				}else if(rnd < 5){
					gas = "poison gas";
					gas2 = gas2 + "take damage as per the rules.";
				}else{
					gas = "laughing gas";
					gas2 = gas2 + "be incapacitated laughing for 2d4 rounds.  Attacks, parries, defemse and skill use is at 1/2 ability during this time.";
				}
				rnd = Math.ceil(Math.random()*12);
				if(rnd < 7){
					chaos = chaos +"belches a cloud of "+gas+" from it's mouth.  "+gas2;
				}else if(rnd < 10){
					chaos = chaos +"jets a stream of "+gas+" from it's nose.  "+gas2;
				}else if(rnd < 12){
					chaos = chaos +"steams a cloud of "+gas+" from it's ears.  "+gas2;
				}else if(rnd < 12){
					chaos = chaos +"emits a cloud of "+gas+" from it's armpits.  "+gas2;
				}else if(rnd < 12){
					chaos = chaos +"emits a cloud of "+gas+" from it's feet.  "+gas2;
				}else{
					chaos = chaos +"breaks wind with a miasma of "+gas+" from it's anus.  "+gas2;
				}
			}else if(rnd < 319){
				template.characteristics.int.value = setCharacteristicValue(template.characteristics.int.value, 8, getAlt(template.characteristics.int), template.name);
				if(template.characteristics.int.value < 18){ template.characteristics.int.value=18;}
			}else if(rnd< 321){
//				window.alert("jsRQChaosDisease.getChaoticFeature: >"+template.characteristics.siz.value.base+"< "+template.characteristics.siz.nDice+" * "+ template.characteristics.siz.szDice+" "+template.characteristics.siz.mod);
				template.characteristics.siz.value = setCharacteristicValue(template.characteristics.siz.value, ((template.characteristics.siz.nDice * template.characteristics.siz.szDice)+template.characteristics.siz.mod), getAlt(template.characteristics.siz), template.name);
			}else if(rnd < 323){
				chaos = "The creature has gills on it's neck. It may breathe underwater, but must keep it's gills moist at all times.";
			}else if(rnd < 325){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.attacks=[{naturalButt:{name:"Butt", ap:5, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:10, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:1, current:1}}}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "The creature has goat horns.";
			}else if(rnd < 327){
				template.characteristics.con.value = setCharacteristicValue(template.characteristics.con.value, 2, getAlt(template.characteristics.con), template.name);
				template.characteristics.cha.value = setCharacteristicValue(template.characteristics.cha.value, 6, getAlt(template.characteristics.cha), template.name);
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 1);
				chaos = "The creature's body is made of gold.  It is immune to electrical, acid and fire based attacks.";
			}else if(rnd < 331){
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 2);
				template.characteristics.siz.value = setCharacteristicValue(template.characteristics.siz.value, 2 , getAlt(template.characteristics.siz), template.name);
				template.move.base = Math.ceil(template.move.base/2);
				template = updateMoveByLevel(template, template.move.base);
				chaos = "The creature is grotesquely obese and, if it has wings, cannot fly under it's own power.";
			}else if(rnd < 331){
				chaos = "The creature is covered in a hairy hide.";
			}else if(rnd < 346){
//				window.alert("jsRQChaosDisease.getChaoticfeature = head");
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("head", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 348){
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, -2);
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("Headless", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;	
			}else if(rnd < 350){
				template.characteristics.cha.value = setCharacteristicValue(template.characteristics.cha.value, -8, getAlt(template.characteristics.cha), template.name);
				chaos = "The creature is hideous, people are paralyzed by it's appearance. On the first round it appears, deduct 4 from it's initial strike rank.";
			}else if(rnd < 355){
				if(hasBodyPart(["leg"], template.body.hitLocations)){
					template.move.base = Math.ceil(template.move.base/2);
					template = updateMoveByLevel(template, template.move.base);
					tempBPO = Object.create(bodyPartObj);
					tempBPO = getBodyPart("Hopper", template.body.type);
					template = updateTemplateBodyParts(template, tempBPO);
					chaos =  tempBPO.desc;
				}
			}else if(rnd < 357){
				template.characteristics.str.value = setCharacteristicValue(template.characteristics.str.value, 2, getAlt(template.characteristics.str), template.name);
				template.characteristics.siz.value = setCharacteristicValue(template.characteristics.siz.value, -2, getAlt(template.characteristics.siz), template.name);
				if(hasBodyPart(["chest", "foreqtr"], template.body.hitLocations)){
					chaos = "The creature is hunchbacked.";
				}
			}else if(rnd < 365){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "arm", rnd);
				template = getNewBodyPart(template, "leg", rnd);
				template = getNewBodyPart(template, "torso", rnd);
			}else if(rnd < 373){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "arm", rnd);
				template = getNewBodyPart(template, "leg", rnd);
				template = getNewBodyPart(template, "tail", rnd);				
			}else if(rnd < 381){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "arm", rnd);
				template = getNewBodyPart(template, "leg", rnd);
				template = getNewBodyPart(template, "wing", rnd);				
			}else if(rnd < 389){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "arm", rnd);
				template = getNewBodyPart(template, "tail", rnd);
				template = getNewBodyPart(template, "torso", rnd);				
			}else if(rnd < 397){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "arm", rnd);
				template = getNewBodyPart(template, "tail", rnd);
				template = getNewBodyPart(template, "wing", rnd);				
			}else if(rnd < 405){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "arm", rnd);
				template = getNewBodyPart(template, "torso", rnd);
				template = getNewBodyPart(template, "wing", rnd);				
			}else if(rnd < 413){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "head", rnd);
				template = getNewBodyPart(template, "arm", rnd);
				template = getNewBodyPart(template, "leg", rnd);				
			}else if(rnd < 421){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "head", rnd);
				template = getNewBodyPart(template, "arm", rnd);
				template = getNewBodyPart(template, "tail", rnd);				
			}else if(rnd < 430){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "head", rnd);
				template = getNewBodyPart(template, "arm", rnd);
				template = getNewBodyPart(template, "torso", rnd);				
			}else if(rnd < 438){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "head", rnd);
				template = getNewBodyPart(template, "arm ", rnd);
				template = getNewBodyPart(template, "wing", rnd);				
			}else if(rnd < 446){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "head", rnd);
				template = getNewBodyPart(template, "leg", rnd);
				template = getNewBodyPart(template, "tail", rnd);				
			}else if(rnd < 455){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "head", rnd);
				template = getNewBodyPart(template, "leg", rnd);
				template = getNewBodyPart(template, "torso", rnd);				
			}else if(rnd < 463){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "head", rnd);
				template = getNewBodyPart(template, "leg", rnd);
				template = getNewBodyPart(template, "wing", rnd);				
			}else if(rnd < 471){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "head", rnd);
				template = getNewBodyPart(template, "tail", rnd);
				template = getNewBodyPart(template, "torso", rnd);				
			}else if(rnd < 480){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "head", rnd);
				template = getNewBodyPart(template, "tail", rnd);
				template = getNewBodyPart(template, "wing", rnd);				
			}else if(rnd < 488){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "head", rnd);
				template = getNewBodyPart(template, "torso", rnd);
				template = getNewBodyPart(template, "wing", rnd);				
			}else if(rnd < 496){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "leg", rnd);
				template = getNewBodyPart(template, "tail", rnd);
				template = getNewBodyPart(template, "torso", rnd);				
			}else if(rnd < 504){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "leg", rnd);
				template = getNewBodyPart(template, "tail", rnd);
				template = getNewBodyPart(template, "wing", rnd);				
			}else if(rnd < 512){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "leg", rnd);
				template = getNewBodyPart(template, "tail", rnd);
				template = getNewBodyPart(template, "torso", rnd);				
			}else if(rnd < 520){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "wing", rnd);
				template = getNewBodyPart(template, "tail", rnd);
				template = getNewBodyPart(template, "torso", rnd);				
			}else if(rnd < 522){
				chaos = "Hypnotic Gaze.	The creature can cast a a 1pt Harmonize spell without draining POW.";
			}else if(rnd < 524){
				palette = selectChaosColors(0);
				template.body.skinColors = palette;
				chaos = "The creature's skin is  a hypnotic pattern in "+getPalette(palette)+". The pattern acts like a Harmonize spell against all viewers. Creature must be nearly nude in order to benefit from the hypnotic effect.";
			}else if(rnd < 526){
				chaos = "Illusion Generation.	The creature can generate a full sensory Illusion for 10 rounds without draining POW, maintaining the illiusion longer drains 1pt per round.";
			}else if(rnd < 528){
				chaos = "Illusionary Appearance.	The creature appears as a non-descript member of the same race as the observer.";
			}else if(rnd < 535){
				template.sr.delta = 2;
			}else if(rnd < 540){
				template.sr.delta = -2;
			}else if(rnd < 542){
				template.characteristics.int.value = setCharacteristicValue(template.characteristics.int.value, -2, getAlt(template.characteristics.int), template.name);
			}else if(rnd < 545){
				template.characteristics.int.value = setCharacteristicValue(template.characteristics.int.value, 2, getAlt(template.characteristics.int), template.name);
			}else if(rnd < 548){
				template.characteristics.int.value = setCharacteristicValue(template.characteristics.int.value, 4, getAlt(template.characteristics.int), template.name);
			}else if(rnd < 552){
				chaos = "The creature is naturally invisible, as per the spell.";
			}else if(rnd < 554){
				template.characteristics.str.value = setCharacteristicValue(template.characteristics.str.value, 2, getAlt(template.characteristics.str), template.name);
				template.characteristics.dex.value = setCharacteristicValue(template.characteristics.dex.value, -2, getAlt(template.characteristics.dex), template.name);
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 6);
				chaos = "The creature's body is made of iron. Immune to electrical and fire attacks."
			}else if(rnd < 559){
				chaos = "The creature has an irrational fear of "+getIrrationalObject()+".";
			}else if(rnd < 564){
				chaos = "The creature has an irrational hatred of "+getIrrationalObject()+" and may attack them on sight.";
			}else if(rnd < 564){
				if(hasBodyPart(["leg"], template.body.hitLocations)){
					chaos = "The creature has the ability to leap up to 10m.";
				}
			}else if(rnd < 589){
				rnd = Math.floor(Math.random()*100);
				template = getNewBodyPart(template, "leg", rnd);				
			}else if(rnd < 592){
				chaos = "The creature can levitate itself and any additional items, including other creatures, up to it's maximum encumbrance.";
			}else if(rnd < 598){
				chaos = "The creature's eyes emit beams of light illuminating the area up to 18m in the direction it is looking.  Note that other creatures can see the light sources from twice that distance.";
			}else if(rnd < 600){
				chaos = "The creature has a mane like a lion.";
			}else if(rnd < 610){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("LizardTail", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 615){
				template.sr.delta = -2;
				tempBPO = Object.create(bodyPartObj);
				tempBPO.bonusSkills=[{Climb:20}];
				template = updateTemplateBodyParts(template, tempBPO);
				if(hasBodyPart(["arm"], template.body.hitLocations)){
					chaos = "The creature has improbably long arms, enabling it to attack opponents up to 2m away.";
				}
			}else if(rnd < 615){
				template.move.base = Math.ceil(template.move.base*2);
				template = updateMoveByLevel(template, template.move.base);
				if(hasBodyPart(["leg"], template.body.hitLocations)){
					chaos = "The creature has improbably long legs.";
				}
			}else if(rnd < 620){
				template.sr.delta = -1;
				chaos = "The creature has an improbably long neck, enabling it to make Butt, Bite and Gore attacks against opponents up to 2m away.";
			}else if(rnd < 624){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.bonusSkills=[{"Track by Smell":20}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "The creature has an comically big nose.";
			}else if(rnd < 626){
				if(hasBodyPart(["head"], template.body.hitLocations)){
					template.characteristics.int.value = setCharacteristicValue(template.characteristics.int.value, 4, getAlt(template.characteristics.int), template.name);
					chaos = "Macrocephalic. The creature has huge head.";
				}
			}else if(rnd < 628){
				chaos = "The creature has complete control of the magnetic fields within 3m.  It can do fine manipulation of ferrous objects with than area.  Attempting to wrench an iron object of out of an opponent's hand requires a resistance test matching the creature's POW against the opponenet's STR.";
			}else if(rnd < 629){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("Mannikin", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 634){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("MechanicalWings", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 636){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("JetWings", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 638){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("B17Wings", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				palette = [{color:"#6B8E23",name:"Olive Drab", text : "#FFFFFF"}];
				template.body.skinColors = palette;
				chaos =  tempBPO.desc;
			}else if(rnd < 643){
				chaos = "Mental Block. The creature incapable of perceiving "+getIrrationalObject()+" and will be completely baffled by being attacked (fights as if blind) or by anyone else interacting with them.";
			}else if(rnd < 645){
				if(hasBodyPart(["head"], template.body.hitLocations)){
					template.characteristics.int.value = setCharacteristicValue(template.characteristics.int.value, -4, getAlt(template.characteristics.int), template.name);
					chaos = "Microcephalic. The creature has very tiny head, treat as if continuously Befuddled.";
				}
			}else if(rnd < 647){
				chaos = "Molecular Disruption.	The creature can cast a a 1pt Disruption spell without draining POW.";
			}else if(rnd < 652){
				template.characteristics.int.value = setCharacteristicValue(template.characteristics.int.value, -8, getAlt(template.characteristics.int), template.name);
				chaos = "The creature is stuck on stupid, treat as if continuously Befuddled.";
			}else if(rnd < 657){
				chaos = "Slow.";
				template.move.base = Math.ceil(template.move.base/2);
				template = updateMoveByLevel(template, template.move.base);
			}else if(rnd < 662){
				chaos = "Fast.";
				template.move.base = Math.ceil(template.move.base*1.5);
				template = updateMoveByLevel(template, template.move.base);
			}else if(rnd < 667){
				chaos = "Ludicrously Fast.";
				template.move.base = Math.ceil(template.move.base*2);
				template = updateMoveByLevel(template, template.move.base);
			}else if(rnd < 672){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("MultipleArms", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 682){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("MultipleLegs", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 686){
				if(hasBodyPart(["head"], template.body.hitLocations)){
					chaos = "Near sighted.	The creature is near sighted and suffers a -20% penalty on ranged attacks.  Any ranged attacks past the second range increment are at random targets.";
				}
			}else if(rnd < 688){
				if(hasBodyPart(["head"], template.body.hitLocations)){
					tempBPO = Object.create(bodyPartObj);
					tempBPO.bonusSkills=[{Listen:-20}];
					template = updateTemplateBodyParts(template, tempBPO);
					chaos = "The creature has no ears.";
				}
			}else if(rnd < 689){
				if(hasBodyPart(["head"], template.body.hitLocations)){
					tempBPO = Object.create(bodyPartObj);
					tempBPO.bonusSkills=[{Listen:-10}, {"Spot Hidden":-20}, {"Spot Traps":-10}];
					template = updateTemplateBodyParts(template, tempBPO);
					chaos = "The creature has no neck and cannot turn it's head.";
				}
			}else if(rnd < 692){
				if(hasBodyPart(["head"], template.body.hitLocations)){
					chaos = "The creature has no nose.";
				}
			}else if(rnd < 694){
				template.characteristics.cha.value = setCharacteristicValue(template.characteristics.cha.value, -4, getAlt(template.characteristics.cha), template.name);
				chaos = "The creature has no skin. The veins, organs and muscles are clearly visible and it constantly leaves a trail of slime and gore. Attacks penetrating armor do 1 additional point of damage to the creature.";
			}else if(rnd < 696){
				chaos = "The creature exudes a greasy, flammable oil from it's skin.  it receives a +10% bonus to skill checks involving navigating tight places or escaping bonds.";
			}else if(rnd < 701){
				if(hasBodyPart(["arm"], template.body.hitLocations)){
					rnd = Math.floor(Math.random()*6);
					if(rnd < 5){
						chaos = "The creature's dominant arm is massively overgrown.  The creature does +2 points damage with all melee weapons";					
					}else{
						chaos = "The creature's off hand arm is massively overgrown.  The creature does +2 points damage with all two handed melee weapons";
					}
				}
			}else if(rnd < 706){
				if(hasBodyPart(["leg"], template.body.hitLocations)){
					tempBPO = Object.create(bodyPartObj);
					tempBPO.attacks=[{naturalButt:{name:"Kick", ap:5, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:10, current:0, prof:0}, damage:"1d6", ammo:0, sr:{base:1, current:1}}}];
					template = updateTemplateBodyParts(template, tempBPO);
					template.move.base = Math.ceil(template.move.base*.75);
					template = updateMoveByLevel(template, template.move.base);
					chaos = "The creature has one leg that is massively overgrown.";
				}
			}else if(rnd < 708){
				palette = selectChaosColors(0);
				template.body.skinColors = palette;
				chaos = "The creature's skin is";
				rnd = Math.floor(Math.random()*6);
				if(rnd < 4){
					chaos = chaos + " striped ";
				}else if(rnd < 6){
					chaos = chaos + " spotted ";
				}else{
					chaos = chaos + " pinto patterned ";
				}
				chaos = chaos + "in "+getPalette(palette)+".";
			}else if(rnd < 714){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("PeacockTail", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 718){
				chaos = "Plague Bearer. Anyone approaching withn 5m of the creature has been exposed to "+getDisease()+".";
			}else if(rnd < 720){
				chaos = "Planar Traveller.  The creature's body automatically and instantaeously adapts to all environmental conditions, making it immune to poison, electrical, acid, fire and other elemental attacks.  Weapons still work.";
			}else if(rnd < 720){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("PointyHead", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				template.characteristics.int.value = setCharacteristicValue(template.characteristics.int.value, -2, getAlt(template.characteristics.int), template.name);
				chaos =  tempBPO.desc;
			}else if(rnd < 726){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.attacks=[{naturalButt:{name:"Bite", ap:5, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:10, current:0, prof:0}, damage:"Poison", ammo:0, sr:{base:1, current:1}}}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "The creature's bite injects Poison like a snake's.";
			}else if(rnd < 730){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.attacks=[{naturalButt:{name:"Touch", ap:5, enc:0, attack:{base:30, current:0, prof:0}, parry:{base:10, current:0, prof:0}, damage:"Poison", ammo:0, sr:{base:1, current:1}}}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "The creature's very touch smears Poison equivalant to Poison Gas on it's opponent.";
			}else if(rnd < 735){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("PoorDualMinds", template.body.type);
				chaos =  tempBPO.desc;
			}else if(rnd < 737){
				template.defense.delta = 10;
				chaos = "The creature knows the future before it happens. All characters must declare (but not resolve) their actions before the mutant.";
			}else if(rnd < 749){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("PrehensileTail", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 749){
				template.characteristics.siz.value.base = Math.ceil(Math.random()*2)+Math.ceil(Math.random()*2)+1;
				template.characteristics.siz.value.current = template.characteristics.siz.value.base;
				chaos = "Fun sized "+template.name+".";
			}else if(rnd < 751){
				chaos = "Pyrokinesis.  The creature can cause fires up to 25 feet away.  Treat as attacking with a torch, 1d4 Damage.";
			}else if(rnd < 753){
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 2);
				chaos = "The creature is covered with quills.  Attackers using weapons less than 0.5m in length will automatically suffer a free counter attack against the hit location holding their weapon as they attempt to penetrate the creature's spikey coat.  Quills 15% Atk 1d2 Damage.";
			}else if(rnd < 755){
				chaos = "The creature radiates cold.  Attackers in melee suffer 1pt damage per hit location during each round of combat, unless protected by warm clothing."
			}else if(rnd < 758){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("RamsHorns", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 768){
				template = getNewBodyPart(template, "tail", 99);
			}else if(rnd < 768){
				if(hasBodyPart(["head"], template.body.hitLocations)){
					chaos = "Rearranged Facial Features. The creature's facial features are swapped into different positions on it's skull, leading to a bizarre appearance, but no other effect.";
				}
			}else if(rnd < 773){
				chaos = "The creature regenerates "+Math.floor(template.characteristics.con.value.base/6)+" hitpoint(s) per hit location per round.";
			}else if(rnd < 775){
				chaos = "The creature generates a repulsive field to a distance of "+Math.floor(template.characteristics.pow.value.base/4)+"m.  Opponents must succeed at a STR vs POW resistence test in order to penerate the field.";
			}else if(rnd < 777){
				template.characteristics.cha.value.base = setCharacteristicValue(template.characteristics.cha.value, -2, getAlt(template.characteristics.cha), template.name);
				chaos = "The creature's flesh is rotting away like a zombie's.";
			}else if(rnd < 779){
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 2);
				chaos = "The creature is covered reticulated scales.";
			}else if(rnd < 794){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("ScorpionTail", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 804){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("SeagullWings", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 809){
				template.sr.delta = 2;
				if(hasBodyPart(["arm"], template.body.hitLocations)){
					chaos = "The creature's arms become T Rex like in their puniness.  It may only use weapons one handed weapons.";
				}
			}else if(rnd < 814){
				if(hasBodyPart(["leg"], template.body.hitLocations)){
					chaos = "The creature has very short legs.";
					template.move.base = Math.ceil(template.move.base/2);
					template = updateMoveByLevel(template, template.move.base);
				}
			}else if(rnd < 819){
				if(hasBodyPart(["arm"], template.body.hitLocations)){
					rnd = Math.floor(Math.random()*8);
					chaos = "The creature's ";
					if(rnd <6){
						chaos = chaos + "right";
					}else{
						chaos = chaos + "left";
					}
					chaos = chaos +" arm is shriveled.  It can not use two handed weapons, off hand weapons or a shield with it.";
				}
			}else if(rnd < 824){
				if(hasBodyPart(["leg"], template.body.hitLocations)){
					rnd = Math.floor(Math.random()*8);
					chaos = "The creature's ";
					if(rnd <6){
						chaos = chaos + "right";
					}else{
						chaos = chaos + "left";
					}
					chaos = chaos +" leg is shriveled.  It mus use a crutch or other support to stand and move.";
				}
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, -2);			
			}else if(rnd < 826){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("SiameseTwins", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				template.characteristics.con.value = setCharacteristicValue(template.characteristics.con.value, 2, getAlt(template.characteristics.con), template.name);
				chaos =  tempBPO.desc;
			}else if(rnd < 830){
				template.characteristics.cha.value = setCharacteristicValue(template.characteristics.cha.value, -4, getAlt(template.characteristics.cha), template.name);
				chaos = "The creature speaks in an extremely silly voice.";
			}else if(rnd < 834){
				template.sr.delta = -2;
				chaos = "The creature walks or otherwise perambulates in an extremely silly manner.  Attackers are too bemused by it's erratic movements to react quickly.";
			}else if(rnd < 836){
				if(hasBodyPart(["head"], template.body.hitLocations)){
					chaos = "The creature's head is a naked skull.";
				}
			}else if(rnd < 840){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.attacks=[{naturalSonic:{name:"Sonic", ap:0, enc:0, attack:{base:10, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"Shatter", ammo:0, sr:{base:1, current:1}}}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "The creature can shatter 10 cubic feet of glass, 5 cubic feet of stone or 1 cubic foot of metal with the sound it makes.";
			}else if(rnd < 849){
				chaos = "Spell Absorbtion.  The creature has a permanent 1 pt Absorbtion effect.";
			}else if(rnd < 853){
				chaos = "Spell Absorbtion.  The creature has a permanent 2 pt Absorbtion effect.";
			}else if(rnd < 856){
				chaos = "Spell Absorbtion.  The creature has a permanent 3 pt Absorbtion effect.";
			}else if(rnd < 858){
				chaos = "Spell Absorbtion.  The creature has a permanent 4 pt Absorbtion effect.";
			}else if(rnd < 865){
				chaos = "Spell Reflection.  The creature has a permanent 1 pt Reflection effect.";
			}else if(rnd < 869){
				chaos = "Spell Reflection.  The creature has a permanent 2 pt Reflection effect.";
			}else if(rnd < 873){
				chaos = "Spell Reflection.  The creature has a permanent 3 pt Reflection effect.";
			}else if(rnd < 875){
				chaos = "Spell Reflection.  The creature has a permanent 1 pt Reflection effect.";
			}else if(rnd < 879){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.attacks=[{naturalBite:{name:"Spit Acid", ap:0, enc:0, attack:{base:10, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"1d4", ammo:0, sr:{base:1, current:1}}}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "The creature can spit acid for 1d4 damage for 2 rounds.";
			}else if(rnd < 882){
				chaos = "Spirit Shield.  The creature has a permanent 1 pt Spirit Shield effect.";
			}else if(rnd < 889){
				chaos = "Spirit Shield.  The creature has a permanent 2 pt Spirit Shield effect.";
			}else if(rnd < 894){
				chaos = "Spirit Shield.  The creature has a permanent 3 pt Spirit Shield effect.";
			}else if(rnd < 898){
				tempBPO = Object.create(bodyPartObj);
				tempBPO.attacks=[{naturalStench:{name:"Stench", ap:5, enc:0, attack:{base:-1, current:0, prof:0}, parry:{base:-1, current:0, prof:0}, damage:"Poison Gas", ammo:0, sr:{base:1, current:1}}}];
				template = updateTemplateBodyParts(template, tempBPO);
				chaos = "The creature produces a hideous stench equivalent to Poison Gas.";
			}else if(rnd < 900){
				template.characteristics.con.value = setCharacteristicValue(template.characteristics.con.value, 2, getAlt(template.characteristics.con), template.name);
				template.characteristics.str.value = setCharacteristicValue(template.characteristics.str.value, 2, getAlt(template.characteristics.str), template.name);
				template.characteristics.dex.value = setCharacteristicValue(template.characteristics.dex.value, -2, getAlt(template.characteristics.dex), template.name);
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 4);
				chaos = "The creature's body is made of stone.";
			}else if(rnd < 902){
				template.characteristics.str.value = setCharacteristicValue(template.characteristics.str.value, -2, getAlt(template.characteristics.str), template.name);
			}else if(rnd < 905){
				template.characteristics.str.value = setCharacteristicValue(template.characteristics.str.value, 4, getAlt(template.characteristics.str), template.name);
			}else if(rnd < 909){
				template.characteristics.str.value = setCharacteristicValue(template.characteristics.str.value, 6, getAlt(template.characteristics.str), template.name);
			}else if(rnd < 911){
				template.defense.delta = 10;
				chaos = "The creature is surrounded by a swirling cloud of flies.";
			}else if(rnd < 931){
				template = getNewBodyPart(template, "tail", rnd);
			}else if(rnd < 936){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("TailSnake", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 938){
				chaos = "The creature is capable of Telekinesis similar to the Orlanthi Rune spell.  Unlike the Rune spell, the creatue must use a point of POW for each point of SIZ it wishes to move.";
			}else if(rnd < 940){
				rnd = Math.floor(Math.random()*100);
				chaos = "The creature is a Telepath."
				if(rnd < 50){
					chaos = chaos + "  It can read one creature's mind per round or communicate with Mindspeech with a single creature.";
				}else{
					chaos = chaos + "  The creature broadcasts it's thoughts to all creatures within 10 feet, possibly giving opponents an advantage. This broadcast floods any Mindspeech links that the opponent has open.";
				}
			}else if(rnd < 942){
				chaos = "The creature is capable of Telepotation similar to the Orlanthi Rune spell.  Unlike the Rune spell, the creatue must use a point of POW for each 10 meters it wishes to move.";
			}else if(rnd < 944){
				chaos = "The creature can control it's existence in the time stream, fading out and returning at will.   No time passes for the creature while it is absent from the time stream.";
			}else if(rnd < 946){
				chaos = "The creature intermittently fades from the time stream.  Each round roll a d6. On a 1, the creature fades out and returns 5 rounds later in the same location; on a 2 the creature fades out and returns 4 rounds later.  No time passes for the creature while it is absent from the time stream.";
			}else if(rnd < 959){
				if(hasBodyPart(["arm"], template.body.hitLocations)){
					template.characteristics.str.value = setCharacteristicValue(template.characteristics.str.value, -2, getAlt(template.characteristics.str), template.name);
					template.characteristics.dex.value = setCharacteristicValue(template.characteristics.dex.value, 2, getAlt(template.characteristics.dex), template.name);
					tempBPO = Object.create(bodyPartObj);
					tempBPO = getBodyPart("Tentacles4Arms", template.body.type);
					template = updateTemplateBodyParts(template, tempBPO);
					chaos =  tempBPO.desc;
				}
			}else if(rnd < 961){
				chaos = "The creature has a Third Eye. The Third Eye provides a continuous effect of Detect Life, Detect Enemies and Detect Spirit for the creature.";
			}else if(rnd < 963){
				var te = {};
				for(var wpns in template.equipment){
					if(wpns.substring(0,7)=="natural"){
						te[wpns] = template.equipment[wpns];
					}
				}
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("ThreeHeads", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				for(var wpns in te){
						 template.equipment[wpns] = te[wpns];
						 template.equipment.keys.push(wpns);
				}
				chaos =  tempBPO.desc;
			}else if(rnd < 973){
				template = getNewBodyPart(template, "torso", rnd);
			}else if(rnd < 975){
				template.characteristics.cha.value = setCharacteristicValue(template.characteristics.cha.value, -4, getAlt(template.characteristics.cha), template.name);
				chaos = "The creature has a transparent skin, the veins, organs and muscles are clearly visible.";
			}else if(rnd < 977){
				var te = {};
				for(var wpns in template.equipment){
					if(wpns.substring(0,7)=="natural"){
						te[wpns] = template.equipment[wpns];
					}
				}
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("TwoHeads", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				for(var wpns in te){
						 template.equipment[wpns] = te[wpns];
						 template.equipment.keys.push(wpns);
				}
				chaos =  tempBPO.desc;
			}else if(rnd < 979){
				chaos = "The creature has a continuous Detection Blank effect.";
			}else if(rnd < 989){
				tempBPO = Object.create(bodyPartObj);
				tempBPO = getBodyPart("VultureWings", template.body.type);
				template = updateTemplateBodyParts(template, tempBPO);
				chaos =  tempBPO.desc;
			}else if(rnd < 991){
				template.characteristics.cha.value = setCharacteristicValue(template.characteristics.cha.value, -2, getAlt(template.characteristics.cha), template.name);
				template.body.hitLocations = setNaturalArmor(template.body.hitLocations, 1);
				chaos = "The creature is covered by a tough, warty skin.";
			}else if(rnd < 993){
				template.characteristics.pow.value = setCharacteristicValue(template.characteristics.pow.value, -2, getAlt(template.characteristics.pow), template.name);
			}else if(rnd < 996){
				template.characteristics.pow.value = setCharacteristicValue(template.characteristics.pow.value, 4, getAlt(template.characteristics.pow), template.name);
			}else if(rnd < 999){
				template.characteristics.pow.value = setCharacteristicValue(template.characteristics.pow.value, 6, getAlt(template.characteristics.pow), template.name);
			}else{
				chaos = "Wreathed in Flames: The creature's body is wreathed in flames. Attackers with weapons less rhan on meter in length take 1d4 fire damage every round";
			}
			if(template.hasOwnProperty("special")){
				template.special = template.special + " <br/>"+chaos;
			}else{
				template.special = chaos;
			}
		}
		
		
		return template;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.getChaoticfeature "+err);
	}
}

function updateTemplateBodyParts(template, bpo){
	try{
		//{part:"", creature:"", change1:{from:"", to:"", label:""}, change2:{from:"", to:"", label:""}, chars:{str:0, con:0, siz:0, int:0, pow:0, dex:0, cha:0}, attack:{shield:1, melee:0, missile:0, natural:0}, desc:""};
		if(bpo.hasOwnProperty("hitLocs")){
			//remove natural attacks based on body parts being exchanged
			template = updateHitLocations(template, bpo.hitLocs);
//			window.alert("jsRQChaosDisease.updateTemplateBodyPart "+bpo.hitLocs[0].label+">"+bpo.hitLocs[1].label);
		}
		if(bpo.hasOwnProperty("chars")){
			for(var i = 0; i < bpo.chars.length; i++){
				template.characteristics = updateChaosChars(template.characteristics, bpo.chars[i]);
			}
		}
		if(bpo.hasOwnProperty("attacks")){
			for(var i = 0; i < bpo.attacks.length; i++){
				template.equipment = updateChaosEquipment(template.equipment, bpo.attacks[i]);
			}
		}
		if(template.skills.hasOwnProperty("bonusSkills")){
			for(var i = 0; i < bpo.bonusSkills.length; i++){
				template.skills.bonusSkills.push(bpo.bonusSkills[i]);
			}
		}else if(bpo.hasOwnProperty("bonusSkills")){
			template.skills.bonusSkills = bpo.bonusSkills;
		}
		//window.alert("jsRQChaosDisease.updateTemplateBodyPart "+template.body.hitLocations[5].armor.natural);
		return template;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.updateTemplateBodyPart "+err);
	}
}

function setChaosSpecial(shape, critter, oldLoc, newLoc, subClause){
	try{
//		window.alert("jsRQChaosSpecial "+shape+" "+critter+" <"+oldLoc+"> "+newLoc+" "+subClause);
		var desc = "The ";
		if(oldLoc == "arm"){
			if(shape == "Humanoid" || shape == "Walktapi"){
				desc = desc +"arms have";
			}else if(shape == "Quadruped" || shape == "Basilisk"){
				desc = desc +"forelegs have";
			}
		}else if(oldLoc == "head"){
			desc = desc +"head has ";
		}else if(oldLoc == "leg"){
			if(shape == "Humanoid" || shape == "Walktapi"){
				desc = desc +"legs have";
			}else if(shape == "Quadruped" || shape == "Basilisk"){
				desc = desc +"hindlegs have";
			}
		}else if(oldLoc == "torso"){
			if(shape == "Humanoid" || shape == "Walktapi"){
				desc = desc +"torso has";
			}else if(shape == "Quadruped" || shape == "Basilisk"){
				desc = desc +"body has";
			}
		}else if(oldLoc == "tail"){
			if(shape == "Humanoid" || shape == "Walktapi"){
				desc = desc +"tail has";
			}else if(shape == "Quadruped" || shape == "Basilisk"){
				desc = desc +"tail has";
			}
		}else if(oldLoc == "wing"){
			if(shape == "Humanoid" || shape == "Walktapi"){
				desc = desc +"wings have";
			}else if(shape == "Quadruped" || shape == "Basilisk"){
				desc = desc +"wings have";
			}
		}
		if(desc == "The "  ){
			desc = "The creature has the " + newLoc+" of "+setAnA(critter)+" "+critter+".  "+subClause;
		}else{
//			window.alert("jsRQChaosDisease.setChaosSpecial <"+oldLoc+">");
			desc = desc + " been replaced by the " + newLoc+" of "+setAnA(critter)+" "+critter+".  "+subClause;
		}
		return desc;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.setChaosSpecial "+err);
	}
}

function setAnA(nextWord){
	try{
		var fL = nextWord.substring(0,1);
		var AnA = "a";
		if(fL == "a" ||fL == "e" ||fL == "i" ||fL == "o" ||fL == "u" ||fL == "y" ){
			AnA = "an";
		}
		return AnA;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.setAnA "+err);
	}
}

function updateChaosEquipment(e, equipObj){
	try{
		var updt = 0;
		var keyAry = Object.keys(equipObj);
		for(var w =0; w < e.keys.length; w++){
			if(equipObj[keyAry[0]].name ==e[e.keys[w]].name){
				e[e.keys[w]] = equipObj[keyAry[0]];
				updt = 1;
//				window.alert("jsRQChaosDisease.updateChaosEquipment "+equipObj[keyAry[0]].name+"  "+e[e.keys[w]].name);

			}
		}

		if(typeof equipObj[keyAry[0]] === 'object' && updt == 0){
			e[keyAry[0]] = equipObj[keyAry[0]];
			e.keys.push(keyAry[0]);
//			window.alert("jsRQChaosDisease.updateChaosEquipment "+keyAry[0]+"  "+typeof e[keyAry[0]]);
		}else if(updt == 0){
			for(var w =0; w < e.keys.length; w++){
				if(e.keys[w] == keyAry[0]){
					e.keys.splice(w,1);
				}
			}
		}
		return e;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.updateChaosEquipment "+err);
	}
}

function updateChaosChars(chars, charObj){
	try{
		var keyAry = Object.keys(charObj);
		//		template.characteristics.dex.value.current = template.characteristics.dex.value.base;
		for(var c in chars){
			if(c == keyAry[0]){
//				window.alert("jsRQChaosDisease.updateChaoChars "+c+" "+keyAry[0] +chars[c].value.base+" "+charObj[keyAry[0]]);
				chars[c].value = setCharacteristicValue(chars[c].value,charObj[keyAry[0]], getAlt(chars[c]), template.name);
			}
		}
		return chars;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.updateChaosChars "+err);
	}
}

function updateHitLocations(template, changeHL){
	try{
		//{action:"s", locations:["rarm","rfleg","rwing"], locationName:"rarm",label:"R ARM", armor:{natural:5}, hp:{base:1, current:0}, hidden:0}
		//{location:"rarm", label:"R ARM", roll:"07-08",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0},
		var swap = 0;
		var added = 0;
		var hl = template.body.hitLocations;
		for(var i = 0; i < changeHL.length; i++){
//			window.alert("jsRQChaosDisease.updateHitLocations  1a: "+i+" " + changeHL[i].label+" "+ changeHL[i].locations.length +" "+changeHL[i].action);
			if(changeHL[i].action == "s" && changeHL[i].label !== undefined){
				changeHL[i].swapped = 0;
				for(var j = 0; j < hl.length; j++){
//					window.alert("jsRQChaosDisease.updateHitLocations  1b: "+i+" "+j);
					for(var k = 0; k < changeHL[i].locations.length; k++){
//						window.alert("jsRQChaosDisease.updateHitLocations  1c: "+i+" "+j+" "+k+" Current Loc "+hl[j].location+"  Poss Loc "+changeHL[i].locations[k]+" Swap="+swap);
						if(hl[j].location == changeHL[i].locations[k] && swap == 0 && changeHL[i].swapped == 0){
							//find template equipment with loc == hl[j].hitlocation
							template.equipment = updateChaosTemplateEquipment(template.equipment, hl[j].location);
//							window.alert("jsRQChaosDisease.updateHitLocations  2a: " + hl[j].label+" "+hl[j].location+ " ");
							hl[j].location = changeHL[i].locationName;
							hl[j].label = changeHL[i].label;
							hl[j].armor.natural = changeHL[i].armor;
							hl[j].armor.current = changeHL[i].armor;
							hl[j].hp.base = changeHL[i].hp;
							hl[j].hidden = changeHL[i].hidden;
//							window.alert("jsRQChaosDisease.updateHitLocations  2b: " + hl[j].label+" "+ hl[j].location+" ");
							swap = 1;
							changeHL[i].swapped = 1;
//						}else{
//							window.alert("jsRQChaosDisease.updateHitLocations  3:" + changeHL[i].label+" "+ hl[j].location +" "+ changeHL[i].locations[k]+" "+changeHL[i].swapped);
						}
					}
					swap=0;
				}
				for(var k = 0; k < changeHL[i].locations.length; k++){
//					window.alert("jsRQChaosDisease.updateHitLocations  4: " + changeHL[i].locationName+" "+changeHL[i].swapped);
					if(changeHL[i].swapped == 0){
						hl = addHitLocations(template, locTmplt, changeHL[i], hl);
					}
				}
			}else if(changeHL[i].action == "r"  && changeHL[i].label !== undefined){
				for(var j = 0; j < hl.length; j++){
					for(var k = 0; k < changeHL[i].locations.length; k++){
						if(hl[j].location == changeHL[i].locations[k]){
//							window.alert("jsRQChaosDisease.updateHitLocations  5:" + changeHL[i].label+" "+ hl[j].location +" "+ changeHL[i].locations[k]);
							template.equipment = updateChaosTemplateEquipment(template.equipment, hl[j].location);
							hl.splice(j, 1);
							swap = 2;
	 					}
					}
					//if(swap == 0){//add}
				}
			}else if(changeHL[i].action == "a"  && changeHL[i].label !== undefined){
				added = 0;
				var locTmplt = {location:"", label:"", roll:"00-00",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0};
				locTmplt.location = changeHL[i].locationName;
				locTmplt.label = changeHL[i].label;
				locTmplt.armor.natural = changeHL[i].armor;
				locTmplt.armor.current = changeHL[i].armor;
				locTmplt.hp.base = changeHL[i].hp;
				locTmplt.hidden = changeHL[i].hidden;
//				window.alert("jsRQChaosDisease.updateHitLocations  6: " + locTmplt.location+" "+locTmplt.label);

				var parsed = [];
				for(var j = 0; j < hl.length; j++){
					if((locTmplt.location == hl[j].location || locTmplt.location.substr(0, locTmplt.location.length-1) == hl[j].location.substr(0, hl[j].location.length-1) ) && swap == 0){
						parsed = hl[j].roll.split("-");
						locTmplt.roll=parsed[0]+"-"+parsed[0];
						hl.splice(j+1, 0, locTmplt);
//						window.alert("jsRQChaosDisease.updateHitLocations  7: " + locTmplt.location+" "+ hl[j].location);
						added = 1;
						swap = 1;
						j = hl.length;
					}
//					window.alert("jsRQChaosDisease.updateHitLocations  8: " + locTmplt.location+" ");
					swap=0;
				}
			}
//			window.alert("jsRQChaosDisease.updateHitLocations  9:" + changeHL[i].label+" "+ changeHL[i].action +" "+ changeHL[i].locations[k]+" "+swap+" "+added);
			if(added ==0 && changeHL[i].action == "a" ){
				if(swap == 0){
					for(var j = 0; j < hl.length; j++){
						for(var k = 0; k < changeHL[i].locations.length; k++){
//							window.alert("jsRQChaosDisease.updateHitLocations  9b: " + locTmplt.location+" ");
							if(hl[j].location == changeHL[i].locations[k] && swap == 0){
								parsed = hl[j].roll.split("-");
								locTmplt.roll=parsed[0]+"-"+parsed[0];
								hl.splice(j+1, 0, locTmplt);
//								window.alert("jsRQChaosDisease.updateHitLocations  10: " + locTmplt.location+" "+ hl[j].location);
								added = 1;
								swap = 1;
							}
						}
					}
				}

			}
		}
		
		if(swap == 2 || added == 1){
			hl = recalcHLRolls(hl);
		}
		template.body.hitLocations = hl;
		return template;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.updateHitLocations "+err);
	}
}

function addHitLocations(template, locTmplt, changeHL, hl){
	try{
		var added = 0;
		var swap = 0;
		var locTmplt = {location:"", label:"", roll:"00-00",armor:{natural:0, current:0, inner:{ap:0, enc:0, silent:0, subType:""},outer:{ap:0, enc:0, silent:0, subType:""}}, hp:{base:1, current:0}, hidden:0};
		locTmplt.location = changeHL.locationName;
		locTmplt.label = changeHL.label;
		locTmplt.armor.natural = changeHL.armor;
		locTmplt.armor.current = changeHL.armor;
		locTmplt.hp.base = changeHL.hp;
		locTmplt.hidden = changeHL.hidden;
//		window.alert("jsRQChaosDisease.addHitLocations  1: " + locTmplt.location+" " +changeHL.locationName);

		var parsed = [];
		for(var j = 0; j < hl.length; j++){
			if((locTmplt.location.indexOf("wing") >0 &&  hl[j].location == "chest" || hl[j].location == "foreqtr") && swap == 0){
				parsed = hl[j].roll.split("-");
				locTmplt.roll=parsed[0]+"-"+parsed[0];
				hl.splice(j+1, 0, locTmplt);
//				window.alert("jsRQChaosDisease.addHitLocations  2: " + locTmplt.location+" "+ hl[j].location);
				added = 1;
				swap = 1;
				j = hl.length +10;
			}
//			window.alert("jsRQChaosDisease.addHitLocations  3: " + locTmplt.location+" "+ hl[j].location);
			swap=0;
		}
	return hl;	
	}catch(err){
		window.alert("Error: jsRQChaosDisease.addHitLocations "+err);
	}
}

function updateChaosTemplateEquipment(equip, loc){
	try{
		var keys = Object.keys(equip);
		for(var k in keys){
			if(keys[k] !== "keys" && equip[keys[k]].hasOwnProperty("loc") && equip[keys[k]].loc == loc){
//				window.alert("jsRQChaosDisease.updateChaosTemplateEquipment "+keys[k]);
				delete equip[keys[k]];
				for(var n = 0; n <equip.keys.length; n++){
					if(equip.keys[n]==keys[k]){
						equip.keys.splice(n, 1);
					}
				}
			}
		}
		return equip;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.updateChaosTemplateEquipment "+err);
	}
}

function recalcHLRolls(hl){
	try{
		var total=0;
		var parsed=[];
		var keys = [];
		var subTot = 0;
		var zeroRoll = 0;
		var txt = "";
		for(var h = 0; h < hl.length; h++){
			if(hl[h].hidden ==0){
				parsed = hl[h].roll.split("-");
				if(parsed.length > 1){
					subTot =Number(parsed[1])-Number(parsed[0])+1;
					if(subTot == 1){
						zeroRoll++;
						keys.push({location:[hl[h].location], range: 0, start:Number(parsed[0])});
					}else{
						keys.push({location:[hl[h].location], range: subTot, start:Number(parsed[0])});
					}
				}else{
					subTot = 1;
					keys.push({location:[hl[h].location], range: subTot, start:Number(hl[h].roll)});
				}
				total = total + subTot;
//				window.alert("jsRQChaosDisease.recalcHLRolls "+hl[h].roll+" "+total);
			}
		}
		total = 20 -total;
		//Sort by number of rolls ber hit location
		
		var sortBP = []
		sortBP = sortAryOfObjects(keys, "range");
		txt = txt + "\n"+zeroRoll;
		//Add extra rolls to each hit location
		if(zeroRoll == 0){
			sortBP.reverse();
			for(var r = 0; r <= total; r++){
				for(var d = 0; d < sortBP.length; d++){
					if(r <= total){
						sortBP[d].range++;
						r++;
					}
				}
			}
			
		}else{
			//take one point from each of the largest for each 0 value
			var xp = 0;
			var bigRange =0
			//sortBP is top down
			for(var r = 0; r <= zeroRoll; r++){
				for(var d = 0; d < sortBP.length; d++){
					if(bigRange == 0){
						bigRange = sortBP[d].range;
					}
					if(r < zeroRoll){
						sortBP[d].range--;
						xp++;
						r++;
					}else if(bigRange == sortBP[d].range){
						sortBP[d].range--;
						xp++;
//						txt = txt + sortBP[d].location+" "+sortBP[d].range+" "+sortBP[d].start+"\n";
					}
				}
			}
			sortBP.reverse();
			for(var r = 0; r < xp; r++){
				for(var d = 0; d < sortBP.length; d++){
					if(r < xp){
						sortBP[d].range++;
						r++;
//						txt = txt + sortBP[d].location+" "+sortBP[d].range+" "+sortBP[d].start+"\n";
					}
				}
			}

		}
		sortBP = sortAryOfObjects(sortBP, "start");
		sortBP.reverse();
		var nextStart = 1;
		var nsStr = "1";
		var end = 0;
		var endStr = "0";
		for(var d = 0; d < sortBP.length; d++){
			end = nextStart+sortBP[d].range-1;
			if(end > 20){end = 20;}
			endStr = String(end);
			if(endStr.length < 2){
				endStr = "0"+endStr;
			}
			nsStr = String(nextStart);
			if(nsStr.length < 2){
				nsStr = "0"+nsStr;
			}
			for(var h = 0; h < hl.length; h++){
				if(hl[h].location == sortBP[d].location){
					if(end > nextStart){
						hl[h].roll = nsStr+"-"+endStr;
					}else{
						hl[h].roll = nsStr;
					}
				}
			}
			txt = txt + sortBP[d].location+" "+sortBP[d].range+" "+sortBP[d].start+"  >   "+nsStr+"-"+endStr+"\n";
			nextStart = end +1;
		}
//		window.alert("jsRQChaosDisease.recalcHLRolls Sorted"+txt);
//		window.alert("jsRQChaosDisease.recalcHLRolls "+total);
		return hl;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.recalcHLRolls "+err);
	}
}

function sortAryOfObjects(ary, prop){
	try{
		var txt = "";
		var sortBP = []
		var insert = 0;
		for(var k = 0; k < ary.length; k++){
			if(sortBP.length == 0){
				sortBP[0]=ary[k];
			}else{
				for(var i = 0; i < sortBP.length; i++){
//					txt = txt + keys[k].range+sortBP[i].range+" > "+keys[k].location+" "+sortBP[i].location+"\n";
					if(ary[k][prop] > sortBP[i][prop] && insert == 0){
						if(i == 0){
							sortBP.unshift(ary[k]);
							insert = 1;
						}else{
							sortBP.splice(i, 0,ary[k]);
							insert = 1;
						}
					}
				}
				if(insert == 0 ){
					sortBP.push(ary[k]);
				}else{
					insert = 0;
				}
			}
		}
		return sortBP;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.sortAryOfObjects "+err);
	}
}


function getChaosHitLocations(acts,newLocs, oldLocs, newLabels, natAC, hpBase, hid){
	//{action:act, locationName:"rfleg", locations:["rfleg","rarm","rwing"], label:"R FOR", armor:{natural:5}, hp:{base:1, current:0}, hidden:0}
	try{
		var hLObj = {action:"", locationName:"", locations:[], label:"", armor:0, hp:0, hidden:0};
		var hlAry = [];
//		window.alert("jsRQChaosDisease.getChaosHitLocations 1: "+oldLocs[0]+">"+" "+acts.length);
		for(var i = 0; i < acts.length; i++){
			var nHLObj = Object.create(hLObj); 
//			window.alert("jsRQChaosDisease.getChaosHitLocations 2: "+i+" "+oldLocs[i]+">"+newLocs[i]+" "+acts.length);
			nHLObj.action = acts[i];
			nHLObj.locationName = newLocs[i];
			nHLObj.locations = oldLocs;
			nHLObj.label = newLabels[i];
			nHLObj.armor = natAC;
			nHLObj.hp = hpBase;
			nHLObj.hidden = hid;
			hlAry.push(nHLObj);
//			window.alert("jsRQChaosDisease.getChaosHitLocations 3: "+i+" "+nHLObj.label+" "+acts.length);
		}
//		window.alert("jsRQChaosDisease.getChaosHitLocations: "+hlAry[0].locations[0]+" "+hlAry[1].locations[0])
		return hlAry;
	}catch(err){
		window.alert("Error. jsRQChaosDisease.getChaosHitLocations: "+err);
	}
}



function setNaturalArmor(hitLocations, deltaNAC){
	try{
		for(var hl =0; hl<hitLocations.length; hl++){
			  if(hitLocations[hl].location !== "abdom2"){
				hitLocations[hl].armor.natural = hitLocations[hl].armor.natural + deltaNAC;
				if(hitLocations[hl].armor.natural < 0){hitLocations[hl].armor.natural = 0;}
			  	hitLocations[hl].armor.current = hitLocations[hl].armor.current +deltaNAC;
				if(hitLocations[hl].armor.current < 0){hitLocations[hl].armor.current = 0;}
			  }
		  }
		return hitLocations;
	}catch(err){
		window.alert("Error.  jsRQChaosDisease.setNaturalArmor "+err);
	}
}

function setCharacteristicValue(charValueObj, delta, alt, name){
	try{
		var explvls = getExperienceLevels(name);
//		window.alert(charValueObj.current);
		for(var el = 3; el < explvls.length; el++){
			charValueObj[explvls[el]] = charValueObj[explvls[el]] + delta;
			if(charValueObj[explvls[el]] < 1){charValueObj[explvls[el]]=1;}
			if(alt !== 1){
				charValueObj.alt[explvls[el]] = charValueObj.alt[explvls[el]] + delta;}
		}
		return charValueObj;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.setCharacteristicValue "+err);
	}
}

function getAlt(charObj){
	try{
		var alt = 1;
		if(charObj.hasOwnProperty("alt")){alt = charObj.alt;}
		return alt;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.getAlt "+err);
	}
}


function getMoveByLeg(desc, base){
	try{
		if(desc.indexOf(" bat.")>-1 || desc.indexOf(" crocodile.")>-1 ){
			base = Math.ceil(base/2);
		}else if(desc.indexOf(" boar.")>-1 || desc.indexOf(" bull.")>-1){
			base = Math.ceil(base * 1.25);
		}else if(desc.indexOf(" deer.")>-1 || desc.indexOf(" horse.")>-1){
			base = Math.ceil(base * 2);
		}else if(desc.indexOf(" eagle.")>-1 || desc.indexOf(" raven.")>-1){
			base = Math.ceil(base/4);
		}else if(desc.indexOf(" has no legs.")>-1){
			base = 0;		
		}
		return base;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.getMoveByLeg "+err);
	}
}

function getIrrationalObject(){
	try{
		var rnd = Math.floor(Math.random()*54);
		var obj = "";
		switch(rnd){
		case 0:
			obj = "baboons"; break;
		case 1:
			obj = "bearwalkers"; break;
		case 2:
			obj = "broo"; break;
		case 3:
			obj = "crested dragonewts"; break;
		case 4:
			obj = "beaked dragonewts"; break;
		case 5:
			obj = "tailed priest dragonewts"; break;
		case 6:
			obj = "dryads"; break;
		case 7:
			obj = "ducks"; break;
		case 8:
			obj = "dwarves"; break;
		case 9:
			obj = "elves"; break;
		case 10:
			obj = "gargoyles"; break;
		case 11:
			obj = "ghouls"; break;
		case 12:
			obj = "giants"; break;
		case 13:
			obj = "minotaurs"; break;
		case 14:
			obj = "morokanth"; break;
		case 15:
			obj = "newtlings"; break;
		case 16:
			obj = "pixies"; break;
		case 17:
			obj = "runners"; break;
		case 18:
			obj = "tiger sons"; break;
		case 19:
			obj = "cave trolls"; break;
		case 20:
			obj = "dark trolls"; break;
		case 21:
			obj = "mistress race trolls"; break;
		case 22:
			obj = "great trolls"; break;
		case 23:
			obj = "trollkin"; break;
		case 24:
			obj = "tusk brothers"; break;
		case 25:
			obj = "tusk riders"; break;
		case 26:
			obj = "vampires"; break;
		case 27:
			obj = "wind children"; break;
		case 28:
			obj = "wolf brothers"; break;
		case 29:
			obj = "females of it's own species"; break;
		case 30:
			obj = "females of any species"; break;
		case 31:
			obj = "males of it's own species"; break;
		case 32:
			obj = "males of any species"; break;
		case 33:
			obj = "ants"; break;
		case 34:
			obj = "apes"; break;
		case 35:
			obj = "bats"; break;
		case 36:
			obj = "bears"; break;
		case 37:
			obj = "boar"; break;
		case 38:
			obj = "deer"; break;
		case 39:
			obj = "dogs"; break;
		case 40:
			obj = "crocodiless"; break;
		case 41:
			obj = "bulls"; break;
		case 42:
			obj = "eagles"; break;
		case 43:
			obj = "horses"; break;
		case 44:
			obj = "lions"; break;
		case 45:
			obj = "rabbits"; break;
		case 46:
			obj = "ravens"; break;
		case 47:
			obj = "goats"; break;
		case 48:
			obj = "tigers"; break;
		case 49:
			obj = "spiders"; break;
		case 50:
			obj = "snakes"; break;
		case 51:
			obj = "weasels"; break;
		case 52:
			obj = "rats"; break;
		default:
			obj = "humans"; break;
					
		}
		return obj;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.getIrrationalObject "+err);
	}
}

function getDisease(){
	try{
		var rnd = Math.floor(Math.random()*5);
		var disease = "";
		if(rnd < 2){
			disease = "Wasting Disease";
		}else if(rnd < 3){
			disease = "Brain Fever";
		}else if(rnd < 4){
			disease = "Soul Waste";
		}else if(rnd < 5){
			disease = "Creeping Chills";
		}else{
			disease = "The Shakes";
		}
		return disease;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.getDisease "+err);
	}
}

function standaloneDisease(template){
	try{
		var chance=0;
		if(template.hasOwnProperty("disease")){
			chance = template.disease;
		}else{
			chance = Math.floor((20-template.characteristics.con.value)/3);
		}
		var rnd = Math.floor(Math.random()*100);
		if(rnd < chance){
			if(template.hasOwnProperty("special")){
				template.special = template.special + " <br/>The creature is infected with "+getDisease();
			}else{
				template.special = "The creature is infected with "+getDisease();
			}
		}
		return template;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.standaloneDisease "+err);
	}
}

function hasBodyPart(partList, hitLocs){
	try{
		var thisPart = partList[0];
		var boolPart = false;
		for(var p = 0; p < partList.length; p++){
			thisPart = partList[p];
			for(var hl = 0; hl < hitLocs.length; hl++){
				if(hitLocs[hl].location.indexOf(partList[p])>-1){
					boolPart = true;
				}
//				window.alert("jsRQChaosDisease.hasBodyPart "+thisPart+"  "+hitLocs[hl].location+"  "+boolPart);
			}
		}
		return boolPart;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.hasBodyPart "+thisPart+"  "+err);
	}
}

function updateMoveByLevel(template, move){
	try{
		var explvls = getExperienceLevels(template.name);
		for(var el = 3; el < explvls.length; el++){
			template.exp[explvls[el]].move = move;
		}
		return template;
	}catch(err){
		window.alert("Error: jsRQChaosDisease.updateMoveByLevel "+err);
	}
}