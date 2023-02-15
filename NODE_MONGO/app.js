const express = require('express');
const mongoose = require("mongoose");
const database = require('./src/configs/database');
const blogroute = require("./src/routes/blogs");
const app = express() 
const cookie_parser = require('cookie-parser');
const verifyUser = require('./src/middlewares/verify User');


const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')



const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API-LIBRARY',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5000'
      }
    ]
  },
  apis: ['./src/routes/blogs.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));





app.use(express.json())
app.use(cookie_parser());
app.all('*', verifyUser);
app.use(blogroute)



var ejs = require('ejs');
const { api } = require('./src/utils/helper.util');
app.set('view engine', 'ejs');

database()

app.listen(5000, () => {
    console.log("Server has started!")
})

module.exports = app
