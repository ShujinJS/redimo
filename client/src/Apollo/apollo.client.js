import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
});

client
.query({
  query: gql`
    query getMovies {
        _id
        topic
        title
        shippingFee
    } 
  `
})
.then(result => console.log(result));