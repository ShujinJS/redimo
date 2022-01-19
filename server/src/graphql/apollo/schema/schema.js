const { gql } = require('apollo-server-express');

const typeDefs = gql`

    "Movie"
    type Movie {
        _id: ID!
        topic: String
        title: String!
        price: String!
        imageUrl: String!
        stock: Int!
        shippingFee: String
    }

    input MovieInput {
        topic: String
        title: String!
        price: String!
        imageUrl: String!
        stock: Int!
        shippingFee: String
    }

    "Clothing"
    type Clothe {
        _id: ID!
        topic: String!
        brand: String
        title: String!
        price: String!
        gender: Gender
        imageUrl: String!
        stock: Int!
        shippingFee: String
    }

    input ClotheInput {
        topic: String!
        brand: String
        title: String!
        price: String!
        gender: Gender
        imageUrl: String!
        stock: Int!
        shippingFee: String
    }

    "enum"
    enum Gender {
        MALE
        FEMALE
    }

    enum ShippingFee {
        EXIMIO
        FEE
    }

    "Query"
    type Query {
        getMovies: [Movie]
        findMovie(_id: ID!): Movie
        getClothes: [Clothe]
        findClothe(_id: ID!): Clothe
    }

    "Mutation"
    type Mutation {
        createMovie(input: MovieInput): Movie
        addMovie(movie: MovieInput): Movie
        createClothe(input: ClotheInput): Clothe
        addClothe(cloth: ClotheInput): Clothe
    }
`;

module.exports = typeDefs;