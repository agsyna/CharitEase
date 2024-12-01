const express = require('express');
const RegisterUse = require('../controllers/register');

const { getEvents, deleteClub, updateClub, createEvent } = require('../controllers/Club');
const { login, registerUser } = require('../controllers/register');
const router = express.Router();

router.post('/register', registerUser)

router.get('/login', login)

router.post('/createEvent', createEvent)

router.get('/getEvents', getEvents)

router.delete('/deleteClub/:clubId', deleteClub)

router.put('/updateClub/:clubId', updateClub)

 
module.exports = router;
 

