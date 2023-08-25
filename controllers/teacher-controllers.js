
const HttpError = require('../model/Http-error')
const Course = require('../model/course-model')
const CourseMeeting = require('../model/meeting-model')

const courselist = async (req,res,next) => {

    let course;

    try{
      course =  await Course.findById("64e4ad90d05a05c64b9d6f5f")
      
    }catch(err){
        const error = new HttpError("Cannot find the Courses" , 404)
        return next(error)
    }
  
    res.json({courses : course})
}


const createNewMeeting = async (req,res,next) => {

    const {courseTopic,topic,membersLimit,startDate,endDate,startTime,endTime,totalDays,name,designation,experience,knowledgeRequired} = req.body

    const createdMeeting = new CourseMeeting({
      courseTopic,
      topic ,
      membersLimit,   
      startDate,
      endDate,
      startTime,
      endTime,
      totalDays,       
      name,
      designation,
      experience,        
      knowledgeRequired
    })

    try{
      await createdMeeting.save()
    }catch(err){
      const error = new HttpError("Unable to create the new Meeting" , 404)
      return next(error)
  }

    res.status(201).json({requestData : req.body})
   
} 

const courseMeetings = async (req,res,next) => {
    let allCourseMeetings

    try{
     allCourseMeetings =await CourseMeeting.find({})
    }catch(err){
      const error = new HttpError("Could not find any meetings details" , 404)
      return next(error)
    }

    res.json({courseMeetings : allCourseMeetings})
}

exports.courselist = courselist
exports.createNewMeeting = createNewMeeting
exports.courseMeetings = courseMeetings