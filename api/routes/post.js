import express from "express";
import Category from "../model/Category.js";
import Post from "../model/Post.js";
import {categoryPost, createPost, deletePost, postList, updatePost} from "../controllers/postController.js";
import {checkLogin} from "../middlewares/checkLogin.js";

const router = express.Router();

//create
 router.post("/", checkLogin, createPost)
//update
router.put("/:id", updatePost);
 //delete
router.delete("/:id", deletePost);
//detail
router.get("/:id", categoryPost);
//get all
router.get("/", postList);

export default router
