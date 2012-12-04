// javascript  locations.js

var locations = [["chamber0", true, "button", "The panel lifts up and rises overhead. A hallway is revealed with a closed door at the end."], 
                 ["hallway",false, "manipulator", "The north door opens and you proceed into test chamber 1.  The chamber has a door to the east with an acid pit between you and it. There is also a manipulator socket." ], 
				 ["chamber1", false, "socket", "The announcer comes on to congragulate you on your sucess of lowering the bridge.  You proceed to test Chamber 2 that has a switch and seems to be too open. No obstacles are immeadiately visable. The door is north." ], 
				 ["incinerator", false, "manipulator", "You proceed through the maintainance areas until you see an opening back into the testing area. You enter Chamber 3."], 
				 ["chamber2", false, "switch", "You enter Chamber 3. The chamber has a door on the east side, and seems to be empty aside from the socket towards the center. You walk up to the socket."  ],
				 ["chamber3", false, "socket", "The announcer states 'Well done test subject. You have almost reached your current goal.' You proceed into chamber 4 which has lasers east, mirrors aligned in a pattern, a socket, and a massive security door south."],
				 ["chamber5", false, "uploader", "You feel a strange rush."],
				 ["chamber4",false, "socket","The large security door opens.  An 'uploader' room is revealed.  You place your mainpulator in a matched numbered socket."]];
				 
// HL and portal refrence 
function hidden_room() {
  print_Game("You search the north wall to find a slightly ajar panel.  You proceed to pull it open." +
           " You find another maintainence area; however, this one has writing on the wall." + 
		   " It says \"there is no pi\", \"I could only try\",  \"learn another lie.\" " +
           " You also notice a crowbar behind a welded vent... which has hinges. " + 
           " You return to the testing area shortly afterward, the panel slamms shut.");
    is_revealed = true;
}	

//adventureland locations

//  enchanted wood
var centralWood = new Location ("Central Wood");
var northWood = new Location ("North Wood");
var eastWood = new Location("East Wood");
var westWood = new Location ( "West Wood");
var southWood = new Location ("South Wood");
var n_westWood  = new Location ( "North Temple");
var s_eastWood = new Location ( "South Grotto");

//  northern mount
var mountFoot = new Location ( "Foot of Volgon");
var craterKeep = new Location ( "Keep of Volgon"); 
var arcanePlains = new Location ( "Arcane Plains");

//  west glacier
var iceWall = new Location ( "Eastern Glaciation");

//  east coast
var eastJetty = new Location ( "Eastern Jetty");

//  tumbling plains
var tumbPlainsNorth = new Location ("Northern Plains");

// location prototype
function Location (_name) {
  this.name = _name;
  this.visited = false;
  this.interactible = null;
  this.east = null;
  this.west = null;
  this.north = null;
  this.south = null;
  this.description = "";
  // debug toString
  this.toString = function() { 
            return "object [location]: " + this.name + ", " +
			       this.visited + ", " + this.interactible + ", " +
				   this.description;
  }
  this.initialize = function ( _interactible) {
            this.interactible = _interactible;
  }
}