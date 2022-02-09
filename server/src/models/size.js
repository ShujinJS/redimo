const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sizeSchema = new Schema(
    {
        title: {
            type: String
        },

        stock: {
            type: Number
        }
    }
)

module.exports = mongoose.model("Size", sizeSchema);