const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clotheSizeSchema = new Schema(
    {
        size: {
            type: Array
        }
    }
)

module.exports = mongoose.model("ClotheSize", clotheSizeSchema);