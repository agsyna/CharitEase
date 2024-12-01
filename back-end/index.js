const RegisterController = require('./controllers/register')
const express = require("express");
const mongo = require('mongoose');
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();


require("dotenv").config();
const RegisterRouter = require('./routes/registerroute');



app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use('/App', RegisterRouter)

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.static(path.join(__dirname, 'public')))

const router = require("./routes/router");
app.use("/api/v1", router);

const DBconnect = require("./database/mongodb");

DBconnect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("server listening on port", port);
});
