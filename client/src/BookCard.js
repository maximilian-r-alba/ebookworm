import styled from "styled-components"
import { UserContext } from "./UserContext"
import { useContext } from "react"
function BookCard({ handleClick , book}){
    const user = useContext(UserContext)
    return <StyledCard onClick={() => {handleClick(book)}}>
        <h1>{book.title}</h1>
        <img src={book.img_url} alt="bookcover"/>
        <p>{book.author}</p>
    </StyledCard>
}

export default BookCard

const StyledCard = styled.div`
border: solid;
display: flex;
flex-direction: column;
align-items: center;
margin: 10px;
width: 20vw;
height: 25vh;

h1{
    font-size: calc(14px + .5vw);
    max-width: 80% ;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

img{
    border: solid;
    width: 50%;
    height: 50%;
    object-fit: contain;
}

p{
    max-height: 25%;
}
`