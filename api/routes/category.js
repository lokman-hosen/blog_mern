import express from "express";
import Category from "../model/Category.js";

const router = express.Router();

//create
 router.post("/", async (req, res) =>{
     const newCategory = new Category(req.body)
     console.log(newCategory);
     try {
        const savedCategory = await newCategory.save()
         res.status(200).json(savedCategory)
         res.status(200).json('Category working')
     }catch (error){
        res.status(500).json(error)
     }
 })

export default router
