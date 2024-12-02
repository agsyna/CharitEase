const express = require("express");
const app = express()
const port = 55745

app.set('view engine','ejs');
app.use(express.static('public'));
// app.get('/',(req,res)=>{
//     res.render("views/header")
// })

app.listen(port,()=>{
    console.log(`App listening to port ${port}`)
})

app.get('/', (req, res) => {
    res.render('index'); 
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/events', (req, res) => {
    res.render('events'); 
});
app.get('/contactus', (req, res) => {
    res.render('contactus'); 
});
app.get('/communities', (req, res) => {
    res.render('communities'); 
});

app.get('/signup', (req, res) => {
    res.render('signup'); 
});
app.get('/ngodashboard', (req, res) => {
    res.render('ngodashboard'); 
});

app.get('/ngoevent', (req, res) => {
    res.render('ngoevent');
});
app.get('/ngoupdate', (req, res) => {
    res.render('ngoupdate'); 
});

app.get('/volunteer', (req, res) => {
    res.render('volunteer'); 
});
// app.get('/CHETNA%20NGO', (req, res) => {
//     res.render('chetna ngo'); 
// });
// app.get('/asha%20kiran', (req, res) => {
//     res.render('asha kiran');  
// });
// app.get('/c%20a%20r%20e', (req, res) => {
//     res.render('c a r e'); 
// });
// app.get('/diya%20foundation', (req, res) => {
//     res.render('diya foundation'); 
// });

app.get('/indievents:name', (req, res) => {
    const {name} = req.params;
    res.render('indievents',{name}); 
});
app.get('/ngos:name', (req, res) => {
    const {name} = req.params;
    res.render('ngos',{name}); 
});

