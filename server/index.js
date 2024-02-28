import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { error } from 'console';

import user_router from './Routes/userRoute.js';

dotenv.config();

// Check whether connected
mongoose.connect(process.env.MONGO_CONNECTION).then(() => {  
    console.log("Connected to MogoDB");
}).catch((error)=>{
    console.log(error);
})



// Initialize app
const app = express();
app.use("/server/user", user_router)
app.listen(process.env.PORT || 3455,()=>{
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
})

app.get("/test", (req,res) => {
    res.status(200).json("Hello")
})