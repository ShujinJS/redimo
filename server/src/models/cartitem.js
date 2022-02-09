const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("CartItem", cartItemSchema);