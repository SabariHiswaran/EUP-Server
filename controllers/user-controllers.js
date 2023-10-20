
const HttpError = require('../model/Http-error')
const User = require('../model/signup-model')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')

const signUp = async (req,res,next) => {

    const {name,emailId,password,designation} = req.body
    let existingUser;
    try{
        existingUser =await User.findOne({emailId:emailId})
       
    }catch(err){
        const error = new HttpError("Unable to add new user" ,404 )
        return next(error)
    }
    if(existingUser){
        const error = new HttpError("User already exists" , 422)
        return next(error)
    }

    let hashedPassword;
    try{

    hashedPassword =await bcrypt.hash(password , 12)

    }catch(err){
        const error = new HttpError("Unable to add new user,please try again" ,500 )
        return next(error)
    }

    const newUser = new User({
     name,
     emailId,
     password:hashedPassword,
     designation
    })
    try{
      await newUser.save()
    }catch(err){
      const error = new HttpError("Unable to create the new User" , 404)
      return next(error)
  }

    let token;
    try{
    token = jwt.sign({userId : newUser.id , emailId : newUser.emailId},'supersecret_privatekey',{expiresIn:"1h"})
    }catch(err){
        const error = new HttpError("Unable to create the new User" , 404)
        return next(error)
    }

    res.status(201).json({userId : newUser.id , emailId : newUser.emailId,token:token})
   
} 



const logIn = async (req,res,next) => {

    const {emailId,password} = req.body

    let existingUser;
    try{
        existingUser =await User.findOne({emailId:emailId})
       
    }catch(err){
        const error = new HttpError("Unable to login user" ,404 )
        return next(error)
    }

    if(!existingUser){
        const error = new HttpError("User does not exists" , 422)
        return next(error)
    }

    let isValidPassword = false
    try{
        isValidPassword =await bcrypt.compare(password,existingUser.password)
    }catch(err){
        const error = new HttpError("Unable to login user, please try again" ,404 )
        return next(error)
    }

    if(!isValidPassword){
        const error = new HttpError("User login credentials incorrect, please try again" , 422)
        return next(error)
    }

    let token;
    try{
    token = jwt.sign({userId : existingUser.id , emailId : existingUser.emailId},'supersecret_privatekey',{expiresIn:"1h"})
  
    }catch(err){
        const error = new HttpError("Unable to login User" , 404)
        return next(error)
    }

    res.status(201).json({userId : existingUser.id , emailId : existingUser.emailId,token:token})
   
} 

exports.signUp= signUp
exports.logIn = logIn