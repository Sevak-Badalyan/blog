const express = require("express");
const router = express.Router();
const { getAllPosts, getPostByPostId, createPost, updatePost, deletePost } = require('../controller/post.controller')

// Public routes
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostByPostId);
// Protected routes
router.post("/posts", createPost);
router.put("/posts/:postId", updatePost);
router.delete("/posts/:postId", deletePost);

module.exports = router;