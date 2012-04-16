/**
 * @author Ezra Velazquez
 */
var LISTENER = function() {
	$(document).ready(function() {
		$("#container").bind('keyup', function(e){
			var code = e.keyCode;
			//console.log(code);
			updateLocation(code);
		});
		
		function updateLocation(position) {
			switch(position) {
				// UP
				case 38:
					GAME_CANVAS.movePlayer('up');
					break;
				// DOWN
				case 40:
					GAME_CANVAS.movePlayer('down');
					break;
				// LEFT
				case 37:
					GAME_CANVAS.movePlayer('left');
					break;
				// RIGHT
				case 39:
					GAME_CANVAS.movePlayer('right');
					break;
				default:
					// Do nothing
					break;
			}
		}
	});
}();