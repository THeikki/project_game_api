const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Schema of the user
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 4
        }
    }
);

const User = mongoose.model("User", userSchema)

module.exports = User