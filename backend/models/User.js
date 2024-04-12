const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    }

}); 
User = mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User;