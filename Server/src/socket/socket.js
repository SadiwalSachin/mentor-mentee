import {Server} from "socket.io"
import http from "http"
import {app} from "../app.js"

const server = http.createServer(app)

const io = new Server(server , {
    cors:{
        origin:["http://localhost:5173"],
        methods:["GET","POST"]
    }
})

const onlineUsers = {} 

io.on("connection",(socket)=>{
    console.log("User connected with socketID :- ",socket.id);
    const userId = socket.handshake.query.userId
    if(userId){
        onlineUsers[userId] = socket.id
    }

    io.emit("getAllOnlineUser",onlineUsers)

    socket.on("disconnected",()=>{
        console.log("user disconnected",socket.id);
        delete onlineUsers[userId]
    io.emit("getAllOnlineUser",onlineUsers)
    })
})

export {server , io}