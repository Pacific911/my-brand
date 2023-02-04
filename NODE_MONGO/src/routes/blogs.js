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
} = require('../controllers/blogcontroller');

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
blogroute.get('/api/blog/allblogs', viewBlog);
blogroute.get('/api/blog/singleblog/:id', singleblog);
blogroute.patch('/api/blog/update/:_id', updateBlog);
blogroute.delete('/api/blog/delete/:_id', deleteBlog);

blogroute.post('/auth/register', register);
blogroute.post('/auth/login', login);

blogroute.post('/sendmessages', sendMessage);
blogroute.delete('/deletemessage/:id', deleteMessage);
blogroute.delete('/deleteallmessage', deleteAllMessage);
blogroute.get('/retrievemessages', retrieveMessages);

module.exports = blogroute;
