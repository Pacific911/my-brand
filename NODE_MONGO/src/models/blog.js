const mongoose=require("mongoose")

const blogschema= new mongoose.Schema({
    
blogname:{
    type:String,
},
blogdescription:{
    type:String,
},
})
const blog = mongoose.model("blogs",blogschema)

module.exports = blog
