import User from "../model/User.js";
import Category from "../model/Category.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res)=>{
    const newUser = new User(req.body)
    try {
        const savedUser = await newUser.save()
        res.status(200).json({
            'status' : true,
            'data': savedUser,
        })
    }catch (error){
        res.status(500).json(error)
    }
}

export const updateUser = async (req, res)=>{
    try {
        if (req.body.password){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash
        }
        console.log(req.body);
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
             {new:true, runValidators: true}
        );
        res.status(200).json({
            'status': true,
            'data':updateUser,
        })
    }catch (error){
        res.status(500).json(error)
    }
}

export const deleteUser = async (req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            'status': true,
            'message': 'User Deleted'
        })
    }catch (error){
        res.status(500).json(error)
    }
}

export const userDetail = async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(
            {
                'status' : true,
                'data': user,
            }
        )
    }catch (error){
        res.status(500).json(error)
    }
}

export const userList = async (req, res)=>{
    const skipRecord = req.query.page*10;
    try {
        const users = await User.find().skip(skipRecord -10).limit(10);
        const totalRecord = await User.countDocuments({});
        res.status(200).json({
            'status' : true,
            'data': users,
            'totalRecord': totalRecord,
        })
    }catch (error){
        res.status(500).json(error)
    }
}

