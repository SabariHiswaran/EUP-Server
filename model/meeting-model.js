const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MeetingSchema = new Schema({
    courseTopic: {type : String , required : true },
    topic: {type : String , required : true },
    membersLimit: {type : Number , required : true },   
    startDate:  {type : Date , required : true },
    endDate: {type : Date , required : true },
    startTime: {type : String , required : true },
    endTime: {type : String , required : true },
    totalDays: {type : Number , required : true },       
    name:  {type : String , required : true },
    designation:  {type : String , required : true },
    experience: {type : Number , required : true },        
    knowledgeRequired:  {type : String , required : true },
    userId : {type : String , required : true }  ,
    status : {type : String , required : true }  
  })

  module.exports = mongoose.model("CourseMeeting", MeetingSchema)