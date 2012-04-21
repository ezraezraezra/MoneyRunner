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
					GAME_CANVAS.movePlayer('up','19498423052');
					break;
				// DOWN
				case 40:
					GAME_CANVAS.movePlayer('down','19498423052');
					break;
				// LEFT
				case 37:
					GAME_CANVAS.movePlayer('left','19498423052');
					break;
				// RIGHT
				case 39:
					GAME_CANVAS.movePlayer('right','19498423052');
					break;
				
				// UP
				case 87:
					GAME_CANVAS.movePlayer('up','19496359409');
					break;
				// DOWN
				case 83:
					GAME_CANVAS.movePlayer('down','19496359409');
					break;
				// LEFT
				case 65:
					GAME_CANVAS.movePlayer('left','19496359409');
					break;
				// RIGHT
				case 68:
					GAME_CANVAS.movePlayer('right','19496359409');
					break;
					
				default:
					// Do nothing
					break;
			}
		}
	});
}();