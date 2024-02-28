import express from 'express'

const user_router =express.Router();

user_router.get("/", (req,res) => {
    console.log("Hello User");
    res.status(200).send("Welcome to MERN")
})

// Export Router

export default user_router
