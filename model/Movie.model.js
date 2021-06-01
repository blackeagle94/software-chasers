const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    name: {type:String, required:true, unique:true},
    director: {type: String, required:true},
    writer:{type:String, required:true},
    type:{type:String, required:true},
    year:{type:Number, required:true},
    duration:{type:String, required:true},
    rate:{type:Number, required:true},
    imageUrl:{type:String, default:null},
    imageLocal:{type:String, default:null},
    userId: {type: mongoose.Schema.Types.ObjectId, required:true, ref:'user'}
}, {timestamps:true})

module.exports = mongoose.model('movie', MovieSchema)