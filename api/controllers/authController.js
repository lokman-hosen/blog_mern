import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const registration = async (req, res)=>{
    //hash password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
        "name": req.body.name,
        "user_type": "author",
        "image": "user.png",
        "email": req.body.email,
        "password": hash,
        "status": 1,
    })
    try {
        const savedCategory = await newUser.save()
        res.status(200).json({
            'status' : true,
            'data': savedCategory,
        })
    }catch (error){
        res.status(500).json(error)
    }
}

export const login = async (req, res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if (user){
            const passwordCorrect = await bcrypt.compare(req.body.password, user.password)
            if (passwordCorrect){
                const {password, ...otherDetails} = user._doc;
                const token = jwt.sign({
                    email: user.email
                }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({
                    'status': true,
                    'message': "Login Success",
                    'token': token
                })
            }else {
                res.status(400).json({
                    'status': false,
                    'data': "Password not matched"
                })
            }
        }else {
            res.status(200).json({
                'status': false,
                'data': "User Not Found"
            })
        }

    }catch (error){
        res.status(500).json(error)
    }
}

