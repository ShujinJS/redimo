const express = require('express');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const typeDefs = require('./graphql/apollo/schema/schema');
const resolvers = require('./graphql/apollo/resolvers/resolvers');
const PORT = 4000;

const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@redimodb.67se9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }


async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();
    server.applyMiddleware({ app });

    app.use((req, res) => {
        res.send('Hello from redimodb');
    })

    await mongoose
    .connect(uri, options)
    .then(() => httpServer.listen(PORT, () => console.log(`Server is running on localhost:${PORT}${server.graphqlPath}`)))
}

startApolloServer(typeDefs, resolvers);