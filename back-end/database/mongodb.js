const mongoose = require('mongoose');

require('dotenv').config()

async function DBconnect(){
    try{
        await mongoose.connect(process.env.monogodbURL)
        console.log('database conected successfully')
    }catch(err){
        console.log('failed to connect database',err);
        process.exit(1)
    }
}


module.exports = DBconnect
