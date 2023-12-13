import express from 'express'
import * as userController from './Controller/User.Controller.js'
import { auth } from '../../Middleware/Auth.Middleware.js';
const app=express();
app.get('/profile',auth,userController.profile)
export default app;