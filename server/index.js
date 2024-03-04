import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { error } from 'console';
import bcrypt from 'bcryptjs'
import User from './Models/UserModel.js';
import jwt from 'jsonwebtoken'
import RentList from './Models/ListingModel.js';

dotenv.config();

// Check whether connected
mongoose.connect(process.env.MONGO_CONNECTION).then(() => {  
    console.log("Connected to MongoDB");
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

app.post("/login", async (req,res) => {
    try {
        await User.findOne({email: req.body.email}).then(async (user) => {
            if (!user) {
                res.status(400).send("Wrong email or password")
            }

            const passMatch = await bcrypt.compare(req.body.password, user.password);

            if (!passMatch) {
                res.status(400).send("Wrong email or password.Please try again");
            }

            // Create a token
            const token = jwt.sign({id: user._id}, process.env.SECRET);
            // Save token as a cookie
            res.cookie('access_token',token,{httpOnly: true}).status(200).json(user);

            res.status(200).send("User successfully logged in ");
        })
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("An internal server error occurred"); 
        
    }
})


// Create a house
app.post("/house", async(req,res) => {
    try {
        const requiredFields = ['name', 'price', 'renttype', 'capacity'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
        await RentList.create({name: req.body.name, price: req.body.price, renttype: req.body.renttype, capacity: req.body.capacity});
        res.status(201).send("Success")
            
        
        
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            // Handle validation errors (e.g., invalid data types)
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            res.status(400).json({ error: 'Validation error', details: errors });
        } else if (error.code === 11000) { // Handle duplicate key errors (e.g., unique constraint violations)
            res.status(400).json({ error: 'Duplicate house name detected' }); // Adjust message as needed
        } else {
            // Handle other errors (e.g., server errors)
            res.status(500).json({ error: 'Internal server error' });
        }
    }
   
})


// Fetch all houses
app.get("/houses", async(req,res) => {
    try {
        await RentList.find();
        res.status(200).send("Good")
    } catch (error) {
        console.log(error);
        res.status(500).send("An internal error ccured while retrieving the houses")
    }
})

