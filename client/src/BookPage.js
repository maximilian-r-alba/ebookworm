import { useParams } from "react-router-dom"
import styled from "styled-components"

function BookPage({books}){
    const {id} = useParams()
    const book = books.filter((book) => book.id == id).pop()
    console.log(book.description)
    return <div>
        <StyledDescription>{book.description}</StyledDescription>
    </div>
}

export default BookPage

const StyledDescription = styled.pre`
    color: red;
    white-space: pre-wrap;  
           
`