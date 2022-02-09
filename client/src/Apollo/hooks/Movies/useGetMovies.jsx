// Apollo
import { useQuery, gql } from "@apollo/client";

const GET_MOVIES = gql`
  query {
    getMovies {
      _id
      topic
      title
      price
      genre
      director
      duration
      year
      stock
      imageUrl
      shippingFee
      discount
    }
  }
`;

export default function useGetMovies () {
    const { loading, error, data } = useQuery(GET_MOVIES);

    return {
        loading,
        error,
        data
    }
}