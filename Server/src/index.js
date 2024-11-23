import { app } from "./app.js";
import { server } from "./socket/socket.js";
import dotenv from "dotenv"
import dbConnect from "../src/db/index.js"
dotenv.config()

const PORT = process.env.PORT || 7878

dbConnect().then(()=>{
    server.listen(PORT,()=>{
        console.log(`Server is listening on the port ${PORT}`);
    })

    server.on("error",(error)=>{
        console.log(error);
    })
})
.catch((error)=>{
    console.log("error while connecting db at main index.js file");
})