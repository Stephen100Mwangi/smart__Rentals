import express from 'express'
import signUpController from '../controller/signUpcontroller.js'
const authRouter = express.Router();

authRouter.post("/signup", signUpController)

export default authRouter