const express = require('express')
const bodyParser = require('body-parser')
app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')


app.use(express.static(__dirname + '/assets'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.use('/', require('./controllers/routes'))
app.use('/contact', require('./controller/routes'))








app.listen(8000,'localhost')