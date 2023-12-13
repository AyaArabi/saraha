
import MessageModel from "../../../../DB/Model/MessageModel.js";

export const sendMessage =async(req,res,next)=>{
const {reciverID} = req.params;
const {message}= req.body;
const user = await MessageModel.create({reciverID,message})
return res.status(201).json({message:"success create message",user})
}
export const getMessage =async(req,res,next)=>{
   
    const user = await MessageModel.find({reciverID:req.user._id})
    
  return  res.json({message:"success",user})
} 