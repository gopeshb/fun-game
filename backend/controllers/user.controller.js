import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test=(req,res)=>{
    res.send("hello bacchhooo ")
}
export const updateGame = async (req, res, next) => {
    console.log(req.params.id);
    console.log(req.user.id);
  
    if (!req.user || !req.params.id || req.user.id !== req.params.id) {
      return next({
        status: 401,
        message: {
          success: false,
          message: 'Unauthorized: You do not have permission to update this user.',
        },
      });
    }
  
    try {
      console.log(req.body.gameState, req.body.wins, req.body.losses);
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            gameState: req.body.gameState, 
            lives: req.body.lives, 
            wins: req.body.wins, 
            losses: req.body.losses, 
          },
        },
        { new: true }
      );
  
      const { password: pass, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  export const getUsers = async (req, res, next) => {
    try {
      const limit = 9;
      const startIndex = 0;
      const order = 'desc';
      const users = await User.find({})
        .sort({ ['wins']: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
  
  