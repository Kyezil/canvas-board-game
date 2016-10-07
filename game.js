//Node.js game server
var util = require("util"),
    io = require("socket.io"),
    Player = require("./Player").Player;

var socket = require('socket.io')({ transports  : [ 'websocket' ] }), players;

function init() {
    players = [];
	socket = io.listen(3030);
	console.log("Server started");
	setEventHandlers();
};

var setEventHandlers = function() {
    socket.sockets.on("connection", onSocketConnection);
};

var onSocketConnection = function(client) {
    util.log("New player has connected: "+client.id);
    client.on("disconnect", onClientDisconnect);
    client.on("new player from client", onNewPlayer);
    client.on("move player", onMovePlayer);
};

function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
};

function onNewPlayer(data) {
	var newPlayer = new Player(data.x, data.y, data.c);
	newPlayer.id = this.id;
	// Broadcast new player info 
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), c: newPlayer.getC()});

	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
    existingPlayer = players[i];
    this.emit("new player", {id: existingPlayer.id, 
    						 x: existingPlayer.getX(), 
    						 y: existingPlayer.getY(),
    						 c: existingPlayer.getC()}
    						 );
	}
	players.push(newPlayer);

};
function playerById(id){
	for (var i = 0; i < players.length; i++){
		if (players[i].id == id) return players[i];
	}
	return false;
}
function onMovePlayer(data) {
var movePlayer = playerById(this.id);
	if (!movePlayer) {
	    util.log("Player not found: "+this.id);
	    return;
	};

	movePlayer.setX(data.x);
	movePlayer.setY(data.y);

	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
};

init();
