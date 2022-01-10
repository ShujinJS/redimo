const { gql } = require('apollo-server');

const typeDefs = gql`

    type NavLink {
        title: String!
        toggled: Boolean
        url: String
        categories: [Category]
    }

    type Category {
        _id: ID!
        title: String!
        url: String!
    }

    type Query {
        categories: [Category]
    }
`;

module.exports = typeDefs;