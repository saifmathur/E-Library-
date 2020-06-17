const mongoose = require('mongoose');
const bookStoreSchema = new mongoose.Schema({
    name:{type: String, required: True},
    category:{type:String, required: false},
    ISBN:{type:Int32Array, required: false},
    author:{type:String, required: false},
    bookCover:{type:Image, required: false}
});

const Store = mongoose.model('store', bookStoreSchema);
module.exports = Store;