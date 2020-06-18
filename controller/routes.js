const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const path = require('path')
const mongodb = require('mongodb'), MongoClient = mongodb.MongoClient
const assert = require('assert')
const mongoose = require('mongoose')

//mongoose.connect('mongodb://localhost:27017/BookStore')



//getting the database in
const Library = require('../models/store')
console.log()
const { query } = require('express');



router.use(bodyParser.urlencoded(
    { extended: false }
))
router.use(bodyParser.json());





router.get('/', function(req,res){
    res.render('index')
    Library.Inspirational.find({},function (err,data){
        console.log(data)
    })
    
        
})





router.get('/contact', function(req,res){
    res.render('contact')
    
})

router.get('/category', function(req,res){
    res.render('category')
    //console.log(db.collection({}))

})

module.exports = router;