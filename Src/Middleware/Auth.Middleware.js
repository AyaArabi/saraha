import jwt from 'jsonwebtoken'
import UserModel from 'moongose/models/user_model.js'
import userModel from '../../DB/Model/UserModel.js'
export const auth =async(req,res,next)=>{
    const {authorization}=req.headers
if(!authorization?.startsWith(process.env.BEARERKEY)){
    return res.json({message:"invalid authorization"})
}

const token =authorization.split(process.env.BEARERKEY)[1]
if(!token){
    res.json({message:"invalid data"})
}

const decoded = jwt.verify(token,process.env.LOGINTOKEN)
const authUser =await userModel.findById(decoded.id).select("userName,email")
if(!authUser){
    res.json({message:"not register acount"})
}
console.log(authUser)
req.user =authUser;
next()
}