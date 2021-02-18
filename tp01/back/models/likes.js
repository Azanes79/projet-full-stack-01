const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    PostId: String,
    FirebaseId: String
})

module.exports = mongoose.model('Like', likeSchema);