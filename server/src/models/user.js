const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            default: null,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true
        },

        password: {
            type: String,
            required: true
        },


        name: {
            type: String,
            required: true
        },

        lastname: {
            type: String,
            required: true
        },

        birthdate: {
            type: String,
            required: false
        },

        remember: {
            type: String,
            required: false
        },

        token: {
            type: String,
            required: false
        }
    }
)

module.exports = mongoose.model("User", userSchema);