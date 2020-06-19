const mongoose = require('mongoose')
const mongodb = require('mongodb')
const { query } = require('express')
const MongoClient = mongodb.MongoClient


const allCollections = []

MongoClient.connect('mongodb://localhost:27017/BookStore',function(err,client){
    if(err){
        console.log(err)    
    }
    else {
        const db = client.db('BookStore');
        db.listCollections().toArray(function(err,collections){
            if(err){
                console.log(err)
            }
            else{
                collections.forEach(eachCollectionDetails => {
                    allCollections.push(eachCollectionDetails.name)
                })
            }
        })      
        client.close();
    }
})


const categorySchema = new mongoose.Schema({
    name:{type: String, required: true},
    genre:{type:String, required: false},
    ISBN:{type: String, required: false},
    author:{type:String, required: false},
    //File:{type:Image, required: false}
});

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
    models.push(mongoose.models.store)
    return models
}

const Inspirational =  mongoose.model('Inspirational',categorySchema,'Inspirational')
const Fiction = mongoose.model('Fiction', categorySchema,'Fiction')
const Thriller = mongoose.model('Thriller',categorySchema,'Thriller')
const SciFi = mongoose.model('SciFi',categorySchema,'Sci-Fi')
const Horror = mongoose.model('Horror',categorySchema,'Horror')
const Fantasy = mongoose.model('Fantasy',categorySchema,'Fantasy')
const Romance = mongoose.model('Romance',categorySchema,'Romance')


module.exports = {
    Inspirational,
    Fiction,
    allCollections,
    Thriller,
    SciFi,  
    Fiction,
    Horror,
    Inspirational,
    Fantasy,
    Romance,
    FindAllBooks
}
