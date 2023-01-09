const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        required: "Email is mandatory"
    },
    hashedPassword: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    otp: {
        type: Number,
        default:0
    }
})

module.exports = mongoose.model("authUser", authSchema);