import express from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs"
import Category from "../model/Category.js";
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

//login
router.get("/:id", async (req, res)=>{
  try {
    const category = await User.findById(req.params.id);
    res.status(200).json({
      'status': true,
      'data': category
    })
  }catch (error){
    res.status(500).json(error)
  }
})

export default router