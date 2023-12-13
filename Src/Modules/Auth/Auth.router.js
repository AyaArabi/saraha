import express from 'express'
import { asyncHandler } from '../../Middleware/errorHandling.js'
import * as AuthController from './Controller/Auth.controller.js'
import { validation } from '../../Middleware/validation.js'
import { signinSchema, signupSchema } from './Auth.validation.js'
const app =express()
app.post('/signup',validation(signupSchema),asyncHandler(AuthController.signup))
app.post('/signin',validation(signinSchema),asyncHandler(AuthController.signin))
app.get('/confirmEmail/:token',asyncHandler(AuthController.confirmEmail))
app.get('/newconfirmEmail/:refreshToken',asyncHandler(AuthController.newconfirmEmail))
export default app;