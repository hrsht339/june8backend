const express = require("express")
const cors = require("cors")
const socketio = require("socket.io")
const http = require("http")
const { connection } = require("./config/db")
const { userRouter } = require("./route/user.route")
const { chatRouter } = require("./route/chat.route")
const { authentication } = require("./middleware/authentication")

const app = express()

const server = http.createServer(app)
const io = socketio(server)
app.use(express.json())

app.use(cors())

app.use("/",userRouter)
// app.use(authentication)
app.use("/",chatRouter)



io.on("connection",(socket)=>{
    console.log("one user connected")
    
    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })

    socket.on("message",(text)=>{

        io.emit("message",text)
    })
})

server.listen(4500,async()=>{
    try{
        await connection 
        console.log("db is connected")
    }
    catch(err){
        console.log(err)
    }
    console.log("server is active")
})