const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: String,
    language: String
});

const RoomModel = mongoose.model("RoomModel", RoomSchema);

module.exports = RoomModel;