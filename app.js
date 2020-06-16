const express = require('express')
const bodyParser = require('body-parser')
app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')


app.use(express.static(__dirname + '/assets'))


app.use('/', function(req,res){
    res.render('index')
})


app.listen(8000,'localhost')