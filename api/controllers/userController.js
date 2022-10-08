import User from "../model/User.js";

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
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
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
    console.log(req.query.page)
    const skipRecord = req.query.page*10;
    try {
        const users = await User.find().skip(skipRecord).limit(3);
        res.status(200).json({
            'status' : true,
            'data': users,
        })
    }catch (error){
        res.status(500).json(error)
    }
}

