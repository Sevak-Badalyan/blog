const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    body: String,
    author: Schema.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}, { versionKey: false });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;