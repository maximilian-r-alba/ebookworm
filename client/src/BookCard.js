import styled from "styled-components"
import {FiDelete} from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "./UserContext"

function BookCard({ addBooktoLibrary ,  book , userPage , deleteFromUser , user}){
    
    const navigate = useNavigate()
    const currentUser = useContext(UserContext)

    function handleClick(){
       
        if(addBooktoLibrary){
            addBooktoLibrary(book)
        }
        else{
            navigate(`/library/${book.id}`)
        }
    }

    function deleteBookFromUser (){
        const deleteReviewID = user.reviews.find(r => r.book_id == book.id).id
        fetch(`/reviews/${deleteReviewID}`, { method: "DELETE"})
        deleteFromUser(book)

    }

    

    return <StyledCard >
        {userPage && currentUser.id == user.id ? <FiDelete size={30} onClick={deleteBookFromUser}/>:<></>}
        <div onClick={handleClick} >
            <img src={book.img_url} alt="bookcover"/>
            <h1>{book.title}</h1>
            <p>{book.author}</p>

        </div>
        
        
    </StyledCard>
}

export default BookCard

const StyledCard = styled.div`
border: solid;
display: flex;
flex-direction: column;
align-items: center;
margin: 1%;
width: 10vw;
height: 25vw;
background-color: white;

div{
display: flex;
flex-direction: column;
align-items: center;
padding-bottom: .5%;
width: 10vw;
height: 25vw;
background-color: white;
cursor: pointer;
}
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

svg{
    color: red;
    align-self: flex-start;
    cursor: pointer;
}
`