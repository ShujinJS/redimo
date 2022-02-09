const { gql } = require('apollo-server-express');
"User"

const typeDefs = gql`

    "Message"
    type Message {
        text: String
        createdAt: String
        createdBy: String
    }

    input MessageInput {
        text: String
        username: String
    }

    "User"
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        name: String!
        lastname: String!
        birthdate: String!
        remember: RememberMe
        token: String
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        name: String!
        lastname: String!
        birthdate: String
    }

    input LoginInput {
        email: String
        password: String
        remember: RememberMe
    }


    "Movie"
    type Movie {
        _id: ID!
        topic: String
        title: String!
        genre: String
        director: String
        duration: String
        year: String
        price: String!
        imageUrl: String!
        stock: Int!
        shippingFee: String
        discount: Int
    }

    input MovieInput {
        topic: String
        title: String!
        genre: String
        director: String
        duration: String
        price: String!
        imageUrl: String!
        stock: Int!
        shippingFee: String
        discount: Int
    }

    "Book"
    type Book {
        _id: ID!
        author: String
        title: String
        pages: String
        genre: String
        publishDate: String
        binding: String
        publisher: String
        price: String
        stock: Int
        imageUrl: String
        shippingFee: String
        discount: Int
    }

    input BookInput {
        author: String
        title: String
        pages: String
        genre: String
        publishDate: String
        binding: String
        publisher: String
        price: String
        stock: Int
        imageUrl: String
        shippingFee: String
        discount: Int
    }

    "Clothing"
    type Clothe {
        _id: ID!
        topic: String!
        brand: String
        title: String!
        color: [Color]
        price: String!
        gender: String
        imageUrl: String!
        shippingFee: String
        discount: Int
    }

    type Size {
        title: String
        stock: Int
    }

    input SizeInput {
        title: String
        stock: Int
    }

    type Color {
        title: String
        size: [Size]
        images: [Image]
    }

    input ColorInput {
        title: String
        size: [SizeInput]
        images: [ImageInput]
    }

    type Image {
        url: String
    }

    input ImageInput {
        url: String
    }

    input ClotheInput {
        topic: String!
        brand: String
        title: String!
        color: [ColorInput]
        price: String!
        gender: String
        imageUrl: String!
        shippingFee: String
        discount: Int
    }

    type Collections {
        movies: [Movie]
        books: [Book]
        clothes: [Clothe]
    }

    "SiteLanguages - categories"
    type SiteLanguage {
        title: String
        content: [Navigation]
    }

    type Navigation {
        title: String
        content: [NavContent]
    }

    type NavContent {
        title: String
        url: String
        toggled: Boolean
        content: [Category]
    }

    type Category {
        title: String
        url: String
        bgImageUrl: String
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

    enum RememberMe {
        FILLED
        EMPTY
    }

    "Query"
    type Query {
        message(_id: ID!): Message
        getSiteLanguages: [SiteLanguage]
        getUsers: [User]
        findUser(_id: ID!): User
        getMovies: [Movie]
        findMovie(_id: ID!): Movie
        getBooks: [Book]
        findBook(_id: ID!): Book
        getClothes: [Clothe]
        getCollections: Collections
        findClothe(_id: ID!): Clothe
    }

    "Mutation"
    type Mutation {
        createMessage(input: MessageInput): Message!
        registerUser(input: RegisterInput): User
        loginUser(input: LoginInput): User
        createMovie(input: MovieInput): Movie
        addMovie(movie: MovieInput): Movie
        createBook(input: BookInput): Book
        addBook(book: BookInput): Book
        createClothe(input: ClotheInput): Clothe
        addClothe(cloth: ClotheInput): Clothe
    }
`;

module.exports = typeDefs;