const blog = require('../models/blog');
const Message = require('../models/messages');
const user = require('../models/users');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/helper.util');

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
    res.status(201).json({
      status: 201,
      success: true,
      message: 'blog created successful',
    });
  } catch (error) {
    console.log({ error: error });
  }
};



//viewing blogs

const viewBlog = async (req, res) => {
  await blog.find().then((data) => {
    res.json({ blogs: data });
  });
};

//view single blog

const singleblog = async (req, res) => {
  const id = req.params.id;
  blog.findOne({ _id: id }, (err, data) => {
    if (data) {
      res.status(201).json({
        code: 200,
        message: 'single blog',
        MessageSent: data,
      });
    }
    if (err) {
      res.status(201).json({
        code: 404,
        message: 'error',
        MessageSent: err,
      });
    }
  });
};

//updating blogs
const updateBlog = (req, res) => {
  const id = req.params._id;
  const img = blog.findOne({ _id: id }, (err, data) => {
    if (data) {
      res.status(201).json({
        code: 200,
        message: 'single blog',
        MessageSent: data,
      });
    }
    if (err) {
      res.status(201).json({
        code: 404,
        message: 'error',
        MessageSent: err,
      });
    }
  });
   
  blog.findByIdAndUpdate({ _id: id }, req.body, (err, data) => {
    if (err) {
      res.status(400).json("Cann't find the ID");
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
  try {
    Message.create(message, (err, Msg) => {
      if (!err) {
        res.status(201).json({
          code: 201,
          message: 'Message sent successful',
          MessageSent: Msg,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: 'Message not received',
          Error: err,
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      Message: 'Message not Sent',
      Error: error,
    });
  }
};

//delete message
const deleteMessage = (req, res) => {
  Message.deleteOne({ _id: req.params.id }, (err, Msg) => {
    if (!err) {
      res.status(200).json({
        code: 200,
        message: 'Message deleted successful',
        MessageDeleted: Msg,
      });
    } else {
      res.status(400).json({
        code: 400,
        message: 'Message not deleted',
        Error: err,
      });
    }
  });
};

//delete all messages
const retrieveMessages = (req, res) => {
  Message.find((err, Msg) => {
    if (!err) {
      res.status(200).json({
        code: 200,
        message: 'All messages deleted successful',
        MessageDeleted: Msg,
      });
    } else {
      res.status(400).json({
        code: 400,
        message: 'Message not deleted',
        Error: err,
      });
    }
  });
};

//retrive all messages
const deleteAllMessage = (req, res) => {
  Message.find((err, Msg) => {
    if (!err) {
      res.status(200).json({
        code: 200,
        message: 'All messages deleted successful',
        MessageDeleted: Msg,
      });
    } else {
      res.status(400).json({
        code: 400,
        message: 'Message not deleted',
        Error: err,
      });
    }
  });
};

//user login
const login = async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  const userLogin = user.findOne({ name: name });
  if (userLogin) {
    if (userLogin.password === password) {
      res.json('user matches');
    }
  }
};

function generate(id) {
  return jwt.sign({ id }, 'paccy');
}
const register = async (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  if (name && email && password) {
    const dta = await user.create({ name, email, password });
    const token = generate(dta._id);
    res.json({ token });
  }
};

module.exports = {
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
};
