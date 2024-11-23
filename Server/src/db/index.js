import mongoose from "mongoose"

const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb://localhost:27017/")
        console.log("DB connected");
        // console.log(connectionInstance);
        
    } catch (error) {
        console.log("error while connecting db");
        console.log(error);
        process.exit(1)
    }
    
}

export default dbConnect