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
  deleteMessage,
  deleteAllMessage,
  retrieveMessages,
  register,
  login,
  sendComments,
  logout,
} = require('../controllers/blogcontroller');
const { verification } = require('../middlewares/auth');
const  permission  = require('../middlewares/permission');

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Invalid image file', false);
  }
};
const uploads = multer({ storage, fileFilter });

blogroute.post('/api/blog/create', uploads.single('image'), createBlog);
blogroute.get('/api/blog/retrieve/all', viewBlog);
blogroute.get('/api/blog/retrieve/single/:id', singleblog);
blogroute.patch('/api/blog/update/:_id', updateBlog);
blogroute.delete('/api/blog/delete/:_id', deleteBlog);

blogroute.post('/user/auth/register', register);
blogroute.post('/user/auth/login', login);
blogroute.post('/user/auth/logout', logout);

blogroute.post('/user/contacts/sendmessage',sendMessage);
blogroute.delete('/user/contacts/delete/message/:id', deleteMessage);
blogroute.delete('/user/contacts/delete/message/all', deleteAllMessage);
blogroute.get('/user/retrievemessages', verification, permission, retrieveMessages);

blogroute.post('/blog/comments/send/:id', verification, sendComments);

module.exports = blogroute;
