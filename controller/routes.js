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


router.use(bodyParser.urlencoded(
    { extended: false }
))
router.use(bodyParser.json());


//getting the database in
const Library = require('../models/store')
const allCollections = Library.allCollections
const newArray = Library.FindAllBooks()
const { query } = require('express');
const Contact = Library.Feedback


router.get('/',(req,res)=>{
    res.render('index')
})

router.post('/',function(req,res){
    let query = {}
    query.name = req.body.search
    newArray.forEach(model=>{
        model.findOne(query,function(err,result){
            if(!result){
                query.book = 'not found'
            }
            else{
                query.book = result.name
                res.render('index',{
                    searchResult: query.book
                })
            }
            
        })
    })
})

router.get('/contact', function(req,res){
    res.render('contact')
})

router.post('/contact', function(req,res){
    var suggestion = new Contact()
    suggestion.name = req.body.name;
    suggestion.email = req.body.email;
    suggestion.feedback = req.body.feedback;


    suggestion.save(function(err, result){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/')
            console.log('Feedback Submitted')  
        }
    })
})






router.get('/category', function(req,res){
    res.render('category',{
        categories: Library.allCollections
    })
    
})

router.get('/category/:category', function(req, res){
    console.log(query)
    res.render('category')
})

module.exports = router;