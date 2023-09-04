const express = require('express')
const studentControllers = require('../controllers/student-controllers')

const router = express.Router()

router.get("/courses" , studentControllers.courselist)

router.get("/courses/:courseTopic/:topic/upcomingMeetings",studentControllers.upcomingMeetings)

router.get("/courses/:courseTopic/:topic/register/:meetingId",studentControllers.selectedMeeting)

router.post("/courses/:courseTopic/:topic/register/:meetingId", studentControllers.addParticipants)

module.exports = router