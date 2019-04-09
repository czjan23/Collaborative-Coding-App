const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const roomRoutes = require('./routes/rooms');
const executionRoutes = require('./routes/executions');
const socketHandler = require('./utils/socketHandler');


app.use(cors());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));
app.use('/rooms', roomRoutes);
app.use('/executions', executionRoutes);

mongoose.connect('mongodb://czjan23:12345678a@ds239930.mlab.com:39930/collaborative-code-editor', {useNewUrlParser: true});

server.listen(3001);
io.on('connection', socketHandler);