import express from "express";
import {
 categoryDetail,
 categoryList,
 createCategory,
 deleteCategory,
 updateCategory
} from "../controllers/categoryController.js";

const router = express.Router();
//create
 router.post("/", createCategory)
//update
router.put("/:id", updateCategory);
 //delete
router.delete("/:id", deleteCategory);
//detail
router.get("/:id", categoryDetail);
//get all
router.get("/", categoryList);

export default router
