const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors());

mongoose.connect('mongodb://czjan23:12345678a@ds239930.mlab.com:39930/collaborative-code-editor', {useNewUrlParser: true});

const RoomSchema = new mongoose.Schema({
    name: String,
    language: String
});
const RoomModel = mongoose.model("RoomModel", RoomSchema);

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/rooms', (req, res) => {
    RoomModel.find({}, (err, rooms) => {
        if (err) {
            console.log(err);
        } else {
            console.log(rooms);
            res.send(rooms);
        }
    });
});

app.post('/rooms', (req, res) => {
    console.log(req.body);
    let name = req.body.name;
    let language = req.body.language;
    RoomModel.create({
        name: name,
        language: language
    }, (err, room) => {
        if (err) {
            console.log(err);
        } else {
            res.send(room);
        }
    })
});

app.delete('/rooms/:id', (req, res) => {
    RoomModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('deleted');
        }
    });
});

server.listen(3001);

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

const socket_room = {};
const room_socket = {};

io.on('connection', function (socket) {
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

  // socket.emit('news', { hello: 'world' });
  socket.on('newCode', (code) => {
    let members = room_socket[socket_room[socket]];
    members.forEach(member => {
      if (member !== socket) {
        member.emit('newCode', {val: code});
      }
    });
  });
});