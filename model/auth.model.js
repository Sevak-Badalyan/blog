const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth