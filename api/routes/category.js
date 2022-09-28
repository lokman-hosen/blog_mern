import express from "express";
import Category from "../model/Category.js";

const router = express.Router();

//create
 router.post("/", async (req, res) =>{
     const newCategory = new Category(req.body)
     //console.log(newCategory);
     try {
        const savedCategory = await newCategory.save()
         res.status(200).json(savedCategory)
         //res.status(200).json('Category working')
     }catch (error){
        res.status(500).json(error)
     }
 })

//update
router.put("/:id", async (req, res) =>{
    try {
        const updateCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json(updateCategory)
    }catch (error){
        res.status(500).json(error)
    }
});

 //delete
router.delete("/:id", async (req, res) =>{
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json('Category Deleted')
    }catch (error){
        res.status(500).json(error)
    }
});

//detail
router.get("/:id", async (req, res) =>{
    try {
      const category = await Category.findById(req.params.id);
        res.status(200).json(category)
    }catch (error){
        res.status(500).json(error)
    }
});

//get all
router.get("/", async (req, res) =>{
    try {
      const categories = await Category.find();
        res.status(200).json(categories)
    }catch (error){
        res.status(500).json(error)
    }
});

export default router
