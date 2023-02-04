const mongoose=require("mongoose")


const blogschema= new mongoose.Schema({
    
blogname:{
    type:String,
    required:true,
},
image:{
    type:String, 
    required:true,
},
blogdescription:{
    type:String,
    required:true,
},
})
const blog = mongoose.model("blogs",blogschema)

module.exports = blog
