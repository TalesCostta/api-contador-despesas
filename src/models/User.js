const mongoose = require('mongoose');

const cadastroSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwordHash: String,
    token: String
})

const user = new mongoose.model('User', cadastroSchema);

module.exports = user;