const express = require('express');


const cors = require('cors');




const serveStaticRecursive = require('./ServeFile.js');



const port = process.env.PORT ||4000;
const cron = require('node-cron');
const fs = require('fs');

const path = require('path');

const app = express();

const multer = require('multer');


const upload = require('./upload');

var corsOptions = {
  origin: 'https://gathervent.axel-cal.fr/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use( express.urlencoded( {
    extended: true,
    limit: '50mb'
} ) )
app.use(cors(corsOptions))

app.post("/upload", upload.array('files', 10), (req, res) => {
      // check whether req.file contians the file
      // if not multer is failed to parse so notify the client
    
  
    console.log(req);



  res.status(201).send("File uploaded successfully");
  });







app.use(serveStaticRecursive(path.join(__dirname, "assets")));


app.get("/e5x", (req, res) => {
  res.header("Content-type", "text/html");

  res.sendFile(path.join(__dirname, "/assets/e5x.html"));
  console.log("e5x.html demande");

});


app.get("/", (req, res) => {
  res.header("Content-type", "text/html");
  res.sendFile(path.join(__dirname, "/assets/index.html"));
 console.log("index.html demande");
});


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});