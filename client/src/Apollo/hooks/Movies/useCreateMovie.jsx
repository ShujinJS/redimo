// Apollo
import { useMutation, gql } from "@apollo/client";

const CREATE_MOVIE = gql`
    mutation ($createMovieInput2: MovieInput) {
        createMovie(input: $createMovieInput2) {
            topic
            title
            price
            imageUrl
            shippingFee
        }
    }
`

export default function useCreateMovie( props ) {
    const [createAMovie, { loading, error, data }] = useMutation(CREATE_MOVIE, {
        variables: {
            topic: "The Hobbit",
            title: "An Unexpected Journey",
            price: 105,
            imageUrl: "https://i.pinimg.com/originals/f1/6a/d3/f16ad3ec88c9b60cf7e1681c521a8b01.jpg",
            shippingFee: "FREE"
        }
    });

    return <div></div>
}
