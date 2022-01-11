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

    input CategoryInput {
        title: String!
        url: String!
    }

    type User {
        _id: ID!
        name: String!
    }

    type UserUpdateResponse {
        success: Boolean!
        message: String
        users: [User]
    }

    input UserInput {
        _id: ID!
        name: String!
    }

    

    type Query {
        categories: [Category]
        users: [User]
    }

    type Mutation {
        createCategory(category: CategoryInput): Category
        createUser(user: UserInput): User
    }
`;

module.exports = typeDefs;