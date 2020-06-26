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
const newArray = Library.FindAllBooks()
var allGenreNames = []
newArray.forEach(model =>{
    allGenreNames.push(model.modelName)
})


const { query } = require('express');
const Contact = Library.Feedback



router.get('/',(req,res)=>{
    res.render('index')
})

router.post('/',function(req,res){
    let query = {}
    query.name = {$regex: req.body.search, $options: "i"}
    if(req.body.search === '' || req.body.search === null){
        res.render('index',{
            msg: 'Please search for something'
        })
        return 
    }
    else{
        newArray.forEach(model=>{
            model.findOne(query,function(err,result){
                if(result){
                    query.book = result.name
                    query.ISBN = result.ISBN
                    query.genre = result.genre
                    query.author = result.author
                    res.render('index',{
                        msg: 'Book Found ',
                        bookName: query.book,
                        searchResult: 'Name: ' + query.book,
                        isbn: 'ISBN: ' + query.ISBN,
                        genre: 'Genre: ' + query.genre,
                        author: 'Author: '+ query.author,
                        fileMsg: 'Click to Open file: '
                    })
                }
                
            })
        })
    }
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


router.post('/file',function(req,res){
    console.log(Library.books)
})



router.get('/category', function(req,res){
    res.render('category',{
        categories: allGenreNames
    })
    
})

router.get('/category/:category', function(req, res){
    console.log(query)
    res.render('category')
})

module.exports = router;