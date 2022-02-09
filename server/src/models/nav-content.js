const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const navContentSchema = new Schema(
    {
        title: {
            type: String
        },

        url: {
            type: String
        },

        toggled: {
            type: Boolean
        },

        content: {
            type: Array
        }
    }
)

module.exports = mongoose.model("NavContent", navContentSchema);