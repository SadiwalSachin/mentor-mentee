import mongoose , {Schema} from "mongoose"

const messageSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    isReaded:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:["sent","delivered","seen"],
        default:"sent"
    }
},{timestamps:true})

export const Message = mongoose.model("Model",messageSchema)