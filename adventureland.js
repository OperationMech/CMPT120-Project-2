// javascript   adventureland.js
// project 4 - final (v 0.7 - end)
// current location
var curLoc = null;

//new adventureland inventory
advInventory = new Array();

function addToInventory (object) {
}

// helper print function
function printCurrentLocation() {
  print_Game(curLoc.description);
}

// helper visited function
function visitLocation() {
  curLoc.visited = true;
}

adventureControl(msg) {
  var input = msg.toLowerCase();
  switch (input[0]) {
    case "n":
	    goNorth();
        break;
	case "s":
	    goSouth();
		break;
	case "e":
	    goEast();
		break;
	case "w":
	    goWest();
		break;
	case "pickup":
	    addToInventory ();
		break;
	case "use":
	    interactLocation();
		break;
	case "map":
	    if(has_map === true)
		   updateMap();
		else
		   make_mental_map(
	    
		
  }
}

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
  centralWood= new Location ("Central Wood");
  centralWood.description = "There is a stone nestled between two large pine trees.  " + "The stone has an auora around it.  " +
                            "As you get closer to the stone it organizes surface inscriptions into readable text.";
  centralWood.initialize("EldarStone");							
  northWood = new Location ("North Wood");
  northWood.description = "";
  northWood.initialize("EldarWood");
  
  northWood.south = centralWood;
  northWood.north = arcanePlains;
  
  southWood = new Location ("South Wood");
  southWood.description = "";
  
  southWood.north = centralWood;
  southWood.south = tumbPlainsNorth;
  southWood.east = s_eastWood;
  
  eastWood = new Location("East Wood");
  eastWood.description = "";
  eastWood.initialize("Enchanted Wood Pulp" /* item */ );
  
  eastWood.west = centralWood;
  eastWood.east = eastJetty;
  
  westWood = new Location ( "West Wood");
  westWood.description = "";
  
  westWood.west = iceWall;
  westWood.east = centralWood;
  
  n_westWood  = new Location ( "North Temple");
  n_westWood.description = "";
  n_westWood.initialize("switch");
  
  n_westWood.south = westWood;
  westWood.north = n_westWood;
  
  s_eastWood = new Location ( "South Grotto");
  s_eastWood = "";
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
  iceWall.description = "";
  
  iceWall.east = westWood;  
}

//north mount init
function initNorthMount() {
  arcanePlains = new Location ( "Arcane Plains");
  arcanePlains.description = "";

  arcanePlains.south = northWood;  
}

//Bleeding Rock Mines init 
function initBlRkMines() {
}

//Tumbling Plains init
function initTumbPlains() {
  tumbPlainsNorth = new Location ("Northern Plains");
  tumbPlainsNorth.description = "";
  
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
  eastJetty = new Location ( "Eastern Jetty", "Lighthouse");
  eastJetty.description = "";
  
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
  make_map();
}

//TODO add new direction handler adventure_control(input);