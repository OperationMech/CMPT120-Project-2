// Javascript

//Global variables
var is_last_traveler = false;
var north_panel_hits_remaining = 4;
var has_map = false;
var locations = [["chamber0", true, "button", "The panel lifts up and rises overhead. A hallway is revealed."], 
                 ["hallway",false, "manipulator"], 
				 ["chamber1", false, "socket", "The announcer comes on to congragulate you on your sucess of lowering the bridge." ], 
				 ["incinerator", false, "manipulator", "You proceed through the maintainance areas until you see an opening back into the testing area. You enter Chamber 3."], 
				 ["chaimber2", false, "switch"]];
var current_location = 0;
var score = 0;

function interaction_selector() {
  //Text based command selector
    var command = document.getElementById("Command_area");
    if(command.value !== 0) {
    
      if(command.value.toLowerCase() === "n") {
        change_location("north");
      } else if(command.value.toLowerCase() === "s") {
        change_location("south");
      } else if(command.value.toLowerCase() === "e") {
        change_location("east"); 
      } else if(command.value.toLowerCase() === "w") {
        change_location("west"); 
      } else if(command.value.toLowerCase() === "interact:") { 
        interact_location(command);
      }
	  
    } else {
      Print_Game("Your character scratches his head.");
    }
}

//  Simple function to update the text area
function print_Game(message) {
   game_area = document.getElementById("Game_area");
   game_area.value = message + "\n\n" + game_area.value;
}

function change_location_button(dir) {
  //Buttton to location conversion
    var game_area = document.getElementById("Game_area");
	var direction = "";
    if(	dir === 1) {
	  direction = "north";
	  move_to_Area(direction);
	}else if( dir === 2) {
	  direction = "south";
	  move_to_Area(direction);
	}else if (dir === 3) {
	  direction = "east";
	  move_to_Area(direction);
	}else if (dir === 4) {
	  direction = "west";
	  move_to_Area(direction);
	}else {
	  alert("This should not happen"); // ERROR Message
	}
}

// No more placeholders
function move_to_Area(newLocation) {
  // Chooses direction in location 0
  if(current_area === 0){
  
    if( newLocation === "north") {
	   print_Game(adjust_north_panel());
	   increase_score_once(newLocation);
	}else if( newLocation === "south") {
       print_Game("You ran into the south pane.");
	   increase_score_once(newLocation);
	}else if( newLocation === "east") {
       print_Game("You walked into the east pane.");
	   increase_score_once(newLocation);
	}else if( newLocation === "west") {
       print_Game("You tapped the west pane.");
	   increase_score_once(newLocation);
	}else {
	  alert( "This should never happen"); // ERROR Message
	}
  }else {
  }
}

function adjust_north_panel(is_rammed) {
  if(is_rammed && counter > 0) {
    north_panel_hits_remaining = north_panel_hits_remaining -1;
    return "You hit the panel wall, and it shifted.  The timer reads 00:0" 
	       + north_panel_hits_remaining + ":00"
  }else if ( counter === -1) {
    
  }else {
    print_Game("You have become entrapped in the panels. The announcer states " +
	           "'You have been deemed uninteligible; proceeding with disposal of INSERT NAME HERE.'" +
	           "\nThe panel rises, the floor opens, and you are released into the pit."+
			   "\nWhile falling a crushing panel misses your forhead by 2.5 cm."+
			   "\nYou land in the decrepit incinerator zone.  In the distance there is a device.  You slowly advance toward the device."+
               "Upon standing above the device you notice it is a manipulator.") 
	current_location = 4;
  }
}

  //Function allows for location interaction
function interact_location(command) {
    var mapArea = document.getElementById("map_location");
	if((command.value.slice(8).toLowerCase() === "map" && !has_map) || 
	    command.value.slice(8).toLowerCase() === "mental map") {
	  mapArea.value = mental_mapped_location();
	}else if(command.value.slice(8,10).toLowerCase() === "use" && 
	    command.value.split(" ")[1].toLowerCase() === locations[current_location][3]) {
		print_Game(locations[current_location][4]);
		north_panel_hits_remaining = -1;
		is_last_traveler = true;
	} else {
	  print_Game("interaction commands are as follows:  interact:<command> <object> \n" + 
	              "Valid commands are: h, ?, help, map, mental map, and use.");
	}
}

function change_location(dir) {
   
}

function increase_score_once() {
  //scoring function and logical check
   var score_area = document.getElementById("score_print");
   if(locations[current_location][1] === false) {
       locations[current_location][1] = true;
	   score = score + 5;
	}else {
	  //alert( "Visited");  was for error handling now just a comment
	}
	score_area.value = "Score:" + score;
}