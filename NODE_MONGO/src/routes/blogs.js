const express = require('express');
const blogroute = express();
const multer = require('multer');
const {
  createBlog,
  viewBlog,
  singleblog,
  updateBlog,
  deleteBlog,
  sendMessage,
  deleteAllMessage,
  retrieveMessages,
  register,
  login,
  deleteUser,
  sendComments,
  logout,
} = require('../controllers/blogcontroller');
const { verification } = require('../middlewares/auth');
const permission = require('../middlewares/permission');

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Invalid image file', false);
  }
};
const uploads = multer({ storage, fileFilter });

/**
 * @swagger
 * components:
 *   schema:
 *     Message:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - subject
 *         - message
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         subject:
 *           type: string
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /user/contacts/sendmessage:
 *   post:
 *     summary: This api is used to send messages
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/Message'
 *     description: Api for sending the message
 *     responses:
 *       200:
 *         description: To test the Get method
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schema/Message'
 */

/**
 * @swagger
 * /user/contacts/delete/message/all:
 *   delete:
 *     summary: This api is used to delete the message
 *     tags: [Messages]
 *     description: this api is used to delete the message
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: data is deleted
 */

/**
 * @swagger
 * /user/retrieve/message/all:
 *  get:
 *      summary: this API gets all the messages
 *      tags: [Messages]
 *
 *      responses:
 *          200:
 *              description: Retrieved all blogs
 */

/**
 * @swagger
 * components:
 *   schema:
 *     Comment:
 *       type: object
 *       required:
 *         - comment
 *       properties:
 *         comment:
 *           type: string
 */

/**
 * @swagger
 * /blog/comments/send/{id}:
 *   post:
 *     summary: This api is used to send comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/Comment '
 *             properties:
 *               comment:
 *                 type: string
 *     description: Api for sending the comments
 *     responses:
 *       200:
 *         description: To test the Get method
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schema/Comment'
 */

/**
 * @swagger
 * components:
 *   schema:
 *     register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /user/auth/register:
 *   post:
 *     summary:  User register api
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/register'
 *     description: create user
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                 $ref: '#components/schema/register'
 */

/**
 * @swagger
 * components:
 *   schema:
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /user/auth/login:
 *   post:
 *     summary:  User login api
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/login'
 *     description: login user
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schema/login'
 */

/**
 * @swagger
 * securityDefinitions:
 *      bearerAuth:
 *          type: "apiKey"
 *          name: "Authorization"
 *          in: "header"
 * /api/blog/create:
 *  post:
 *      summary: adding new blog
 *      tags: [Blogs]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          blogname:
 *                              type: string
 *                              description: add blog title
 *                          blogdescription:
 *                              type: string
 *                              description: add blog body
 *                          image:
 *                              type: string
 *                              format: binary
 *                              description: blog image
 *
 *      responses:
 *          200:
 *              description: adding new blog
 */

/**
 * @swagger
 * /api/blog/retrieve/all:
 *  get:
 *      summary: this API gets all the blogs
 *      tags: [Blogs]
 *
 *      responses:
 *          200:
 *              description: Retrieved all blogs
 */

/**
 * @swagger
 * /api/blog/retrieve/{id}:
 *  get:
 *      summary: this API gets the single blog
 *      tags: [Blogs]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: the blog id
 *
 *      responses:
 *          200:
 *              description: retrieved single blog
 */

/**
 * @swagger
 * /api/blog/delete/{id}:
 *  delete:
 *      summary: Deleting a blog
 *      tags: [Blogs]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the blog id
 *      responses:
 *          200:
 *              description: successful deleted the blog
 *          400:
 *              description: Action not made
 */

/**
 * @swagger
 * /api/blog/update/{id}:
 *  patch:
 *      summary: this API is used to update a blog
 *      tags: [Blogs]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          blogname:
 *                              type: string
 *                              description: blog name
 *                          blogdescription:
 *                              type: string
 *                              description: blog description
 *                          image:
 *                              type: string
 *                              format: binary
 *                              description: blog image
 *      responses:
 *          200:
 *              description: Blog updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *          400:
 *              description: Unable to update blog
 */

blogroute.post(
  '/api/blog/create',
  uploads.single('image'),
  verification,
  permission,
  createBlog,
);
blogroute.get('/api/blog/retrieve/all', verification, permission, viewBlog);
blogroute.get('/api/blog/retrieve/single/:id',verification, permission, singleblog);
blogroute.patch('/api/blog/update/:id', verification, permission, uploads.single('image'), updateBlog);
blogroute.delete('/api/blog/delete/:_id', verification, permission, deleteBlog);

blogroute.post('/user/auth/register', register);
blogroute.post('/user/auth/login', login);
blogroute.get('/user/auth/logout', logout);
blogroute.delete('/user/auth/delete/:id', permission, deleteUser);

blogroute.post('/user/contacts/sendmessage', sendMessage);
blogroute.delete('/user/contacts/delete/message/all', verification, permission, deleteAllMessage);
blogroute.get('/user/retrieve/message/all', verification, permission, retrieveMessages);

blogroute.post('/blog/comments/send/:id', verification, sendComments);

module.exports = blogroute;
