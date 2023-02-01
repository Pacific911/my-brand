const blog = require("../models/blog");


const createBlog =async (req,res)=>{
    try {
        const {blogname,blogdescription} = req.body
        const post = await blog.create(
           { blogname,
            blogdescription}
        )
        res.status(200).json(post)
    } catch (error) {
        console.log({error:error.message})
    }
} 
const singleblog = async (req,res) =>{
    const id = req.params._id
    const getblog = await blog.findById(id)
    res.status(200).json(getblog)
}



const updateBlog=(req, res) =>{
    try{
        const id= req.params._id
        blog.find().then((data) => {
            data.forEach(blgs => {
                if(blgs._id == id){
                    const index = data.indexOf(blgs)
                    Object.assign(blgs, req.body)
                    data[index]= blgs
                    blog.create(data)
                    res.json(data);
                }
            })           
        })
    }
    catch(error){
        console.log(error)
    }
}


const deleteBlog= async(req, res)=> {
    try{
        const id=req.params._id
        await blog.findByIdAndRemove({_id:id})
        .then((data) =>{
            res.json(data)
        })     
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {createBlog,singleblog,updateBlog,deleteBlog}


