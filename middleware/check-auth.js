

const jwt = require('jsonwebtoken')

const HttpError = require('../model/Http-error')

module.exports = (req,res,next) => {

    if(req.method === "OPTIONS"){
        return next()
    }

    try{
       
        const token =req.headers.authorization.split(' ')[1]
        if(!token) {
            throw new Error("Authentication failed")
        }
        const decodedToken = jwt.verify(token,'supersecret_privatekey')
    
        req.userData = {userId : decodedToken.userId}

        next()
        
    }catch(err) {
        const error = new HttpError("Authentication dfvedfef" ,401)
        return next(error)
    }


}