import styled from "styled-components"
import { useNavigate } from "react-router-dom"

function BookCard({ addBooktoLibrary ,  book}){
    
    const navigate = useNavigate()
    
    function handleClick(){
       
        if(addBooktoLibrary){
            addBooktoLibrary(book)
        }
        else{
            navigate(`/books/${book.id}`)
        }
    }
    return <StyledCard onClick={handleClick}>
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
width: 10vw;
height: 25vw;
background-color: white;
cursor: pointer;
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