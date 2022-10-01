import express from "express";
import User from "../model/User.js";
import {createUser, deleteUser, updateUser, userDetail, userList} from "../controllers/userController.js";

const router = express.Router();
//create
router.post("/", createUser)
//update
router.put("/:id", updateUser);
//delete
router.delete("/:id", deleteUser);
//detail
router.get("/:id", userDetail);
//get all
router.get("/", userList);

export default router
