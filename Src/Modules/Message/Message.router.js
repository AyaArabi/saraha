import express from 'express'
import * as messageController from './Controller/Message.controller.js'
import { asyncHandler } from '../../Middleware/errorHandling.js';
import { auth } from '../../Middleware/Auth.Middleware.js';
const app =express();
app.post('/:reciverID',asyncHandler(messageController.sendMessage))
app.get('/',auth,asyncHandler(messageController.getMessage))
export default app;