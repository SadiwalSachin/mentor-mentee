import mongoose , {Schema} from "mongoose";

const commentSchema  = new Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true
    },
    content:{
        type:String,
        reqiured:true
    }
},{timestamps:true})

export const Comment = mongoose.model("Comment",commentSchema)