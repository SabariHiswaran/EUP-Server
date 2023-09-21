
const HttpError = require('../model/Http-error')
const Course = require('../model/course-model')
const CourseMeeting = require('../model/meeting-model')
const Participant = require('../model/participant-model')

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
    let convertedCourseMeetings

    try{
     allCourseMeetings =await CourseMeeting.find({})

     convertedCourseMeetings = allCourseMeetings.map(meeting => meeting.toObject({getters : true }))
     
    }catch(err){
      const error = new HttpError("Could not find any meetings details" , 404)
      return next(error)
    }

    res.json({courseMeetings :convertedCourseMeetings })
}

const meetingDetail = async (req,res,next) => {

  const meetingId = req.params.meetingId

  let CourseMeetingDetail

  try{
    CourseMeetingDetail =await CourseMeeting.findById(meetingId)
  
  }catch(err){
    const error = new HttpError("Could not find the meeting details" , 404)
    return next(error)
  }

  res.json({courseMeetings :CourseMeetingDetail.toObject({getters : true }) })
}

const deleteMeeting = async (req,res,next) => {

    const meetingId = req.params.meetingId 

    let meeting

    try{
     meeting = await CourseMeeting.findByIdAndRemove(meetingId)
    }catch(err) {
      const error =new HttpError("Could not delete the meeting" , 500)
      return next(error)
    }

     res.status(200).json({meeting : "Selected Meeting has been deleted successfully"})

}

const editMeeting = async (req,res,next) => {

  const meetingId = req.params.meetingId 
 const {
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
    } = req.body

  let meeting

  try{
   meeting = await CourseMeeting.findById(meetingId)
   
  }catch(err) {
    const error =new HttpError("Something went wrong, Could not update the meeting" , 500)
    return next(error)
  }

  meeting.membersLimit = membersLimit 
  meeting.startDate = startDate 
  meeting.endDate = endDate 
  meeting.startTime = startTime 
  meeting.endTime = endTime 
  meeting.totalDays = totalDays 
  meeting.name = name 
  meeting.designation = designation 
  meeting.experience = experience 
  meeting.knowledgeRequired = knowledgeRequired

 try{
   await meeting.save()
   
  }catch(err) {
    const error =new HttpError("Something went wrong, Could not update the meeting" , 500)
    return next(error)
  }

   res.status(200).json({meeting : "Meeting Details has been successfully updated."})
}

const enrolledMembers = async (req,res,next) => {

  const meetingId = req.params.meetingId

  let members 

  try {
    members = await Participant.find({meetingId : meetingId})

    convertedMembers = members.map(member => member.toObject({getters : true }))

  }catch(err) {
    const error =new HttpError("Something went wrong, Could not find the enrolled members" , 500)
    return next(error)
  }

  res.status(200).json({members : convertedMembers})
}


exports.courselist = courselist
exports.createNewMeeting = createNewMeeting
exports.courseMeetings = courseMeetings
exports.meetingDetail = meetingDetail
exports.editMeeting = editMeeting
exports.deleteMeeting = deleteMeeting
exports.enrolledMembers = enrolledMembers