module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
          }
      });


    io.sockets.on('connection', function(socket){
        console.log(" new connection received", socket.id );

        socket.on('disconnect', function(){
            console.log("Socket Disconnected");

        });


        // server receives the request and 
        socket.on('join_room', function(data){
            console.log("joining request received", data);

            socket.join(data.chatroom);

            // sends the emit to other sunscribers that this person has joined
            io.in(data.chatroom).emit('user_joined', data);
        });

        // detect message and broadcast to everyone in the room

        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });

    } );


}