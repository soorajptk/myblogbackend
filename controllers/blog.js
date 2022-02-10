const customError =require('../errors/index')
const Blog =require('../models/blog')
const {StatusCodes}=require('http-status-codes')
const path=require('path')

const createBlog=async(req,res)=>{
    const {userId}=req.user
    const blog=await Blog.create({...req.body,user:req.user.user})
    res.status(StatusCodes.OK).json({blog,msg:'post created'})
}
const getAllBlogs=async(req,res)=>{
const blogs=await Blog.find()
res.status(StatusCodes.OK).json(blogs)
}

const singleBlog=async(req,res)=>{
    
    const {id}=req.params
    const blog=await Blog.findOne({_id:id})
    if(!blog){

        throw new customError.badRequestError(`no posts with this ${id} id`)
    }
    res.status(StatusCodes.OK).json({blog,role:req.user.role})   
}

const updateBlog=async(req,res)=>{
    const {id}=req.params
    const blog=await Blog.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true})   
    res.status(StatusCodes.OK).json(blog)

}
const deleteBlog=async(req,res)=>{
 const {id}=req.params
    const blog=await Blog.findOneAndDelete({_id:id})   
    res.status(StatusCodes.OK).json({msg:'post removed'})
}

const uploadImg=async(req,res)=>{
    if(!req.files){
        throw new customError.badRequestError('please provide a file')
    }
    const {image}=req.files
    if(!image.mimetype.startsWith('image')){

        throw new customError.badRequestError('choose a image')
    }
    let newPath=path.join(__dirname,'../public/images',`${image.name}`)
    await image.mv(newPath)

    res.status(StatusCodes.OK).json({image:`/images/${image.name}`})
    
}

module.exports={getAllBlogs,singleBlog,createBlog,updateBlog,deleteBlog,uploadImg}