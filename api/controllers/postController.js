import Category from "../model/Category.js";
import Post from "../model/Post.js";

export const createPost = async (req, res)=>{
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json({
            'status': true,
            'data':savedPost
        })
    }catch (error){
        res.status(500).json(error)
    }
}

export const updatePost = async (req, res)=>{
    try {
        const updatePost = await Post.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json({
            'status': true,
            'data':updatePost
        })
    }catch (error){
        res.status(500).json(error)
    }
}

export const deletePost = async (req, res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            'status': true,
            'data': 'Post Deleted'
        })
    }catch (error){
        res.status(500).json(error)
    }
}

export const categoryPost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id).populate([
            // take limited column from relation
            {path:"author", select:"name email"},
            {path:"categories", select:"title"}
        ]);
        res.status(200).json({
            'status':true,
            'data': post
        })
    }catch (error){
        res.status(500).json(error)
    }
}

export const postList = async (req, res)=>{
    try {
        const posts = await Post.find().populate([
            // take limited column from relation
            {path:"author", select:"name email"},
            {path:"categories", select:"title"}
        ]);
        res.status(200).json({
            'status': true,
            'data': posts
        })
    }catch (error){
        res.status(500).json(error)
    }
}

