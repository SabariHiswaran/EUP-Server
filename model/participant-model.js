const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ParticipantSchema = new Schema({
    meetingId : {type:String,required:true},
    courseTopic: {type : String , required : true },
    topic: {type : String , required : true },      
    name:  {type : String , required : true },
    designation:  {type : String , required : true },
    experience: {type : Number , required : true },        
    empStatus :  {type : String , required : true },
    emailId:  {type : String , required : true },
    supervisorId : {type:Object,required:true},
    accountName:  {type : String , required : true },
  })

  module.exports = mongoose.model("Participant", ParticipantSchema)