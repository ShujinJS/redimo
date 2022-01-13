const { gql } = require('apollo-server-express');

const typeDefs = gql`

    "Category"
    type Category {
        _id: ID!
        title: String!
        url: String!
    }

    input CategoryInput {
        title: String!
        url: String!
    }

    "Movie"
    type Movie {
        _id: ID!
        topic: String!
        title: String!
        price: Int!
        imageUrl: String!
        shippingFee: ShippingFee
    }

    input MovieInput {
        topic: String!
        title: String!
        price: Int!
        imageUrl: String!
        shippingFee: ShippingFee
    }

    "Clothing"
    type Clothe {
        _id: ID!
        topic: String!
        brand: String
        title: String!
        price: Int!
        gender: Gender
        imageUrl: String!
        shippingFee: ShippingFee
    }

    input ClotheInput {
        topic: String!
        brand: String
        title: String!
        price: Int!
        gender: Gender
        imageUrl: String!
        shippingFee: ShippingFee
    }

    "enum"
    enum Gender {
        MALE
        FEMALE
    }

    enum ShippingFee {
        FREE
        COST
    }

    "Query"
    type Query {
        categories: [Category]
        getMovies: [Movie]
        findMovie(_id: ID!): Movie
        getClothes: [Clothe]
        findClothe(_id: ID!): Clothe
    }

    "Mutation"
    type Mutation {
        createCategory(category: CategoryInput): Category
        createMovie(input: MovieInput): Movie
        addMovie(movie: MovieInput): Movie
        createClothe(input: ClotheInput): Clothe
        addClothe(cloth: ClotheInput): Clothe
    }
`;

module.exports = typeDefs;