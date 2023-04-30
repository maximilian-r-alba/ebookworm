import { useParams } from "react-router-dom"
import styled from "styled-components"
import ReviewCard from "./ReviewCard"
import { useEffect , useState } from "react"
import StarsRating from "./StarRating"

function BookPage({ user , users , books, formatUser, handleFormContainer}){
   

    useEffect(() => {
        if(user && user.books){
            setIsAdded(user.books.map(b => b.id).includes(parseInt(id)))
        }
        
    }, [user])

    useEffect(() =>{
   
        const newBook = [...books.filter((book) => book.id == id)].pop()
        setBook(newBook)
    }, [books])


    const {id} = useParams()
    const [book, setBook] = useState()

    const [isAdded, setIsAdded] = useState()


    function addToUser(){
        fetch('/reviews', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({book_id:id , rating: 0, title: "", body: ""})
        }).then(r => {
            if(r.ok){
                r.json().then( reviewObj => {
                    formatUser(reviewObj , book)
                    setBook({...book, reviews:[reviewObj, ...book['reviews']]})
                })
            }
            else{
                r.json().then(console.log)
            }
        })
    }

    
    return <>
    { book ? <BookPageContainer>
        <InfoDiv>
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            {book.rating ? <p><StarsRating givenRating={book.rating}/> {book.rating}</p> : <p>0.0</p>}
            {user ? <button onClick={() => handleFormContainer('review', book)}>Leave Review</button> : <button disabled>Leave Review</button>}
        </InfoDiv>
        
        <CoverDiv added={isAdded}>
            <img src={book.img_url} alt="bookCover" />
            {isAdded || !user? <button disabled className="saved">{ user ? "Book Saved" : "Login to Save Books"}</button> : <button onClick={addToUser}>Save to Profile</button>}
        </CoverDiv>
    <h2 className="description">Summary</h2>
        <DescriptionDiv>
            
            <pre>{book.description}</pre>
        </DescriptionDiv>

    <h2 className="review">Reviews</h2>
        <ReviewsDiv>  
            {book.reviews.filter((r) => r.rating !== 0).map((review) => <ReviewCard key={review.id} review={review} books={books} formatUser={formatUser} handleFormContainer={handleFormContainer} users={users}/>) }
        </ReviewsDiv>
       
    </BookPageContainer> : <h1>Loading</h1>}
    
    
    </>
}

export default BookPage

const BookPageContainer = styled.div`
display: grid;
margin: 3vh;
grid-template-columns: 1fr 3fr 1fr;
grid-template-rows: .5fr .1fr 1.5fr .1fr 1.5fr;
grid-template-areas: 
"cover info info"
". descriptionLabel ."
". description description"
"reviewLabel reviewLabel ."
"reviews reviews reviews";

column-gap: 2vw;
row-gap: 1vh;

button{
    cursor: pointer;
}
h2.description{
    grid-area: descriptionLabel;
}

h2.review{
    grid-area: reviewLabel;
}
`

const InfoDiv = styled.div`
grid-area: info;
`
const CoverDiv = styled.div`
grid-area: cover;
display: flex;
flex-direction: column;
align-items: center;
gap: .75vh;
img{
    height: 40vh;
    width: 30vh;
}
button{
   /* ${props => props.added ? 'display: none' : null} */
   width: 5vw;
}
`
const DescriptionDiv = styled.div`
grid-area: description;
height: 45vh;
overflow: scroll;
word-wrap: break-word;
overflow-x: hidden;
background-color: white;
border: solid;
border-radius: 20px;
pre{
    font-size: calc(8px + 1vw);
    margin: .5vw;
    white-space: pre-wrap;
}
`

const ReviewsDiv = styled.div`
grid-area: reviews;
height: 70vh;
overflow: scroll;
word-wrap: break-word;
overflow-x: hidden;
`