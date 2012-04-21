/**
 * @author Ezra Velazquez
 */
var GAME_CANVAS = function() {
	var canvas;
	var p;
	var spacing_x = 50;
	var spacing_y = 50;
	var img;
	
	var player_colors = new Array([122,155,168], [255,255,255], [190,250,33], [247,64,28], [53,119,125]);
	
	function brick(y,x) {
		this.x = x;
		this.y = y;
		this.color = [232,12,122];
		this.width = 50;
		this.height = 50;
	}
	
	function coin(y,x) {
		this.x = x;
		this.y = y;
		this.color_on = [255,242,73];
		this.color_off = [3,3,3];
		this.width = 15;
		this.height = 15;
		this.available = true;
		this.flag = false;
	}
	
	function player(y,x, phone_number, color) {
		this.x = x;
		this.y = y;
		this.color_on = color;
		this.color_off = [200,200,200];
		this.width = 40;
		this.height = 40;
		this.phone_number = phone_number;
		this.id = phone_number.slice(phone_number.length - 4);
		this.position = 'normal';
		this.score = 0;
	}
	
	var brick_array = new Array();
	var coin_array = new Array();
	var player_array = new Array();
	var layout = new Array();
	
	$(document).ready(function() {
		init("canvas_main");
	});
	
	// Simple way to attach js code to the canvas is by using a function  
	function sketchProc(processing) { 
		var font;
		//var background = "#161616";
		
		processing.setup = function() {
			processing.size(1000,550);
			processing.colorMode(processing.RGB);
			processing.background(3,3,3);
			
			/*
			 * START TESTING ONLY
			 */
			player_array.push(new player(5,9,"19498423052", player_colors[0]));
			PLAYER_INFO.addPlayer("19498423052",player_colors[0]);
			
			player_array.push(new player(5,11,"19496359409", player_colors[1]));
			PLAYER_INFO.addPlayer("19496359409",player_colors[1]);
			/*
			 * END TESTING ONLY
			 */
			img = new Array();
			img['normal'] = processing.loadImage("assets/player.png");
			img['right'] = processing.loadImage("assets/player_right.png");
			img['left'] = processing.loadImage("assets/player_left.png");
			img['down'] = processing.loadImage("assets/player_down.png");
			img['up'] = processing.loadImage("assets/player_up.png");
			
			layout[0]  = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
			layout[1]  = new Array(0,8,8,8,8,0,8,8,8,8,8,8,8,8,0,8,8,8,8,0);
			layout[2]  = new Array(0,8,0,0,8,0,8,0,0,0,0,0,0,8,0,8,0,0,8,0);
			layout[3]  = new Array(0,8,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,8,0);
			layout[4]  = new Array(0,8,0,8,0,0,8,0,0,9,9,0,0,8,0,0,8,0,8,0);
			layout[5]  = new Array(8,8,8,8,8,8,8,0,9,9,9,9,0,8,8,8,8,8,8,8);
			layout[6]  = new Array(0,8,0,8,0,0,8,0,0,0,0,0,0,8,0,0,8,0,8,0);
			layout[7]  = new Array(0,8,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,0,8,0);
			layout[8]  = new Array(0,8,0,0,8,0,8,0,0,0,0,0,0,8,0,8,0,0,8,0);
			layout[9]  = new Array(0,8,8,8,8,0,8,8,8,8,8,8,8,8,0,8,8,8,8,0);
			layout[10] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
			
			createLayout();
			
			function createLayout() {
				for(var y = 0; y < 11 ; y++) {
					for(var x = 0; x < 21; x++) {
						if(layout[y][x] == 0) {
							brick_array.push(new brick(y,x));
						}
						else if(layout[y][x] == 8) {
							coin_array.push(new coin(y,x));
						}
					}
				}
			}
		}
		   
		// Override draw function, by default it will be called 60 times per second  
		processing.draw = function() {  
		    processing.background(3,3,3);
		    drawWalls();
		    drawCoins();
		    drawPlayers();
		    
		    checkPlayerCoinCollision();
		    checkPlayerPlayerCollision();
		    
		    function checkPlayerCoinCollision() {
		    	for(var pi = 0; pi < player_array.length; pi++) {
		    		for(var ci = 0; ci < coin_array.length; ci++) {
		    			if(player_array[pi].x == coin_array[ci].x && player_array[pi].y == coin_array[ci].y) {
		    				if(coin_array[ci].available == true && coin_array[ci].flag == false) {
		    					
		    					player_array[pi].score += 1;
		    					PLAYER_INFO.updateScore(player_array[pi].score, player_array[pi].id);
		    					
		    					coin_array[ci].flag = true;
		    					coin_array[ci].available = false;
		    					//start counter to reactivate marker;
		    					generateCoin(ci);
		    				}
		    			}
		    		}
		    	}
		    	
		    	function generateCoin(index) {
		    		setTimeout(function() {
						coin_array[index].flag = false;
						coin_array[index].available = true;
					}, 5000);
		    	}
		    }
		    
		    function checkPlayerPlayerCollision() {
		    	for(var p1 = 0; p1 < player_array.length; p1++) {
		    		for(var p2 = 0; p2 < player_array.length; p2++) {
		    			// Don't detect collision with oneself
		    			if(p1 != p2) {
		    				if(player_array[p1].x == player_array[p2].x && player_array[p1].y == player_array[p2].y) {
		    					if( ( (player_array[p1].x >= 8 && player_array[p1].x <=11) && (player_array[p1].y == 5) ) ||  (player_array[p1].x == 9 || player_array[p1].x == 10) && (player_array[p1].y == 4) ) {
		    						// Player in safety zone
		    					}
		    					else {
		    						// Share each other's coins
		    						var p1_score = player_array[p1].score;
		    						var p2_score = player_array[p2].score;
		    						var new_score = Math.floor((p1_score + p2_score) / 2);
		    						player_array[p1].score = new_score;
		    						player_array[p2].score = new_score;
		    						PLAYER_INFO.updateScore(player_array[p1].score, player_array[p1].id);
		    						PLAYER_INFO.updateScore(player_array[p2].score, player_array[p2].id);
		    					}
		    				}
		    			}
		    			
		    		}
		    	}
		    }
		    
		    function drawWalls() {
		    	for(var index = 0; index < brick_array.length; index++) {
		    		processing.noStroke();
					processing.fill(brick_array[index].color[0],brick_array[index].color[1],brick_array[index].color[2]);
					processing.rect( (brick_array[index].x)*brick_array[index].width,
									 (brick_array[index].y)*brick_array[index].height,
									 brick_array[index].width,
									 brick_array[index].height
								   );
		    	}
		    }
		    
		    function drawCoins() {
		    	for(var index = 0; index < coin_array.length; index++) {
		    		processing.noStroke();
		    		if(coin_array[index].available == true) {
		    			processing.fill(coin_array[index].color_on[0],coin_array[index].color_on[1],coin_array[index].color_on[2]);
		    		}
		    		else {
		    			processing.fill(coin_array[index].color_off[0],coin_array[index].color_off[1],coin_array[index].color_off[2]);
		    		}
		    		processing.pushMatrix();
		    			processing.translate(coin_array[index].width + 10,coin_array[index].height + 10);
		    			processing.ellipse(coin_array[index].x * spacing_x, coin_array[index].y * spacing_y, coin_array[index].width, coin_array[index].height);
		    		processing.popMatrix();
		    	}
		    }
		    
		    function drawPlayers() {
		    	for(var index = 0; index < player_array.length; index++) {
		    		processing.noStroke();
		    		processing.fill(player_array[index].color_on[0],player_array[index].color_on[1],player_array[index].color_on[2]);
		    		processing.pushMatrix();
		    			processing.translate(5,5);
		    			processing.rect(player_array[index].x*spacing_x, player_array[index].y*spacing_y, 40,40);
		    			processing.image(img[player_array[index].position],player_array[index].x*spacing_x, player_array[index].y*spacing_y );
		    			//
		    			
		    		processing.popMatrix();
		    		
		    	}
		    }
		}
	}		
	function init(_canvas) {
		canvas = document.getElementById(_canvas);
		// attaching the sketchProc function to the canvas 
		p = new Processing(canvas, sketchProc);
		// p.exit(); to detach it
	}
	
	return {
		movePlayer : function(position, player_number) {
			var player_x = player_array[player_number].x;
			var player_y = player_array[player_number].y;
			
			switch(position) {
				case "up":
					if(typeof layout[player_y - 1][player_x] != 'undefined' & layout[player_y - 1][player_x] != 0) {
						player_array[player_number].y -= 1;
						player_array[player_number].position = 'up';
					}
					break;
				case "down":
					if(typeof layout[player_y + 1][player_x] != 'undefined' & layout[player_y + 1][player_x] != 0) {
						player_array[player_number].y += 1;
						player_array[player_number].position = 'down';
					}
					break;
				case "left":
					if(typeof layout[player_y][player_x - 1] != 'undefined' & layout[player_y][player_x - 1] != 0) {
						player_array[player_number].x -= 1;
						player_array[player_number].position = 'left';
					}
					else if(typeof layout[player_y][player_x - 1] == 'undefined') {
						player_array[player_number].x = 19;
						player_array[player_number].position = 'left';
					}
					break;
				case "right":
					if(typeof layout[player_y][player_x + 1] != 'undefined' & layout[player_y][player_x + 1] != 0) {
						player_array[player_number].x += 1;
						player_array[player_number].position = 'right';
					}
					else if(typeof layout[player_y][player_x + 1] == 'undefined') {
						player_array[player_number].x = 0;
						player_array[player_number].position = 'right';
					}
					break;
				default:
					// Do Nothing
					break;
			}
		}
	}
}();