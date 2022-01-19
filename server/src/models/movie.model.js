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
        }
    }
)

module.exports = mongoose.model("Movie", movieSchema);