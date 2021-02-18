const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    Content: String,
    CreatedAt: Date,
    FirebaseId: String
})

module.exports = mongoose.model('Post', postSchema);