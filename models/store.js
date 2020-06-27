const mongoose = require('mongoose')
const mongodb = require('mongodb')
const { query } = require('express')
const MongoClient = mongodb.MongoClient
const fs = require('fs')
const { Console } = require('console')

mongoose.connect('mongodb://localhost:27017/BookStore',{useUnifiedTopology: true,useNewUrlParser: true},function(err,db){
    if(err){
        console.log(err) 
    }
    else {
        console.log('Connected to ' + db.name)       
    }

})


const categorySchema = new mongoose.Schema({
    name:{type: String, required: true},
    genre:{type:String, required: false},
    ISBN:{type: String, required: false},
    author:{type:String, required: false},
    BookID:{type:String, required: false}
});

const suggestionSchema = new mongoose.Schema({
    name: { type:String, required: true },
    email: { type:String, required: true },
    feedback:{type: String, required: true}
})

const gridSchema = new mongoose.Schema({},{strict: false})
const chunkSchema = new mongoose.Schema({},{strict: false})
const Grid = mongoose.model("Grid",gridSchema,'fs.files')
const Chunk = mongoose.model("Chunk",chunkSchema,'fs.chunks')
/*Grid.find({},function(err,files){
    var arr = []
    arr.push(files)
    console.log(files)
})
Chunk.find({},function (err, chunks){
    //console.log(chunks)
})
*/

categorySchema.index({name:1})


const Inspirational =  mongoose.model('Inspirational',categorySchema,'Inspirational')
const Fiction = mongoose.model('Fiction', categorySchema,'Fiction')
const Thriller = mongoose.model('Thriller',categorySchema,'Thriller')
const SciFi = mongoose.model('SciFi',categorySchema,'Sci-Fi')
const Horror = mongoose.model('Horror',categorySchema,'Horror')
const Fantasy = mongoose.model('Fantasy',categorySchema,'Fantasy')
const Romance = mongoose.model('Romance',categorySchema,'Romance')
const Educational = mongoose.model('Educational',categorySchema,'Educational')


//feedback data
const Feedback = mongoose.model('Feedback',suggestionSchema,'Suggestions_and_Feedback')

//searching all collections
const FindAllBooks = function(){
    let models = []
    models.push(mongoose.models.Fantasy)
    models.push(mongoose.models.Fiction)
    models.push(mongoose.models.Horror)
    models.push(mongoose.models.Inspirational)
    models.push(mongoose.models.Romance)
    models.push(mongoose.models.SciFi)
    models.push(mongoose.models.Thriller)
    models.push(mongoose.models.Educational)

    return models
}

module.exports = {
    Inspirational,
    Fiction,
    Thriller,
    SciFi,  
    Fiction,
    Horror,
    Inspirational,
    Fantasy,
    Romance,
    Feedback,
    Educational,
    Grid,
    Chunk,
    FindAllBooks
}
