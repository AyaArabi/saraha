import mongoose, { Schema,Model,model,Types } from "mongoose";

const MessageSchema = new Schema({
    message:{type:String,
    required:true},
    reciverID:{
        type:Types.ObjectId,
        required:true,
        ref:'User',
    }
})
const MessageModel = mongoose.model.Massage || model('Message',MessageSchema)
export default MessageModel;