const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        title: {
            type: String
        },

        url: {
            type: String
        },

        bgImageUrl: {
            type: String
        }
    }
)

module.exports = mongoose.model("Category", categorySchema);