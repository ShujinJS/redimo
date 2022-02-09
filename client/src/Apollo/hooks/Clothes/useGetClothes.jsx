// Apollo
import { useQuery, gql } from "@apollo/client";

const GET_CLOTHES = gql`
  query {
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

export default function useGetClothes () {
    const { loading, error, data } = useQuery(GET_CLOTHES);

    return {
        loading,
        error,
        data
    }
}