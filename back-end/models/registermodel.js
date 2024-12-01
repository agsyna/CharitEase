const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
        validate: [validator.isEmail]
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

// Hash the password before saving the document
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
  
  // Add a method to check password validity
  userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  const Fields = mongoose.model('BasicInfo', userSchema);
  
  module.exports = Fields;