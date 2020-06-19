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



//getting the database in
const Library = require('../models/store')
const allCollections = Library.allCollections
const { query } = require('express');



router.use(bodyParser.urlencoded(
    { extended: false }
))
router.use(bodyParser.json());


router.get('/', function(req,res){
    res.render('index',{
      search: req.body.search  
    })
    Library.FindAllBooks().forEach(model=>{
        model.find({},function(err,result){
            console.log(result)
        })
    })
    

}) 

router.get('/contact', function(req,res){
    res.render('contact')
    
})


router.get('/category', function(req,res){
    res.render('category',{
        categories: Library.allCollections
    })
    //console.log(Library.allCollections)
})

router.get('/category/:category', function(req, res){
    console.log(query)
    res.render('category',{
    
    
    })
})

module.exports = router;

