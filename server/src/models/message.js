const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        text: {
            type: String,
            required: false
        },

        createdAt: {
            type: String,
            required: false
        },

        createdBy: {
            type: String,
            required: false
        }
    }
)

module.exports = mongoose.model("Message", messageSchema);