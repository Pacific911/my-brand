const express = require('express');
const mongoose = require("mongoose");
const database = require('./src/configs/database');
const blogroute = require("./src/routes/blogs");
const app = express() 
const cookie_parser = require('cookie-parser');
const verifyUser = require('./src/middlewares/verify User');

app.use(express.json())
app.use(cookie_parser());
app.all('*', verifyUser);
app.use(blogroute)


var ejs = require('ejs');
app.set('view engine', 'ejs');

database()

app.listen(5000, () => {
    console.log("Server has started!")
})
