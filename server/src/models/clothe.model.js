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

        color: {
            type: Array,
            required: false
        },

        size: {
            type: Array,
            required: false
        },

        price: {
            type: String,
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
        },
        
        discount: {
            type: Number,
            required: false
        }
    }
)

module.exports = mongoose.model("Clothe", clothSchema);