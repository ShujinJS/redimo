const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginSchema = new Schema(
    {
        email: {
            type: String,
            required: false
        },

        password: {
            type: String,
            required: false
        }
    }
)

module.exports = mongoose.model("Login", loginSchema);