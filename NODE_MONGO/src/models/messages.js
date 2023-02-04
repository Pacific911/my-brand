const mongoose = require('mongoose');

const Messageschema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

});
const Message = mongoose.model('messages', Messageschema);

module.exports = Message;
