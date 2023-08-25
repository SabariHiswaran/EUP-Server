
const express = require('express')

const router = express.Router()

const teacherControllers = require('../controllers/teacher-controllers')

router.get("/courses", teacherControllers.courselist)

router.post("/courses/createMeeting",teacherControllers.createNewMeeting )

router.get("/courseMeetings",teacherControllers.courseMeetings )

module.exports = router