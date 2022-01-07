const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema/schema.js");
const graphqlResolvers = require("./graphql/resolvers/resolvers.js");
const mongoose = require("mongoose");

const app = express();

const port = 3007;

/*
    schema ve resolvers çağrıldı, bunları kullanabilmek için graphqlHTTP getirildi.

    endpoint tüm requestler için /graphql olacak

    Sıradaki hamle API'yi MongoDB'ye bağlamak -> nodemon.json
*/

app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
    })
)

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@redimodb.67se9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
    .connect(uri, options)
    .then(() => app.listen(port, () => console.log(`Server is running on localhost:${port}/graphql`)))
    .catch(error => {
        throw error
    })

