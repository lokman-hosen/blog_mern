import Category from "../model/Category.js";
import Post from "../model/Post.js";
import multer from 'multer'
import { unlinkSync } from 'node:fs';

//const upload = multer({ dest: 'uploads/' })

export const createPost = async (req, res)=>{
   // console.log(req.body)
    let fileNameFinal = null;

    const storage = multer.diskStorage({
        destination: "uploads",
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            const fileName = 'post' + '-'+uniqueSuffix+ext;
            fileNameFinal = "uploads/"+fileName
            cb(null, fileName)
        }
    });

    const upload = multer({
        storage: storage
    }).single('image')

    upload(req, res, (err) =>{
        // process category id array
        let categoryIds = [];
        // when request come from react end
        if (typeof(req.body.categories) == 'undefined'){
            const requestBody = req.body;
            //console.log(requestBody)
            const asArray = Object.entries(requestBody);
            const filtered = asArray.filter(([key, value]) =>{
                if (key.includes("categories")){
                    categoryIds.push(value)
                }
            })
        }else {
            // when request come from vue end
            categoryIds = req.body.categories
        }

        if (err){
            res.status(500).json({'status': false, 'data':"Something Went wrong"})
        }else {
            const newPost = new Post({
                'title': req.body.title,
                'description': req.body.description,
                'image': fileNameFinal,
                'author': req.body.author,
                'categories': categoryIds,
                //'categories': req.body.categories,
                'status': req.body.status,
            })

            const savedPost = newPost.save(function (error){
                if (error){
                    res.status(500).json(error)
                }else {
                    res.status(200).json({
                        'status': true,
                        'data':savedPost
                    })
                }
            })
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
    //console.log(post)

    // admin post owner can edit post
    if (post.author._id == loginUser.id || loginUser.user_type == 'admin'){
        // update post without file
        if (req.body.file_upload === false){
            console.log('Only post update')
           try {
                // keep old image name
               req.body.image = post.image
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
           console.log('File upload with post')
           let fileNameFinal = null;

           const storage = multer.diskStorage({
               destination: "uploads",
               filename: function (req, file, cb) {
                   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                   const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                   const fileName = 'post' + '-'+uniqueSuffix+ext;
                   fileNameFinal = "uploads/"+fileName
                   cb(null, fileName)
               }
           });

           const upload = multer({
               storage: storage
           }).single('image')

           upload(req, res, (err) =>{
               // process category id array
               let categoryIds = [];
               if (typeof(req.body.categories) == 'undefined'){
                   const requestBody = req.body;
                   const asArray = Object.entries(requestBody);
                   const filtered = asArray.filter(([key, value]) =>{
                       if (key.includes("categories")){
                           categoryIds.push(value)
                       }
                   })
               }else {
                   categoryIds = req.body.categories
               }
               if (err){
                   res.status(500).json({'status': false, 'data':"Something Went wrong"})
               }else {
                   const body = {
                       'title': req.body.title,
                       'description': req.body.description,
                       'image': fileNameFinal,
                       'author': req.body.author,
                       'categories': categoryIds,
                       'status': req.body.status,
                   }
                   const updatePost =  Post.findByIdAndUpdate(
                       req.params.id,
                       {$set: body},
                       {new:true, runValidators: true},
                       function (updateErr, updatedPost){
                           if (!updateErr){
                               // delete old file
                               try {
                                   unlinkSync(post.image);
                                   console.log('successfully deleted /tmp/hello');
                               } catch (err) {
                                   console.log("Delete error")
                               }
                               res.status(200).json({
                                   'status': true,
                                   'data': updatedPost
                               })
                           }else {
                               console.log("updateErr")
                               res.status(500).json(updateErr)
                           }

                       }
                   );
               }

           })
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
            try {
                unlinkSync(post.image);
                console.log('successfully deleted');
            } catch (err) {
                console.log("Delete error")
            }
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
    let posts = [];
    let totalRecord = 0;
    try {
        if (req.query.userId){
            posts = await Post.find({author: req.query.userId}).sort('-createdAt').populate([
                // take limited column from relation
                {path:"author", select:"name email user_type"},
                {path:"categories", select:"title"}
            ]).skip(skipRecord -10).limit(10);
             totalRecord = await Post.countDocuments({author: req.query.userId});
        }else if (req.query.latestPost == 'yes'){
            // get latest 6 post
            posts = await Post.find().sort('-createdAt').populate([
                // take limited column from relation
                {path:"author", select:"name email"},
                {path:"categories", select:"title"}
            ]).limit(6);
        } else {
            posts = await Post.find().sort('-createdAt').populate([
                // take limited column from relation
                {path:"author", select:"name email"},
                {path:"categories", select:"title"}
            ]).skip(skipRecord -10).limit(10);
             totalRecord = await Post.countDocuments({});
        }

        res.status(200).json({
            'status': true,
            'data': posts,
            'totalRecord': totalRecord,
        })
    }catch (error){
        res.status(500).json(error)
    }

}


