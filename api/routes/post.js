import express from "express";
import {postDetail, createPost, deletePost, postList, updatePost} from "../controllers/postController.js";
import {checkLogin} from "../middlewares/checkLogin.js";

const router = express.Router();

//create
 router.post("/", checkLogin, createPost)
//update
router.put("/:id", checkLogin, updatePost);
 //delete
router.delete("/:id", deletePost);
//detail
router.get("/:id", postDetail);
//get all
router.get("/", checkLogin, postList);

export default router
