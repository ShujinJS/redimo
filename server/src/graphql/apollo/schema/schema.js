const { gql } = require('apollo-server');

const typeDefs = gql`

    type Query {
        categories: [Category]
    }

    type NavLink {
        title: String!
        toggled: Boolean
        url: String
        categories: [Category]
    }

    type Category {
        title: String!
        url: String!
    }
`;

module.exports = typeDefs;