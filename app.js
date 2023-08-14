
const express = require('express')

const mongoose = require('mongoose')

const app = express()

app.get('/' , (req,res,next) => {
    res.send("Server is Connected")
    next()
})

mongoose.connect("mongodb+srv://sabari:2aHFuH3s4CiIMXYf@cluster0.d9vjeat.mongodb.net/test?retryWrites=true&w=majority")
.then(() => app.listen(5000))
.catch((err) => {
    console.log(err)
})
