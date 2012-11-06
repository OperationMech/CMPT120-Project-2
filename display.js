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
     game_area.scrollBottom = textArea.scrollHeight;
	}
}