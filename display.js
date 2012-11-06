// javascript  display.js

function initializeGame() {
  // game init function - displays initial text
  print_Game("You awake, startled and confused. \"Welcome, INSERT NAME, to the Enrichment Center!\"," + 
         "says an automated message.  You look around to see a few items, a button, a small facility map, your \"bed\", " + 
		 "three glass walls, and a panel wall. A timer is above it flashing 00:00:00.  " + 
		 "The wall seems to be mobile: it is attached to rails on the right and left sides.");
  isUninitialized = false;
  var map_key = document.getElementById("map_key");
  var facility_map = document.getElementById("main_map");
  map_key.value = "Local:              Global: \n" +
                   "~ = glass pane  [ ] = chamber\n" +
                   "^ = player        [x] = You are here\n" +
				   "* = panel        ^ < > v = arrows\n" +
				   "! = interactible\n";
}

//  Simple function to update the text area
function print_Game(message) {
   var game_area = document.getElementById("Game_area");
   if(isUninitialized) {
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
   var mapArea = document.getElementById("map_location");
   mapArea.value = map_string;
}