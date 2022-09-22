const mongoose = require('mongoose');
const CommentSchema = mongoose.Schema({
   title: {type: String, required: true},
   commented_by: {type: String, required: true},
   comment_location: {type: String, required: true},
   reaction: {
      likes: Number,
      dislikes: Number,
      shared: Number
   }
})


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;