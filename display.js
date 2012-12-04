// javascript  display.js

// map html vars - null, awaiting init
var mapKey = null;
var mapLocal = null;
var mainMap = null;

// html button vars - null, awaiting init
var b_north = null;
var b_south = null;
var b_east = null;
var b_west = null;

function initializeGame() {
  // game init function - displays initial text also updates all document objects
  
  // init map html objects
  mapKey = document.getElementById("map_key");
  mapLocal = document.getElementById("map_location");
  mainMap = document.getElementById("main_map");
  
  // init html buttons
  b_north = document.getElementById("btnNorth");
  b_south = document.getElementById("btnSouth");
  b_east = document.getElementById("btnEast");
  b_west = document.getElementById("btnWest");
  
  print_Game("You awake, startled and confused. \"Welcome, INSERT NAME, to the Enrichment Center!\"," + 
         "says an automated message.  You look around to see a few items, a button, a small facility map, your \"bed\", " + 
		 "three glass walls, and a panel wall. A timer is above it flashing 00:00:00.  " + 
		 "The wall seems to be mobile: it is attached to rails on the right and left sides.");
  not_initialized = false;
  mapKey.value = "Local:              Global: \n" +
                 "~ = glass pane  [ ] = chamber\n" +
                 "^ = player        [x] = You are here\n" +
				 "* = panel        ^ < > v = arrows\n" +
				 "! = interactible\n";
  make_map();
}

//  Simple function to update the text area
function print_Game(message) {
   var game_area = document.getElementById("Game_area");
   if(not_initialized) {
     game_area.value = "";
     game_area.value = message;
	} else {
	 game_area.value = game_area.value + "\n\n" + message ;
     game_area.scrollTop = game_area.scrollHeight;
	}
}

// Simple invintory listing function
function display_inventory() {
  var list = "";
  if(inventory.length === 0){
    print_Game("No items in inventory")
  } else {
    for(var i = 0; i < inventory.length - 1; i++) {
	  list = list + inventory[i] + ","
	}
	list = list + "" + inventory[inventory.length - 1];
	print_Game("[Inventory]: " + list);
  }
}

// mental map function
function make_mental_map(map_string) {
   mapLocal.value = map_string;
}

// map function
function make_map() {
  if(!is_virtualized){
    switch (current_location) {
	  case 0:
	   mainMap.value = "\n\n" + "            [ ]>[ ]\n" +
						"            ^     v\n"+ "        [ ]>[ ]  [ ]\n" +
						"        ^    \n"+ "        [x]";
		break;
	  case 2:
	   mainMap.value = "\n\n" + "            [ ]>[ ]\n" +
						"            ^     v\n"+ "        [x]>[ ]  [ ]\n" +
						"        ^    \n"+ "        [ ]";
		break;
	  case 4:
	    mainMap.value = "\n\n" + "            [ ]>[ ]\n" +
						"            ^     v\n"+ "        [ ]>[x]  [ ]\n" +
						"        ^    \n"+ "        [ ]";
		break;
	  case 5:
	    mainMap.value = "\n\n" + "            [x]>[ ]\n" +
						"            ^     v\n"+ "        [ ]>[ ]  [ ]\n" +
						"        ^    \n"+ "        [ ]";
		break;
	  case 6:
	    mainMap.value = "\n\n" + "            [ ]>[ ]\n" +
						"            ^     v\n"+ "        [ ]>[ ]  [x]\n" +
						"        ^    \n"+ "        [ ]";
		break;
	  case 7:
	    mainMap.value = "\n\n" + "            [ ]>[x]\n" +
						"            ^     v\n"+ "        [ ]>[ ]  [ ]\n" +
						"        ^    \n"+ "        [ ]";
		break;
	  default:
	    mainMap.value = ""; // map is not a major area or alternate path
		break;
	}
  } else {
     mainMap.value =""; // purge old map
  }
}