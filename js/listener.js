/**
 * @author Ezra Velazquez
 */
var LISTENER = function() {
	$(document).ready(function() {
		$("#container").bind('keyup', function(e){
			var code = e.keyCode;
			updateLocation(code);
		});
		
		function updateLocation(position) {
			switch(position) {
				// UP
				case 38:
					GAME_CANVAS.movePlayer('up',0);
					break;
				// DOWN
				case 40:
					GAME_CANVAS.movePlayer('down',0);
					break;
				// LEFT
				case 37:
					GAME_CANVAS.movePlayer('left',0);
					break;
				// RIGHT
				case 39:
					GAME_CANVAS.movePlayer('right',0);
					break;
				
				// UP
				case 87:
					GAME_CANVAS.movePlayer('up',1);
					break;
				// DOWN
				case 83:
					GAME_CANVAS.movePlayer('down',1);
					break;
				// LEFT
				case 65:
					GAME_CANVAS.movePlayer('left',1);
					break;
				// RIGHT
				case 68:
					GAME_CANVAS.movePlayer('right',1);
					break;
					
				default:
					// Do nothing
					break;
			}
		}
	});
}();