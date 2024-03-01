import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { error } from 'console';

import user_router from './Routes/userRoute.js';
import authRouter from './Routes/authroute.js';

dotenv.config();

// Check whether connected
mongoose.connect(process.env.MONGO_CONNECTION).then(() => {  
    console.log("Connected to MogoDB");
}).catch((error)=>{
    console.log(error);
})



// Initialize app
const app = express();


// Middlewares
app.use(express.json());

// Routers
app.use("/server/user", user_router);
app.use("/server/auth", authRouter);


// PORT Listening
app.listen(process.env.PORT || 3455,()=>{
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
})


// Test Route
app.get("/test", (req,res) => {
    res.status(200).json("Hello")
})