const express = require('express');
const RegisterController = require('../controllers/register')



const { createClub, getClub, deleteClub, updateClub } = require('../controllers/Club');
const { login, registerUser } = require('../controllers/register');
const router = express.Router();

router.post('/register', registerUser)

router.get('/login', login)

router.post('/createClub', createClub);

router.get('/getClub', getClub)

router.delete('/deleteClub/:clubId', deleteClub)

router.put('/updateClub/:clubId', updateClub)

 
module.exports = router;
 

