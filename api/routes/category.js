import express from "express";
import {
 categoryDetail,
 categoryList,
 createCategory,
 deleteCategory,
 updateCategory
} from "../controllers/categoryController.js";
import {checkLogin} from "../middlewares/checkLogin.js";

const router = express.Router();
//create
 router.post("/", checkLogin, createCategory)
//update
router.put("/:id", checkLogin, updateCategory);
 //delete
router.delete("/:id", checkLogin, deleteCategory);
//detail
router.get("/:id", checkLogin, categoryDetail);
//get all
router.get("/", categoryList);

export default router
