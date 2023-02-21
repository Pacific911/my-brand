const express = require('express');
const mongoose = require('mongoose');
const database = require('./src/configs/database');
const blogroute = require('./src/routes/blogs');
const cors = require('cors');
const app = express();
const cookie_parser = require('cookie-parser');
const verifyUser = require('./src/middlewares/verify User');



app.use(cors());

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Morgan = require('morgan');
app.use(Morgan('tiny'));

app.listen(process.env.PORT, () => {
  console.log('Server has started!');
});

database();



const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API-LIBRARY',
      version: '1.0.0',
      description: 'Blogs, Messages and User apis',
      contact: {
        name: 'NDUWUMWE Pacific',
        email: 'nduwumwepacific@gmail.com',
        url: 'web.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        url: 'https://my-brand-production-bf0a.up.railway.app/',
      },
    ],
  },
  apis: ['./src/routes/blogs.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cookie_parser());
app.all('*', verifyUser);
app.use(blogroute);

var ejs = require('ejs');
const { api } = require('./src/utils/helper.util');
app.set('view engine', 'ejs');

module.exports = app;
