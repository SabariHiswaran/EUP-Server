
const HttpError = require('../model/Http-error')
const Course = require('../model/course-model')
const CourseMeeting = require("../model/meeting-model")

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

const upcomingMeetings = async (req,res,next) => {

  const {courseTopic,topic} = req.params

  
  let meetings;

  try{
    meetings =  await CourseMeeting.find({courseTopic : courseTopic,topic : topic})
    convertedCourseMeetings = meetings.map(meeting => meeting.toObject({getters : true }))
  }catch(err){
      const error = new HttpError("Cannot find the Upcoming meetings for the selected course" , 404)
      return next(error)
  }

  res.json({meetings : convertedCourseMeetings})

}


exports.courselist = courselist
exports.upcomingMeetings = upcomingMeetings