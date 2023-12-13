import express from 'express'
import * as dotenv from 'dotenv'
import initApp from './Src/App.router.js';
dotenv.config();
import connectDB from './DB/connection.js';
import sendEmail from './Src/Services/sendEmail.js';

const app =express();
connectDB();
initApp(app,express);
const port =process.env.port || 3000;

app.listen(port,()=>{
    console.log("server is running");
})
