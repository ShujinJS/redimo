// Apollo
import { useQuery, gql } from "@apollo/client";

const GET_MOVIES = gql`
  query {
    getMovies {
      _id
      title
      price
    }
  }
`;

export default function MovieList() {
    const { loading, error, data } = useQuery(GET_MOVIES);
    console.log(data)

    if(loading) return "Loading...";
    if(error) return `There was an ${error}`;

    if(data) return (
        <div>
            {data.getMovies.map(movie => {
                return (
                    <span>{movie.title}</span>
                )
            })}
        </div>
    )
}