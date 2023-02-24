const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  
  blogId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});
const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;
