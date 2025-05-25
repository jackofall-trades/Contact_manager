const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please add a user name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: [true,"Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
}, { 
    timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

