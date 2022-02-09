const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
    {
        topic: {
            type: String,
            required: false
        },

        title: {
            type: String,
            required: true
        },

        genre: {
            type: String,
            required: false
        },

        director: {
            type: String,
            required: false
        },

        duration: {
            type: String,
            required: false
        },

        year: {
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

module.exports = mongoose.model("Movie", movieSchema);