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
const newArray = Library.FindAllBooks()
const { query } = require('express');

/*newArray.forEach(i =>{
    i.find({name:"It"},function(err,result){
        console.log(result)
    })
})*/

router.use(bodyParser.urlencoded(
    { extended: false }
))
router.use(bodyParser.json());

var results = []
router.get('/', function(req,res){
    let query = {}
    query.name = req.query.search
    newArray.forEach(model=>{
        model.findOne(query,function(err,result){
            //query.result = result
            //console.log(query.result)
            results.push(result)
            
        })
    })
    /*console.log(results)
    results.forEach(i=>{
        if(i!="It"){
            results = []
        }
        console.log(results)
    })
    */
    res.render('index',{
        searchResult: results
    })

})






router.get('/contact', function(req,res){
    res.render('contact')
    
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

