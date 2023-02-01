
const mongoose=require ('mongoose')

const dbURL   = "mongodb+srv://pacific:knZzIlxLByx4j9Z1@cluster0.9lxp5ak.mongodb.net/blogs?"
const database = async()=>{
    try {
     await mongoose.connect(dbURL, {useNewUrlParser: true}).then(()=>{
        console.log("Database Connected Successfully")
     })
    } catch (error) {
        console.log(error)
    }

}

module.exports =database
