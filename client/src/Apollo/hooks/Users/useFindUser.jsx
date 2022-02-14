// Apollo
import { useQuery, gql } from "@apollo/client";

const FIND_USER = gql`
  query ($id: ID!){
    findUser(_id: $id) {
      _id
      name
      lastname
      username
      email
      birthdate
      address
    }
  }
`;

export default function useFindUser () {
    const { loading, error, data } = useQuery(FIND_USER);

    return {
        loading,
        error,
        data
    }
}