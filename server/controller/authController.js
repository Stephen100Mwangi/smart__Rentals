import User from '../Models/UserModel.js'
import bcrypt from 'bcryptjs';
import errorHandler from '../utils/error.js';
const signup = async (req,res,next)=>{

    // We capture the data and store in the database
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password,10)
    const newUser = new User({ username,email,hashedPassword});

    try {
        // Save new user in database
        await newUser.save();

        // Success message
        res.status(201).json({message: "User created successfully"});

    } catch (error) {
       next(error);
    }
   


    
}

export default signup