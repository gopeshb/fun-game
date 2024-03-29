import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username) {
        return res.status(400).json({ success: false, message: 'Please provide valid values for username' });
    }
    if (!password) {
        return res.status(400).json({ success: false, message: 'Please provide valid values for password' });
    }
    if (!email) {
        return res.status(400).json({ success: false, message: 'Please provide valid values for email' });
    }

    try {
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ success: false, message: 'Username is already taken. Please choose another.' });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, 
                message: 'Email is already registered. Please use another email address.' });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
    }
};
export const signin=async (req,res,next)=>{
    const { email,password } = req.body;
    if (!password) {
        return res.status(400).json({ success: false, message: 'Please provide valid values for password' });
    }
    if (!email) {
        return res.status(400).json({ success: false, message: 'Please provide valid values for email' });
    }
    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorHandler(401,'Invalid email. User not found.'));
        }
        
        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(401,"Wrong credentials!"));
        }
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=validUser._doc;
        res.cookie('access_token',token,{httpOnly:true})
        .status(200).json(rest);
    } catch (error) {
        console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
    }
}

export const signout=async(req,res,next)=>{
    try {
        res.clearCookie('access_token');
        res.status(200).json('user has been logged out');
    } catch (error) {
        next(error);
    }
}