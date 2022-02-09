// Apollo
import { useQuery, gql } from "@apollo/client";

const GET_COLLECTIONS = gql`
  query {
    getMovies {
      _id
      topic
      title
      genre
      director
      duration
      year
      imageUrl
      price
      stock
      shippingFee
      discount
    }
    getBooks {
      _id
      author
      title
      pages
      genre
      publishDate
      binding
      publisher
      price
      stock
      imageUrl
      shippingFee
      discount
    }
    getClothes {
      _id
      topic
      brand
      title
      color {
        title
        size {
          title
          stock
        }
        images {
          url
        }
      }
      price
      gender
      imageUrl
      shippingFee
      discount
    }
  }
`;

export default function useGetCollections () {
    const { loading, error, data } = useQuery(GET_COLLECTIONS);

    return {
        loading,
        error,
        data
    }
}