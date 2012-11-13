// javascript   adventureland.js

// current location
var curLoc = null;

//new adventureland inventory
advInventory = new array();

// helper print function
function printCurrentLocation() {
  print_Game(curLoc.description);
}

// helper visited function
function visitLocation() {
  curLoc.visited = true;
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
  centralWood= new Location ("Central Wood", "EldarStone");
  centralWood.description = "There is a stone nestled between two large pine trees.  " + "The stone has an auora around it.  " +
                            "As you get closer to the stone it organizes surface inscriptions into readable text.";							
  northWood = new Location ("North Wood", "EldarWood");
  northWood.description = "";
  
  northWood.south = centralWood;
  northWood.north = arcanePlains;
  
  southWood = new Location ("South Wood");
  southWood.description = "";
  
  southWood.north = centralWood;
  southWood.south = tumbPlainsNorth;
  southWood.east = s_eastWood;
  
  eastWood = new Location("East Wood", "Enchanted Wood Pulp");
  eastWood.description = "";
  
  eastWood.west = centralWood;
  eastWood.east = eastJetty;
  
  westWood = new Location ( "West Wood", "Scorpion Obelisk");
  westWood.description = "";
  
  westWood.west = iceWall;
  westWood.east = centralWood;
  
  n_westWood  = new Location ( "North Temple", "switch");
  n_westWood.description = "";
  
  n_westWood.south = westWood;
  westWood.north = n_westWood;
  
  s_eastWood = new Location ( "South Grotto", "Enchanted Spring");
  s_eastWood = "";
  
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