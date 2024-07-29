const express = require('express');


const cors = require('cors');




const serveStaticRecursive = require('./ServeFile.js');



const port = 4000;
const cron = require('node-cron');
const fs = require('fs');

const path = require('path');

const app = express();

const multer = require('multer');


const upload = require('./upload');

var corsOptions = {
  origin: 'http://localhost:5173/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use( express.urlencoded( {
    extended: true,
    limit: '50mb'
} ) )
app.use(cors(corsOptions))

app.post("/upload", upload.single("file"), (req, res) => {
      // check whether req.file contians the file
      // if not multer is failed to parse so notify the client
    if (!req.file || !req.body.scripts) {
        res.status(413).send(`cannot receive multiple files at once or missing information from client`);





      return;
  }
  

      
      if (req.body.scripts.toString() === "e5x") {
        e5x.e5x(req, res);
      }
  // successfull completion


  let base = req.file.filename.toString()


  let main = path.parse(base).name
  
  let ext = path.parse(base).ext



  res.status(201).send({ urlretour: `http://localhost:${port}/download/${path.parse(base).name}_done${path.parse(base).ext}` });
  console.log({ urlretour: `http://localhost:${port}/download/${path.parse(base).name}_done${path.parse(base).ext}` })
});

app.get("/download/:filename", (req, res) => {
  res.download(path.join(__dirname, "/uploads/", req.params.filename));
  console.log("download demande");
});

// app.use(cors({
//   origin: 'http://localhost:3000', // Remplacez par votre nom de domaine
//   optionsSuccessStatus: 200,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   credentials: true,
//   allowedHeaders: 'Content-Type,Authorization',
// }));




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