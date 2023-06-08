const express = require("express")
const { chatModel } = require("../model/chat.model")

const chatRouter = express.Router()

chatRouter.get("/chat",async(req,res)=>{
    const {userid} = req.body
    try{
        const texts = await chatModel.find()
        res.send({
            "msg":"all the texts below",
            texts,
            userid
        })
    }
    catch(err){
    console.log(err)
    }
})

chatRouter.post("/chat",async(req,res)=>{
    const {text,userid} = req.body
    try{
        const texts = new chatModel({
            text:text
        })
        texts.save()
        res.send({
            "msg":"posted text below",
            texts,
            userid
        })
    }
    catch(err){
    console.log(err)
    }
})


module.exports={
    chatRouter
}