const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongodb = require('mongodb'), MongoClient = mongodb.MongoClient



mongoose.connect('mongodb://localhost:27017/BookStore',
{ useNewUrlParser: true ,
 useUnifiedTopology: true })


const Store = require('./models/store')

app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')


app.use(express.static(__dirname + '/assets'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.use('/', require('./controller/routes'))
app.use('/contact', require('./controller/routes'))
app.use('/category',require('./controller/routes'))



app.listen(3000,'localhost')