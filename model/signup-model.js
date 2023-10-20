const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SignUpSchema = new Schema({
    name : {type:String,required:true},
    emailId: {type : String , required : true },
    password: {type : String , required : true }, 
    designation:  {type : String , required : true },
  })

  module.exports = mongoose.model("User", SignUpSchema)