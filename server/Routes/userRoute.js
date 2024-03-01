import express from 'express'
import test from '../controller/signUpcontroller.js'

const user_router = express.Router();

user_router.get("/", (req,res) => {
    console.log("Hello User");
    res.status(200).send("Welcome to MERN")
})

user_router.get("/test", test);

// Create user


// Export Router

export default user_router
