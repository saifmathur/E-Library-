const mongoose = require('mongoose')
const mongodb = require('mongodb')
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
                    //console.log(eachCollectionDetails.name)
                })
            }
        })        
        client.close();
    }
})







const categoryInspiration = new mongoose.Schema({
    name:{type: String, required: true},
    genre:{type:String, required: false},
    ISBN:{type: String, required: false},
    author:{type:String, required: false},
    //File:{type:Image, required: false}
    })


const categoryFiction = new mongoose.Schema({
    name:{type: String, required: true},
    genre:{type:String, required: false},
    ISBN:{type: String, required: false},
    author:{type:String, required: false},
    //File:{type:Image, required: false}
    });



const Inspirational =  mongoose.model('Inspirational',categoryInspiration,'Inspirational')
const Fiction = mongoose.model('Fiction', categoryFiction,'Fiction')


module.exports = {
    Inspirational,
    Fiction,
    allCollections
}
