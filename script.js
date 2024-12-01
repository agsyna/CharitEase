const express = require("express");
const app = express()
const port = 55745

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render("views/header")
})

app.listen(port,()=>{
    console.log(`App listening to port ${port}`)
})