
const course = require('../constants/courseData')

const courselist = (req,res,next) => {
    res.json({courselist : course})
}

exports.courselist = courselist