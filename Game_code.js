// Javascript

//Global variables
var is_last_traveler = false;
var is_revealed = false;
var north_panel_hits_remaining = 4;
var has_map = false;
var inventory = [];
var items = 0;
var chamber_is_cleared = new Array("", "", false , "", false, false, "" , false)
var locations = [["chamber0", true, "button", "The panel lifts up and rises overhead. A hallway is revealed with a door at the end."], 
                 ["hallway",false, "manipulator", "The north door opens and you proceed into test chamber 1.  The chaimber has a door to the east with an acid pit between you and it. There is also a manipulator socket." ], 
				 ["chamber1", false, "socket", "The announcer comes on to congragulate you on your sucess of lowering the bridge.  You proceed to test Chamber 2 that has a switch and seems to be too open. No obstacles are immeadiately visable." ], 
				 ["incinerator", false, "manipulator", "You proceed through the maintainance areas until you see an opening back into the testing area. You enter Chamber 3."], 
				 ["chamber2", false, "switch", "You enter Chamber 3. The chaimber has a door on the west side, and seems to be empty aside from the socket towards the center. You walk to nearby the socket."  ],
				 ["chamber3", false, "socket", "The announcer states 'Well done test subject. You have almost reached your current goal.' You proceed into chamber 4 which has lasers east, mirrors aligned in a pattern, a socket, and a massive security door."],
				 ["chamber5", false, "uploader", "You feel a strange rush."],
				 ["chamber4",false, "socket","The large security door opens.  A 'teleporter' room is revealed."]];
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

// special case handler
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
	}else {
	} // do nothing
  }
}

// location validator (used for text directions)
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
	    if(dir === "east" && chamber_is_cleared[2]) {
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
	    break;
	 case 4:
	    if(dir === "north" && chamber_is_cleared[4] ) {
		  return true;
		}else { 
		  return false;
		}
		break;
	 case 5:
	    if(!locations[4][1] && dir === "south") {
		  return true;
		}else if (dir === "east" && chamber_is_cleared[4] && chamber_is_cleared[5]) {
		  return true;
		}else if (dir === "north" && !is_revealed) {
		  hidden_room();
		  return false;
		}else 
		  return false;
		break;
	 case 7:
	    if(dir === "south" && chamber_is_cleared[7]) {
		  return true;
		}else {
		  return false;
		}
		break;
	}
}

// HL refrence
function hidden_room() {
  print_Game("You search the north wall to find a slightly ajar panel.  You proceed to pull it open." +
           " You find another maintainence area; however, this one has writing on the wall." + 
		   " It says 'there is no pi', 'I could only try',  'learn another lie.' " +
           " You also notice a crowbar behind a welded vent... which has hinges. " + 
           " You return to the testing area shortly afterward, the panel slamms shut.");
    is_revealed = true;
}		   

// alternate path split
function adjust_north_panel(is_rammed) {
  if(is_rammed && north_panel_hits_remaining > 1) {
    is_rammed = false;
    north_panel_hits_remaining = north_panel_hits_remaining -1;
    return "You hit the panel wall, and it shifted.  The timer reads 00:0" 
	       + north_panel_hits_remaining + ":00"
  }else if ( north_panel_hits_remaining  === -1) {
    current_location = 1;
	update_buttons();
	return "You enter the hallway. It has a large sign painted on the wall 'Get your manipulators here!' it says, with an arrow to a rack with one manipluator left.";
  }else {
	current_location = 4;
	score = score + 20;
	update_buttons();
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
		if(current_location === 0){
		  north_panel_hits_remaining = -1;
		  is_last_traveler = true;
		  score = score + 10;
		  increase_score_once();
		} else {
		  score = score + 5;
		  increase_score_once();
		  if(current_location > 1 && (current_location !== 3 && current_location !== 6) {
		    chamber_is_cleared[current_location] = true;
			update_buttons();
		  }
		  if( command_value_split[2].toLowerCase() === "uploader") {
		    print_Game(locations[current_location][3]);
			// adventure_land();  future sub game
			// is_virtualized = true; post sub game
		  }
		}
	}else if(command_value_split[1].toLowerCase() === "pickup" &&
	       command_value_split[2].toLowerCase() === locations[current_location][2]) {
		add_to_inventory(command_value_split[2].toLowerCase());
	} else {
	  print_Game("interaction commands are as follows:  interact: <command> <object> \n" + 
	              "Valid commands are: h, ?, help, map, mental_map, use and pickup.");
	}
}

// Invintory adding function
function add_to_inventory(item) {
  // special empty case
  if(item !== "button" && item !== "switch" && item !== "socket" ){
    if(items === 0) {	 
	    items = items + 1;
	    print_Game("Acquired a "+ item);
	    inventory.push(item);
	    score = score + 15;
		increase_score_once();
    }else {
    // general case
      for(i = 0; i < inventory.length; i++) {
	    if(inventory[i] === item) {
		  print_Game("You already have this item");
          return ;
        }else {	 
	      items = items + 1;
	      print_Game("Acquired a "+ item);
	      inventory.push(item);
	      score = score + 15;
		  increase_score_once();
	    }
      }
    }
  }else {
    print_Game("You struggled trying to pickup a " + item +".");
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
		    return "+++++++++++++++++\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+                 x x x x  \n"+
                   "+                 x x x x  \n"+
                   "+                 x x x x  \n"+
                   "+  !     ^        x x x x +\n"+
                   "+                 x x x x +\n"+
                   "+++++++       +++++++";
			break;
		 case 4:
		    return "+++++++++++++++++\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+                 x x x x  \n"+
                   "+                 x x x x  \n"+
                   "+                 x x x x  \n"+
                   "+  !     ^        x x x x +\n"+
                   "+                 x x x x +\n"+
                   "+++++++       +++++++";;
		    break;
		 case 5:
		    return "++++not actual map++++\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+                 x x x x  \n"+
                   "+                 x x x x  \n"+
                   "+                 x x x x  \n"+
                   "+  !     ^        x x x x +\n"+
                   "+                 x x x x +\n"+
                   "+++++++       +++++++";;
			break;
		 case 7:
		    return "++++not actual map+++++\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+                 x x x x  \n"+
                   "+                 x x x x  \n"+
                   "+                 x x x x  \n"+
                   "+  !     ^        x x x x +\n"+
                   "+                 x x x x +\n"+
                   "+++++++       +++++++";;
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

function update_buttons() {
   var b_north = document.getElementById("btnNorth");
   var b_south = document.getElementById("btnSouth");
   var b_east = document.getElementById("btnEast");
   var b_west = document.getElementById("btnWest");
   switch(current_location) {
    case 1:
	   b_north.disabled = "";
	   b_south.disabled = "disabled";
	   b_east.disabled = "disabled";
	   b_west.disabled = "disabled";
	   break;
	case 2:
       b_north.disabled = "disabled";
	   b_south.disabled = "disabled";
	   b_east.disabled = "";
	   b_west.disabled = "disabled";
	   break;
	case 3:
       b_north.disabled = "disabled";
	   b_south.disabled = "disabled";
	   b_east.disabled = "";
	   b_west.disabled = "disabled";
	   break;
	case 4:
       b_north.disabled = "";
	   b_south.disabled = "disabled";
	   b_east.disabled = "disabled";
	   b_west.disabled = "disabled";
	   break;
	case 5:
	   b_north.disabled = "";
	   if(chamber_is_cleared[4]) {
	     b_south.disabled = "disabled";
	   }else {
	     b_south.disabled = "";
	   }
	   b_east.disabled = "";
	   b_west.disabled = "disabled";
	   break;
	case 7:
	   b_north.disabled = "disabled";
	   b_south.disabled = "";
	   b_east.disabled = "disabled";
	   b_west.disabled = "disabled";
	   break;
	}   
}


function increase_score_once() {
  //scoring function and logical check
   var score_area = document.getElementById("score_print");
   if(locations[current_location][1] === false) {
       locations[current_location][1] = true;
	   score = score + 10;
	}else {
	  //updates score
	  score_area.value = "Score:" + score;
	}
	score_area.value = "Score:" + score;
}