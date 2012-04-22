/**
 * @author Ezra Velazquez
 */
var TELEPHONY = function() {
	var phoneNumber = "12064561465";
	var server_address = "108.171.181.31";
	var server_port = 12003;
	var mod_counter = 0;
	
	function _init() {
		tinyphone.init(server_address,server_port,phoneNumber);
		_listeners();
	}
	
	function _listeners() {
		tinyphone.on('connect', function() {
			// Do nothing
		});
		tinyphone.on('new_call', function(caller) {
			GAME_CANVAS.addPlayer(caller.callerNumber, mod_counter);
			mod_counter += 1;
		});
		tinyphone.on('keypress', function(caller){
			var num = parseInt(caller.keypress);
			switch(num) {
				// Up
				case 2:
					GAME_CANVAS.movePlayer('up',caller.callerNumber);
					break;
				// Down
				case 8:
					GAME_CANVAS.movePlayer('down',caller.callerNumber);
					break;
				// Left
				case 4:
					GAME_CANVAS.movePlayer('left',caller.callerNumber);
					break;
				// Right
				case 6:
					GAME_CANVAS.movePlayer('right',caller.callerNumber);
					break;
				default:
				// Do nothing
					break;
			}
		});
		tinyphone.on('audio_level', function(caller) {
			// Do nothing
			// caller.audioLevel
		});
		tinyphone.on('hangup', function(caller) {
			GAME_CANVAS.removePlayer(caller.callerNumber);
		});
	}
	
	return {
		init : function() {
			_init();
		}
	}
}();

$(document).ready(function() {
	TELEPHONY.init();
});
