const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colorSchema = new Schema(
    {
        title: {
            type: String
        },

        size: {
            type: Array
        },

        images: {
            type: Array
        }
    }
)

module.exports = mongoose.model("Color", colorSchema);