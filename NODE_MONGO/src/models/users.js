const mongoose=require("mongoose")

const userschema= new mongoose.Schema({
    
name:{
    type:String,
},
email:{
    type: String,
},
password:{
    type:String,
},
})
const user = mongoose.model("users",userschema)

module.exports = user