const mongoose = require('mongoose')
const Schema = mongoose.Schema

let audioSchema = new Schema ({
  link : String , 
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'user'
  }
},{ versionKey: false , timestamps : true})

let Audio = mongoose.model('audio',audioSchema)

module.exports = Audio