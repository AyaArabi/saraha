import authRouter from '../Src/Modules/Auth/Auth.router.js'
import userRouter from '../Src/Modules/User/User.router.js'
import messageRouter from '../Src/Modules/Message/Message.router.js'
import cors from 'cors'
const initApp=(app,express)=>{
app.use(express.json());
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/messages',messageRouter)
app.use(cors());
}
export default initApp;    