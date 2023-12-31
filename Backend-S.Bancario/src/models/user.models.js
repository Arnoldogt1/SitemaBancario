'use strict' 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true, 
    },
    rol:{
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },

})

module.exports = mongoose.model('User', UserSchema);