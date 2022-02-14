// Apollo
const { ApolloServer } = require('apollo-server');
// MongoDB
const mongoose = require("mongoose");

// Schema & Resolvers
const typeDefs = require('./graphql/apollo/schema/schema');
const resolvers = require('./graphql/apollo/resolvers/resolvers');

// config
const PORT = 4000;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@redimodb.67se9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }



// creating a server
const server = new ApolloServer({ typeDefs, resolvers });

// connecting the mongodb to the server & starting it
mongoose
    .connect(uri, options)
    .then(() => server.listen(PORT, () => console.log(`Server is running on localhost:${PORT}/graphql`)))