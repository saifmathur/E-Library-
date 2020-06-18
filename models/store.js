const mongoose = require('mongoose');
const mongodb = require('mongodb')

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
    Fiction
}