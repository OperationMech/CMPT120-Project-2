// Javascript

//Global variables
var is_last_traveler = false;
var north_panel_hits_remaining = 4;
var has_map = false;
var invintory = new Array();
var items = 0;
var locations = [["chamber0", true, "button", "The panel lifts up and rises overhead. A hallway is revealed with a door at the end."], 
                 ["hallway",false, "manipulator", "The north door opens and you proceed into test chamber 1.  The chaimber has a door to the east with an acid pit between you and it. There is also a manipulator socket." ], 
				 ["chamber1", false, "socket", "The announcer comes on to congragulate you on your sucess of lowering the bridge.  You proceed to test chamber 2" ], 
				 ["incinerator", false, "manipulator", "You proceed through the maintainance areas until you see an opening back into the testing area. You enter Chamber 3."], 
				 ["chaimber2", false, "switch", "The room has blah."  ],
				 ["chaimber3", false, "socket", "The chaimber has a door on the west side, and seems to be empty aside from the socket towards the center. You walk to nearby the socket."] ];
var current_location = 0;
var score = 0;

function interaction_selector() {
  //Text based command selector
    var command = document.getElementById("Command_area");
    if(isNaN(command.value)) {
	  switch(command.value.split(" ")[0].toLowerCase()) {
        case "n":
		   move_to_Area("north");
		   break;
		case "s":
		   move_to_Area("south");
		   break;
        case "e":
           move_to_Area("east");
           break;		   
        case "w":
		   move_to_Area("west"); 
		   break;
        case "interact:": 
           interact_location(command);
		   break;
		default :
		   print_Game("Valid commands are:\n directions(n,s,e,w) or interact: <command> <object>");
      }
	  
    } else {
      print_Game("Your character scratches his head.\n\nValid commands are:\n directions(n,s,e,w) or interact: <command> <object>");
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
  if(current_location === 0){

    if( newLocation === "north") {
	   print_Game(adjust_north_panel(true));
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
    if(location_valid(newLocation)){
      change_location(newLocation)
	}
  }
}

function location_valid(dir) {
   switch(current_location) {
     case 1:
	    if(dir === "north" && items > 0 ) {
		  return true;
		}else {
		  return false;
		}
		break;
	 case 2:
	    if(dir === "east" && bridge_is_lowered()) {
		  return true;
		}else {
		  return false;
		}
		break;
	 case 3:
	    if(dir === "north" && items > 0){
		  return true;
		}else {
		  return false;
		}
	}
}


function adjust_north_panel(is_rammed) {
  if(is_rammed && north_panel_hits_remaining > 1) {
    is_rammed = false;
    north_panel_hits_remaining = north_panel_hits_remaining -1;
    return "You hit the panel wall, and it shifted.  The timer reads 00:0" 
	       + north_panel_hits_remaining + ":00"
  }else if ( north_panel_hits_remaining  === -1) {
    current_location = 1;
	return "You enter the hallway. It has a large sign painted on the wall 'Get your manipulators here!' it says, with an arrow to a rack with one manipluator left.";
  }else {
	current_location = 4;
	score = score + 20;
	return "You have become entrapped in the panels. The announcer states " +
	       "\n'You have been deemed uninteligible; proceeding with disposal of INSERT NAME HERE.'" +
	       "  The panel rises, the floor opens, and you are released into the pit."+
		   "  While falling a crushing panel misses your forhead by 2.5 cm."+
		   "  You land on a small plaform above the facility incinerator.  In the distance there is a device.  You slowly advance toward the device."+
           "  Upon standing above the device you notice it is a manipulator."; 
  }
}

  //Function allows for location interaction
function interact_location(command) {
    var mapArea = document.getElementById("map_location");
	command_value_split = command.value.split(" ");
	if((command_value_split[1].toLowerCase() === "map" && !has_map) || 
	    command_value_split[1].toLowerCase() === "mental_map") {
	  mapArea.value = mental_mapped_location();
	}else if(command_value_split[1].toLowerCase() === "map" && has_map) {
	  mapArea.value = open_map();
	}else if(command_value_split[1].toLowerCase() === "use" && 
	       command_value_split[2].toLowerCase() === locations[current_location][2]) {
		print_Game(locations[current_location][3]);
		if(current_location === 0){
		  north_panel_hits_remaining = -1;
		  is_last_traveler = true;
		  score = score + 10;
		} else {
		  score = score + 5;
		}
	}else if(command_value_split[1].toLowerCase() === "pickup" &&
	       command_value_split[2].toLowerCase() === locations[current_location][2]) {
		add_to_invintory(locations[current_location][2]);
	} else {
	  print_Game("interaction commands are as follows:  interact: <command> <object> \n" + 
	              "Valid commands are: h, ?, help, map, mental_map, use and pickup.");
	}
}

//Basic mapping function shows the general idea from the character's eyes.
function mental_mapped_location() {
   if(current_location === 0 && !is_last_traveler) {
     return "+++++++       +++++++\n"+
            "+ x x x x+       + x x x x +\n"+
            "+ x x x x+       + x x x x +\n"+
            "+ x x x x~**** ~ x x x x +\n"+
            "+ x x x x~ ^ !  ~ x x x x +\n"+
            "+ x x x x~  ##~ x x x x +\n"+
            "+ x x x x+~~~+ x x x x +\n"+
            "+ x x x x x x x x x x x x +\n"+
            "+ x x x x x x x x x x x x +\n"+
            "+++++++++++++++++";
	} else if(current_location === 0 && is_last_traveler) {
	 return "+++++++       +++++++\n"+
            "+ x x x x+       + x x x x +\n"+
            "+ x x x x+       + x x x x +\n"+
            "+ x x x x~       ~ x x x x +\n"+
            "+ x x x x~ ^ !  ~ x x x x +\n"+
            "+ x x x x~  ##~ x x x x +\n"+
            "+ x x x x+~~~+ x x x x +\n"+
            "+ x x x x x x x x x x x x +\n"+
            "+ x x x x x x x x x x x x +\n"+
            "+++++++++++++++++";
	}else {
	   switch (current_location) {
	     case 2:
		    return "";
			break;
		 case 4:
		    return "";
		    break;
		 case 5:
		    return "";
			break;
		 case 6:
		    return "";
			break;
		 default : 
			return ""; // map for undefined regions or simple spaces.
		}
	}
}

function change_location(dir) {
	switch (dir) {
		case "north" :
		   print_Game(locations[current_location][3]);
		   current_location = current_location + 1;   
		   update_buttons();
		   increase_score_once();
		   break;
		case "south" :
		   print_Game(locations[current_location][3]);
		   current_location = current_location - 1;
		   update_buttons();
		   increase_score_once();
		   break;
		case "east" :
		   print_Game(locations[current_location][3]);
		   current_location = current_location + 2;
		   update_buttons();
		   increase_score_once();
		   break;
		case "west" :
		   print_Game(locations[current_location][3]);
		   current_location = current_location - 2;
		   update_buttons();
		   increase_score_once();
		   break;
		default :
		   print_Game("There is an obstacle in the way.");
	}
}

function increase_score_once() {
  //scoring function and logical check
   var score_area = document.getElementById("score_print");
   if(locations[current_location][1] === false) {
       locations[current_location][1] = true;
	   score = score + 10;
	}else {
	  //alert( "Visited");  was for error handling now just a comment
	}
	score_area.value = "Score:" + score;
}