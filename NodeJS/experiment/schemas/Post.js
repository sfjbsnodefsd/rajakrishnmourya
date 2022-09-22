const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
   title: {type: String, required: true},
   posted_by: {type: String, required: true},
   post_location: {type: String, required: true},
   reaction: {
      likes: Number,
      dislikes: Number,
      shared: Number
   }
})


const Post = mongoose.model('Post', PostSchema);

module.exports = Post;