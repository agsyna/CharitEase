const express = require('express');
const { createClub, getClub, deleteClub, updateClub } = require('../controllers/Club');
const router = express.Router();


router.post('/createClub', createClub);

router.get('/getClub', getClub)

router.delete('/deleteClub/:clubId', deleteClub)

router.put('/updateClub/:clubId', updateClub)

 
module.exports = router;
 

