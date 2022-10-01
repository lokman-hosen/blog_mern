import Category from "../model/Category.js";

export const createCategory = async (req, res)=>{
    const newCategory = new Category(req.body)
    try {
        const savedCategory = await newCategory.save()
        res.status(200).json({
            'status' : true,
            'data': savedCategory,
        })
        //res.status(200).json('Category working')
    }catch (error){
        res.status(500).json(error)
    }
}

export const updateCategory = async (req, res)=>{
    try {
        const updateCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json({
            'status' : true,
            'data': updateCategory,
        })
    }catch (error){
        res.status(500).json(error)
    }
}

export const deleteCategory = async (req, res)=>{
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            'status' : true,
            'data': 'Category Deleted'
        })
    }catch (error){
        res.status(500).json(error)
    }
}

export const categoryDetail = async (req, res)=>{
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json({
            'status': true,
            'data': category
        })
    }catch (error){
        res.status(500).json(error)
    }
}

export const categoryList = async (req, res)=>{
    try {
        const categories = await Category.find();
        res.status(200).json({
            'status': true,
            'data': categories
        })
    }catch (error){
        res.status(500).json(error)
    }
}

