/**
 * @author Ezra Velazquez
 */
var PLAYER_INFO = function() {
	var layout = '<div class="player_info_cell" id="">'+
						'<div class="player_info_graphic"></div>' +
						'<div class="player_info_number"></div>' +
						'<div class="player_info_score"><span class="player_score">0</span> pts</div>' +
						'<div class="clear_box"></div>' +
					'</div>';
	
	function _addPlayer(phone_number, color) {
		$obj = $(layout);
		$obj.attr("id", phone_number.slice(phone_number.length - 4));
		$obj.children(":nth-child(2)").text("x"+ phone_number.slice(phone_number.length - 4));
		$obj.children(":nth-child(1)").css("backgroundColor", "rgb("+color[0]+","+color[1]+","+color[2]);
		
		$(".player_info_bottom").append($obj);
	}
	
	function _updateScore(value, player) {
		$("#"+player).children(":nth-child(3)").children(":nth-child(1)").text(value);
	}
	
	return {
		addPlayer : function(phone_number, color) {
			_addPlayer(phone_number, color);
		},
		updateScore : function(value, player) {
			_updateScore(value, player);
		}
	}
}();