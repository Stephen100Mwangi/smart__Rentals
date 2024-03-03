import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { error } from 'console';
import bcrypt from 'bcryptjs'
import User from './Models/UserModel.js';

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
app.use(cors());
app.use(express.json());

// PORT Listening
app.listen(process.env.PORT,()=>{
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
})


// Create new user
app.post("/register", async(req,res) =>{
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password,10);
        await User.create({username: req.body.username, email: req.body.email, password: hashedPassword});
        res.status(201).send("Success");
    } catch (error) {
        res.status(400).send("User creation FAILED");
        console.log(error);
    }
})

app.post("/login", async(req,res) => {
    try {
        await User.findOne({email: req.body.email}).then((user) => {
            if (user) {
                const passMatch = bcrypt.compare(req.body.password, user.password);
                if (passMatch) {
                    const name = user.username;
                    res.status(200).send("Usersuccessfullyloggedin " + name);

                  
                }else{
                    res.status(400).send("Wrong password.Please try again");
                }
            }else{
                res.status(404).send("User does not exist");
            }
        })
    } catch (error) {
        res.status(400).send("User login failed")
        
    }
})

