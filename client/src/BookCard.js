import styled from "styled-components"
import { UserContext } from "./UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
function BookCard({ book}){
    const user = useContext(UserContext)
    const navigate = useNavigate()
    return <StyledCard onClick={() => navigate(`/books/${book.id}`)}>
        <img src={book.img_url} alt="bookcover"/>
        <h1>{book.title}</h1>
        <p>{book.author}</p>
    </StyledCard>
}

export default BookCard

const StyledCard = styled.div`
border: solid;
display: flex;
flex-direction: column;
align-items: center;
margin: 1%;
padding-bottom: .5%;
width: 10%;
height: 65%;

h1{
    font-size: calc(10px + .5vw);
    max-width: 80%;
    height: 20%;
    margin: 0;
    word-wrap: break-word;
    overflow: hidden;
}

img{
    border: solid;
    width: 100%;
    height: 70%;
    object-fit: fill;
}

p{
    margin: 0;
    font-size: calc(8px + .5vw);
    max-height: 5%;
}
`