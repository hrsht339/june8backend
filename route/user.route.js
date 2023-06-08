const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const { userModel } = require("../model/user.model")
const userRouter = express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {username,email,password}= req.body
    try{
        bcrypt.hash(password,3,async(err,hashed)=>{
            const user = new userModel({username,email,password:hashed})
            await user.save()

            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'valerie75@ethereal.email',
                    pass: 'jq5T2dsFgZ2nFf2zEA'
                }
            });

            transporter.sendMail({
                from: email, // sender address
                to: "valerie75@ethereal.email", // list of receivers
                subject: "verification link", // Subject line
                text: `https://june8backend.onrender.com/verify/${email}`, // plain text body
              })



            res.send({
                "msg":"user registered plz goto your email and verify your profile",
                user
            })
        })
    }
    catch(err){
        console.log(err)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body
    try{
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,async(err,result)=>{
                if(result){
                    const token = jwt.sign({userid:user.username},"masai",{expiresIn:"3h"})
                    res.send({
                        "msg":"logged in",
                        token
                    })
                }
                else{
                    res.send({
                        "msg":"wrong password"
                    })
                }
            })
        }
        else{
            res.send({
                "msg":"user not found"
            })
        }
        
    }
    catch(err){
        console.log(err)
    }
})

userRouter.get("/verify/:email",async(req,res)=>{
    try{
        const {email} = req.params
        const user = await userModel.findOne({email})
        user.isVerified= true
        await userModel.findByIdAndUpdate(user._id,user)
        res.send({
            "msg":"verification success"
        })
    }
    catch(err){
        console.log(err)
    }
})


module.exports ={
    userRouter
}