import express from "express";
import User from "../model/User.js";

const router = express.Router();

//create
router.post("/", async (req, res) =>{
    const newUser = new User(req.body)
    try {
        const savedCategory = await newUser.save()
        res.status(200).json(savedCategory)
        //res.status(200).json('Category working')
    }catch (error){
        res.status(500).json(error)
    }
})

//update
router.put("/:id", async (req, res) =>{
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json(updateUser)
    }catch (error){
        res.status(500).json(error)
    }
});

//delete
router.delete("/:id", async (req, res) =>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User Deleted')
    }catch (error){
        res.status(500).json(error)
    }
});

//detail
router.get("/:id", async (req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    }catch (error){
        res.status(500).json(error)
    }
});

//get all
router.get("/", async (req, res) =>{
    try {
        const user = await User.find();
        res.status(200).json(user)
    }catch (error){
        res.status(500).json(error)
    }
});

export default router
