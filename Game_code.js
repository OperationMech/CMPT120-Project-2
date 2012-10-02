// Javascript

//Global variables
var locations = [false, false, false, false];
var score = 0;

function Interaction_selector() {
  //Text based command selector
    var command = document.getElementById("Command_area");
    if(command.value !== 0) {
    
      if(command.value.toLowerCase() === n) {
        Change_location("north");
      } else if(command.value.toLowerCase() === s) {
        Change_location("south");
      } else if(command.value.toLowerCase() === e) {
        Change_location("east"); 
      } else if(command.value.toLowerCase() === w) {
        Change_location("west"); 
      } else if(command.value.toLowerCase() === interact){ 
        Interact_location(location);
      }
    } else {
      Print_Game("Invalid command issued.");
    }
}

function Print_Game(message) {
   game_area = document.getElementById("Game_area");
   game_area.value = message + "\n\n" + game_area.value;
}

function Change_location_button(dir) {
  //Buttton to location conversion
    var game_area = document.getElementById("Game_area");
	var direction = "";
    if(	dir === 1) {
	  direction = "north";
	  move_to_Area(direction);
	} else if( dir === 2) {
	  direction = "south";
	  move_to_Area(direction);
	} else if (dir === 3) {
	  direction = "east";
	  move_to_Area(direction);
	} else if (dir === 4) {
	  direction = "west";
	  move_to_Area(direction);
	} else {
	  alert("This should not happen"); // ERROR HANDLING
	}
}

// No more placeholders
function move_to_Area(newLocation) {
  // Chooses direction
    if( newLocation === "north") {
	   Print_Game("You hit the panel wall.");
	   Increase_score_once(newLocation);
	}else if( newLocation === "south") {
           Print_Game("You ran into the south pane.");
	   Increase_score_once(newLocation);
	}else if( newLocation === "east") {
           Print_Game("You walked into the east pane.");
	   Increase_score_once(newLocation);
	}else if( newLocation === "west") {
           Print_Game("You tapped the west pane.");
	   Increase_score_once(newLocation);
	}else {
	  alert( "This should never happen"); // ERROR HANDLING
	}
}

function Increase_score_once(location_visited /*,pair - future use */) {
  //scoring function and logical check
   var score_area = document.getElementById("score_print");
   if( location_visited ===  "north" && locations[0] === false) {
       locations[0] = true;
	   score += 5;
	}else if( location_visited ===  "south" && locations[1] === false) {
       locations[1] = true;
	   score += 5;
	}else if( location_visited ===  "east" && locations[2] === false) {
       locations[2] = true;
	   score += 5;
	}else if( location_visited ===  "west" && locations[3] === false) {
       locations[3] = true;
	   score += 5;
	}/*else {
	  alert( "Visited");  was for error handling now just a comment
	}*/
	score_area.value = "Score:" + score;
}