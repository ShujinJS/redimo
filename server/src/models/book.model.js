const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        author: {
            type: String,
            required: false
        },

        title: {
            type: String,
            required: true
        },

        pages: {
            type: String,
            required: false
        },

        genre: {
            type: String,
            required: false
        },

        publishDate: {
            type: String,
            required: false
        },

        binding: {
            type: String,
            required: false
        },

        publisher: {
            type: String,
            required: false
        },

        price: {
            type: String,
            required: true
        },

        stock: {
            type: Number,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        },

        shippingFee: {
            type: String,
            required: false
        },

        discount: {
            type: Number,
            required: false
        }
    }
)

module.exports = mongoose.model("Book", bookSchema);