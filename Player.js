
/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, color) {
    var x = startX,
        y = startY,
        id,
        fillColor = color;     

    // Getters and setters
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
    }

    var setC = function(C){
        fillColor = C;
    }

    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        getC: getC,
        id: id
    }
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;