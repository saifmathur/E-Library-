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
const { query } = require('express');



router.use(bodyParser.urlencoded(
    { extended: false }
))
router.use(bodyParser.json());





router.get('/', function(req,res){
    res.render('index',{
        
    })
    
        
})
    
router.get('/contact', function(req,res){
    res.render('contact')
    
})

router.get('/category', function(req,res){
    res.render('category',{
        categories: Library.allCollections
    })
    console.log(Library.allCollections)

})

router.get('/category/:id', function (req, res){
    Library.allCollections

})



module.exports = router;

/*
app.get('/article/:id', function (req, res){
    Article.findById(req.params.id, function(err, article){
       res.render('article', {
            article: article
       })
    })
})
*/