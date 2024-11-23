import mongoose , {Schema} from "mongoose"

const userSchema = new Schema({
    fullName:{
        type:String
    },
    skills:[{
        type:String
    }],
    verificationCode:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profilePicture:{
        type:String,
    },
    isMentor:{
        type:Boolean,
        default:false
    },
    sessions:[{
        type:Schema.Types.ObjectId,
        ref:"Session"
    }]
},{timestamps:true})

export const User = mongoose.model("User",userSchema)
