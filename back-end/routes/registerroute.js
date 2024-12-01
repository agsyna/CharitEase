const express = require('express')
const RegisterController = require('../controllers/register')
const router = express.Router()

router.route('/register').post(RegisterController.registerUser)
router.route('/login').post(RegisterController.login)
module.exports = router