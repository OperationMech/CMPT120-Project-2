// Javascript Game_logic.js
// projects 2-4 (versions 0.2 - 0.8)
// Quantumplexing start code
//Global variables
var not_initialized = true;
var is_last_traveler = false;
var is_revealed = false;
var is_virtualized = false;
var north_panel_hits_remaining = 4;
var has_map = false;
var inventory = [];
var items = 0;
var chamber_is_cleared = new Array(false, false, false, false, false, false, false, false);
var current_location = 0;
var moves = 0;
var score = 0;   

// global button definition
var b_north = document.getElementById("btnNorth");
var b_south = document.getElementById("btnSouth");
var b_east = document.getElementById("btnEast");
var b_west = document.getElementById("btnWest");

// I personally consider interaction / movement commands to be game logic
//    not independent seperate "objects" 

//item prototype
function Item(_name) {
  this.name = _name;
  this.description = "";
  this.toString = function() {
       return "[Item]: " + this.name + "\n" +
	          this.description;
  }
}

function interaction_selector() {
  //Text based command selector
    var command = document.getElementById("Command_area");
	if(!is_virtualized){
		if(typeof(command.value) === 'string') {
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
	} else {
	   adventure_control(command.value);
	}
}

function change_location_button(dir) {
  //Buttton to location conversion
    if(!is_virtualized) {
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
	} else {
	  adventurelandButtons(dir);
	}
}

// special case handler
function move_to_Area(newLocation) {
  // Chooses direction in location 0
  if(current_location === 0){

    switch (newLocation) {
	case "north": 
	   print_Game(adjust_north_panel(true));
	   increase_score_once(newLocation);
	   break;
	case "south":
       print_Game("You ran into the south pane.");
	   increase_score_once(newLocation);
	   break;
	case "east":
       print_Game("You walked into the east pane.");
	   increase_score_once(newLocation);
	   break;
	case "west": 
       print_Game("You tapped the west pane.");
	   increase_score_once(newLocation);
	   break;
	default:
	  alert( "This should never happen"); // ERROR Message
	  break;
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
	    if(dir === "east" && items > 0){
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
	current_location = 3;
	score = score + 20;
	update_buttons();
	make_map();
	moves = moves + 1;
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
	command_value_split = command.value.split(" ");
	if(!command_value_split[1]){
	  // else code
	  print_Game("interaction commands are as follows:  interact: <command> <object> \n" + 
	              "Valid commands are: h, ?, help, map, mental_map, use , inventory, and pickup.");
	}else if((command_value_split[1].toLowerCase() === "map" && !has_map) || 
	    command_value_split[1].toLowerCase() === "mental_map") {
	    make_mental_map(mental_mapped_location());
	}else if(command_value_split[1].toLowerCase() === "map" && has_map) {
	   open_map();
	}else if(command_value_split[1].toLowerCase() === "inventory") {
	  display_inventory();
	}else if(command_value_split[1].toLowerCase() === "use" && 
	       command_value_split[2].toLowerCase() === locations[current_location][2] &&
		   !chamber_is_cleared[current_location]) {
		if(current_location === 0 && !is_last_traveler){
		  north_panel_hits_remaining = -1;
		  is_last_traveler = true;
		  score = score + 10;
		  print_Game(locations[current_location][3]);
		  chamber_is_cleared[current_location] = true;
		  increase_score_once();
		} else {
		  score = score + 5;
		  increase_score_once();
		  if(current_location > 1 && (current_location !== 3 && current_location !== 6)) {
		    chamber_is_cleared[current_location] = true;
			update_buttons();
		  }
		  if( command_value_split[2].toLowerCase() === "uploader") {
		    print_Game(locations[current_location][3]);
			init_adventure_land();
			is_virtualized = true;
		  }
		}
	}else if(command_value_split[1].toLowerCase() === "pickup" &&
	       command_value_split[2].toLowerCase() === locations[current_location][2]) {
		add_to_inventory(command_value_split[2].toLowerCase());
	} else {
	  print_Game("interaction commands are as follows:  interact: <command> <object> \n" + 
	              "Valid commands are: h, ?, help, map, mental_map, inventory, use, and pickup.");
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
            "+ x x x x+*** + x x x x +\n"+
            "+ x x x x~      ~ x x x x +\n"+
            "+ x x x x~ ^ ! ~ x x x x +\n"+
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
                   "+                   x x x x  \n"+
                   "+                   x x x x  \n"+
                   "+                   x x x x  \n"+
                   "+  !     ^          x x x x +\n"+
                   "+                   x x x x +\n"+
                   "+++++++       +++++++";
			break;
		 case 4:
		    return "+++++++++++++++++\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+                   x x x x  \n"+
                   "+                   x x x x  \n"+
                   "+                   x x x x  \n"+
                   "+  !     ^          x x x x +\n"+
                   "+                   x x x x +\n"+
                   "+++++++       +++++++";;
		    break;
		 case 5:
		    return "++++not actual map++++\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+ x x x x x x x x x x x x +\n"+
                   "+                    x x x x  \n"+
                   "+                    x x x x  \n"+
                   "+                    x x x x  \n"+
                   "+  !     ^           x x x x +\n"+
                   "+                    x x x x +\n"+
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
           moves = moves + 1;		   
		   update_buttons();
		   make_map();
		   increase_score_once();
		   break;
		case "south" :
		   if(!chamber_is_cleared[4]) {
		     print_Game("You proceed to test Chamber 2 that has a switch and seems to be too open. No obstacles are immeadiately visable. The door is north.");
		   } else {
		     print_Game(locations[current_location][3]);
		   }
		   current_location = current_location - 1;
		   moves = moves + 1;
		   update_buttons();
		   make_map();
		   increase_score_once();
		   break;
		case "east" :
		   print_Game(locations[current_location][3]);
		   current_location = current_location + 2;
		   moves = moves + 1;
		   update_buttons();
		   make_map();
		   increase_score_once();
		   break;
		case "west" :
		   print_Game(locations[current_location][3]);
		   current_location = current_location - 2;
		   moves = moves + 1;
		   update_buttons();
		   make_map();
		   increase_score_once();
		   break;
		default :
		   alert("This should not happen as well - notice location movement error"); // Error message for a "never should happen"
	}
}

function update_buttons() {
   switch(current_location) {
    case 1:
	   b_north.disabled = false;
	   b_south.disabled = true;
	   b_east.disabled = true;
	   b_west.disabled = true;
	   break;
	case 2:
       b_north.disabled = true;
	   b_south.disabled = true;
	   b_east.disabled = false;
	   b_west.disabled = true;
	   break;
	case 3:
       b_north.disabled = true;
	   b_south.disabled = true;
	   b_east.disabled = false;
	   b_west.disabled = true;
	   break;
	case 4:
       b_north.disabled = false;
	   b_south.disabled = true;
	   b_east.disabled = true;
	   b_west.disabled = true;
	   break;
	case 5:
	   b_north.disabled = false;
	   if(chamber_is_cleared[4]) {
	     b_south.disabled = true;
	   }else {
	     b_south.disabled = false;
	   }
	   b_east.disabled = false;
	   b_west.disabled = true;
	   break;
	case 7:
	   b_north.disabled = true;
	   b_south.disabled = false;
	   b_east.disabled = true;
	   b_west.disabled = true;
	   break;
	}   
}

function increase_score_once() {
  //scoring function and logical check
  var score_area = document.getElementById("score_print");
   if(!is_virtualized) {
	   if(locations[current_location][1] === false) {
		   locations[current_location][1] = true;
		   score = score + 10;
		}else {
		  //updates score
		  score_area.value = "Score:" + score;
		}
	} else {
	   if(!curLoc.visited) {
		  curLoc.visited = true;
		  score = score + 10;
		} else {
		  //updates score
		  score_area.value = "Score:" + score;
		}
	}
}