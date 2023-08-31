
const express = require('express')

const mongoose = require('mongoose')

const bodyparser = require('body-parser')

const cors = require('cors')

const HttpError = require('./model/Http-error')

const teacherroutes = require("./routes/teacher-routes")

const studentroutes = require("./routes/student-routes")

const app = express()

app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended : true}))

app.use(cors())

app.use("/api/teacher" , teacherroutes)   //Teacher routes

app.use("/api/student", studentroutes )

app.use((error,req,res,next) => {
   
    if(res.headersent){
        return next(error)
    }

    res.status(error.statuscode || 500)
    res.json({message: error.message || "An unexpected error has been occured"})
})

mongoose.connect("mongodb+srv://sabari:2aHFuH3s4CiIMXYf@cluster0.d9vjeat.mongodb.net/EUP?retryWrites=true&w=majority")
.then(() => app.listen(5000))
.catch((err) => {
    const error =  new HttpError("Connection failed" , 500 )
    throw error
})
