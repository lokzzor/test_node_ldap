const express = require('express');
const router = express.Router()

const db = require("../models/index");

router.get('/room', function (req, res, next) {
    db.room.findAll() 
    .then( function(room) {
        res.json(room);
    })
    .catch( error => {
        res.status( 400 ).send( error )
    })
});

router.get('/event', function (req, res, next) {
    db.event.findAll() 
    .then( function(event) {
        res.json(event);
    })
    .catch( error => {
        res.status( 400 ).send( error )
    })
});
router.get('/user', function (req, res, next) {
    db.user.findAll() 
    .then( function(user) {
        res.json(user);
    })
    .catch( error => {
        res.status( 400 ).send( error )
    })
});
router.get('/dictionary', function (req, res, next) {
    db.dictionary.findAll() 
    .then( function(dictionary) {
        res.json(dictionary);
    })
    .catch( error => {
        res.status( 400 ).send( error )
    })
});
module.exports = router 
