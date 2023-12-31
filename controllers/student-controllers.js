
const HttpError = require('../model/Http-error')
const Course = require('../model/course-model')
const CourseMeeting = require("../model/meeting-model")
const Participant = require("../model/participant-model")

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


const selectedMeeting = async (req,res,next) => {

  const {courseTopic,topic,meetingId} = req.params

  
  let meeting;
console.log(meetingId)
  try{
    meeting =  await CourseMeeting.findById(meetingId)
  }catch(err){
      const error = new HttpError("Cannot find the Upcoming meetings for the selected course" , 404)
      return next(error)
  }
  console.log("meeting" , meeting)

  res.json({meeting : meeting.toObject({getters : true })})

}

const addParticipants = async (req,res,next) => {

    const {
      name,
      designation,
      experience,
      empStatus,
      emailId,
      supervisorId,
      accountName,
      courseTopic,
      topic,
      meetingId,
      userId ,
      badge
        }= req.body 

   const newParticipant = new Participant({
        name,
        designation,
        experience,
        empStatus,
        emailId,
        supervisorId,
        accountName,
        courseTopic,
        topic,
        meetingId,
        userId,
        badge
      })
 
    try {
      await newParticipant.save()
    }catch{
      const error = new HttpError("Unable to add new Participant" ,404 )
      return next(error)
    }
    
    res.status(201).json({newParticipant : newParticipant.toObject({getters : true })})

}


const enrolledMeetings = async (req,res,next) => {

  const {userId} = req.userData

  let allMeetings
  let convertedMeetings

  try{
    allMeetings =await Participant.find({userId : userId})

    convertedMeetings = allMeetings.map(meeting => meeting.toObject({getters : true }))
   
  }catch(err){
    const error = new HttpError("Could not find any meetings details" , 404)
    return next(error)
  }

  res.json({enrolledMeetings :convertedMeetings })
}

const unregister = async (req,res,next) => {

  const meetingId = req.params.meetingId 
  const id = req.params.id

  let student

  try{
   student = await Participant.findByIdAndRemove(id)
  }catch(err) {
    const error =new HttpError("Could not unregister the participant" , 500)
    return next(error)
  }

  res.status(200).json({unregister : "You are successfully unregister form the meeting"})

}


const updateFeedbackNumber = async (req,res,next) => {

  console.log("reacghed")
  const meetingId = req.params.meetingId 
  const userId = req.params.id 
  const feedbackNumber = req.params.feedbackNumber 


  let meeting

  try{
  //  meeting = await CourseMeeting.findByIdAndUpdate(meetingId,{$push : {feedback : [{"userId" : userId ,"providedFeedback" : feedbackNumber}]} } )
  meeting = await CourseMeeting.findById(meetingId)
   
  }catch(err) {
    const error =new HttpError("Something went wrong, Could not update the meeting" , 500)
    return next(error)
  }

  const newObj = {"userId" : userId ,"providedFeedback" : feedbackNumber}

  meeting.feedback.push(newObj)

  console.log(meeting.feedback)

 try{
   await meeting.save()
   
  }catch(err) {
    const error =new HttpError("Something went wrong, Could not update the meeting" , 500)
    return next(error)
  }

   res.status(200).json({status : 200 , meeting : "Feedback has been successfully updated."})
}


exports.courselist = courselist
exports.upcomingMeetings = upcomingMeetings
exports.selectedMeeting = selectedMeeting
exports.addParticipants = addParticipants
exports.enrolledMeetings = enrolledMeetings
exports.unregister = unregister
exports.updateFeedbackNumber = updateFeedbackNumber