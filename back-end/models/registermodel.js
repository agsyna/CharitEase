const mongoose = require('mongoose')
// fname:req.body.fname,
// lname:req.body.lname,
// email: req.body.email,
// governmentid: req.body.governmentid,
// dob: req.body.dob,
// password: req.body.password,


const userSchema = new mongoose.Schema({

    fname:{
        type:String,
        required: true,
        lowercase: true,
    },
    lname:{
        type:String,
        required: true,
        lowercase: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    governmentid:{
        type:String,
        required: true,
        lowercase: true,

    },
    dob:{
        type:Date,
        required: true,
    },
    type:{
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
})
 
  const Fields = mongoose.model('BasicInfo', userSchema);
  
  module.exports = Fields;