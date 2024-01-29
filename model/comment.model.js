const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
    user: Schema.Types.ObjectId,
    post: Schema.Types.ObjectId
}, { versionKey: false });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;