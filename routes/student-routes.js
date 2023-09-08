const express = require('express')
const studentControllers = require('../controllers/student-controllers')

const router = express.Router()

router.get("/courses" , studentControllers.courselist)

router.get("/courses/:courseTopic/:topic/upcomingMeetings",studentControllers.upcomingMeetings)

router.get("/courses/:courseTopic/:topic/register/:meetingId",studentControllers.selectedMeeting)

router.post("/courses/:courseTopic/:topic/register/:meetingId", studentControllers.addParticipants)

router.get("/courses/enrolledMeetings", studentControllers.enrolledMeetings)

router.delete("/courses/unenroll/:id/:meetingId", studentControllers.unregister)

module.exports = router