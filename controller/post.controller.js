const Post = require("../model/post.model");

async function getAllPosts(req, res, next) {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error(error);
        next(error)
    }
};

async function getPostByPostId(req, res, next) {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);
    } catch (error) {
        console.error(error);
        next(error)
    }
};

async function createPost(req, res, next) {
    try {
        const token = req.cookies.token;
        const userId = req.userId;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { title, body } = req.body;

        const newPost = new Post({ title, body, author: userId, createdAt: new Date(), updatedAt: new Date() });
        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', postId: newPost._id });
    } catch (error) {
        console.error(error);
        next(error)
    }
};

async function updatePost(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const postId = req.params.postId;
        const { title, body } = req.body;
        const userId = req.userId;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author !== userId) {
            return res.status(403).json({ message: "You do not have permission to update this post" });
        }

        post.title = title;
        post.body = body;
        post.updatedAt = new Date();
        await post.save();

        res.json({ message: "Post updated successfully" });
    } catch (error) {
        console.error(error);
        next(error)
    }
};

async function deletePost(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const postId = req.params.postId;
        const userId = req.userId;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author !== userId) {
            return res.status(403).json({ message: "You do not have permission to delete this post" });
        }

        await Post.findByIdAndDelete(postId);

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        next(error)
    }
};

module.exports = { getAllPosts, getPostByPostId, createPost, updatePost, deletePost };
