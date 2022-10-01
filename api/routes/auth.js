import express from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs"
const router = express.Router();

// register user
router.post("/register", async(req, res) =>{
  //hash password
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({
    "name": req.body.name,
    "user_type": "author",
    "image": "user.png",
    "email": req.body.email,
    "password": hash,
    "status": 1,
  })
  try {
    const savedCategory = await newUser.save()
    res.status(200).json({
      'status' : true,
      'data': savedCategory,
    })
  }catch (error){
    res.status(500).json(error)
  }
})

export default router