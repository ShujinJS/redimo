// Apollo
import { useQuery, gql } from "@apollo/client";

const GET_SITELANGUAGES = gql`
    query {
        getSiteLanguages {
            title
            content {
              title
              content {
                title
                url
                toggled
                content {
                  title
                  url
                  bgImageUrl
                }
              }
            }
        }
    }
`;

export default function useGetSiteLanguages () {
    const { loading, error, data } = useQuery(GET_SITELANGUAGES)

    return {
        loading,
        error,
        data
    }
}