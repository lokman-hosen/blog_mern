import Category from "../model/Category.js";
import Post from "../model/Post.js";

export const createPost = async (req, res)=>{
    const newPost = new Post(req.body)
    // try {
    //     const savedPost = await newPost.save()
    //     res.status(200).json({
    //         'status': true,
    //         'data':savedPost
    //     })
    // }catch (error){
    //     res.status(500).json(error)
    // }
}

export const updatePost = async (req, res)=>{
    // this user get from token from checkLogin middleware
    const loginUser = req.user;
    const post = await Post.findById(req.params.id).populate('author');

    // admin post owner can edit post
    if (post.author._id == loginUser.id || loginUser.user_type == 'admin'){
        try {
            const updatePost = await Post.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new:true, runValidators: true}
            );
            res.status(200).json({
                'status': true,
                'data':updatePost
            })
        }catch (error){
            res.status(500).json(error)
        }
    }else {
        res.status(404).json({
            'status': false,
            'data': "You are unauthorized to update this post"
        })
    }

}

export const deletePost = async (req, res)=>{
    const loginUser = req.user;
    const post = await Post.findById(req.params.id).populate('author');

    // admin post owner can edit post
    if (post.author._id == loginUser.id || loginUser.user_type == 'admin'){
        try {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json({
                'status': true,
                'data': 'Post Deleted'
            })
        }catch (error){
            res.status(500).json(error)
        }
    }else {
        res.status(404).json({
            'status': false,
            'data': "You are unauthorized to delete this post"
        })
    }
}

export const postDetail = async (req, res)=>{
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
    const skipRecord = req.query.page*10;
    try {
        const posts = await Post.find().populate([
            // take limited column from relation
            {path:"author", select:"name email"},
            {path:"categories", select:"title"}
        ]).skip(skipRecord -10).limit(10);
        const totalRecord = await Post.countDocuments({});
        res.status(200).json({
            'status': true,
            'data': posts,
            'totalRecord': totalRecord,
        })
    }catch (error){
        res.status(500).json(error)
    }
}


