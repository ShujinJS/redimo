const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const navigationSchema = new Schema(
    {
        title: {
            type: String,
            required: false
        },

        content: {
            type: Array,
        }
    }
)

module.exports = mongoose.model("Navigation", navigationSchema);