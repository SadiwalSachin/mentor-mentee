import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



// user Routes

import userRouter from "./routes/user.route.js"
app.use("/api/v1/user",userRouter)


import messageRouter from "./routes/message.route.js"
app.use("/api/v1/message",messageRouter)


export {app}