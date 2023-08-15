
const express = require('express')

const mongoose = require('mongoose')

const bodyparser = require('body-parser')

const HttpError = require('./model/Http-error')

const teacherroutes = require("./routes/teacher-routes")

const app = express()

app.use(bodyparser.json())

app.use("/api/teacher" , teacherroutes)

app.use((error,req,res,next) => {

    if(res.headersent){
        return next(error)
    }

    res.status(error.statuscode || 500)
    res.json({message: error.message || "An unexpected error has been occured"})
})

mongoose.connect("mongodb+srv://sabari:2aHFuH3s4CiIMXYf@cluster0.d9vjeat.mongodb.net/test?retryWrites=true&w=majority")
.then(() => app.listen(5000))
.catch((err) => {
    const error =  new HttpError("COnnection failed" , 500 )
    throw error
})
