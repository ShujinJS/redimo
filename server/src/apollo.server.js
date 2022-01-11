const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./graphql/apollo/schema/schema');
const resolvers = require('./graphql/apollo/resolvers/resolvers');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });
const port = 3008;

const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@redimodb.67se9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
    .connect(uri, options)
    .then(() => server.listen(port, () => console.log(`Server is running on localhost:${port}/graphql`)))
