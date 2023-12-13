import mongoose, { Schema, model } from "mongoose";
const UserSchema =new Schema({
    userName:{type:String,
    required:true,
},
email:{type:String,
required:true,
unique:true,
email:true,},
password:{
    required:true,
    type:String,
    required:true,

},
confirmEmail:{
    default:false,
    type:Boolean,

},
Gender:{
    type:String,
    default:'Male',
    unum:['Male','Female'],
},
age:{
    type:Number
}
},{timestamps:true,})

const userModel = mongoose.models.User|| model('User',UserSchema)
export default userModel;