//Create our express and socket.io servers
const express = require('express')
const app = express()
const server = require('http').Server(app)
var multer=require("multer");
const io = require('socket.io')(server)
const {v4: uuidV4} = require('uuid')
require('dotenv').config()
app.use(express.static('files'));
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
var path=require('path');
var fs=require('fs');
var  port =process.env.PORT || 1370 || 2000 || 5000
app.set('view engine', 'ejs') 
var uploadAndSaveVideoRoute=require('./routers/uploadAndSaveVideo')
var streamVideo=require('./routers/streamVideo')
var {uploadAndSaveVideoModel}=require('./models/uploadAndSaveVideo')

app.use("/upload",uploadAndSaveVideoRoute);

app.get('/uploadVideo', (req, res) => {
    res.render('room')
})

app.get("/video", function (req, res) {
    res.sendFile(__dirname + "/index.html");
  });

  app.get("/download", (req,res)=> {
  res.download(`files/${req.query.fileName}`);
  });

  app.get("/fetchVideo",async (req,res)=> {
  var videoData= await uploadAndSaveVideoModel.find({userName:req.query.userName,})
  console.log(videoData);
  res.status(200).send(videoData);
    });
  

  app.use("/videog",streamVideo)


  
server.listen(port) // Run the server on the 3000 port