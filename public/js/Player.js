/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, color) {
	var x = startX,
		y = startY,
		moveAmount = 2,
		id, 
		fillColor = randColor(color); 

	function randColor(color){
		if (color != "null") return color;
		var c = '#'+Math.floor(Math.random()*16777215).toString(16);
		return c;
	}
	var getX = function() {
	    return x;
	};

	var getY = function() {
	    return y;
	};

	var setX = function(newX) {
	    x = newX;
	};

	var setY = function(newY) {
	    y = newY;
	};
	
	var getC = function (){
        return fillColor;
    };

    var setC = function(C){
        fillColor = C;
    };

	var update = function(keys) {

		var prevX = x, prevY = y;

		// Up key takes priority over down
		if (keys.up) {
			y -= moveAmount;
		} else if (keys.down) {
			y += moveAmount;
		};

		// Left key takes priority over right
		if (keys.left) {
			x -= moveAmount;
		} else if (keys.right) {
			x += moveAmount;
		};

		return (prevX != x || prevY != y) ? true : false;
 
	};

	var draw = function(ctx) {
		ctx.fillStyle = fillColor;
		ctx.fillRect(x-5, y-5, 10, 10);
	};

	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		getC: getC,
		setC: setC,
		update: update,
		draw: draw
	}
};