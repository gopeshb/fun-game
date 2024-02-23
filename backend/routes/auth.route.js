import express from "express";
import { signin, signup ,signout } from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signout);
export default router;