const Comment = require("../model/comment.model");

async function getAllComments(req, res, next) {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        console.error(error);
        next(error)
    }
};

async function getCommentsByPostId(req, res, next) {
    try {
        const id = req.params.id;
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(comment);
    } catch (error) {
        console.error(error);
        next(error)
    }
};

async function createComment(req, res, next) {
    try {
        const token = req.cookies.token;
        const userId = req.userId;
        const { postId } = req.params

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { text } = req.body;

        const newComment = new Comment({ text, user: userId, post: postId });
        await newComment.save();

        res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        console.error(error);
        next(error)
    }
};

async function deleteComment(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const postId = req.params.postId;

        const comment = await Comment.findById(postId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        await Comment.findByIdAndDelete(postId);

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error(error);
        next(error)
    }
};

async function updateComment(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const postId = req.params.postId;
        const { text } = req.body;
        const comment = await Comment.findById(postId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        comment.text = text;
        await comment.save();

        res.json({ message: "Comment updated successfully" });
    } catch (error) {
        console.error(error);
        next(error)
    }
};

module.exports = { getCommentsByPostId, getAllComments, createComment, deleteComment, updateComment };
