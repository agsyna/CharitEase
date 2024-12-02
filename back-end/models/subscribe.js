const mongoose = require('mongoose')



const subscribeSchema = new mongoose.Schema({

    email: {
        type: String,

        required: true,
        unique: true,
        lowercase: true,
    }
})
 
  const sbr = mongoose.model('Subscribe', subscribeSchema);
  
  module.exports = sbr;