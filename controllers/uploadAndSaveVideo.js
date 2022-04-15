const express = require('express')
const app = express()
require('dotenv').config()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}));
var {uploadAndSaveVideoModel}=require('../models/uploadAndSaveVideo')


var saveVideo= async(req,res)=>{
    try{
    var preExist=  await uploadAndSaveVideoModel.find({userName:req.body.userName})
    if(preExist.length){
        uploadAndSaveVideoModel.findOneAndUpdate({userName:req.body.userName},{$push:{videosName:`${req.body.fileName}`}}).then(e=>console.log(e))
    }
    else{
        var status=  await  uploadAndSaveVideoModel.create({
            userName:req.body.userName,
            videosName:[`${req.body.fileName}`]
         })
    }

    res.send("upload successfull");
    }
    catch(er){
        res.send({
            err:er
        })
    }
    
     
  }
  module.exports={
      saveVideo:saveVideo
  }
  