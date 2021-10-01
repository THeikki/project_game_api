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
            minLength: 3,
            trim: true,
            required: true
        },
        gameTimes: {
            type: Number,
            required: true,
            default: 0,
            cast:true
        },
        highScore: {
            type: Number,
            required: true,
            default: 0,
            cast: true
        },
        overallPoints: {
            type: Number,
            required: true,
            default: 0,
            cast: true
        }  
    }
);

const User = mongoose.model("User", userSchema)

module.exports = User