import express from "express";
import User from "../model/User.js";
import {createUser, deleteUser, updateUser, userDetail, userList} from "../controllers/userController.js";
import {checkLogin} from "../middlewares/checkLogin.js";

const router = express.Router();

// router.get("/middleware", checkLogin,(req, res)=>{
//     res.status(200).json('Middlleware')
// })
//create
router.post("/", createUser)
//update
router.put("/:id", updateUser);
//delete
router.delete("/:id", deleteUser);
//detail
router.get("/:id", userDetail);
//get all
//router.get("/", checkLogin, userList);
router.get("/", userList);

export default router
