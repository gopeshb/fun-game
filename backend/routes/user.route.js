import express from "express";
import { updateGame,getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router=express.Router();
router.put('/game/:id',verifyToken,updateGame);
router.get('/get',verifyToken,getUsers);

export default router;