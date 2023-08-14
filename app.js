
const express = require('express')

const app = express()

app.get('/' , (req,res,next) => {
    res.send("Server Connected")
    next()
})

app.listen(5000)