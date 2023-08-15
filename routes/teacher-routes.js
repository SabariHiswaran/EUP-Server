
const express = require('express')

const router = express.Router()

const teacherControllers = require('../controllers/teacher-controllers')

router.get("/", teacherControllers.courselist)

module.exports = router