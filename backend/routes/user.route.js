import express from "express";
import { test } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router=express.Router();
router.get("/test",(req,res)=>{
    test
});

export default router;