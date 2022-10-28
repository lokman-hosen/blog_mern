import Category from "../model/Category.js";
import Post from "../model/Post.js";
import multer from 'multer'
//const upload = multer({ dest: 'uploads/' })

export const createPost = async (req, res)=>{
   // console.log(req.body)
    let fileName1 = '';

    const storage = multer.diskStorage({
        // destination: function (req, file, cb) {
        //     cb(null, '/tmp/my-uploads')
        // },
        destination: "uploads",
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            const fileName = 'post' + '-'+uniqueSuffix+ext;
            fileName1 = fileName
            cb(null, fileName)
        }
    });

    const upload = multer({
        storage: storage
    }).single('image')

    upload(req, res, (err) =>{
        // process
        const requestBody = req.body;
        const categoryIds = [];
        const asArray = Object.entries(requestBody);
        const filtered = asArray.filter(([key, value]) =>{
            if (key.includes("categories")){
                categoryIds.push(value)
            }
        })
        if (err){
            res.status(500).json({
                        'status': false,
                        'data':"Something Went wrong"
                    })

        }else {
            const newPost = new Post({
                'title': req.body.title,
                'description': req.body.description,
                'image': "uploads/"+fileName1,
                'author': req.body.author,
                'categories': categoryIds,
                'status': req.body.status,
            })

            try {
                const savedPost = newPost.save()
                res.status(200).json({
                    'status': true,
                    'data':savedPost
                })
            }catch (error){
                res.status(500).json(error)
            }
        }

    })
    // const newPost = new Post({
    //     'title': req.body.title,
    //     'description': req.body.description,
    //     'image': fileName1,
    //     'categories': req.body.categories,
    //     'status': req.body.status,
    // })
    //
    // //console.log(newPost);
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


