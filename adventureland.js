// javascript   adventureland.js

//global vars
// keep track of main x,y coords start in center
var currentMetaXY = 5;
// keep track of area x,y coords start in center
var currentXY = 5;

// helper print function
function printCurrentLocation() {
  print_Game(Adventureland[currentMetaXY].locations[currentXY].description);
}

// helper visited function
function visitLocation() {
  Adventureland[currentMetaXY].locations[currentXY].visited=true;
}

//Enchanted wood init
function initEncWood() {
  var addMetaLocation = new metaLocation("Enchanted Wood");
  var addLocation = new Location("Central Wood", "EldarStone");
  addLocation.description = "A bright flash occurs, and you end up in a heavily wooded area.  " +
							"There is a stone nestled between two large pine trees.  " + "The stone has an auora around it.  " +
                            "As you get closer to the stone it organizes surface inscriptions into readable text.";
  addMetaLocation.locations[5] = addLocation;
  Adventureland[5] = addMetaLocation;
  // TODO add the 8 remaining locations
}

//Glacier init
function initGlacier() {
}

//Mt Vulcon init
function initMtVulcon() {
}

//Bleeding Rock Mines init 
function initBlRkMines() {
}

//Tumbling Plains init
function initTumbPlains() {
}

//Northwest Chasm init
function initNWChasm() {
}

//Southwest Mountain Range
function initSWRange() {
}

//East Coast
function initECoast() {
}

//Northeast swamp
function initNESwamp() {
} 

function init_adventure_land() {
  initEncWood();
  printCurrentLocation();
  visitLocation();
  make_map();
}

//TODO add new direction handler adventure_control(input);