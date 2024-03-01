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

// Test Route
app.get("/test", (req,res) => {
    res.status(200).json("Hello")
})

// Middlewares
app.use(express.json());

// PORT Listening
app.listen(process.env.PORT || 3455,()=>{
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
})




// Routers
app.use("/server/user", user_router);
app.use("/server/auth", authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = error.message || "Interal Server error";
    return req.status(statusCode).json({
        success: true,
        statusCode,
        message,
    });
});
