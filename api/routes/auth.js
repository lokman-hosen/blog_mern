import express from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs"
import Category from "../model/Category.js";
import {login, registration} from "../controllers/authController.js";
const router = express.Router();

// register user
router.post("/register", registration)
//login
router.post("/login", login)

export default router