// javascript   adventureland.js
// project 4 - final (v 0.7 - v1.0)
// current location
var curLoc = null;

//new adventureland inventory
var advInventory = new Array();

// adventureland power variable
var worldHasPower = false;

// item based inventory adder
function addToInventory () {
  if (curLoc.interactible !== null){
    if(typeof(curLoc.interactible) !== 'string'){
	  print_Game("You found " + curLoc.interactible.description + ".");
	  advInventory[advInventory.length] = curLoc.interactible;
	  curLoc.interactible = null;
	  score = score + 100;
	} else {
	  print_Game("You struggled trying to pickup a " + curLoc.interactible +".");
	}
  } else {
    print_Game("There is nothing to pickup here.")
  }
}

// item based inventory display
function displayInventory() {
  var list = "";
  for(var i = 0; i < advInventory.length; i ++) {
    if( i === advInventory.length - 1 || advInventory.length === 1) {
	  list = list + advInventory[i].name;
	} else {
      list =  list + advInventory[i].name + ", "; 
	}
  }
  print_Game(list);
}

// helper print function
function printCurrentLocation() {
  print_Game(curLoc.description);
}

// pointer navigation - uses a simple array and curLoc to change direction
function goDir(dir) {
  var directions = new Array();
  directions[0] = curLoc;
  directions[1] = curLoc.north;
  directions[2] = curLoc.south;
  directions[3] = curLoc.east;
  directions[4] = curLoc.west;
  if(directions[dir] !== null) {
    curLoc = directions[dir];
	moves = moves + 1;
	increase_score_once();
	printCurrentLocation();
	updateAdvButtons();
  } else {
    print_Game ("There is an obstacle in the way.")
  }
  testWin();
}

// update buttons based on the location change uses curLoc immeadiately after change
 function updateAdvButtons() {
  if(curLoc.north !== null)
  {
    b_north.disabled = false;
  } else {
    b_north.disabled = true;
  }
  if(curLoc.south !== null)
  {
	b_south.disabled = false;
  } else {
	b_south.disabled = true;
  }
  if(curLoc.east !== null)
  {
	b_east.disabled = false;
  } else {
	b_east.disabled = true;
  }
  if(curLoc.west !== null)
  {
	b_west.disabled = false;
  } else {
	b_west.disabled = true;
  }
}

// new command parser called from the old one after virtualization occurs
function adventureControl(msg) {
  var input = msg.toLowerCase().split(" ");
  switch (input[0]) {
    case "n":
	    goDir(1);
        break;
	case "s":
	    goDir(2);
		break;
	case "e":
	    goDir(3);
		break;
	case "w":
	    goDir(4);
		break;
	case "pickup":
	    addToInventory();
		break;
	case "use":
	    interactLocation();
		break;
	case "map":
	    if(has_map === true){
		   updateMap();
		} else {
		   print_Game("You do not have a map.");
		}
		break;
    case "inventory":
	    displayInventory();
		break;
	default:
	   print_Game("Valid commands are:\n directions(n,s,e,w), inventory, pickup, or use.");
	   break;
  }
}

// replace item function
function replaceItem(name, item) {
  for(var i = 0; i < advInventory.length; i++) {
    if(name === advInventory[i]) {
	  advInventory[i] = item;
	  score = score + 200;
	  increase_score_once();
	} else {
	  // do nothing
	}
  }
}

//remove item function
function removeItem(name) {
  for(var i = 0; i < advInventory.length; i++) {
    if(name === advInventory[i]) {
	  advInventory[i] = null;
      score = score + 100;
	  increase_score_once();
	} else {
	  // do nothing
	}
  }
}

// check inventory function
function checkInventory(name) {
  for(var i = 0; i < advInventory.length; i++) {
    if(name === advInventory[i]) {
	  return true;
	} else {
	  // do nothing
	} 
  }
  return false;
}

// location interaction function
function interactLocation(){
  if(curLoc.interactible !== null){
    switch (curLoc.interactible) {
	  case "EldarWood":
	    if(checkInventory("axe")) {
		   print_Game("You use the axe on the lone tree, and a piece of amber falls off.");
		   item = new Item("amber");
		   item.description = " a piece of amber";
		   curLoc.initialize(item);
		} else {
		  print_Game("You need an axe.");
		}
		break;
	  case "Lighthouse":
	    if(!worldHasPower) {
		  curLoc = lightHouse;
		  printCurrentLocation();
		  increase_score_once();
		  updateAdvButtons();
		  moves = moves + 1;
		} else {
		  print_Game("The door is jammed.");
		}
	    break;
	  case "switch":
	    print_Game("It failed to move.");
		break;
	  case "Climable wall":
	    if(checkInventory("Ice Climbing Gear")) {
		   print_Game("You use the gear on the wall.");
		   curLoc = glacialPlain;
		   moves = moves + 1;
		   increase_score_once();
		   printCurrentLocation();
		   updateAdvButtons();
		} else {
		  print_Game("You need Ice Climbing Gear.");
		}
		break;
	  case "Fuse Socket":
	    if(checkInventory("Fuse")){
		  print_Game("You place the fuse in the socket. The machines startup.");
		  removeFromInventory("Fuse");
		  worldHasPower = true;
		  curLoc.interactible = "infuser";
		} else {
		  print_Game("You need a Fuse.");
		}
		break;
	  case "An odd shaped piece of iron ore":
	    if(checkInventory("pickaxe")) {
		   print_Game("You use the pickaxe on the stone.  The chunk disloges.");
		   item = new Item("iron ore");
		   item.description = " oddly shaped iron ore";
		   curLoc.initialize(item);
		} else {
		  print_Game("You need a pickaxe.");
		}
		break;
	  case "infuser":
	    if(checkInventory("amber")) {
		   print_Game("You use the infuser by feeding it a piece of amber.");
		   item = new Item("Arcane amulet");
		   item.description = " the power of summer";
		   replaceItem("amber", item);
		   curLoc.interactible = "furnace";
		} else {
		  print_Game("You need a pickaxe.");
		}
	  case "furnace":
	    if(checkInventory("iron ore")) {
		  print_Game("You smelt the shaped iron into a sword");
		  item = new Item("Sword");
		  item.description = " dragon's bane";
		  replaceItem("iron ore", item);
		} else {
		  print_Game("You need iron ore.")
		}
		break;
	  default:
	    print_Game( "That object is not interactible try another command.");
		break;
	}
  } else {
    print_Game("There is nothing to do here.");
  }
}

function testWin(){
  if(score >= 750) {
    curLoc = facilityEnd;
    print_Game("The game environment collapses, you end up back in the facility. A few minutes pass before you realize the facility is falling apart.");
	print_Game("You travel through the collapsed chamber reaching the main hallway.");
	print_Game("You hear sounds coming from the control room but the door is sealed.");
	print_Game("You setp outside as the world flashes white.");
	print_Game("");
	print_Game("Thank You for playing Qunatumplexing.");
	print_Game("To replay the game please reload the page.");
	print_Game("Final score: " + score*(moves/3) );
  } else {
   // do nothing
  }
}

// button handler for adventureland
function adventurelandButtons(direction) {
  switch (direction) {
    case 1:
	   adventureControl("n");
	   break;
	case 2:
	   adventureControl("s");
	   break;
	case 3:
	   adventureControl("e");
	   break;
	case 4:
	   adventureControl("w");
	   break;
	default:
	   alert("this should not happen.") // Error message
	   break;
  }  
}

//general initialize locations function
function initWorld() {
  initNorthWestChasm();
  initGlacier();
  initNorthMount();
  initBlRkMines();
  initSouthWestRange();
  initTumbPlains();
  initNorthEastSwamp();
  initEastCoast();
  initEnchantedWood();
  }
//Enchanted wood init
function initEnchantedWood() {
  
  var item = new Item();
  
  centralWood.description = "There is a stone nestled between two large pine trees.  " + 
							"The stone has an auora around it.  " +
                            "As you get closer to the stone it organizes surface inscriptions into readable text.";
							
  centralWood.initialize("EldarStone");	
  
  northWood.description = "You reach the north end of the Wood, there is a large single tree." + 
						  "You see the entire northern area.  " + 
                          "From a chasm to a volcanic mountain, and to what seems to be a swamp.  "+ 
						  "There is a hostile plain between you and the volcanic mountain";
						  
  northWood.initialize("EldarWood");
  
  northWood.south = centralWood;
  northWood.north = arcanePlains;
  
  southWood.description = "You reach the south end of the wood.  " + 
						  "There is a small wooded pond to the east.  " + 
						  "A plain stretches as far as one can see south.";
  
  southWood.north = centralWood;
  southWood.south = tumbPlainsNorth;
  
  eastWood.description = "You reach the eastern clearing.  " + 
						 "You see a motar and pestle on a log.  " +
						 "You can hear the sound of waves creashing further east."
						 "There is a light eastern wind.";
  
  item = new Item("Enchanted Wood Pulp");
  item.description = "a small pile of Enchanted Wood Pulp"
  
  eastWood.initialize(item);
  
  eastWood.west = centralWood;
  eastWood.east = eastJetty;
  
  westWood.description = "A densely forested area.  " + 
						 "Within the packed brush there is a large structure." +
						 "There seems to be a worn out inscription on it.";
  
  westWood.west = iceWall;
  westWood.east = centralWood;
 
  n_westWood.description = "You reach a small clearing in the dense forest.  " +
						   "There is a door in a wall of plants.  " + 
						   "There is also a switch on a rocky structure nearby.";
  n_westWood.initialize("switch");
  
  n_westWood.south = westWood;
  westWood.north = n_westWood;
  
  s_eastWood.description = "You reach where the pond was to find only a shining light in a clearing.";
  
  s_eastWood.north = eastWood;
  eastWood.south = s_eastWood;
  southWood.east = s_eastWood;
  s_eastWood.west = southWood;
  
  centralWood.east = eastWood;
  centralWood.west = westWood;
  centralWood.north = northWood;
  centralWood.south = southWood;
}

//Glacier init
function initGlacier() {
  var item = new Item("Ice Climbing Gear");
  item.description = " all the gear necessary for climbing ice";
  
  iceCave.description = "The cave is cold and well illuminated, and there is some stuff strewn about.";
  
  iceCave.initialize(item);
  iceCave.east = lowerIceShelf;
  
  lowerIceShelf.description = "The glacier creates an overhang which you enter.  There is a cavern in the ice to the west.";
  lowerIceShelf.north = iceWall;
  lowerIceShelf.west = iceCave;
  
  
  iceWall.description = "A 100 ft wall of ice impedes your progress west: ice climbing gear may help.";
  iceWall.initialize("Climable ice");
  iceWall.east = westWood;
  iceWall.south = lowerIceShelf;
  
  westIceChasm.description = "Even with the blustery winds and snow you reach a chasm.  There is a narrow north path leading down into the chasm.";
  westIceChasm.east = glacialPlain; 
  westIceChasm.north = l_WestIceChasm;
  
  iceArena.description = "The entrance seals as you enter.  You behold a small altar made of ice and stone.";
  
  l_WestIceChasm.description = "You reach the bottom of the chasm.  There is a narrow entrance to the north.  Wind seems to be coming from there.";
  l_WestIceChasm.north = iceArena;
  
  glacialPlain.description = "Atop the Glacier the weather suddenly shifts, a blizzard begins.  The wind comes from the west.";
  glacialPlain.west = westIceChasm;
  
}

//north mount init
function initNorthMount() {
  
  forgePlant.description = "Through the volcanic toxic fog you reach a facility and enter it.  The facility contains a number of machines.";
  forgePlant.initialize("Fuse Socket");
  forgePlant.east = arcanePlains;
  
  mountFoot.description = "With protection you reach the foot of the volcanic mountain. There is a lavaflow between you and the mountain itself.";
  mountFoot.south = arcanePlains;
  
  arcanePlains.description = "You begin traveling to the mountain when you feel weak and dazed. The air seems to be toxic.";
  arcanePlains.south = northWood;
  arcanePlains.west = forgePlant;
  
  craterKeep.description = "The halls of the obsidian keep are eerily silent.  You reach the throne room and the dragon enters from above.";
  craterKeep.south = mountFoot;  
}

//Bleeding Rock Mines init 
function initBlRkMines() {
  lowerOverlook.description = "You reach some sort of construction area, there are caution signs everywhere as well as orange mesh fence near edges. The land slopes up higher south. To the east there is an access path to the rocky bottom.";
  lowerOverlook.north = eastCoastBluff;
  lowerOverlook.south = upperOverlook;
  lowerOverlook.east = strippedLand;
  
  upperOverlook.description = "You reach a small outlook post above what seems to be a mine.  There are caution signs everywhere as well as orange mesh fence near edges.  To the west the land starts rising.  There seems to be a lower outlook to the north.";
  upperOverlook.north = lowerOverlook;
  upperOverlook.west = eastPlainsSlope;
  
  strippedLand.description = "The rocky ground of the pit seems to be rich in iron from the presence of small rusty pools of water.  There is an entrance to the west and the sound of running water further south.";
  strippedLand.south = ironStream;
  strippedLand.north = lowerOverlook;
  strippedLand.west = BlRkMineA;
  
  ironStream.description = "You reach a stream which is nearly blood red in color.  It seems to feed from the west."
  ironStream.north = strippedLand;
  ironStream.west = ironBasin;
  
  ironBasin.description = "You find the source of the stream to be a small spring which is the same color indicating the iron rich rock present."
  ironBasin.east = ironStream;
  
  BlRkMineA.description = "Enough natural light makes it into the mine to see without power; however, the depth of the distant wall indicates the mine continues.  There are two doorways into the tunnel one north and one south.";
  BlRkMineA.north = BlRkMineA_RM1;
  BlRkMineA.south = BlRkMineA_RM2;
  BlRkMineA.east = strippedLand;
  
  item = new Item("axe")
  item.description = " an axe";
  
  BlRkMineA_RM1.description = "A small mining room with some tools.";
  BlRkMineA_RM1.initialize(item);
  BlRkMineA_RM1.south = BlRkMineA;
  
  item = new Item("pickaxe")
  item.description = " a pickaxe";
  
  BlRkMineA_RM2.description = "An unfinished mine branch with a few tools left.";
  BlRkMineA_RM2.initialize(item);
  BlRkMineA_RM2.north = BlRkMineA;
  
  BlRkMineA_B.description = "A significantly sloped tunnel in the mine.";
  BlRkMineA_B.north = BlRkMineB;
  BlRkMineA_B.east = BlRkMineA;
  
  BlRkMineB.description = "A deeper mining tunnel with only one doorway west.";
  BlRkMineB.west = BlRkMineB_RM1;
  BlRkMineB.south = BlRkMineA_B;
  BlRkMineB.north = BlRkMineB_C;
  
  BlRkMineB_RM1 = "An empty unfinished mining tunnel.";
  BlRkMineB_RM1.east = BlRkMineB;
  
  BlRkMineB_C.description = "A sloped mining layer transition.";
  BlRkMineB_C.south = BlRkMineB;
  BlRkMineB_C.east = BlRkMineC;
  
  BlRkMineC.description = "Another mining hallway with two doorways; however, the end is collapsed.";
  BlRkMineC.west = BlRkMineB_C;
  BlRkMineC.north = BlRkMineC_RM1;
  BlRkMineC.south = BlRkMineC_Mineshaft;
  
  BlRkMineC_RM1.description = "A small room.";
  BlRkMineC_RM1.initialize("An odd shaped piece of iron ore");
  BlRkMineC_RM1.south = BlRkMineC;
  
  BlRkMineC_Mineshaft.description = "You stand on the short ledge while looking down into the mineshaft.  There are three more levels visable before complete darkness.";
  BlRkMineC_Mineshaft.north = BlRkMineC;
}

//Tumbling Plains init
function initTumbPlains() {
  tumbPlainsNorth.description = "You reach a small foothill in the plains.  You take a breather.  " + 
								"The wood is considerably north now." +
								"There is a mountain range far west. There are more plains south.";
  
  tumbPlainsNorth.north = southWood;
  tumbPlainsNorth.south = centralPlains;
  
  centralPlains.description = "Upon traveling deeper into the plains you see the terrain dip east, the south having more plains, and the range being west.";
  centralPlains.south = southInfinity;
  centralPlains.north = tumbPlainsNorth;
  centralPlains.west = westFountain;
  centralPlains.east = eastPlainsSlope;
  
  southInfinity.description = "More plains."
  southInfinity.east = southInfinity;
  southInfinity.west = southInfinity;
  southInfinity.south = southInfinity;
  southInfinity.north = centralPlains;
  
  westFountain.description = "A random fountain is in the plains.  You approach carefully.  It seems to be dry.";
  westFountain.west = footHill;
  westFountain.east = centralPlains;
  
  eastPlainsSlope.description = "The land slopes severely east and large rock walls are visable on the horizon.";
  eastPlainsSlope.west = centralPlains;
  eastPlainsSlope.east = upperOverlook;
}

//Northwest Chasm init
function initNorthWestChasm() {
  item = new Item ("Ice Shard");
  item.description = " a large fragment of ice";
  
  chasmicValley.description = "You end up in a less cold, but still cold chasm.  There is a general slope and haze eastward.";
  chasmicValley.initialize(item);
  chasmicValley.east = forgePlant; 
  
}

//Southwest Mountain Range
function initSouthWestRange() {
  footHill.description = "You reach a smaller mountain of the Range which has a path south."
  footHill.east = westFountain;
  footHill.south = outlookPost;
  
  outlookPost.description = "From the peak you can see the plains, a pit, the ocean, the woods and the volcano clearly.";
  outlookPost.north = footHill;  
  
}

//East Coast
function initEastCoast() {
  coastGate.description = "You travel along the coast until you reach a worn out iron gate."
  coastGate.south = eastJetty;

  eastJetty.description = "You go on to a jetty which has a lighthouse.";
						  
  eastJetty.initialize("Lighthouse");
  
  eastJetty.west = eastWood;
  eastJetty.south = eastCoastBluff;
  eastJetty.north = coastGate;
  
  item = new Item("Fuse");
  item.description = " a single large fuse"
  
  lightHouse.description = "A semi-standard interior of a lighthouse; however, there are not any stairs to reach the top.  There are some random boxes."
  lightHouse.initialize(item);
  lightHouse.west = eastJetty;
  
  eastCoastBluff.description = "Upon reaching the southernmost bluff you take a breather.  The terrain is passable south."
  eastCoastBluff.south = lowerOverlook;
  eastCoastBluff.north = eastJetty;
}

//Northeast swamp
function initNorthEastSwamp() {
  enchantedGrotto.description = "You end up waist deep in water. There is a slight current pulling south."
  enchantedGrotto.south = coastalSwamp;
  
  coastalSwamp.description = "You reach an iron gate.  It seems to be ancient.  There is a tree with a vines which covers a visable wall."
  coastalSwamp.initialize("vined wall");
} 

function init_adventure_land() {
  current_location = -1;
  initWorld();
  print_Game("A bright flash occurs, and you end up in a heavily wooded area.");
  curLoc = centralWood;
  printCurrentLocation();
  increase_score_once();
  updateAdvButtons();
  var mapKey = document.getElementById("map_key");
  mapKey.value = "Local:              Global: \n" +
                  "n/a       [ ] = location\n" +
                  "n/a       [x] = You are here\n" +
				  "n/a        ^ < > v = arrows\n" +
				  "n/a";
  make_map();
}