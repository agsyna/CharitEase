const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const subscribeSchema = new mongoose.Schema({

    email: {
        type: String,

        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail]
    }
})
 
  const sbr = mongoose.model('Subscribe', subscribeSchema);
  
  module.exports = sbr;