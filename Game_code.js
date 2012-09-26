// Javascript

//Global variables
var locations = [false, false, false, false];
var score = 0;

function Change_location(dir) {
  //Buttton to location conversion
    var game_area = document.getElementById("Game_area");
	var direction = "";
    if(	dir === 1) {
	  direction = "north";
	  move_to_Area(game_area, direction);
	} else if( dir === 2) {
	  direction = "south";
	  move_to_Area(game_area, direction);
	} else if (dir === 3) {
	  direction = "east";
	  move_to_Area(game_area, direction);
	} else if (dir === 4) {
	  direction = "west";
	  move_to_Area(game_area, direction);
	} else {
	  alert("This should not happen"); // ERROR HANDLING
	}
}

// No more placeholders
function move_to_Area(game_area, newLocation) {
  // Chooses direction
    if( newLocation === "north") {
	   game_area.value = "You hit the panel wall." + "\n\n" + game_area.value;
	   Increase_score_once(newLocation);
	}else if( newLocation === "south") {
	   game_area.value = "You ran into the south pane." + "\n\n" + game_area.value;
	   Increase_score_once(newLocation);
	}else if( newLocation === "east") {
	   game_area.value = "You walked into the east pane." + "\n\n" + game_area.value;
	   Increase_score_once(newLocation);
	}else if( newLocation === "west") {
	   game_area.value = "You tapped the west pane." + "\n\n" + game_area.value;
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