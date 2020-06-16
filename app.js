const express = require('express')
const bodyParser = require('body-parser')
app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')


app.use(express.static(__dirname + '/assets'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/about', function (req,res){
    res.render('about')
})

app.use('/contact',function (req, res){
    res.render('contact')
})

app.use('/', function(req,res){
    res.render('index')
})








app.listen(8000,'localhost')