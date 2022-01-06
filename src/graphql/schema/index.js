const { buildSchema } = require("graphql");


/*
    : "_id" MongoDB'den dolayı bu şekilde yazılmalı

    : "!" gerekli alan

    : Query fetch data için

    : Mutation CRUD işlemleri için

    Yeni bir article oluşturmak için createArticle kullanılacak,
    ArticleInput object type'ını alacak ve geriye Article döndürecek.

    MongoDB'ye gönderilen datanın GraphQL schema'sına uyması için
    Mongoose Models oluşturulmalı.

*/
module.exports = buildSchema(`
    
    type Article {
        _id: ID!
        title: String!
        body: String!
        createdAt: String!
    }

    input ArticleInput {
        title: String!
        body: String!
    }

    type Query {
        articles: [Article!]
    }

    type Mutation {
        createArticle(article: ArticleInput): Article
    }

    schema {
        query: Query
        mutation: Mutation
    }
`)