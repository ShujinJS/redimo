// Apollo custom hooks
import useMovie from "../../Apollo/hooks/Movies/useFindMovie";

// Apollo
import { useMutation, gql } from "@apollo/client";
import useGetMovies from "../../Apollo/hooks/Movies/useGetMovies";

const CREATE_MOVIE = gql`
    mutation ($input: MovieInput) {
        createMovie(input: $input) {
            topic
            title
            price
            imageUrl
            stock
            shippingFee
        }
    }
`

export default function HomePage() {

  const [createAMovie, { loading, error, data }] = useMutation(CREATE_MOVIE, {
    variables: {
      input:{
        title: "Donnie Darko",
        price: "11",
        stock: 26,
        imageUrl: "https://deff.com/image/magictoolbox_cache/feabb61ae2a71c1844359f7cbe8b5d82/4/0/40268_product/original/1893495658/Hzm3tzFQRd9EhHE8751NFQ.jpg",
        shippingFee: "9,90"
      }
    }
});

  const { pending, failure, content } = useGetMovies();
   

    if(pending) return "Loading...";
    if(failure) return `There was an ${failure}`;
    console.log(data)
    console.log(content);

    if(content) return (
        <div>
            {content.getMovies.map(movie => { 
                return (
                    <span>{movie.title}</span>
                )
            })}
            <button onClick={() => createAMovie()}>Create a Movie</button>
        </div>
    )
}