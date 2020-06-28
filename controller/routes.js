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
const fs = require('fs')


router.use(bodyParser.urlencoded(
    { extended: false }
))
router.use(bodyParser.json());


//getting the database in
const Library = require('../models/store')
//var conn = Library.conn
const newArray = Library.FindAllBooks()

const conn = mongoose.createConnection('mongodb://localhost:27017/BookStore',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let gfs;
conn.once('open',function(){
   gfs = Grid(conn.db, mongoose.mongo)
   //gfs.collection('fs.files')
})

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
    }
    else{
        newArray.forEach(model=>{
            model.findOne(query,function(err,result){
                console.log(result)
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
                        fileMsg: 'Click to Open file: ',
                        id: result.id,
                        bookid: result.BookID
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


router.get('/index/:id',function(req,res){
    var query= {}
    query.id = req.params.id
    Library.Grid.findById(query.id,function(err,book){
        if(err){
            console.log(err)
        }
        if(!book || book.length === 0){
            return res.status(404).json({
                err: 'No file Found'
            })
        }
        else{
            const readstream = gfs.createReadStream(book)
            readstream.pipe(res)
            

        }
    })
    
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