import userModel from "../../../../DB/Model/UserModel.js";
import bcrybt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendEmail from "../../../Services/sendEmail.js";
export const signup = async(req,res)=>{
const {userName,Gender,email,password,age}=req.body;
const user =await userModel.findOne({email})
if(user){
return res.status(404).json({message:"email exsit"})
}

const hashPassword = bcrybt.hashSync(password,8)
const userCreate = await userModel.create({userName,Gender,age,email,password:hashPassword})
const token = jwt.sign({email},process.env.EMAILTOKEN,{expiresIn : '1h'})
const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
const refershToken =jwt.sign({email},process.env.EMAILTOKEN,{expiresIn:60*60*24})
const refreshLink = `${req.protocol}://${req.headers.host}/auth/newconfirmEmail/${refershToken}`;
const html =`<a href=${link}>verify email</a> OR <br></br> <a href=${refreshLink}>request new email to verify your email</a>`;
sendEmail(email,"Hello" , html);
return res.status(201).json({message:"succcess",tokenEmail:token})

}
export const signin =async (req,res)=>{
    const{email,password}=req.body;
    const user =await userModel.findOne({email})
    if(!user){
        return res.status(401).json({message:"validdata"})

    }
    if(!user.confirmEmail){
        return res.status(400).json({message:"plz confirm your email"})
    }
    const check =  bcrybt.compareSync(password,user.password)
    if(!check){
        return res.status(401).json({message:"un valid data"})
    }
    const token = jwt.sign({id:user.id},process.env.LOGINTOKEN)
    return res.status(200).json({message:"succes",token})

}
export const confirmEmail =async (req,res)=>{

    const {token} = req.params;
    const decoded =jwt.verify(token,process.env.EMAILTOKEN);
    const user = await userModel.findOneAndUpdate({email:decoded.email,confirmEmail:false},{confirmEmail:true})
    
   if(!user){
    return res.json({message:"your email is confirm "})}
    else{
       return res.redirect(process.env.FRONTEND_LOGIN)}
}
export const newconfirmEmail=async (req,res)=>{
    const {refershToken} = req.params;
    const decoded =jwt.verify(refershToken,process.env.EMAILTOKEN);
    const token = jwt.sign({email:decoded.email},process.env.EMAILTOKEN,{expiresIn:'1h'});
    const link = `${req.protocol}//${req.headers.host}/auth/confirmEmail/${token}`;
    const html =`<a href=${link}>verify email</a>`;
    sendEmail(decoded.email,"Hello",html);
    return res.json({message:"confirm your email "})
}