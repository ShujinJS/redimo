// Apollo custom hooks
import useMovie from "../../Apollo/hooks/Movies/useFindMovie";

// Apollo
import { useMutation, gql } from "@apollo/client";
import useGetMovies from "../../Apollo/hooks/Movies/useGetMovies";
import useGetBooks from "../../Apollo/hooks/Books/useGetBooks";

const CREATE_BOOK = gql`
    mutation ($input: BookInput) {
        createMovie(input: $input) {
          author
          title
          pages
          publisher
          publishDate
          binding
          price
          stock
          imageUrl
          shippingFee
        }
    }
`

export default function HomePage() {

  const [createABook, { loading, error, data }] = useMutation(CREATE_BOOK, {
    variables: {
      input:{
        author: "Stephen King",
        title: "Yabancı | Outsider",
        pages: "544",
        publisher: "Altın Kitaplar",
        publishDate: "2019",
        binding: "Ciltsiz",
        price: "60",
        stock: 256,
        imageUrl: "https://productimages.hepsiburada.net/s/26/1500/10170662092850.jpg",
        shippingFee: "9,90"
      }
    }
});

  const { pending, failure, content } = useGetBooks();
   

    if(pending) return "Loading...";
    if(failure) return `There was an ${failure}`;
    console.log(data)
    console.log(content);

     return (
        <div>
            {/* {content.getBooks.map(book => { 
                return (
                    <span>{book.title}</span>
                )
            })} */}
            <button onClick={() => createABook()}>Create a Movie</button>
        </div>
    )
}