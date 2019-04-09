const express = require('express');
const router = express.Router();
const RoomModel = require('../models/roomModel');

router.get('/', (req, res) => {
    RoomModel.find({}, (err, rooms) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(rooms);
            res.send(rooms);
        }
    });
});

router.get('/:id', (req, res) => {
  RoomModel.findById(req.params.id, (err, room) => {
    if (err) {
        console.log(err);
    } else {
        res.send(room);
    }
  });
});

router.post('/', (req, res) => {
    // console.log(req.body);
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

router.delete('/:id', (req, res) => {
    RoomModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('deleted');
        }
    });
});

module.exports = router;