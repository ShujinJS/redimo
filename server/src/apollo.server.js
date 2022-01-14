const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/apollo/schema/schema');
const resolvers = require('./graphql/apollo/resolvers/resolvers');
const PORT = 4000;

const server = new ApolloServer({ typeDefs, resolvers });

const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@redimodb.67se9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
    .connect(uri, options)
    .then(() => server.listen(PORT, () => console.log(`Server is running on localhost:${PORT}/graphql`)))