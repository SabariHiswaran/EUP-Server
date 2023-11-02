const express = require('express')
const studentControllers = require('../controllers/student-controllers')

const router = express.Router()


const checkAuth = require("../middleware/check-auth")

router.use(checkAuth)

router.get("/courses" , studentControllers.courselist)

router.get("/courses/:courseTopic/:topic/upcomingMeetings",studentControllers.upcomingMeetings)

router.get("/courses/:courseTopic/:topic/register/:meetingId",studentControllers.selectedMeeting)

router.post("/courses/:courseTopic/:topic/register/:meetingId", studentControllers.addParticipants)

router.get("/courses/enrolledMeetings", studentControllers.enrolledMeetings)

router.delete("/courses/unenroll/:id/:meetingId", studentControllers.unregister)

router.patch("/courses/feedback/:id/:meetingId/:feedbackNumber",studentControllers.updateFeedbackNumber)

 
module.exports = router