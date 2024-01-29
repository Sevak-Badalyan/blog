const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./router/auth.router');
const postRouter = require('./router/post.router')
const commentRouter = require('./router/comment.router');

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter)

module.exports = app