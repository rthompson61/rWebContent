 function BuildWord(syllables, test){
    //syllables - number of syllabels in the wo
    //test - boolean
    //position - position of word in multiword name
    //hyphenated - boolean, if multi word name is hyphenated
    try {
        //set syllable lists
        var initialList = ["A", "A", "A", "A", "A", "A", "Al", "Al", "Al", "An", "An", "An", "An", "Ar", "Ar", "Ar", "Ar", "As", "As", "Ast", "At", "At", "At", "Av", "Ba", "Beat", "Beck", "Bel", "Ben", "Bi", "Bin", "Bit", "Ma", "Gan","Bow", "Bro", "Bronze", "Bul", "Burt", "By", "Ca", "Ca", "Ca", "Cal", "Cal", "Cal", "Cal ", "Can", "Can", "Car", "Car", "Car", "Ce", "Cen", "Cha", "Chach", "Cho", "Vil", "Chron", "Ci", "Co", "Col", "Col", "Con", "Con", "Con", "Cor", "Craw", "Crout", "Cun", "Da", "Dal", "Tel", "Dar", "Dawn", "De", "Den", "Den", "Kirk", "Der", "Dhi", "Di", "Die","Bel",  "Dig", "Djin", "Dob", "Dodds", "Dor", "Drol", "Dua", "Dur", "Dyrn", "E", "E", "Ech", "Ed", "Ef", "Ek", "El", "Em", "Em", "En", "En", "En", "En", "En", "Er", "Ex", "Ex", "Fai", "Fal", "Far", "Fe", "Fe", "Fenl", "Ffudn", "Fi", "Flam", "Flex", "Fo", "Fo ", "For", "For", "For", "Fren", "Froin", "Frond", "Ful", "Ga", "Gandr", "Gar", "Gar", "Ge", "Ge", "Ghan", "Gil", "Gil", "Gli", "Go", "Go", "Gor", "Gou", "Gram", "Grant", "Gril", "Gro", "Gung", "Gunn", "Gyo", "Ha", "Ham", "Har", "He", "He", "He", "He", "He", "He", "Hex", "Ho", "Ho", "Hrun", "Hu", "I", "I", "I ", "Ian", "Ie", "Ij", "Il", "In", "In", "In", "In", "Iv", "Ja", "Jae", "Je", "Je", "Jeng", "Jinx", "Jo", "Jo", "Jon", "Jud", "Jun", "K'", "Ka", "Ka", "Kar", "Ke", "Kea", "Kelt", "Keng", "Kin", "Kin", "Knor", "Kuai", "L'", "La", "La", "La'", "Lab", "Lanth", "Le", "Le", "Lew", "Lo", "Lou", "Lun", "Ly", "Lyd", "Ma", "Ma", "Mainz", "Maltz", "Mar", "Mar", "Me", "Me", "Men", "Mer", "Mer", "Mer", "Mi", "Mi", "Mil", "Mir", "Mir", "Mir", "Mith", "Mith", "Mjol", "Mo", "Mon", "Mot", "Mough", "Murch", "Na", "Na", "Na", "Na", "Nar", "Nar", "Nar", "Ne", "New", "Nex", "Nin", "Nir", "No", "No", "Noc", "Nu", "O", "Och", "Ol", "Orc", "Pa", "Pa", "Pa", "Pa", "Pa", "Pan", "Pav", "Pe", "Pe", "Pe", "Pe", "Penk", "Per", "Phlu", "Pi", "Pim", "Pix", "Pla", "Po", "Por", "Pri", "Prinx", "Pscias", "Pu", "Py", "Py", "Qu", "Qu", "Quar", "Que", "Qui", "Quo", "Ra", "Ra", "Ra", "Rab", "Ral", "Ran", "Rapp", "Ray", "Re", "Re", "Re", "Reach", "Rech", "Res", "Ret", "Rhi", "Rhy", "Ri", "Rio", "Ro", "Ro", "Rob", "Ror", "Ror", "Roup", "Ru", "Ru", "Rug", "Sac", "San", "Saur", "Sax", "Shar", "She", "Shi", "Shion", "Sing", "Skull", "Smoug", "So", "So", "Son", "Spi", "Spum", "Squa", "Squal", "Stave", "Steel", "Stel", "Stern", "Sting", "Stroud", "Ta", "Ta", "Tal", "Tal", "Tar", "Tar", "Te", "Tee", "Ten", "Ter", "Ter", "Than", "Then", "This", "Thorn", "Ti", "Tia", "Tion", "Tir", "Tiv", "Ton", "Tor", "Tow", "Tral", "Tran", "Tre", "Tree", "Trem", "Tri", "Trin", "Tsar", "Tus", "Tyr", "U", "U", "Ua", "Un", "Val", "Van", "Vi", "Vic", "Vil", "Vio", "Vrei", "Wal", "Wardn", "Weiss", "Whang", "Whenge", "Win", "Wind", "Woch", "Won", "Won", "Wurz", "Wy", "Xho", "Y", "Ye", "Yil", "Yla", "Yor", "Yor", "You", "Yurst", "Za", "Zai", "Ze", "Ze", "Zeph", "Zey", "Zhde", "Zi", "Zir", "Zir", "Zy"];
        var medialList = ["ra", "ra", "da", "bic", "ge", "bast", "za", "sel", "dur", "kad", "a", "mo", "de", "el", "tic", "a", "s", "iz", "ar", "i", "e", "don", "or", "dor", "le", "pi", "leos", "pa", "a", "dyo", "dar", "non", "tril", "o", "tev", "it", "an", "en", "den", "is", "in", "in", "ix", "a", "er", "las", "tro", "gran", "tol", "cal", "i", "qua", "ne", "te", "s", "mar", "ca", "a", "da", "rinc", "sen", "ed", "to", "hat", "mer", "mi", "vo", "set", "ro", "ro", "ro", "der", "ce", "tin", "der", "at", "iwa", "end", "lon", "se", "di", "pe", "yeu", "ko", "i", "ta", "ru", "gen", "oeul",  "an", "ne", "se", "ce", "ra", "ge", "ge", "le", "cur", "tact", "zan", "la", "le", "ri", "i", "se", "to", "to", "ke", "re", "toc", "te", "ver", "na", "e", "ca", "ym", "tin", "van", "li", "ga", "a",  "da", "nel", "per", "se", "phon", "rem", "wa", "o", "zo", "lis", "par", "sa", "ra", "haia", "mi", "s", "in", "lan", "si", "ren", "rel", "ni", "la", "-", "von", "ca", "nal", "tee", "el", "ra", "ant", "nas", "xa", "ous", "fu", "in", "sin", "to", "cel", "i", "hal", "e", "nor", "tor", "lan", "bef", "der", "min", "no", "ta", "cu", "dle", "vi", "ko"];
        var terminalList = ["manx", "mis", "tor", "ci", "ki", "ster", "er", "ell", "gine", "ia", "home", "il", "dor", "den", "ia", "ba", " mis", "us", "gard", "tine", "sa", "son", "a", "stan", "el", "er", "World", "o", "dor", "cornn", "ges", "er", "man", "die", "ia", "son", "ret", "lit", "pon", "tuz", "burn", "ia", "lia", "an", "trel", "y", "sten", "se", "ey", "na", "try", "mois", "tinch", "ti", "or", "twe", "gri", "da", "lace", "le", "ia", "way", "fu", "ic", "zio", "ra", "lian", "lia", "rian", "world", "kalb", "tus", "tam", "chon", "an", "nomn", "riabr", "is", "ni", "ham", "nia", "raw", "le", "dal", "wyn", "gypt", "elt", "te", "a", "ate", "tron", "beth", "ald", "ape", "du", "ope", "pe", "ge", "os", "re", "ay", "bur", "sal", "dor", "har", "ri", "man", "Gren", "cant", "ion", "os", "sey", "line", "boldn", "nice", "ine", "zie", "cin", "roo", "is", "ski", "town", "rome", "di", "en", "sy", "sten", "ure", "the", "ram", "geste", "le", "te", "nir", "mar", "zel", "um", "te", "fry", "ya", "guz", "noz", "ni", "ni", "os", "fud", "sho", "ting", "u", "a", "i", "ron", "ic", "fi", "mines", "ium", "do", "the", "chin", "the", "o", "cent", "a", "well", "re", "he", "se", "tre", "e", "ice", "dy", "a", "rin", "lu", "din", "a", "nou", "chner", "orb", "orb", "bes", "qing", "dieu", "berv", "kou", "le", "lon", "beau", "der", "is", "da", "zy", "ion", "sen", "ia", "ne", "stan", "si", "si", "to", "wey", "orb", "y", "or", "lior", "fel", "gro", "Falcs", "am", "e", "riam", "ril", "ras", "nir", "ra", "go", "mos", "as", "son", "min", "ko", "ko", "drin", "val", "ge", "sil", "whon", "rome", "ine", "jar", "ton", "nym", "sea", "ol", "ma", "le", "te", "pia", "rist", "ir", "ne", "ya", "que", "ton", "net", "bid", "quan", "se", "ope", "nium", "whar", "e", "me", "a", "ane", "ie", "ven", "za", "lo", "sa", "kin", "di", "mus", "are", "that", "non", "ru", "pist", "salt", "weh", "va", "whar", "he", "gent", "world", "drad", "no", "gina", "the", "er", "ten", "ae", "se", "or", "sek", "get", "mar", "in", "re", "ise", "by", "shu", "bird", "noth", "bar", "us", "e", "rip", "you", "e", "thy", "er", "mem", "rel", "thert", "le", "e", "ne", "lia", "tio", "stern", "en", "ni", "xeb", "chek", "os", "kine", "sus", "phi", "Tee", "phi", "Nova", "ber", "go", "be", "tor", "zon", "qril", "ale", "em", "id", "doul", "ment", "ers", "tha", "e", "lon", "ce", "dex", "ge", "a", "ian", "fing", "land", "la", "kye", "qua", "la", "jen", "ian", "ia", "is", "te", "ger", "ston", "a", "ston", "sor", "iers", "ay", "star", "burg", "poc", "sa", "res", "bab", "dor", "ven", "bund", "i", "ghal", "e", "bon", "pit", "yr", "de", "fi", "je", "con", "ta", "ca"];
        var pick = 0;
        var syllableArray = [];
        var testString = "";
        syllableArray.length = syllables;
        var returnWord = "";
        //Generate first syllables
        pick = Math.floor(Math.random() * initialList.length);
        syllableArray[0] = initialList[pick];
        testString ="BuildWord initalList.length = "+initialList.length+" Pick = "+pick+ " Initial Syllable = "+syllableArray[0];
        
        if (syllables > 1){
             //generate last syllable
        pick = Math.floor(Math.random() * terminalList.length);
        syllableArray[syllables-1] = terminalList[pick];
        testString = testString + "\nBuildWord terminalList.length = "+terminalList.length+" Pick = "+pick+ " Terminal Syllable = "+syllableArray[syllables-1];
            if( syllables > 2){
                //generate medial syllables
                for(var sy =1; sy < syllables-1; sy++){
                    pick = Math.floor(Math.random() * medialList.length);
                    syllableArray[sy] = medialList[pick];
                    testString = testString + "\nBuildWord medialList.length = "+medialList.length+" Pick = "+pick+ " Medial Syllable = "+syllableArray[sy];              
                }
            }
        }
        for(var syA = 0; syA < syllables; syA++){
            returnWord = returnWord + syllableArray[syA];
        }
        //else if length < 3, add second syllable
        if(returnWord.length < 3){
            pick = Math.floor(Math.random() * terminalList.length);
            returnWord = returnWord + terminalList[pick];
        }
        testString = testString + "\nReturn "+returnWord;
        //MOVE to getName function --if hyphenated and position > 1 - determine capitalization of word
        if(test){
            window.alert(testString);
        }
        return returnWord;
    } catch (error) {
        window.alert("jsTravellerSystemNames.BuildWord: "+error);
    }
}

function NamePossessive(name, bodyType, test){
    //name - array of words
    //bodyType - planet, belt, giant
    //test - boolean
    try {
        var testString = name.toString();
        var returnNamePossessive = "";
        var worldEndPossessive = "";
        var pick = 0;
        /*
        if words.length > 1 and worldEnd <> "", 

        >>select random word to make possessive<<
        
        else terminal word is possessive
        if planet or gas giant - add worldEnd to termianl word
        if world then add world, steading, planet, terrene, home, grange, station
            if gas giant add giant, leviathan, behemoth, titan

        */

        pick = Math.floor(Math.random() * 100)+1;
       if(bodyType == "planet"){
            if(pick < 16){
                worldEndPossessive = "'s World";
            }else if(pick < 28){
                worldEndPossessive = "'s Steading";
            }else if(pick < 40){
                worldEndPossessive = "'s Planet";
            }else if(pick < 52){
                worldEndPossessive = "'s Terrene";
            }else if(pick < 64){
                worldEndPossessive = "'s Home";
            }else if(pick < 76){
                worldEndPossessive = "'s Grange";
            }else if(pick < 88){
                worldEndPossessive = "'s Station";
            }
       }else if(bodyType == "giant"){
           if(pick < 16){
               worldEndPossessive = "'s Giant";
           }else if(pick < 31){
            worldEndPossessive = "'s Leviathan";
        }else if(pick < 46){
            worldEndPossessive = "'s Titan";
        }else if(pick < 61){
            worldEndPossessive = "'s Behemoth";
        }
       }else{
        worldEndPossessive = "'s ";
       }
       if(bodyType !== "belt" && name.length > 1){
        pick = Math.floor(Math.random() * name.length);
        name[pick] = name[pick]+"'s";
       }
       testString = testString +", "+worldEndPossessive;
       returnNamePossessive = name[0];
       for(var w = 1; w < name.length; w++){
           returnNamePossessive = returnNamePossessive + " "+name[w];
       }
       if(test){
           window.alert("jsTravellerSystemNames.NamePossessive: Test> "+testString);
       }
       returnNamePossessive = returnNamePossessive + worldEndPossessive;
       return returnNamePossessive;
    } catch (error) {
        window.alert("jsTravellerSystemNames.NamePossessive: "+error);
    }
}

function BuildName(bodyType, test){
    //bodyType - planet, belt, giant, star
    //test - boolean    
    try {
        var nWords = 0;
        var pick = 0;
        var words = [];
        var testString = "Words in Name: ";
        var returnName = "";
        var worldEnd = "";
        pick = Math.floor(Math.random() * 100)+1;
        if(pick <94){
            nWords = 1;
        }else if(pick < 98){
            nWords = 2;
        }else{
            nWords = 3;
        }
        for (var w = 0; w < nWords; w++){
            pick = Math.floor(Math.random() * 100)+1;
            if(pick < 9){
               words[w] = BuildWord(1, false);
            }else if(pick < 63){
                words[w] = BuildWord(2, false);
            }else if(pick < 93){
                words[w] = BuildWord(3, false);
            }else if(pick < 99){
                words[w] = BuildWord(4, false);
            }else{
                words[w] = BuildWord(5, false);
            }
            testString = testString+ words[w]+" ";
        }
        testString = testString + "\n";
        pick = Math.floor(Math.random() * 100)+1;
        if(pick > 99){
            pick = Math.floor(Math.random() * 12)+1;
            /*
            possessive
            */
            if(pick < 4){
                returnName = NamePossessive(words, bodyType, false);
            }  
            /*
            definate
            */
           else if(pick < 6){
               returnName = NameDefinate(words, false);
           }
           /*
            hyphanted 
            if multi world 75% between each word
            50/50 if next word is capitalized.
            If not hyphen then capiatlize
            */
            else if(pick < 9){
                returnName = NameHyphenated(words, false);
            }
            /*
            Glottal stop
            if not vowel the double consenant with apostrophe B'B...
            */
           else if(pick < 10){
               words[0] = NameGlottalStop(words[0], false);
               returnName = words[0];
               for(var w = 1; w < words.length; w++){
                   returnName = returnName+" "+words[w];
               }
           }
           /*
            partative
            d' or of if multiword
            */
           else{
               returnName = NamePartative(words, false);
           }

        }else{
            for (var w = 0; w < nWords; w++){
                returnName = returnName + words[w]+" ";
            }
        }
        if(bodyType == "belt"){
            returnName = "The "+returnName + " "+ NameAsteroid(false);
        }
        if (test){
            window.alert("jsTravellerSystemNames.BuildName: Test> "+testString+" "+returnName+" "+worldEnd);    
        }
        if(worldEnd != ""){
            returnName = returnName+" "+worldEnd;
        }
        return returnName;
    } catch (error) {
        window.alert("Error - jsTravellerSystemNames.BuildName: "+error);
    }
}
function NameAsteroid(test){
    //Provides terminal word for Asteroid or Planetoid name
    //test - Boolean
    try {
            var pick = Math.floor(Math.random() * 100)+1;
            var worldEnd = "";
            var testString = "";
            //belt, girdle, band, zone, hoop, crowd, stream, pack, flock, halo, circuit, cluster, mass, clutch, swarm
            if(pick < 31){
                worldEnd = "Belt";
            }else if(pick < 49){
                worldEnd = "Swarm";
            }else if(pick < 53){
                worldEnd = "Band";
            }else if(pick < 57){
                worldEnd = "Zone";
            }else if(pick < 61){
                worldEnd = "Hoop";
            }else if(pick < 65){
                worldEnd = "Crowd";
            }else if(pick < 68){
                worldEnd = "Stream";
            }else if(pick < 72){
                worldEnd = "Pack";
            }else if(pick < 76){
                worldEnd = "Flock";
            }else if(pick < 80){
                worldEnd = "Halo";
            }else if(pick < 84){
                worldEnd = "Circuit";
            }else if(pick < 88){
                worldEnd = "Cluster";
            }else if(pick < 92){
                worldEnd = "Mass";
            }else if(pick < 96){
                worldEnd = "Clutch";
            }else{
                worldEnd = "Girdle";
            }
        testString = "Test: jsTravellerSystemNames.NameAsteroid: "+pick+" = "+worldEnd;
        if(test){
            window.alert(testString);
        }
        return worldEnd;
    } catch (error) {
        window.alert("Error - jsTravellerSystemName.NameAsteroid: "+error);
    }
}
function NameDefinate(words, test){
    //prefix with The or L', -a, -i or al-
    //test - boolean
    //words - array of words in name
    try {
        var pick = Math.floor(Math.random() * 100)+1;
        var returnArticle= ["The ", 0]; //[article, location (0 = prefix to name, 1 = suffix to name)]
        var returnName = "";
        if(pick < 16){
            returnArticle = ["L'", 0];
        }else if(pick < 26){
            returnArticle = ["-a", 1];
        }else if (pick < 36){
            returnArticle = ["-i", 1];
        }else if(pick < 45){
            returnArticle = ["al-", 0];
        }
        for (var w = 0; w < words.length; w++){
            returnName = returnName + words[w];
            if(w < words.length-1){
                returnName= returnName+" ";
            }
        }
        if(returnArticle[1] == 1){
            returnName = returnName+returnArticle[0];
        }else{
            returnName = returnArticle[0]+returnName;
        }
        if(test){
            window.alert("jsTravellerSystemName.js.NameDefinate: "+pick+" = "+returnArticle[0]+", "+returnArticle[1]+" > "+returnName);
        }
        return returnName;
    } catch (error) {
        window.alert("Error - jsTravellerSystemName.js.NameDefinate: "+error);
    }
}

function NameHyphenated(words, test){
    //words - array of words in the name
    //test boolean
    try {
        var testString = "";
        var returnName = "";
        var pick = 0;
        var lower = 0; //flag to make next word lower case
        for(var w = 0; w < words.length; w++){
            if(lower > 0){
                words[w] = words[w].toLowerCase();
            }
            returnName = returnName + words[w];
            pick = Math.floor(Math.random() * 100)+1;
            if(pick < 76 && w < words.length -1){
                testString = testString+"\nWord ("+pick+") is hyphenated";
                returnName = returnName+"-";
                pick = Math.floor(Math.random() * 100)+1;
                if(pick<51){
                    lower = 1;
                }else{
                    lower = 0;
                }
            }else{
                lower = 0;
            }
        }

        if(test){
            window.alert("jsTravellerSystemNames.js.NameHyphenated: "+testString+"\nReturns: "+returnName);
        }
        return returnName;
    } catch (error) {
        
    }
}

function NameGlottalStop(initialWord, test){
    //initialWord - text
    //test - boolean
    try {

        if(initialWord.charAt(0) !== "A" && initialWord.charAt(0) !== "E" && initialWord.charAt(0) !== "I" && initialWord.charAt(0) !== "O" && initialWord.charAt(0) !== "U" && initialWord.charAt(0) !== "Y" && initialWord.charAt(0) !== "Q" && initialWord.charAt(0) !== "S" && initialWord.charAt(0) !== "X"){
            initialWord = initialWord.charAt(0)+"'"+initialWord; 
        }
        if(test){
            window.alert("jsTravellerSystemNames.js.NameGlottalStop: "+initialWord);
        }
        return initialWord;
    } catch (error) {
        window.alert("Error - jsTravellerSystemNames.js. NameGlottalStop: "+error);
    }
}

function NamePartative(words, test){
    //words - list of words in name
    //test - boolean
    try {
        var returnName = "";
        var pick = Math.floor(Math.random() * 100)+1;
        if(words.length == 1){
            returnName = "d'"+words[0];
        }else if( words.length == 2){
            if(pick < 75){
                returnName = words[0]+" d'"+words[1];
            }else{
                returnName = words[0]+" of "+words[1];
            }
        }else{
            if(pick < 37){
                returnName = words[0]+" d'"+words[1]+" "+words[2];
            }else if(pick < 75){
                returnName = words[0]+" "+words[1]+" d'"+words[2];
            }else if(pick < 88){
                returnName = words[0]+" of "+words[1]+ " "+words[2];
            }else{
                returnName = words[0]+" "+words[1]+ " of "+words[2];
            }
        }
        if(test){
            window.alert("jsTravellerSystemNames.js.NamePartative: "+returnName);
        }
        return returnName;
    } catch (error) {
        window.alert("Error - jsTravellerSystemNames.js. NamePartative: "+error);
    }
}

