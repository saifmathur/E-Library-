const mongoose = require('mongoose')
const mongodb = require('mongodb')
const { query } = require('express')
const MongoClient = mongodb.MongoClient


const allCollections = []
const allResults = []
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
        /*for(var i in allCollections){
            var collection = allCollections[i]
            if(collection == "system.indexes") continue;
            query = {name:"A Game of Thrones (A Song of Ice and Fire)"}
            db[collection].find(query,function(err, collections){
                console.log(collections)
            })
        } */ 
              
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
