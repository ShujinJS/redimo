const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
    Tıpkı GraphQL schemamız gibi Mongoose schemamızı oluşturuyoruz.
    _id ve createdAt mongoose tarafından otomatik olarak oluşturuluyor, yalnızca timestamps'i true yapıyoruz.

    Bu şekilde GraphQL API için gerekli olan resolvers yazılması için gerekli olan her şey hazır.
*/

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    { timestamps: true}
)

module.exports = mongoose.model("Article", articleSchema);