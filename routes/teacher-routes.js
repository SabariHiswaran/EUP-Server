
const express = require('express')

const router = express.Router()

const teacherControllers = require('../controllers/teacher-controllers')

router.get("/courses", teacherControllers.courselist)

module.exports = router