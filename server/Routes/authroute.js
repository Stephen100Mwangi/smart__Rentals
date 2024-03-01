import express from 'express'
import signup from '../controller/authController.js'
// Create a new Router
const authRouter = express.Router();

authRouter.post("/signup", signup)

export default authRouter