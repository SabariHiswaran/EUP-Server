
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CourseSchema = new Schema({
    courseLists : [
        {
            type : Object,
            required:true
        }
    ]
})

module.exports = mongoose.model("Course" , CourseSchema)