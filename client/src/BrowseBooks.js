import { useNavigate } from "react-router-dom"
import BookCard from "./BookCard"
import styled from "styled-components"
function BrowseBooks ({books}) {

    const navigate = useNavigate()
    function test (book){
        console.log(book)
        navigate(`/books/${book.id}`)
    }
    return <Container>
        {books.map((book)=> <BookCard handleClick={test} book={book} /> )}

    </Container>
}

export default BrowseBooks

const Container = styled.div`

height: 60vh;
width: 100vw;
display: flex;
flex-wrap: wrap;
justify-content: center;
overflow: scroll;
overflow-x: hidden;
`