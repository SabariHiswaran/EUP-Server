
const express = require('express')

const router = express.Router()

const teacherControllers = require('../controllers/teacher-controllers')

const checkAuth = require("../middleware/check-auth")

router.use(checkAuth)

router.get("/courses", teacherControllers.courselist)

router.post("/courses/createMeeting",teacherControllers.createNewMeeting )

router.get("/courseMeetings",teacherControllers.courseMeetings )

router.get("/courseMeetings/:meetingId" , teacherControllers.meetingDetail)

router.patch("/courseMeetings/:meetingId", teacherControllers.editMeeting)

router.delete("/courseMeetings/:meetingId", teacherControllers.deleteMeeting)

router.get("/courses/enrolledMembers/:meetingId" , teacherControllers.enrolledMembers)

router.patch("/courseMeetings/updateMeetingStatus/:meetingId",teacherControllers.updateMeetingStatusDetail)

router.get("/courseMeetings/completedMeetings/Rewards", teacherControllers.rewardsMeeting)

router.patch("/courses/updateBadge/:memberId",teacherControllers.updateBadgeDetail)

module.exports = router