const express = require('express');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/apollo/schema/schema');
const resolvers = require('./graphql/apollo/resolvers/resolvers');
const PORT = 4000;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// async function startApolloServer(typeDefs, resolvers) {
//     const app = express();
//     const server = new ApolloServer({ 
//         typeDefs, 
//         resolvers
//     });

//     await server.start();
//     server.applyMiddleware({ app });

//     app.get('/', (req, res) => {
//         console.log("Apollo GraphQL Express server is ready")
//     });
    
//     app.listen({ port: PORT }, () => {
//         console.log(`Server is running on localhost:${PORT}${server.graphqlPath}`)
//     })
 
// }

// startApolloServer(typeDefs, resolvers);






const server = new ApolloServer({ 
    typeDefs, 
        resolvers
});

const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@redimodb.67se9.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
    .connect(uri, options)
    .then(() => server.listen(PORT, () => console.log(`Server is running on localhost:${PORT}/graphql`)))
