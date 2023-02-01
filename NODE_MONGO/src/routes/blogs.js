const express = require("express");
const blogroute = express()
const {createBlog, singleblog, updateBlog, deleteBlog} = require('../controllers/blogcontroller')

blogroute.post("/create", createBlog)
blogroute.get("/single", singleblog)
blogroute.patch("/update/:_id", updateBlog)
blogroute.delete("/delete/:_id", deleteBlog)
module.exports = blogroute

