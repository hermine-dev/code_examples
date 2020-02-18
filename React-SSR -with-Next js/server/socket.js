// const User = require('./server/models').User;

// to emit data to all sockets of choosen users
const emit = function(sockets, message, data) {
  for (const x in sockets) {
    if (sockets.hasOwnProperty(x) && sockets[x]) {
      sockets[x].emit(message, data);
    }
  }
};
module.exports = (server, app) => {
  const io = require('socket.io')(server);
  let users = {};
  let clients = {};

  io.sockets.on('connection', function(socket) {
    console.log('connection', socket.id);
    // if you make user to connect by his individual ID during
    // websocket connection, providen after ?, like ?1234
    socket.on('disconnect', function() {
      console.log('disconnect', socket.id);
      // removing user from var users
      // warning: socket by socket, and if last
      // socket is closed, remove whole user section
      if (clients[socket.id]) {
        const userId = clients[socket.id];
        if (users[userId]) {
          delete users[userId];
        }
        delete clients[socket.id];
      }
    });

    socket.on('typing', function(msg){

    });

    socket.on('is_not_typing', function(msg){

    });

    socket.on('authentication', function(data){

    });

    socket.on('conversation_add_message', function(msg) {

    });

  });
  app.socketClients = clients;
  app.io = io; // important for use inside controller actions as req.app.io.sockets.connected[socketId].emit('tx', {key:"value"});
};
