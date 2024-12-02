const express = require('express');
const RegisterUse = require('../controllers/register');

const { getEvents, deleteEvent, updateEvent, createEvent } = require('../controllers/event');
const { login, registerUser } = require('../controllers/register');
const SubscribeUser = require("../controllers/subscribe")
const getStars = require("../controllers/stars")
const router = express.Router();


router.post('/register', registerUser)

router.get('/login', login)

router.post('/createEvent', createEvent)

router.get('/getEvents', getEvents)

router.delete('/deleteEvent/:eventId', deleteEvent)

router.put('/updateEvent/:eventId', updateEvent)

router.post('/subscribe', SubscribeUser)

router.get('/getstars', getStars)

module.exports = router;