const blog = require('../models/blog');
const Message = require('../models/messages');
const Comment = require('../models/comments');
const user = require('../models/users');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/helper.util');
const bcrypt = require('bcrypt');

//creating blogs

const createBlog = async (req, res) => {
  try {
    const { blogname, image, blogdescription } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'blog/blogImage',
      public_id: `${blogname}_cover`,
    });
    const post = await blog.create({
      blogname,
      image: result.url,
      blogdescription,
    });
    if (post) {
      res.status(200).json({
        code: 200,
        success: true,
        message: 'blog created successful',
        blog: post,
      });
    }
  } catch (error) {
    console.log({ error: error });
  }
};

//viewing blogs

const viewBlog = async (req, res) => {
  await blog.find().then((data) => {
    res.status(200).json({
      code: 200,
      success: true,
      message: 'all retrieved successful',
      blogs: data,
    });
  });
};

//view single blog

const singleblog = async (req, res) => {
  const id = req.params.id;
  blog.findOne({ _id: id }, () => {
    res.status(200).json({
      code: 200,
      message: 'single blog',
    });
  });
};

//updating blogs

const updateBlog = async (req, res) => {
  const id = req.params.id;
  blog.findByIdAndUpdate({ _id: id }, req.body, (err, data) => {
    if (err) {
      res.status(400).json({ error: 'CAN NOT FIND THE ID' });
    }
    if (data) {
      res.json(data);
    }
  });
};

// delete blogs
const deleteBlog = async (req, res) => {
  try {
    const id = req.params._id;
    await blog.findByIdAndRemove({ _id: id }).then((data) => {
      res.json(data);
      res.status(200).json({
        code: 200,
        message: 'deleted successful',
        MessageSent: data,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//send message

const sendMessage = (req, res) => {
  const message = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  };

  Message.create(message, (err) => {
    res.status(200).json({
      code: 200,
      message: 'Message sent successful',
    });
  });
};

//get all messages
const retrieveMessages = async (req, res) => {
  await Message.find().then((data) => {
    res.status(200).json({
      code: 200,
      success: true,
      message: 'all retrieved successful',
      messages: data,
    });
  });
};

//retrive all messages
const deleteAllMessage = (req, res) => {
  Message.find((err) => {
    res.status(200).json({
      code: 200,
      message: 'All messages deleted successful',
    });
  });
};

//user login
const login = async (req, res, Msg) => {
  const email = req.body.email;
  const password = req.body.password;

  const userLogin = await user.findOne({ email: email });
  if (userLogin) {
    const aunthentication = await bcrypt.compare(password, userLogin.password);
    if (aunthentication) {
      const token = generate(userLogin._id);
      res.cookie('jwt', token);
      res.status(200).json({
        code: 200,
        message: 'logged in successful',
        token,
        MessageDeleted: Msg,
      });
    } else {
      res.status(402).json({
        code: 402,
        message: 'wrong password',
        MessageDeleted: Msg,
      });
    }
  } else {
    res.status(404).json({
      code: 404,
      message: 'user not found',
      MessageDeleted: Msg,
    });
  }
};

//logout
const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.json({
    code: 200,
    message: 'Logged Out',
  });
};

function generate(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}
const register = async (req, res, Msg) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  if (name && email && password) {
    const User = await user.findOne({ email: req.body.email });
    if (User == null) {
      const dta = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const token = generate(dta._id);
      res.cookie('jwt', token);
      res.status(200).json({
        statuscode: 200,
        message: 'Registered successful',
        MessageDeleted: Msg,
      });
    } else {
      res.status(401).json({
        statuscode: 401,
        message: 'user exists',
        MessageDeleted: Msg,
      });
    }
  }
};

//send comment
const sendComments = (req, res) => {
  const comment = {
    comment: req.body.comment,
  };
  Comment.create({ name: res.locals.user.name, comment: req.body.comment }),
    res.status(200).json({
      code: 200,
      message: 'Comment sent',
    });
};

module.exports = {
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
  logout,
  sendComments,
};
