const socketId_room = {};
const room_socketIds = {};
const socketId_name = {};
const socketId_socket = {};
const room_code = {};

module.exports = (socket) => {
    socket.on('enterRoom', (data) => {
      let room = data.room;
      let memberName = data.member;
      let socketId = socket.id;
      socketId_room[socketId] = room;
      if (!(room in room_socketIds)) {
        room_socketIds[room] = [];
      }
      room_socketIds[room].push(socketId);
      socketId_name[socketId] = memberName;
      socketId_socket[socketId] = socket;
      let memberList = room_socketIds[room].map((memberSocketId) => socketId_name[memberSocketId]);
      room_socketIds[room].forEach((memberSocketId) => socketId_socket[memberSocketId].emit('setMemberList', {memberList: memberList}));
      if (room in room_code) {
        socket.emit('newCode', {code: room_code[room]});
      }
    });
  
    socket.on('leaveRoom', (data) => {
      let room = data.room;
      if (!(room in room_socketIds)) {
        return;
      }
      let idx = room_socketIds[room].indexOf(socket.id);
      if (idx === -1) return;
      room_socketIds[room].splice(idx, 1);
      if (room_socketIds[room].length === 0) {
        delete room_socketIds[room];
        delete room_code[room];
      } else {
        let memberList = room_socketIds[room].map((memberSocketId) => socketId_name[memberSocketId]);
        room_socketIds[room].forEach((memberSocketId) => {
          socketId_socket[memberSocketId].emit('setMemberList', {memberList: memberList})
        });
      }
      delete socketId_room[socket.id];
      delete socketId_name[socket.id];
      delete socketId_socket[socket.id];
    })
    
    socket.on('newCode', (data) => {
      let code = data.code;
      room_code[socketId_room[socket.id]] = code;
      let memberSocketIds = room_socketIds[socketId_room[socket.id]];
      memberSocketIds.forEach(memberSocketId => {
        if (memberSocketId !== socket.id) {
          socketId_socket[memberSocketId].emit('newCode', {code: code});
        }
      });
    });
  };