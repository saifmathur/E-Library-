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

let db;
MongoClient.connect('mongodb://localhost:27017/BookStore',{
    useUnifiedTopology: true
    },function (err, database){
        db = database;
})


//getting the database in
const Store = require('../models/store')
const { query } = require('express');


router.use(bodyParser.urlencoded(
    { extended: false }
))
router.use(bodyParser.json());





router.get('/', function(req,res){
    res.render('index')
})




router.get('/contact', function(req,res){
    res.render('contact')
})

router.get('/category', function(req,res){
    res.render('category')
})

module.exports = router;