import express from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs"
import Category from "../model/Category.js";
import {login, registration} from "../controllers/authController.js";
import  cors from 'cors'
const router = express.Router();

// register user
router.options('/register', cors())
router.post("/register", registration)
//login
router.options('/login', cors())
router.post("/login", login)

export default router