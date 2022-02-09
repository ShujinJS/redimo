// Apollo
import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query {
    getBooks {
      _id
      author
      title
      pages
      genre
      publisher
      publishDate
      binding
      price
      stock
      imageUrl
      shippingFee
      discount
    }
  }
`;

export default function useGetBooks () {
    const { loading, error, data } = useQuery(GET_BOOKS);

    return {
        loading,
        error,
        data
    }
}