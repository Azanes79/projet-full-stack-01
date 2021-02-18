const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirebaseId: String,
    mail: String
})

module.exports = mongoose.model('User', userSchema);