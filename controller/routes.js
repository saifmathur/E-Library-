const express = require('express')
const router = express.Router()

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



