const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteLanguageSchema = new Schema(
    {
        title: {
            type: String,
            required: false
        },

        content: {
            type: Array,
            required: false
        }
    }
)

module.exports = mongoose.model("SiteLanguage", siteLanguageSchema);
