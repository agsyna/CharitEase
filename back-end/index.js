const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();


require("dotenv").config();


app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
  })
);  //because of diff ports for frontend and server

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// To serve static image files i/e event images

app.use(express.static(path.join(__dirname, 'public'))); 

const router = require("./routes/router");
app.use("/api/v1", router);

const DBconnect = require("./database/mongodb");

DBconnect();

app.get("/", (req, res) => {
  res.send("CharitEase");
});

app.listen(port, () => {
  console.log("server listening on port", port);
});
