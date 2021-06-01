const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {type:String, required:true, unique:true},
    body: {type: String, required:true},
    author:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, required:true}
}, {timestamps:true})

module.exports = mongoose.model('post', PostSchema)