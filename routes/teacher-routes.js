
const express = require('express')

const router = express.Router()

const teacherControllers = require('../controllers/teacher-controllers')

router.get("/courses", teacherControllers.courselist)

router.post("/courses/createMeeting",teacherControllers.createNewMeeting )

router.get("/courseMeetings",teacherControllers.courseMeetings )

router.get("/courseMeetings/:meetingId" , teacherControllers.meetingDetail)

router.patch("/courseMeetings/:meetingId", teacherControllers.editMeeting)

router.delete("/courseMeetings/:meetingId", teacherControllers.deleteMeeting)

module.exports = router