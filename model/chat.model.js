const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    text:String
})

const chatModel = mongoose.model("chat",chatSchema)

module.exports = {
    chatModel
}