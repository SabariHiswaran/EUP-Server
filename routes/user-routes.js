
const express = require('express')

const router = express.Router()

const userControllers = require('../controllers/user-controllers')

router.post("/", userControllers.signUp)

router.post("/login",userControllers.logIn)

module.exports = router