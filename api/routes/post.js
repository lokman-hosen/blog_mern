import express from "express";
import {postDetail, createPost, deletePost, postList, updatePost} from "../controllers/postController.js";
import {checkLogin} from "../middlewares/checkLogin.js";
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

const router = express.Router();

//create
 router.post("/", checkLogin, upload.single('image'), createPost)
//update
router.put("/:id", checkLogin, updatePost);
 //delete
router.delete("/:id", checkLogin, deletePost);
//detail
router.get("/:id", postDetail);
//get all
router.get("/", checkLogin, postList);
//router.get("/", postList);

export default router
