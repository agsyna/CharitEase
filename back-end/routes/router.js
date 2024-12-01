const express = require('express');
const RegisterUse = require('../controllers/register');

const { getEvents, deleteEvent, updateEvent, createEvent } = require('../controllers/Club');
const { login, registerUser } = require('../controllers/register');
const router = express.Router();

router.post('/register', registerUser)

router.get('/login', login)

router.post('/createEvent', createEvent)

router.get('/getEvents', getEvents)

router.delete('/deleteEvent/:eventId', deleteEvent)

router.put('/updateEvent/:eventId', updateEvent)

 
module.exports = router;
 

