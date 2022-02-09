const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clotheColorSchema = new Schema(
    {
        color: {
            type: Array
        }
    }
)

module.exports = mongoose.model("ClotheColor", clotheColorSchema);