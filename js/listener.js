/**
 * @author Ezra Velazquez
 */
var LISTENER = function() {
	$(document).ready(function() {
		//var _ENV = 'deploy';
		var _ENV = 'test';
		
		if(_ENV == 'test') {
			GAME_CANVAS.addPlayer("xxxxxxxxxx", 0);
			GAME_CANVAS.addPlayer("yyyyyyyyyy", 1);
			
			$("#container").bind('keyup', function(e){
				var code = e.keyCode;
				updateLocation(code);
			});
		}
	});
	
	function updateLocation(position) {
		switch(position) {
			// UP
			case 38:
				GAME_CANVAS.movePlayer('up','9498423052');
				break;
			// DOWN
			case 40:
				GAME_CANVAS.movePlayer('down','9498423052');
				break;
			// LEFT
			case 37:
				GAME_CANVAS.movePlayer('left','9498423052');
				break;
			// RIGHT
			case 39:
				GAME_CANVAS.movePlayer('right','9498423052');
				break;
			
			// UP
			case 87:
				GAME_CANVAS.movePlayer('up','9496359409');
				break;
			// DOWN
			case 83:
				GAME_CANVAS.movePlayer('down','9496359409');
				break;
			// LEFT
			case 65:
				GAME_CANVAS.movePlayer('left','9496359409');
				break;
			// RIGHT
			case 68:
				GAME_CANVAS.movePlayer('right','9496359409');
				break;
				
			default:
				// Do nothing
				break;
		}
	}
}();