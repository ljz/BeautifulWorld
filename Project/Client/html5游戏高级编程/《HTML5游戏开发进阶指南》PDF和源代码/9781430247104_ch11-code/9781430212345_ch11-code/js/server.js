var WebSocketServer = require('websocket').server;
var http = require('http');

// Create a simple web server that returns the same response for any request
var server = http.createServer(function(request,response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end("This is the node.js HTTP server.");
});

server.listen(8080,function(){
    console.log('Server has started listening on port 8080');
});

var wsServer = new WebSocketServer({
    httpServer:server,
    autoAcceptConnections: false        
});

// Logic to determine whether a specified connection is allowed.
function connectionIsAllowed(request){
    // Check criteria such as request.origin, request.remoteAddress 
    return true;
}

// Initialize a set of rooms
var gameRooms = [];
for (var i=0; i < 10; i++) {
    gameRooms.push({status:"empty",players:[],roomId:i+1});
};

var players = [];
wsServer.on('request',function(request){
    if(!connectionIsAllowed(request)){
        request.reject();
        console.log('Connection from ' + request.remoteAddress + ' rejected.');
        return;
    }
    
    var connection = request.accept();
    console.log('Connection from ' + request.remoteAddress + ' accepted.');
    
    // Add the player to the players array
    var player = {
        connection:connection    
    }
    players.push(player);
    
    // Send a fresh game room status list the first time player connects
    sendRoomList(connection);

	// On Message event handler for a connection
	connection.on('message', function(message) {
	    if (message.type === 'utf8') {
	        var clientMessage = JSON.parse(message.utf8Data);
	        switch (clientMessage.type){
	            case "join_room":
	                var room = joinRoom(player,clientMessage.roomId);
	                sendRoomListToEveryone();
	                if(room.players.length == 2){
	                    initGame(room);
	                }
	                break;                
	            case "leave_room":
	                leaveRoom(player,clientMessage.roomId);
	                sendRoomListToEveryone();
	                break;
	            case "initialized_level":
	                player.room.playersReady++;
	                if (player.room.playersReady==2){
	                    startGame(player.room);
	                }
	                break;                                                    
	        }
	    }
	});

    connection.on('close', function(reasonCode, description) {
	    console.log('Connection from ' + request.remoteAddress + ' disconnected.');

	    for (var i = players.length - 1; i >= 0; i--){
	        if (players[i]==player){
	            players.splice(i,1);
	        }
	    };

	    // If the player is in a room, remove him from room and notify everyone
	    if(player.room){
	        var status = player.room.status;
	        var roomId = player.room.roomId;
	        
			leaveRoom(player,roomId);
				
	        sendRoomListToEveryone();            
	    }
	});
});

function sendRoomList(connection){
    var status = [];
    for (var i=0; i < gameRooms.length; i++) {
        status.push(gameRooms[i].status);
    };
    var clientMessage = {type:"room_list",status:status};
    connection.send(JSON.stringify(clientMessage));
}

function sendRoomListToEveryone(){
    // Notify all connected players of the room status changes
    var status = [];
    for (var i=0; i < gameRooms.length; i++) {
        status.push(gameRooms[i].status);
    };
    var clientMessage = {type:"room_list",status:status};
    var clientMessageString = JSON.stringify(clientMessage);
    for (var i=0; i < players.length; i++) {
        players[i].connection.send(clientMessageString);
    };
}

function joinRoom(player,roomId){
    var room = gameRooms[roomId-1];
    console.log("Adding player to room",roomId);
    // Add the player to the room
    room.players.push(player);
    player.room = room;        
    // Update room status 
    if(room.players.length == 1){
        room.status = "waiting";
        player.color = "blue";
    } else if (room.players.length == 2){
        room.status = "starting";
        player.color = "green";
    }
    // Confirm to player that he was added
    var confirmationMessageString = JSON.stringify({type:"joined_room", roomId:roomId, color:player.color});
    player.connection.send(confirmationMessageString);
    return room;
}

function leaveRoom(player,roomId){
    var room = gameRooms[roomId-1];
    console.log("Removing player from room",roomId);
     
    for (var i = room.players.length - 1; i >= 0; i--){
        if(room.players[i]==player){
            room.players.splice(i,1);
        }
    };
    delete player.room;
    // Update room status 
    if(room.players.length == 0){
        room.status = "empty";    
    } else if (room.players.length == 1){
        room.status = "waiting";
    }
}

function initGame(room){
    console.log("Both players Joined. Initializing game for Room "+room.roomId);

    // Number of players who have loaded the level
    room.playersReady = 0;
    
    // Load the first multiplayer level for both players 
    // This logic can change later to let the players pick a level
    var currentLevel = 0;
    
    // Randomly select two spawn locations between 0 and 3 for both players. 
    var spawns = [0,1,2,3];
    var spawnLocations = {"blue":spawns.splice(Math.floor(Math.random()*spawns.length),1), "green":spawns.splice(Math.floor(Math.random()*spawns.length),1)};
    
    sendRoomWebSocketMessage(room,{type:"init_level", spawnLocations:spawnLocations, level:currentLevel});
}

function startGame(room){
    console.log("Both players are ready. Starting game in room",room.roomId);
    room.status = "running";
    sendRoomListToEveryone();
    // Notify players to start the game
    sendRoomWebSocketMessage(room,{type:"start_game"});
}

function sendRoomWebSocketMessage(room,messageObject){
    var messageString = JSON.stringify(messageObject);
    for (var i = room.players.length - 1; i >= 0; i--){
        room.players[i].connection.send(messageString);
    }; 
}

