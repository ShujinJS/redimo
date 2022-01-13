const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothSchema = new Schema(
    {
        topic: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            required: false
        },

        title: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        gender: {
            type: String,
            required: false
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

module.exports = mongoose.model("Clothe", clothSchema);