// javascript   adventureland.js
// project 4 - final (v 0.7 - v0.9)
// current location
var curLoc = null;

//new adventureland inventory
advInventory = new Array();


function addToInventory () {
  if (curLoc.interactible !== null){
    if(typeof(curLoc.interactible) !== 'string'){
	  print_Game("You found " + curLoc.interactible.description + ".");
	  advInventory[advInventory.length] = curLoc.interactible;
	  curLoc.interactible = null;
	  score = score + 100;
	} else {
	  print_Game("You struggled trying to pickup a " + curLoc.interactible.name +".");
	}
  } else {
    print_Game("There is nothing to pickup here.")
  }
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
}

// update buttons based on the location change uses curLoc immeadiately after change
updateAdvButtons();
{
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
adventureControl(msg) {
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
	    addToInventory ();
		break;
	case "use":
	    interactLocation();
		break;
	case "map":
	    if(has_map === true){
		   updateMap();
		} else {
		   print_Game("You do not have a map");
		}
		break;
    case "inventory":
	    displayInventory();
		break;
	case default:
	   print_Game("Valid commands are:\n directions(n,s,e,w), inventory, pickup, or use."
	   break;
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
  initEnchantedWood();
  initGlacier();
  initNorthMount();
  initBlRkMines();
  initTumbPlains();
  initNorthWestChasm();
  initSouthWestRange();
  initEastCoast();
  initNorthEastSwamp();
  }
//Enchanted wood init
function initEnchantedWood() {
  
  var item = new Item();
  
  centralWood = new Location ("Central Wood");
  centralWood.description = "There is a stone nestled between two large pine trees.  " + 
							"The stone has an auora around it.  " +
                            "As you get closer to the stone it organizes surface inscriptions into readable text.";
							
  centralWood.initialize("EldarStone");	
  
  northWood = new Location ("North Wood");
  northWood.description = "You reach the north end of the Wood, there is a large single tree." + 
						  "You see the entire northern area.  " + 
                          "From a chasm to a volcanic mountain, and to what seems to be a swamp.  "+ 
						  "There is a hostile plain between you and the volcanic mountain";
  northWood.initialize("EldarWood");
  
  northWood.south = centralWood;
  northWood.north = arcanePlains;
  
  southWood = new Location ("South Wood");
  southWood.description = "You reach the south end of the wood.  " + 
						  "There is a small wooded pond to the east.  " + 
						  "A plain stretches as far as one can see south.";
  
  southWood.north = centralWood;
  southWood.south = tumbPlainsNorth;
  southWood.east = s_eastWood;
  
  eastWood = new Location("East Wood");
  eastWood.description = "You reach the eastern clearing.  " + 
						 "You see a motar and pestle on a log.  " +
						 "You can hear the sound of waves creashing further east."
						 "There is a light eastern wind.";
  
  item = new Item("Enchanted Wood Pulp");
  item.description = "a small pile of Enchanted Wood Pulp"
  
  eastWood.initialize(item);
  
  eastWood.west = centralWood;
  eastWood.east = eastJetty;
  
  westWood = new Location ( "West Wood");
  westWood.description = "A densely forested area.  " + 
						 "Within the packed brush there is a large structure." +
						 "There seems to be a worn out inscription on it.";
  
  westWood.west = iceWall;
  westWood.east = centralWood;
  
  n_westWood  = new Location ( "North Temple");
  n_westWood.description = "You reach a small clearing in the dense forest.  " +
						   "There is a door in a wall of plants.  " + 
						   "There is also a switch on a rocky structure nearby.";
  n_westWood.initialize("switch");
  
  n_westWood.south = westWood;
  westWood.north = n_westWood;
  
  s_eastWood = new Location ( "South Grotto");
  s_eastWood.description = "You reach where the pond was to find only a shining light in a clearing.";
  s_eastWood.initialize("Enchanted Spring");
  
  s_eastWood.north = eastWood;
  eastWood.south = s_eastWood;
  
  centralWood.east = eastWood;
  centralWood.west = westWood;
  centralWood.north = northWood;
  centralWood.south = southWood;
  
}

//Glacier init
function initGlacier() {
  iceWall = new Location ( "Eastern Glaciation");
  iceWall.description = "A 100 ft wall of ice impedes your progress this way.";
  
  iceWall.east = westWood;  
}

//north mount init
function initNorthMount() {
  arcanePlains = new Location ( "Arcane Plains");
  arcanePlains.description = "You begin traveling to the mountain when you become weak and dazed.";

  arcanePlains.south = northWood;  
}

//Bleeding Rock Mines init 
function initBlRkMines() {
}

//Tumbling Plains init
function initTumbPlains() {
  tumbPlainsNorth = new Location ("Northern Plains");
  tumbPlainsNorth.description = "You reach a small foothill in the plains.  You take a breather.  " + 
								"The wood is considerably north now.  You can see something east.  " +
								"There is a mountain range far west.";
  
  tumbPlainsNorth.north = southWood;
}

//Northwest Chasm init
function initNorthWestChasm() {
}

//Southwest Mountain Range
function initSouthWestRange() {
}

//East Coast
function initEastCoast() {
  eastJetty = new Location ( "Eastern Jetty");
  eastJetty.description = "You leave the forest for the coastline.  " + 
						  "You go on to a jetty which has a lighthouse.  ";
  
  eastJetty.west = eastWood;
}

//Northeast swamp
function initNorthEastSwamp() {
} 

function init_adventure_land() {
  initWorld();
  print_Game("A bright flash occurs, and you end up in a heavily wooded area.");
  curLoc = centralWood;
  printCurrentLocation();
  visitLocation();
   map_key.value = "Local:              Global: \n" +
                   "n/a       [ ] = location\n" +
                   "n/a       [x] = You are here\n" +
				   "n/a        ^ < > v = arrows\n" +
				   "n/a";
  make_map();
}