import { useParams } from "react-router-dom"
import styled from "styled-components"
import ReviewCard from "./ReviewCard"
import { useEffect , useState } from "react"

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
  
    // useEffect(()=>{
        
    //     if(book && book.reviews) {
    //         const cards = book.reviews.map((review) => <ReviewCard key={review.id} review={review} book={book} handleFormContainer={handleFormContainer} users={users}/>) 
    //         console.log('book changed')
    //         setReviews(cards)
    // }
    // }, [book])


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
            {/* if a user deletes the last review, it returns NaN */}
            {/* also if user adds book without reviewing when no reviews present */}
            <p>{book.rating}</p>
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
            {book.reviews.filter((r) => r.rating !== 0).map((review) => <ReviewCard key={review.id} review={review} books={books} handleFormContainer={handleFormContainer} users={users}/>) }
        </ReviewsDiv>
       
    </BookPageContainer> : <h1>Loading</h1>}
    
    
    </>
}

export default BookPage

const BookPageContainer = styled.div`
display: grid;
max-height: 130vh;
margin: 3vh;
grid-template-columns: 1fr 3fr 1fr;
grid-template-rows: .5fr .1fr 2fr .1fr 4fr;
grid-template-areas: 
"cover info info"
". descriptionLabel ."
". description description"
"reviewLabel reviewLabel ."
"reviews reviews reviews";

column-gap: 2vw;
row-gap: 1vh;

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
    height: 30vh;
    width: 20vh;
}
button{
   /* ${props => props.added ? 'display: none' : null} */
}
`
const DescriptionDiv = styled.div`
grid-area: description;
max-height: 25vh;
overflow: scroll;
word-wrap: break-word;
overflow-x: hidden;
pre{
    margin: .5vw;
    color: red;
    white-space: pre-wrap;
}
`

const ReviewsDiv = styled.div`
grid-area: reviews;
max-height: 30vh;
overflow: scroll;
word-wrap: break-word;
overflow-x: hidden;
`