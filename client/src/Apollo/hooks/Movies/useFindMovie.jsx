// Apollo
import { useQuery, gql } from "@apollo/client";

const FIND_MOVIE = gql`
  query ($_id: ID!) {
    findMovie (_id: $_id) {
      _id
      topic
      title
      price
      imageUrl
      shippingFee
    }
  }
`;

export default function useFindMovie( props ) {
    const { loading, error, data } = useQuery(FIND_MOVIE, {
        variables: {
            _id: props
        }
    });

    return {
        loading,
        error,
        data
    }

}