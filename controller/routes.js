const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const path = require('path')
const mongoose = require('mongoose')

const conn = mongoose.connect('mongodb://localhost:27017/BookStore',
{ useNewUrlParser: true ,
 useUnifiedTopology: true 
})


//getting the database in
const Store = require('../models/store')
const { query } = require('express');


router.use(bodyParser.urlencoded(
    { extended: false }
))
router.use(bodyParser.json());





router.get('/', function(req,res){
    Store.find({},function(err, result){
        if(err){
            console.log(err)
        }
        else{
            console.log(result);
            res.render('index')
        }
    })
})




router.get('/contact', function(req,res){
    res.render('contact')
})



module.exports = router;