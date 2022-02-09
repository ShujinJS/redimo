const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionsSchema = new Schema(
    {
        movies: {
            type: Array,
            required: false
        },

        books: {
            type: Array,
            required: true
        },

        clothes: {
            type: Array,
            required: false
        }
    }
)

module.exports = mongoose.model("Collections", collectionsSchema);