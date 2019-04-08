const socket_room = {};
const room_socket = {};

module.exports = (socket) => {
    socket.on('enterRoom', (room) => {
      socket_room[socket] = room;
      if (!(room in room_socket)) {
        room_socket[room] = [];
      }
      room_socket[room].push(socket);
    });
  
    socket.on('leaveRoom', (room) => {
      let idx = room_socket[room].indexOf(socket);
      room_socket[room].splice(idx, 1);
    })
    
    socket.on('newCode', (code) => {
      let members = room_socket[socket_room[socket]];
      members.forEach(member => {
        if (member !== socket) {
          member.emit('newCode', {val: code});
        }
      });
    });
  };