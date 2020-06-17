const mongoose = require('mongoose');
const mongodb = require('mongodb')

const bookStoreSchema = new mongoose.Schema({
    name:{type: String, required: true},
    genre:{type:String, required: false},
    ISBN:{type: String, required: false},
    author:{type:String, required: false},
    //File:{type:Image, required: false}
});

const Store = mongoose.model('store', bookStoreSchema,'store');
module.exports = Store;




