const express = require('express')
const studentControllers = require('../controllers/student-controllers')

const router = express.Router()

router.get("/courses" , studentControllers.courselist)

module.exports = router