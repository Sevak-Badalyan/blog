const express = require("express");
const router = express.Router();
const { getAllComments, getCommentsByPostId, createComment, updateComment, deleteComment } = require('../controller/comment.controller')

// Public routes
router.get("/comment", getAllComments);
router.get("/comment/:id", getCommentsByPostId);
// Protected routes
router.post("/comment/:postId", createComment);
router.put("/comment/:postId", updateComment);
router.delete("/comment/:postId", deleteComment);

module.exports = router;