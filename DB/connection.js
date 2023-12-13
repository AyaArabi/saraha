import mongoose from "mongoose";
 const connectDB =async()=>{
    await mongoose.connect(process.env.DBLOCAL)
    .then(console.log("db connection"))
    .catch((err)=>{
       return console.log(`errorr${err}`);
    })
}
export default connectDB;
