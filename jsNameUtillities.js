/**
 * name generation Utilities
 */
function generateRomanName(soc, g){
	try{
		var praeNom = "Chuckles";
		var nomen = "the";
		var cogNom = "Clown";
		var rNamePat = Math.floor(Math.random()*100);
		var rtnNm ="";
		var latinized = "";
		var sex = "m.";
		
		var patNomenae = new Array ([16,"Nemetorius"],[16,"Nigidius"],[2,"Gabinius"],[1,"Barbatius"],[1,"Caedicius"],[16,"Furius"],[16,"Veturius"],[2,"Canidius"],[2,"Vassenius"],[8,"Appuleius"],[16,"Curius"],[16,"Messienus"],[2,"Petillius"],[2,"Tuccius"],[2,"Vivianus"],[8,"Liburnius"],[8,"Septimius"],[1,"Laetorius"],[16,"Allectius"],[16,"Cispius"]);
		var equiNomenae = new Array([2,"Camilius"],[2,"Rufius"],[8,"Rufrius"],[16,"Ceionius"],[8,"Mallius"],[2,"Atius"],[8,"Antius"],[8,"Velius"],[1,"Nigilius"],[8,"Pupius"],[1,"Insteius"],[1,"Plautius"],[16,"Junius"],[2,"Tettidius"],[2,"Viducius"],[8,"Caeparius"],[8,"Equitius"],[8,"Lusius"],[1,"Horatius"],[1,"Salvius"],[1,"Verginius"],[1,"Caesonius"],
				[16,"Vatinius"],[8,"Cloelius"],[8,"Octavius"],[8,"Sennius"],[2,"Menenius"],[2,"Lartius"],[1,"Victricius"],[8,"Sextius"],[16,"Antistius"],[16,"Cornelius"],[2,"Fulcinius"],[8,"Balventius"],[16,"Faenius"],[16,"Lucilius"],[2,"Vibenius"],[16,"Vergilius"],[1,"Canuleius"],[1,"Cosconius"]);		
		var plebNominae = new Array([2,"Postumius"],[16,"Papius"],[8,"Albanius"],[8,"Sempronius"],[8,"Umbrenius"],[2,"Trebellius"],[8,"Novius"],[1,"Volusenna"],[2,"Spurius"],[8,"Caelius"],[8,"Minicius"],[16,"Caepasius"],[2,"Julius"],[8,"Annius"],[1,"Quirinius"],[16,"Petilius"],[8,"Stertinius"],[16,"Aurelius"],[16,"Olcinius"],[2,"Lutatius"],[8,"Statilius"],[1,"Hirtius"],[1,"Secundinius"],[1,"Sornatius"],[1,"Vipsanius"],[16,"Turullius"],[2,"Atronius"],[8,"Titius"],[1,"Arrius"],[16,"Cassius"],[2,"Verecundius"],[8,"Fabius"],[8,"Florius"],
				[8,"Peltrasius"],[16,"Cordius"],[16,"Vinicius"],[16,"Volusenus"],[2,"Sentius"],[16,"Cantius"],[16,"Minucius"],[8,"Arsinius"],[8,"Cluilius"],[1,"Quinctius"],[2,"Cincius"],[2,"Gratius"],[2,"Tettius"],[16,"Titiedius"],[8,"Dossenius"],[8,"Plotius"],[1,"Oppius"],[16,"Cocceius"],[16,"Volcatius"],[8,"Fadius"],[16,"Pompilius"],[2,"Ausonius"],[8,"Lucceius"],[8,"Petronius"],[1,"Festinius"],[1,"Geganius"],[1,"Metilius"],[1,"Otacilius"],[16,"Rutilius"],[8,"Lucretius"],[8,"Pompeius"],[2,"Sergius"],[8,"Caninius"],
				[8,"Pontius"],[1,"Decumius"],[2,"Urgulanius"],[1,"Aufidius"],[1,"Pomponius"],[8,"Lampronius"],[8,"Pinarius"],[8,"Treblanus"],[1,"Carius"],[1,"Floronius"],[16,"Canius"],[16,"Nipius"],[8,"Caristanius"],[8,"Curtius"],[8,"Herminius"],[8,"Hosidius"],[1,"Cominius"],[2,"Babudius"],[2,"Trebatius"],[8,"Avitus"],[8,"Tertinius"],[8,"Paesentius"],[1,"Cluntius"],[1,"Desticius"],[8,"Caesius"],[16,"Considius"],[2,"Aquillius"],[2,"Publicius"],[8,"Mamilius"],[8,"Munius"],[1,"Accoleius"],[16,"Flavius"],[16,"Mucius"],
				[2,"Maecilius"],[8,"Burrienus"],[1,"Cicereius"],[1,"Secundius"],[2,"Petellius"],[8,"Galerius"],[8,"Socellius"],[1,"Bruttius"],[8,"Fulvius"],[1,"Norbanus"],[2,"Barrius"],[2,"Coiedius"],[2,"Flavinius"],[2,"Palpellius"],[2,"Titinius"],[8,"Blandius"],[1,"Icilius"],[16,"Vagionius"],[2,"Lollius"],[2,"Milonius"],[8,"Duccius"],[1,"Flavonius"],[16,"Servilius"],[16,"Calidius"],[16,"Pisentius"],[2,"Rabirius"],[8,"Vitellius"],[1,"Armenius"],[2,"Visellius"],[8,"Egnatius"],[8,"Juventius"],[8,"Ulpius"],[1,"Amatius"],
				[2,"Aedinius"],[8,"Caprenius"],[1,"Seius"],[2,"Floridius"],[2,"Vedius"],[1,"Maximius"],[8,"Vesnius"],[1,"Memmius"],[16,"Livius"],[16,"Volumnius"],[2,"Numerius"],[1,"Domitius"],[1,"Nasennius"],[16,"Pomptinus"],[2,"Pontidius"],[8,"Pullo"],[1,"Caesennius"],[2,"Papirius"],[2,"Potitius"],[1,"Suedius"],[2,"Dexsius"],[16,"Falerius"],[2,"Vibidius"],[8,"Helvius"],[8,"Sallustius"],[1,"Munatius"],[16,"Coruncanius"],[2,"Placidius"],[2,"Salonius"],[1,"Opsius"],[1,"Vorenus"],[16,"Bantius"],[16,"Silius"],[2,"Vibius"],
				[8,"Caesetius"],[1,"Didius"],[2,"Betilienus"],[2,"Clovius"],[1,"Camillius"],[16,"Licinius"],[1,"Gratidius"],[16,"Acilius"],[16,"Pescennius"],[2,"Claudius"],[2,"Tullius"],[16,"Macrinius"],[16,"Pollius"],[8,"Atilius"],[1,"Tettienus"],[16,"Pedius"],[1,"Granius"],[16,"Consentius"],[16,"Gavius"],[16,"Uulius"],[16,"Valerius"],[1,"Sepurcius"],[16,"Talmudius"],[16,"Viridius"],[2,"Loreius"],[8,"Epidius"],[2,"Ateius"],[2,"Sertorius"],[1,"Plinius"],[8,"Popidius"],[16,"Atrius"],[2,"Bucculeius"],[8,"Duronius"],
				[1,"Asinius"],[1,"Calvisius"],[1,"Virius"],[16,"Cilnius"],[16,"Portius"],[8,"Volaginius"],[1,"Manlius"],[1,"Marcius"],[16,"Sulpicius"],[2,"Cantilius"],[8,"Blossius"],[8,"Vitruvius"],[2,"Caerellius"],[1,"Lafrenius"],[16,"Modius"],[8,"Sabucius"],[1,"Fufius"],[16,"Helvetius"],[16,"Hostilius"],[16,"Papinius"],[16,"Ummidius"],[2,"Avidius"],[8,"Naevius"],[1,"Clodius"],[2,"Caetronius"],[8,"Baebius"],[8,"Marius"],[8,"Artorius"],[8,"Ninnius"],[8,"Sestius"],[1,"Fundanus"],[2,"Tremellius"],[8,"Aburius"],[16,"Nepius"],
				[2,"Piscius"],[1,"Canutius"],[1,"Dillius"],[1,"Varius"],[2,"Calpurnius"],[2,"Manilius"],[2,"Tadius"],[16,"Aelius"],[16,"Oranius"],[16,"Vagennius"],[2,"Longinius"],[2,"Vipstanus"],[8,"Antonius"],[8,"Bruccius"],[1,"Calventius"],[16,"Calavius"],[16,"Veranius"],[2,"Caecilius"],[2,"Hortensius"],[2,"Statius"],[1,"Lucius"],[1,"Umbrius"],[2,"Aurius"],[2,"Murrius"],[2,"Scribonius"],[2,"Volusius"],[1,"Aemilius"],[2,"Axius"],[2,"Camelius"],[2,"Tanicius"],[1,"Rusonius"],[1,"Sittius"],[16,"Accius"],[8,"Caecina"],
				[16,"Laberius"],[16,"Labienus"],[8,"Caecius"],[1,"Sidonius"],[16,"Matius"],[2,"Herennius"],[8,"Gellius"],[16,"Betucius"],[2,"Favonius"],[2,"Laelius"],[2,"Quinctilius"],[1,"Carvilius"],[1,"Maelius"],[1,"Sextilius"],[1,"Vagnius"],[16,"Sepunius"],[2,"Aebutius"],[8,"Caesulenus"]);
		var mascPrae = new Array([2,"Aggripa"],[2,"Appius"],[2,"Aulus"],[1,"Caeso"],[3,"Decimus"],[1,"Faustus"],[3,"Gaius"],[2,"Gnaeus"],[2,"Hostus"],[4,"Lucius"],[2,"Mamercus"],[3,"Manius"],[4,"Marcus"],[2,"Mettius"],[1,"Nonus"],[2,"Numerius"],[3,"Octavius"],[3,"Opiter"],[4,"Paullus"],[3,"Postumus"],[2,"Proculus"],[4,"Publius"],[3,"Quintus"],[2,"Septimus"],[1,"Sertor"],[4,"Servius"],[4,"Sextus"],[2,"Spurius"],[1,"Statius"],[3,"Tiberius"],[4,"Titus"],[2,"Tullus"],[2,"Vibus"],[1,"Volesus"],[1,"Vopiscus"]);
		var femPrae = new Array([2,"Appia"],[2,"Aula"],[2,"Caesula"],[1,"Decima"],[3,"Fausta"],[1,"Gaia"],[3,"Gnaea"],[2,"HostA"],[2,"Lucia"],[4,"Maio"],[2,"Mamerca"],[3,"Mania"],[4,"Marcia"],[2,"Maxima"],[1,"Mettia"],[3,"Mino"],[3,"Nona"],[3,"Numeria"],[4,"Octavia"],[3,"Paulla"],[2,"Postuma"],[4,"Prima"],[3,"Procula"],[2,"Publia"],[1,"Quarta"],[4,"Quinta"],[4,"Secunda"],[2,"Septima"],[1,"Servia"],[3,"Sexta"],[4,"Spuria"],[2,"Statia"],[1,"Tertia"],[3,"Titia"],[3,"Tiberia"],[3,"Tulla"],[4,"Vibia"],[3,"Volusa"],[2,"Vopisca"]);
		var cogNominae = new Array([8,"Abercius"],[2," Abito"],[8," Acacius"],[13," Acaunus"],[1," Achaicus"],[3," Acilianus"],[2," Adauctus"],[21," Adepphius"],[13," Adjutor"],[5," Adranos"],[21," Adventus"],[21," Aeacus"],[1," Aebutus"],[8," Aemilianus"],[21," Aetius"],[8," Afer"],[2," Agaptus"],[1," Agatopus"],[5,"Agelastus"],[2," Agorix"],[5," Agricola"],[1," Agrippa"],[3," Agustalis"],[3," Ahala"],[1," Ahenobarbus"],[1," Albanus"],[21," Albinius"],[5," Albinus"],[8," Albucius"],[3," Alethius"],[3," Allectus"],[1," Aloysius"],[21," Aluredes"],[21," Alypius"],[8," Amandus"],[21," Amantius"],[1,"Ambrosius"],[1," Amor"],[1," Amphion"],[8," Anatolius"],[1," Ancus"],[1," Andronicus"],[2," Angelus"],[13," Antius"],[8," Anullinus"],[1," Apelles"],[5," Apellinus"],[1," Aper"],[3," Apollonarius"],[21," Aponius"],[8," Aquila"],[2," Aquilius"],[13," Aquillius"],[3," Aratus"],[5," Arcadius"],[2,"Arcavius"],[8," Archarius"],[5," Arius"],[21," Armiger"],[21," Arminus"],[5," Arpagius"],[8," Arrianus"],[2," Arruntius"],[21," Aruns"],[5," Arvina"],[2," Asellio"],[21," Asina"],[13," Asprenas"],[5," Asprenus"],[8," Assanius"],[1," Audaios"],[2," Audens"],[5," Augendus"],[2," Augurnus"],[2,"Augurius"],[5," Augustalis"],[3," Augustanus"],[8," Augustus"],[13," Auila"],[21," Aurelianus"],[13," Aurelius"],[1," Ausonius"],[1," Auspex"],[5," Auxentius"],[1," Auxientius"],[8," Auxilius"],[1," Avienus"],[5," Avitus"],[21," Balbillus"],[8," Balbus"],[1," Balduinus"],[5," Bambalio"],[21," Bamballio"],[1," Banquerius"],[5," Barbatus"],[1," Baro"],[8," Bassus"],[8," Bato"],[5," Belenus"],[21," Belisarius"],[21," Bellator"],[5," Belletor"],[5," Bellicus"],[8," Bellus"],[1," Bestia"],[13," Betto"],[3," Bibaculus"],[1,"Bibulus"],[13," Bitucus"],[1," Blandus"],[2," Bodenius"],[1," Bolanus"],[8," Bonifatius"],[1," Bonosus"],[13," Bonus"],[5," Bradua"],[1," Britannicus"],[1," Brocchus"],[5," Bromidus"],[5," Bruccius"],[3," Brucetus"],[21," Bruscius"],[1," Brutus"],[21," Bubo"],[8," Buccio"],[3," Bulla"],[21,"Burcanius"],[2," Burrus"],[5," Buteo"],[5," Caecilianus"],[8," Caecina"],[3," Caecus"],[5," Caelistis"],[5," Caelestius"],[8," Caelianus"],[8," Caelinus"],[5," Caepio"],[21," Caerellius"],[13," Caesar"],[8," Calacicus"],[8," Calatinus"],[8," Caldus"],[1," Calenus"],[1," Calerus"],[5," Caletus"],[21," Caligula"],[2,"Callisunus"],[21," Calogerus"],[5," Calpornius"],[13," Calpurnianus"],[1," Calpurnis"],[8," Calvinus"],[13," Calvus"],[5," Camerius"],[8," Camillus"],[2," Campanus"],[21," Candidianus"],[2," Candidus"],[1," Candidius"],[2," Canio"],[1," Canisius"],[2," Cantaber"],[21,"Capito"],[8," Capiton"],[1," Caprarius"],[2," Caracturus"],[8," Carantus"],[13," Carbo"],[5," Carinus"],[8," Carius"],[3," Carnifex"],[8," Carus"],[21," Casca"],[1," Cassianus"],[5," Castinus"],[5," Castorius"],[3," Castus"],[8," Catianus"],[8," Catilina"],[1," Cato"],[1," Catonius"],[1,"Catullus"],[1," Catulus"],[3," Catus"],[21," Cecilianus"],[8," Celatus"],[2," Celer"],[13," Celsus"],[5," Cenaeus"],[5," Cencius"],[5," Censorinus"],[8," Censorius"],[1," Centumalus"],[21," Cerialis"],[8," Cerinthus"],[8," Cerularius"],[8," Cervianus"],[1," Cervidus"],[5,"Cethegus"],[5," Chlorus"],[5," Christianus"],[1," Cicero"],[2," Cico"],[13," Cimber"],[1," Cinna"],[2," Cinnianus"],[8," Cita"],[5," Cittinus"],[1," Civilis"],[13," Clarus"],[8," Classicianus"],[3," Claudianus"],[5," Clemens"],[13," Clement"],[2," Clodian"],[3," Clodianus"],[1," Cogitatus"],[1,"Colias"],[1," Collatinus"],[3," Columbanus"],[1," Columella"],[5," Comes"],[3," Comitianus"],[8," Comitinus"],[1," Commidius"],[21," Commidus"],[8," Commius"],[5," Commodus"],[21," Concessus"],[2," Congrio"],[3," Constans"],[13," Constantius"],[1," Corbulo"],[1,"Cordus"],[1," Cornix"],[5," Cornutus"],[1," Corvinus"],[21," Corvus"],[13," Cosmas"],[1," Cotentinus"],[2," Cotta"],[8," Crassus"],[21," Cremutius"],[21," Crescentius"],[3," Cresces"],[5," Crispian"],[13," Crispin"],[21," Crispus"],[1," Crito"],[13," Crotilo"],[1," Cucuphas"],[1,"Culleolus"],[3," Cumanus"],[13," Cunobarrus"],[1," Cupitas"],[3," Curio"],[21," Cyprianus"],[21," Cyprias"],[21," Cyricus"],[13," Dacien"],[3," Dalmatius"],[13," Dama"],[1," Damasippus"],[21," Damasus"],[1," Damian"],[21," Dannicus"],[1," Dardanius"],[5," Dardanus"],[2," Decentius"],[1," Decianus"],[1," Decmitius"],[13," Decmus"],[1," Dexion"],[5," Dexippus"],[3," Didicus"],[3," Dignus"],[1," Dio"],[3,"Diocletianus"],[3," Diocourides"],[3," Disertus"],[3," Docilinus"],[1," Docilus"],[13," Dolabella"],[2," Dominicus"],[13," Domitianus"],[8," Donatianus"],[8," Donatus"],[2," Donicus"],[5," Dorotheus"],[1," Draco"],[3," Drusillus"],[1," Drusus (associated withGens Claudia)"],[21," Dubitatius"],[3," Dulcitius"],[1," Durio"],[1," Durus"],[1," Duvianus"],[13," Eborius"],[2," Eburnus"],[5," Ecdicius"],[13," Eclectus"],[21," Egbuttius"],[1," Egnatius"],[3," Elerius"],[5," Eliphas"],[1," Elpidius"],[5," Elvorix"],[1," Emeritus"],[3," Encratis"],[8," Ennecus"],[21," Ennius"],[13," Ennodius"],[1," Eonus"],[2," Epidianus"],[1," Epimachus"],[1,"Epolonius"],[2," Erasinus"],[8," Esdras"],[1," Eudomius"],[3," Eudoxius"],[2," Eugenius"],[3," Eugenus"],[21," Eulogius"],[1," Eumenius"],[1," Eunapius"],[8," Euphemius"],[1," Eustacius"],[1," Eutherius"],[1," Evodius"],[8," Excingus"],[5," Exsupereus"],[3,"Exuperantius"],[5," Exupertus"],[2," Fabianus"],[3," Fabillus"],[8," Facilis"],[3," Fadus"],[21," Fagus"],[21," Falco"],[1," Falconius"],[3," Falx"],[1," Famia"],[8," Familiaris"],[21," Fastidius"],[3," Farus"],[1," Faustillus"],[1," Faustinianus"],[1," Faustinius"],[13," Faustus"],[8," Faventinus"],[5," Felicissimus"],[1,"Felissimus"],[3," Felix"],[13," Ferentinus"],[1," Ferreolius"],[8," Festus"],[1," Fidelis"],[3," Figulus"],[1," Fimbria"],[1," Fimus"],[21," Firminus"],[8," Firmus"],[1," Flaccus"],[1," Flamma"],[1," Flavian"],[21," Flavianus"],[5," Flavillus"],[3," Flavinus"],[1," Florens"],[2," Florentius"],[2,"Florianus"],[5," Florus"],[1," Forianus"],[2," Fortunatus"],[1," Fraucus"],[13," Fredisius"],[5," Frigidian"],[3," Frontalis"],[2," Frontinus"],[1," Fronto"],[13," Fructosis"],[8," Frugi"],[3," Frugius"],[21," Frumentius"],[21," Fullofaudes"],[2," Fulvianus"],[2," Furius"],[13,"Fuscinus"],[8," Fuscus"],[2," Gaianus"],[8," Gaius"],[1," Gala"],[13," Galarius"],[21," Galenus"],[3," Galerus"],[3," Gallio"],[5," Gallus"],[1," Galvisius"],[8," Garilianus"],[8," Gaurus"],[21," Gavros"],[5," Gavrus"],[2," Gelasius"],[5," Gellius"],[3," Gemellus"],[21," Geminianus"],[1," Generidus"],[21," Genesius"],[5,"Genialis"],[2," Gennadius"],[2," Gerardus"],[21," Germanus"],[21," Germanicus"],[1," Gessius"],[21," Geta"],[5," Getha"],[1," Glabrio"],[3," Glaucia"],[13," Globulus"],[8," Gluvias"],[1," Glycia"],[13," Gordian Gordianus"],[3," Gordio"],[8," Gorgonius"],[13," Gracchus"],[1,"Gracilis"],[8," Gratian"],[3," Gratidianus"],[5," Grattus"],[2," Gregorius"],[21," Grumio"],[1," Gualterus"],[1," Gryllus"],[1," Habitus"],[21," Hadrianus"],[3," Hardalio"],[5," Haterius"],[2," Helvius"],[1," Herculius"],[21," Herenus"],[1," Herma"],[1," Hermina"],[5," Hesychius"],[8," Hiberus"],[3," Hilario"],[8," Hilaris"],[3," Hilarius"],[1," Hirpinius"],[21," Hirrus"],[3," Homullus"],[2," Honoratus"],[3,"Horatius"],[1," Hortensis"],[1," Hortensius"],[5," Hortensus"],[13," Hosidius"],[2," Humilus"],[13," Hybrida"],[1," Iacomus"],[1," Igennus"],[5," Ignatius"],[3," Indaletius"],[3," Indus"],[2," Ingenuus"],[5," Ingenvinus"],[21," Iocundus"],[2," Iovinus"],[21," Irenaeus"],[13," Isatis"],[1," Isauricus"],[3," Italicus"],[1," Ivmarus"],[2," Ianuarius"],[13," Iavolenus"],[8," Iovinianus"],[21," Iovinus"],[13,"Iovius"],[1," Iuba"],[21," Iulian"],[5," Iulianus"],[8," Iuncinus"],[5," Iuncus"],[5," Iunianus"],[8," Iustianus"],[3," Iustinianus"],[1," Iustinus"],[8," Iustus"],[8," Iuvenlis"],[5," Labienus"],[13," Lactantius"],[21," Laeca"],[1," Laenas"],[5," Laetinianus"],[13," Laevinus"],[8," Larcius"],[1," Lartius"],[1," Lateranus"],[8," Latinius"],[21," Laurentius"],[1," Leddicus"],[2," Lentullus"],[13," Lentulus"],[13," Leon"],[13," Leontius"],[1," Lepidus"],[1," Lepontus"],[5,"Leptis"],[5," Libanius"],[5," Liberalis"],[3," Libo"],[2," Licinianus"],[3," Licinius"],[21," Ligur"],[3," Ligustinus"],[3," Limetanus"],[1," Linus"],[5," Litorius"],[3," Littera"],[21," Litumaris"],[8," Livianus"],[1," Livigenus"],[1," Longinus"],[21," Lovernianus"],[3," Lovernius"],[2," Lucan"],[21,"Lucanus"],[21," Lucianus"],[2," Lucius"],[13," Luccius"],[1," Lucceius"],[13," Lucilianus"],[1," Lucretius"],[21," Luctacus"],[13," Lucullus"],[1," Lunaris"],[13," Luonercus"],[3," Lupercus"],[3," Lupicinus"],[5," Lupinus"],[2," Lupis"],[8," Lurco"],[8," Lurio"],[1," Lutherius"],[2,"Lutorius"],[8," Maccalus"],[2," Macrinus"],[1," Macro"],[3," Macrobius"],[5," Mactator"],[8," Maecenus"],[8," Maecius"],[2," Magnentius"],[2," Magnus"],[3," Magunnus"],[1," Maius"],[1," Major"],[8," Majus"],[3," Malchus"],[3," Mallus"],[5," Maltinus"],[13," Mancinus"],[2," Manlius"],[5,"Mansuetus"],[2," Marcallas"],[1," Marcellinus"],[3," Marcellus"],[21," Marcialis"],[8," Marcipor"],[3," Margarita"],[5," Marinianus"],[5," Marinus"],[5," Maritialis"],[3," Maritimus"],[2," Marius"],[5," Maro"],[13," Marsallas"],[5," Marsicus"],[1," Marsus"],[21," Marsyas"],[13,"Martial"],[3," Martialis"],[5," Martianus"],[21," Martinus"],[21," Martius"],[1," Martyrius"],[13," Marullinus"],[21," Marullus"],[13," Maternus"],[3," Matho"],[13," Mauricius"],[5," Maursus"],[13," Maximian"],[21," Maximianus"],[1," Maximinius"],[13," Maximinus"],[1," Maximus"],[3,"Medullinus"],[5," Megellus"],[3," Melissus"],[13," Melitus"],[3," Mellitus"],[8," Melus"],[1," Meminius"],[8," Memmius"],[1," Memor"],[1," Mercator"],[1," Mercurialis"],[8," Mercurinus"],[2," Merula"],[3," Messala"],[5," Messor"],[13," Metellus"],[1," Metilius"],[1," Metunus"],[8,"Micianus"],[13," Mico"],[21," Micon"],[8," Milonius"],[1," Minervalis"],[3," Minianus"],[3," Minicianus"],[8," Moderatus"],[13," Molacus"],[13," Momus"],[8," Montanus"],[2," Montaus"],[21," Mordanticus"],[3," Mucianus"],[1," Muco"],[2," Muncius"],[2," Murena"],[2," Mus"],[13,"Musa"],[21," Musicus"],[8," Mutilus"],[5," Mutius"],[2," Nabor"],[13," Naevius"],[2," Narcissus"],[8," Narses"],[21," Nasica"],[13," Naso"],[1," Natalinus"],[8," Natalis"],[13," Naucratius"],[8," Nazarius"],[13," Nectaridus"],[8," Nelius"],[1," Nemesianus"],[13," Nemnogenus"],[5," Neneus"],[1," Nennius"],[1," Nepos"],[1," Nero"],[5,"Nertomarus"],[21," Nerva"],[8," Nicasius"],[5," Nicetius"],[8," Nigellus"],[3," Niger"],[2," Nigidius"],[3," Nigrinus"],[3," Niraemius"],[5," Nolus"],[3," Nonius"],[3," Noster"],[13," Novation"],[13," Novellius"],[21," Numerianus"],[3," Numonis"],[3," Oceanus"],[2," Octavian"],[21," Octavianus"],[1," Octobrianus"],[1," Olennius"],[13," Olympicus"],[3," Opilio"],[3," Opimius"],[13," Opis"],[2," Optatus"],[1," Ordius"],[1," Orientalis"],[1," Orientius"],[8," Orissus"],[13," Orosius"],[1," Osterianus"],[13," Otho"],[21," Ovidus"],[3," Pacatianus"],[3," Pachomius"],[1," Pacuvianus"],[8," Paenula"],[21," Paetinus"],[1," Paetus"],[21," Palicamus"],[3," Pamphilius"],[1," Panaetius"],[2," Pansa"],[1," Pantensus"],[8," Pantera"],[1," Panthera"],[3," Papinian"],[8," Papus"],[1," Paratus"],[21," Parnesius"],[8,"Pascentius"],[5," Pastor"],[8," Paterculus"],[8," Paternus"],[8," Patiens"],[3," Patricius"],[1," Paulinus"],[3," Paullus"],[13," Pavo"],[5," Pelagius"],[13," Pennus"],[21," Peregrinus"],[13," Perennis"],[3," Perpenna"],[5," Perperna"],[2," Pertacus"],[2," Pertinax"],[5," Petasius"],[5,"Petreius"],[1," Petronax"],[13," Petrus"],[1," Philippus"],[13," Photius"],[1," Pictor"],[3," Pilatus"],[1," Pilus"],[2," Piso"],[8," Pius"],[21," Placidus"],[5," Planta"],[13," Plautis"],[1," Plautius"],[1," Plautus"],[1," Pleminius"],[2," Pollienus"],[21," Pollio"],[5," Polus"],[8," Polybius"],[13,"Pompolussa"],[13," Pomponius"],[1," Poplicola"],[3," Porcus"],[5," Porphyrius"],[13," Postumianus"],[2," Postumus"],[8," Potitus"],[13," Praetextus"],[13," Prilidianus"],[3," Primanus"],[1," Primulus"],[1," Primus"],[21," Prisca"],[3," Priscian"],[21," Priscillian"],[13,"Priscillianus"],[8," Priscus"],[1," Probus"],[8," Processus"],[5," Proceus"],[13," Proculus"],[13," Procyon"],[1," Profuterius"],[21," Propertius"],[8," Protacius"],[1," Protus"],[2," Proxsimus"],[21," Publianus"],[5," Publicola"],[3," Publicus"],[1," Pudens"],[5," Pudentius"],[1,"Pulcher"],[3," Pulcherius"],[3," Pullus"],[21," Pusinnus"],[5," Pustula"],[3," Quartinus"],[3," Quarto"],[1," Quatruus"],[13," Quentin"],[2," Quietus"],[21," Quintilianus"],[1," Quintilius"],[21," Quintillius"],[2," Quintillus"],[1," Quiriac"],[13," Quiricus"],[1," Quirinalis"],[5," Ramio"],[1," Ramirus"],[21," Ravilla"],[1," Reburrus"],[1," Receptus"],[13," Rectus"],[2," Regillus"],[21," Reginus"],[1," Regulus"],[13," Remigius"],[2," Remus"],[5," Renatus"],[3," Respectus"],[1," Restitutus"],[1," Rex"],[21," Rhesus"],[21," Ripanus"],[1," Rogatus"],[8," Rogelius"],[8,"Romanus"],[8," Romulianus"],[2," Romulus"],[13," Roscius"],[1," Rufinianus"],[8," Rufinus"],[8," Rufrius"],[21," Rufus"],[5," Rullus"],[13," Ruricius"],[5," Ruso"],[13," Rusticus"],[3," Rutilianus"],[3," Sabellius"],[1," Sabinianus"],[2," Sabinus"],[3," Sacerdos"],[21," Saenus"],[13," Salinator"],[5," Salonianus"],[5," Saloninus"],[2," Salonius"],[1," Salvian"],[1," Salvianus"],[13," Sanctus"],[1," Sandilianus"],[13," Sanga"],[2," Sarimarcus"],[13," Sarrius"],[1," Saturninus"],[1,"Saunio"],[3," Scaevola"],[2," Scapula"],[13," Scaro"],[1," Scato"],[13," Scaurus"],[1," Schlerus"],[13," Scipio"],[13," Scribonianus"],[3," Scrofa"],[21," Sebastianus"],[5," Secundas"],[8," Segestes"],[21," Sejanus"],[5," Sellic"],[5," Seneca"],[21," Senecianus"],[8," Senecio"],[21,"Senilis"],[3," Senna"],[5," Senopianus"],[8," Sentius"],[8," Septimianus"],[8," Septimus"],[2,"[1] Seronatus"],[5," Serranus"],[2," Servanus"],[1," Servatius"],[1," Seuso"],[5," Severlinus"],[2," Severus"],[5," Sevso"],[13," Siculus"],[21," Sidonius"],[1," Sigilis"],[21," Silanus"],[5,"Silius"],[8," Silo"],[21," Silus"],[1," Silvanus"],[1," Similis"],[2," Simo"],[13," Simplex"],[5," Simplicianus"],[1," Siricus"],[2," Sisenna"],[2," Sisinnius"],[21," Sita"],[2," Sollemnis"],[5," Sorex"],[1," Sorio"],[1," Sosius"],[1," Sotericus"],[21," Soulinus"],[2," Spartacus"],[8," Spendius"],[13,"Speratus"],[3," Statius"],[3," Stichus"],[1," Strabo"],[21," Sudrenus"],[5," Suilius"],[1," Sulinus"],[21," Sulla"],[13," Super"],[21," Superbus"],[2," Superstes"],[1," Sura"],[2," Surinus"],[2," Surius"],[1," Surus"],[1," Sylla"],[21," Sylvian"],[1," Sylvius"],[3," Symmachus"],[2," Symphorian"],[1,"Sympronian"],[3," Synistor"],[1," Synnodus"],[1," Tacitus"],[1," Taenaris"],[1," Tancinus"],[8," Tanicus"],[1," Tarsicius"],[1," Tatianus"],[2," Taurinus"],[1," Telesinus"],[1," Terenteianus"],[13," Tertullian"],[13," Tertulus"],[5," Tetricus"],[13," Tetullianus"],[2," Thrasea"],[1," Thurinus"],[1," Tiberillus"],[1," Tiberinus"],[1,"Tibullus"],[5," Tiburs"],[21," Titianus"],[21," Titillus"],[21," Torquatus"],[21," Traianus"],[2," Trailus"],[3," Tranio"],[1," Tranquillus"],[2," Trebonianus"],[5," Tremerus"],[1," Tremorinus"],[3," Trenico"],[8," Trenus"],[13," Triarius"],[1," Trifer"],[8," Triferus"],[13," Trimalchio"],[21,"Trogus"],[2," Trupo"],[5," Tuccianus"],[2," Tuditanus"],[21," Turibius"],[1," Turpilianus"],[13," Turpilinus"],[8," Tuticanus"],[3," Tutor"],[13," Tyranus"],[5," Ulpianus"],[5," Urbicus"],[3," Ursinus"],[13," Ursus"],[21," Uticensis"],[3," Vala"],[2," Valens"],[1," Valentinian"],[8," Valentinus"],[21," Valerianus"],[1," Valgus (Gens Quintia)"],[3," Varialus"],[8," Varro"],[1," Varus"],[13," Vatia"],[5," Vedrix"],[1," Venantius"],[1," Venator"],[21," Ventor"],[21," Venustinius"],[5," Vepgenus"],[3," Verecundus"],[1,"Verinus"],[13," Verres"],[1," Verrucosus"],[3," Verullus"],[1," Verus"],[8," Vespasianus"],[21," Vespillo"],[3," Vestinus"],[1," Vetranio"],[1," Vettonianus"],[2," Vetus[2] Viator"],[21," Vibennis"],[8," Vibius"],[3," Victor"],[3," Victoricus"],[13," Victorinus"],[1," Victricius"],[2,"Vincentius"],[1," Vindex"],[1," Vinicianus"],[5," Viridio"],[8," Virilis"],[13," Vitalinus"],[13," Vitalis"],[21," Vitulus"],[5," Vitus"],[1," Vocula"],[21," Volusianus"],[2," Vopiscus"],[8," Vulso"],[1," Zeno"],[1," Zosimus"]);
		if(soc == 1 || soc ==2){
			nomen = selectFromWeightedArray(patNomenae);
		}else if(soc == 3 || soc == 4){
			nomen = selectFromWeightedArray(equiNomenae);
		}else{
			nomen = selectFromWeightedArray(plebNominae);
		}
		cogNom = selectFromWeightedArray(cogNominae);
		if(g == 1){
			nomen = nomen.slice(0, nomen.length-2)+"a";
			praeNom = selectFromWeightedArray(femPrae);
			cogNom = cogNom.slice(0, cogNom.length-2)+"a"; 
			sex = "f.";
		}else{
			praeNom = selectFromWeightedArray(mascPrae);
		}
		var latNom = "Clownicus";
		if (rNamePat < 50){
			latNom = generateGreekName(g);
			latinized = "&Gamma;";
		}else{
			latNom = generateGermanicName(g);
			latinized = "G";
		}
		latNom = latNom.split(" ")[0];
		var lNpatt1 = /[eiouy]$/;
		var lNpatt2 = /a$/;
		if(lNpatt1.test(latNom)){
			if(g ==1){
				latNom = latNom + "ania";
			}else{
				latNom = latNom + "anius";
			}
		}else if(lNpatt2.test(latNom)){
			if(g ==1){
				latNom = latNom + "nia";
			}else{
				latNom = latNom + "nius";
			}
		}else{
			if(g ==1){
				latNom = latNom + "ia";
			}else{
				latNom = latNom + "ius";
			}
		}

		rNamePat = Math.floor(Math.random()*100);
		if(soc <3 || (soc == 3 && rNamePat <81) || (soc == 4 && rNamePat <71) || (soc == 5 && rNamePat <51) || (soc == 6 && rNamePat <41) || (soc == 7 && rNamePat <31) || (soc == 8 && rNamePat <21)  ){
			rtnNm = praeNom+" "+nomen+" "+cogNom+" (L.)"+sex;
		}else if(soc == 3 ||(soc == 4 && rNamePat <81) || (soc == 5 && rNamePat <61) || (soc == 6 && rNamePat <56) || (soc == 7 && rNamePat <41) || (soc == 8 && rNamePat <31)  ){
			rtnNm = nomen+" "+cogNom+" (L.)"+sex;
		}else if((soc == 4 && rNamePat <91) || (soc == 5 && rNamePat <71) || (soc == 6 && rNamePat <66) || (soc == 7 && rNamePat <51) || (soc == 8 && rNamePat <41)  ){
			rtnNm = praeNom+" "+cogNom+" (L.)"+sex;
		}else if((soc == 4 && rNamePat <96) || (soc == 5 && rNamePat <81) || (soc == 6 && rNamePat <76) || (soc == 7 && rNamePat <61) || (soc == 8 && rNamePat <51)  ){
			rtnNm = praeNom+" "+nomen+" (L.)"+sex;
		}else if(soc == 4 || (soc == 5 && rNamePat <91) || (soc == 6 && rNamePat <86) || (soc == 7 && rNamePat <71) || (soc == 8 && rNamePat <61)  ){
			rtnNm = praeNom+" "+nomen+" "+latNom+" (L+"+latinized+")"+sex;
		}else if((soc == 5 && rNamePat <96) || (soc == 6 && rNamePat <96) || (soc == 7 && rNamePat <91) || (soc == 8 && rNamePat <91)  ){
			rtnNm = nomen+" "+latNom+" (L+"+latinized+")"+sex;
		}else{
			rtnNm = praeNom+" "+latNom+" (L+"+latinized+")"+sex;
		}
		return rtnNm;
	}catch(err){
		return "Error in Generate Roman Name:  Social Class "+soc+", Gender "+g+", Praenomen "+praeNom+", Nomen "+nomen+", Cognomen "+cogNom+"\n Error: "+err.message; 
	}
}


function generateGermanicName(g){
	try{
		var rtnName = "Herman";
		var sufName ="n";
		var GermSyll = new Array([7,0,0,[[1,"agi"], [2,"eg"],[1,"egg"],[1,"ekk"],[1,"agin"], [1,"egin"]]],
							     [8,0,0, [["albi"],[7, "aelf"],[1,"elf"],[1,"alf"]]],
		                         [5,0,0,[[2, "alh"],[1,"alah"],[2,"ealh"]]],
		                         [14,0,0,[[7,"ans"], [1,"as"], [6,"os"]]],
		                         [18,0,0,[[1,"audaz"], [4,"aud"], [3,"od"], [2,"euth"], [1,"auth"],[4,"ed"],[4,"ead"],[1,"eod"],[1,"jocth"]]],
		                         [13,0,0,[[1,"athal"],[3,"adel"],[1,"adall"],[6,"aethel"],[2,"al"]]],
		                         [9,5,0,[[1,"berht"],[1,"beraht"], [1,"bryht"], [5,"bert"],[1,"beorht"],[1,"briht"]]],
		                         [5,4,4,[[1,"frithu"], [2,"frith"], [1,"fridu"], [4,"fried"], [2,"fred"], [1,"frid"]]],
		                         [9,3,2,[[2,"gunth"],[1,"gund"],[1,"gud"],[3,"gyth"]]],
 		                         [2,2,0,[[1,"hen"],[1,"haim"],[1,"heim"],[1,"haem"]]],
		                         [9,1,0,[[1,"hari"],[4,"her"],[1,"har"],[3,"ar"]]],
		                         [11,4,0,[[1,"hroth"],[1,"hruot"],[1,"rog"],[1,"rob"],[1,"rol"],[1,"rut"]]],
		                         [10,4,0,[[1,"kuni"],[1,"chun"],[1,"alsochim"],[1,"chin"],[2,"chind"],[2,"cyne"],[2,"kind"]]],
		                         [2,0,0,[[1,"kunth"],[1,"cuth"]]],
		                         [2,0,0,[[1,"kyn"],[1,"cen"],[4,"cyn"],[4,"con"],[1,"coen"]]],
		                         [16,14,0,[[1,"maere"],[3,"mer"],[3,"mar"],[10,"mir"]]],
		                         [2,0,0,[[1,"remez"],[1,"remis"]]],
		                         [8,6,0,[[1,"thegna"],[1,"degen"]]],
		                         [7,0,0,[[1,"act"],[1,"oct"],[1,"oht"]]],
		                         [8,0,0,[[6,"agil"],[1,"ail"],[2,"egil"]]],
		                         [7,0,0,[[1,"ala"]]],
		                         [13,0,0,[[9,"ald"],[3,"alt"], [1,"eald"]]],
		                         [7,0,0,[[1,"amala"]]],
		                         [12,0,0,[[6, "angil"],[4, "engel"],[1, "ingal"],[1,"ingel"]]],
		                         [7,0,0,[[2,"ar"], [2,"ara"], [1,"ari"], [2,"arni"], [1,"earn"]]],
		                         [5,0,0,[[5,"asc"], [1,"aesc"]]],
		                         [7,0,0,[[3,"aun"], [1,"on"], [3,"ean"]]],
		                         [25,8,0,[[2,"arb"], [2,"erb"], [3,"erf"], [1,"erph"], [1,"erp"],[10,"bald"],[4,"baud"], [1,"bad"], [1,"bud"]]],
		                         [33,0,0,[[1,"aus"],[2,"aur"],[2,"aos"],[1,"or"],[5,"ost"], [7,"aust"], [1,"eost"],[3,"baug"],[2,"bera"], [1,"bern"],[2,"bera"],[3,"ber"], [1,"berin"], [1,"beorn"]]],
		                         [23,0,0,[[5,"blid"],[2,"blit"][1,"plit"],[4,"bord"],[1,"port"],[1,"bort"],[1,"pord"],[4,"blic"],[1,"plic"],[4,"bil"],[1,"bel"],[1,"pil"]]],
		                         [11,0,13,[[1,"dis"], [1,"idis"],[4,"burg"],[4,"burga"],[2,"burh"],[1,"burch"],[1,"burk"], [1,"beorg"]]],
		                         [67,23,0,[[10,"brun"],[15,"dag"], [2,"tag"],[2,"dac"], [1,"tac"],[5,"brand"],[5,"brant"],[14,"folc"], [1,"forl"], [1,"volc"], [7,"fulc"], [1,"folhk"], [3,"volk"], [1,"folch"]]],
		                         [21,0,0,[[5,"dom"],[2,"druht"], [3,"droc"], [5,"druc"],[1,"thruht"], [1,"drut"],[1,"diur"], [1,"deor"],[1,"deur"], [1,"thiur"]]],
		                         [22,0,0,[[1,"ebur"], [6,"eber"],[1,"eurebur"], [1,"epar"], [1,"eofor"],[1,"euur"], [1,"ever"],[1,"ebar"], [1,"ebir"],[2,"ebor"],[1,"era"], [1,"eran"], [1,"eram"], [1,"ern"]]],
		                         [27,0,0,[[7,"ercan"], [1,"erchen"], [1,"erchan"], [1,"archsn"], [1,"ercam"], [1,"eorcen"],[6,"erl"], [1,"eorl"],[1,"ewa"], [1,"ew"], [3,"eu"], [3,"eo"]]],
		                         [37,8,6,[[8,"far"],[7,"fara"],[2,"fart"],[1,"fard"],[4,"fer"],[3,"gant"], [1,"gent"], [2,"gend"], [4,"gand"], [1,"gred"], [3,"gan"]]],
		                         [33,0,0,[[6,"fast"],[4,"fili"],[1, "feoli"],[5,"fram"],[3,"franc"],[4,"fraw"],[2,"frow"],[1,"fro"],[1,"frea"],[2,"fri"],[1,"frau"],[1,"frig"],[1,"fric"],[1,"freh"]]],
		                         [21,0,15,[[2,"flad"],[7,"flat"],[6,"fled"],[1,"flid"], [1,"flaeth"]]],
		                         [34,0,0,[[4,"frod"],[7,"frot"],[7,"frum"],[1,"gail"], [4,"geil"], [1,"gel"],[6,"gamal"], [1,"camal"], [1,"gam"],[3,"gaman"]]],
		                         [0,7,0,[[4,"funs"], [1,"phons"], [2,"fons"], [1,"fús"]]],
		                         [8,6,0,[[8,"gang"]]], 
		                         [35,35,0,[[2,"gar"], [5,"ger"], [1,"gais"]]], 
		                         [5,35,15,[[4,"gard"], [1,"gart"]]],
		                         [4,15,4,[[15,"gast"], [1,"cast"], [2,"gest"], [1,"kast"]]],
		                         [51,24,12,[[1,"gauz"], [19,"gaud"], [1,"coz"], [3,"gaus"], [1,"gauc"], [7,"goz"], [8,"gaut"], [3,"got"], [3,"god"], [1,"gaoz"], [1,"caoz"]]], 
		                         [31,3,17,[[2,"gilt"], [3,"gelt"], [19,"gild"], [2,"geld"], [1,"gold"], [1,"kelt"]]],  
		                         [22,0,0,[[4,"gifu"], [3,"geb"], [3,"gib"], [1,"gibi"], [2,"gif"], [4,"geba"], [1,"gebo"], [2,"gebe"], [1,"gip"]]],
		                         [25,0,0,[[1,"gisil"], [4,"gisel"], [2,"glis"], [1,"cros"], [1,"graus"], [1,"grao"], [1,"graw"], [3,"gra"], [2,"grim"], [1,"krim"], [3,"goma"], [1,"gomo"], [2,"gom"],[2,"gume"], [1,"guma"], [1,"gumo"]]],
		                         [14,0,0,[[1,"hagan"], [4,"hah"], [1,"hach"], [4,"hag"], [2,"haist"], [1,"heist"],[1,"hamer"], [1,"hamar"]]], 
		                         [4,0,50,[[2,"haid"], [1,"heit"], [1,"heid"], [1,"cheid"], [78,"aide"]]], 
		                         [12,1,1,[[6,"hail"], [4,"heil"], [1,"hailag"], [1,"halag"], [1,"haleg"]]],
		                         [9,0,0,[[2,"hand"], [3,"hant"],[1,"harc"], [1,"herc"], [1,"horch"], [1,"harch"]]], 
		                         [35,35,19,[[12,"hard"], [5,"heard"], [4,"hardt"], [3,"hart"]]], 
		                         [25,15,14,[[10,"hath"], [15,"had"], [5,"hada"], [1,"hadu"]]], 
		                         [10,0,0,[[1,"heah"], [1,"hoch"],[2,"hedan"], [1,"haidan"], [1,"hetan"],[3,"hilp"], [1,"help"],[3,"hilt"], [3,"hilz"], [1,"helz"], [3,"hilc"]]],
		                         [30,30,10,[[1,"helm"]]], 
		                         [35,4,50,[[10,"hild"],[1,"child"]]],
		                         [29,0,0,[[3,"himil"],[5,"hir"],[1,"hiruz"], [1,"hiriz"], [1,"herz"],[1,"hleo"], [1,"hle"],[1,"hlud"], [1,"hloda"], [2,"chlod"], [3,"lud"], [1,"hog"], [2,"huog"],[4,"hol"],[3,"hord"], [2,"hort"]]],
		                         [20,10,5,[[1,"hraban"]]],
		                         [25,0,0,[[4,"hrad"],[1,"hrat"],[1,"hraid"], [2,"hreid"], [1,"hreit"], [1,"hreith"],[5,"ing"],[1,"eorm"], [2,"ermen"], [1,"herm"], [1,"emmer"], [1,"emer"], [1,"amer"], [2,"irm"], [3,"erm"]]],
		                         [12,0,0,[[3,"hring"], [2,"ring"], [1,"rinc"],[1,"hrom"], [1,"hruom"], [2,"rom"], [2,"roum"], [1,"rum"],[2,"ise"],[1,"isen"]]], 
		                         [7,4,0,[[2,"hroc"], [2,"roc"], [1,"ruch"], [1,"hroch"], [1,"hroh"], [1,"rouc"]]],
		                         [14,5,4,[[6,"hug"], [2,"hyg"], [1,"huc"],[5,"hun"]]],
		                         [1,0,0,[[1,"kwik"],[1,"cwic"]]],
		                         [6,43,6,[[1,"laif"], [1,"laf"], [30,"leib"], [3,"lef"], [1,"laif"], [5,"liep"], [1,"liap"]]],
		                         [1,30,5,[[5,"leich"], [9,"leih"], [1,"leik"], [3,"lac"], [2,"lec"], [6,"laic"], [1,"laik"]]],
		                         [11,0,0,[[1,"laith"], [1,"leth"], [4,"leit"], [3,"laid"], [1,"leid"],[2,"lamp"]]],
		                         [11,30,10,[]],[39,"land"], [11,"lant"],
		                         [0,0,43,[[34,"laug"], [2,"louc"], [1,"leyg"],[1,"loug"], [1,"lauc"],[1,"laugr"], [1,"lauga"]]],
		                         [5,0,15,[[11,"lind"], [4,"linde"]]],
		                         [2,0,0,[[1,"liub"], [2,"leof"]]], 
		                         [2,0,0,[[2,"liuti"], [1,"lut"]]],
		                         [5,0,0,[[1,"magan"], [1,"megin"], [1,"maht"], [1,"man"], [2,"mein"], [1,"math"]]], 
		                         [0,4,0,[[4,"mund"]]], 
		                         [6,3,2,[[1,"noth"], [3,"noth"], [1,"nand"], [2,"land"]]],
		                         [8,0,0,[[1,"ragin"], [4,"regin"], [1,"rey"], [1,"raegen"], [1,"rag"]]],
		                         [0,2,2,[[2,"run"]]],
		                         [10,4,5,[[1,"raeth"], [4,"rad"], [5,"red"], [1,"rat"]]], 
		                         [11,4,0,[[3,"rich"], [3,"rech"] [1,"rick"], [2,"ric"]]],
		                         [2,0,0,[[1,"sax"], [1,"seax"], [1,"sex"]]],
		                         [26,1,0,[[17,"sig"], [1,"sigi"], [3,"sige"], [6,"sib"]]],
		                         [1,0,3,[[1,"swint"], [3,"swith"]]],
		                         [3,0,0,[[1,"tank"], [1,"tanc"], [2,"danc"]]],
		                         [0,1,0,[[1,"trygg"]]],  
		                         [10,0,0,[[8,"wal"],[1,"wel"],[1,"wael"],[1,"wei"],[1,"way"]]],
		                         [10,0,0,[[4,"wand"],[3,"wandal"], [1,"vand"], [1,"want"], [1,"wend"]]], 
		                         [8,4,2,[[1,"warin"], [1,"weard"], [4,"ward"], [3,"wern"]]],
		                         [4,3,0,[[1,"weald"], [3,"walt"], [3,"wold"]]], 
		                         [5,0,0,[[1,"widu"], [1,"wit"],[1,"wiht"],[2,"wil"],[7,"wod"]]], 
		                         [3,2,1,[[1,"wig"]]], 
		                         [4,0,0,[[3,"wini"],[1,"wyn"]]], 
		                         [2,0,0,[[2,"wil"]]],
		                         [0,9,6,[[3,"win"], [1,"wyn"], [3,"wine"], [2,"wynn"]]],
		                         [15,40,10,[[1,"wulf"]]],
		                         [11,0,0,[[1,"theod"], [3,"theod"], [5,"diet"], [1,"theud"], [1,"det"]]],  
		                         [12,1,1,[[1,"thonar"], [2,"donar"], [9,"thor"], [1,"thonar"], [1,"thun"]]], 
		                         [1,0,5,[[3,"thryth"], [1,"drut"], [3,"trude"]]],
		                         [5,0,0,[[1,"thurs"], [3,"thuris"], [1,"turis"], [1,"thus"]]]
		);
		rtnName = selectFromWeightedArray(selectFromWeightedArray(GermSyll,0),0);
		if(rtnName.length<2){rtnName="thryth";}
		rtnName = rtnName.replace(/^\S/, function(f){return f.charAt(0).toUpperCase()});
		//rtnName = selectFromWeightedArray(GermSyll,1) +"<p/>"+totalBinaryArray(GermSyll, 1);
		var gNpatt = /hild$|is$|laug$|laugr$|louc$|leyg$/;
		if(g==2){
			sufName = selectFromWeightedArray(selectFromWeightedArray(GermSyll,1),0);
		}else{
			sufName = selectFromWeightedArray(selectFromWeightedArray(GermSyll,2),0);
			if(sufName.length<2){sufName="hild";}
			if(sufName.charAt(sufName.length-1).match(/[^aeiou]$/) &&  !(gNpatt.test(sufName))){
				if(sufName.charAt(sufName.length-1).match(/d$/)){
					sufName = sufName+"is";
				}else{
					sufName = sufName+"a";
				}
			}
		}
		if(sufName ==""){sufName = "hild";}
		if(rtnName.charAt(rtnName.length-1)==sufName.charAt(0)){
			sufName = sufName.replace(/^\S/, "");
		}
		rtnName = rtnName+sufName;
		if(g == 2){
			rtnName = rtnName+" (G)m.";
		}else{
			rtnName = rtnName+" (G)f.";
		}
		return rtnName;
	}catch(err){
		return "Error in Generate Germanic Name "+err.message+ " | "+rtnName+" | "+sufName;
	}
}


function generateGreekName(g)
{
  try{
    var rtnName = "George";
    var nSyll = 3;
    var firstSylls = new Array([7,"A"],[2,"Ad"],[1,"Ai"],[3,"Al"],[1,"Am"],[2,"An"],[1,"Au"],[2,"Ba"],[1,"Bar"],[1,"Bois"],[1,"Ca"],[1,"Cal"],[1,"Ce"],[2,"Cha"],[1,"Cor"],[1,"Cu"],[1,"Da"],[1,"Dar"],[1,"Das"],[2,"De"],[1,"Dei"],[1,"Dios"],[1,"Do"],[2,"E"],[1,"En"],[2,"Eu"],[1,"Euth"],[1,"Fa"],[1,"Fron"],[1,"Fur"],[1,"Ga"],[1,"Gal"],[1,"Gen"],[1,"Go"],[1,"Gon"],[1,"Hai"],[1,"Hel"],[1,"Her"],[1,"Hy"],[2,"I"],[1,"Jam"],[1,"Jan"],[1,"Ju"],[1,"Kal"],[1,"Ke"],[1,"Lac"],[1,"Len"],[3,"Ly"],[1,"Ma"],[1,"Mae"],[1,"Me"],[1,"Mes"],[1,"Mi"],[1,"Mo"],[2,"Myr"],[1,"Nai"],[1,"Nar"],[1,"Nel"],[1,"Neo"],[2,"Ni"],[4,"O"],[1,"Og"],[1,"Pa"],[1,"Pan"],[1,"Par"],[1,"Pe"],[2,"Per"],[1,"Peu"],[1,"Phal"],[1,"Phi"],[1,"Pho"],[1,"Plo"],[1,"Po"],[1,"Pyr"],[1,"Qua"],[1,"Qui"],[1,"Quie"],[1,"Quin"],[1,"Rha"],[1,"Rhoe"],[1,"Sa"],[1,"Scau"],[1,"Scor"],[1,"Ser"],[2,"Si"],[1,"Ske"],[3,"So"],[1,"Sta"],[1,"Tau"],[1,"Tha"],[1,"The"],[1,"Theo"],[1,"Tri"],[1,"Va"],[1,"Ves"],[1,"Vi"],[3,"Xe"]);
    var secondSylls = new Array([1,"bal"],[1,"bli"],[1,"bu"],[1,"ca"],[1,"ce"],[2,"cha"],[2,"che"],[1,"chil"],[1,"cis"],[1,"cu"],[1,"cyn"],[3,"da"],[1,"dae"],[1,"di"],[2,"do"],[1,"dra"],[1,"dyl"],[1,"dym"],[1,"ga"],[1,"ger"],[1,"gi"],[1,"gur"],[1,"io"],[2,"ke"],[2,"ki"],[1,"kra"],[1,"la"],[3,"le"],[5,"li"],[1,"ly"],[1,"ma"],[1,"maa"],[4,"me"],[2,"mi"],[1,"na"],[1,"nar"],[1,"ne"],[1,"no"],[1,"nu"],[1,"or"],[1,"pa"],[1,"pha"],[1,"phi"],[1,"pyo"],[1,"ra"],[1,"re"],[1,"rhae"],[2,"ri"],[2,"ris"],[2,"ro"],[1,"rop"],[1,"ryb"],[3,"sa"],[3,"si"],[3,"ta"],[1,"tar"],[1,"tel"],[7,"ti"],[1,"tia"],[1,"to"],[1,"tu"],[1,"via"],[1,"zo"]);
    var thirdSylls = new Array([1,"ce"],[1,"da"],[1,"di"],[2,"do"],[1,"ko"],[1,"lia"],[2,"ma"],[1,"mi"],[1,"na"],[1,"ni"],[1,"pha"],[1,"ple"],[1,"ris"],[1,"sti"],[1,"sto"],[1,"tal"],[2,"to"],[2,"xan"],[1,"xe"]);
    var terminalSyllsM = new Array([1,"bael"],[1,"bas"],[1,"be"],[2,"bus"],[1,"ces"],[4,"chos"],[1,"chus"],[1,"cles"],[1,"con"],[1,"da"],[2,"das"],[1,"der"],[2,"des"],[2,"dros"],[2,"dus"],[1,"eon"],[1,"koi"],[2,"kos"],[1,"krion"],[2,"kus"],[1,"las"],[1,"ler"],[2,"les"],[1,"leus"],[1,"lis"],[1,"lo"],[1,"lon"],[3,"los"],[3,"lus"],[1,"mia"],[1,"mias"],[1,"mius"],[2,"mnos"],[1,"mos"],[1,"mus"],[2,"naeus"],[1,"nas"],[1,"neos"],[1,"neous"],[1,"nes"],[1,"ni"],[1,"nias"],[3,"nius"],[1,"noios"],[1,"non"],[1,"noos"],[1,"nor"],[3,"nos"],[9,"nus"],[1,"pas"],[1,"rda"],[1,"rhus"],[1,"ri"],[1,"rieus"],[1,"rios"],[1,"ron"],[1,"rops"],[5,"rus"],[1,"ryps"],[1,"scus"],[1,"seus"],[1,"sias"],[1,"stos"],[3,"stus"],[3,"sus"],[1,"tas"],[2,"tes"],[1,"tha"],[1,"thos"],[3,"thus"],[1,"tion"],[1,"tis"],[3,"tius"],[1,"to"],[1,"toai"],[1,"tor"],[2,"tos"],[1,"trios"],[1,"trius"],[4,"tus"],[1,"zes"]);
    var terminalSyllsF = new Array([6, "ia"],[3,"is"],[1, "ne"],[1,"ea"], [2,"a"],[1,"en"],[1,"o"]);
    var rSyll = Math.floor(Math.random()*100);
    if (rSyll < 26 )
     nSyll = 2;
   else if (rSyll < 42)
     nSyll = 4;
    else if (rSyll < 44)
     nSyll = 5;
    var rtnName =  selectFromWeightedArray(firstSylls);//firstSylls[rndSyll];
    if(nSyll > 2)
     {
		rtnName =rtnName+ selectFromWeightedArray(secondSylls);
     if (nSyll > 3)
      {
		rtnName =rtnName+ selectFromWeightedArray(thirdSylls);
      if (nSyll > 4)
      {
  		rtnName =rtnName+ selectFromWeightedArray(thirdSylls);
       }
      }
     }
    if(g > 1){
   		rtnName =rtnName+ selectFromWeightedArray(terminalSyllsM)+" (&Gamma;)m.";
    }else{
    	rtnName =rtnName+ selectFromWeightedArray(terminalSyllsF)+" (&Gamma;)f.";
    }
    return rtnName;
  }catch(err){
   return "Error in Generate Greek Name: " + err.message;
  } 
}
