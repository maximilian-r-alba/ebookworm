import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard"
import BookCard from "./BookCard"
import styled from "styled-components"
import ChatCard from "./ChatCards"
function UserPage({currentUser , users , books ,  handleFormContainer , formatUser , deleteUser}){

    const {id} = useParams()
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        setUser(users.find((user) => user.id == id))
    }, [users])

   
  
    function handleEdit(){
        handleFormContainer('user')
    }

    function handleDelete(){
        fetch(`/users/${id}`, {method:"DELETE"}).then(r => {
            if(r.ok){
                deleteUser(user)
                navigate('/')
            }
            else{
                r.json().then(console.log)
            }
        })
    }

    return<>
    { user ?  <UserPageDiv>
<UserDiv>

<h1>{user.name}</h1>
<img src={user.profile_picture} alt="profile_picture"/>
{currentUser && currentUser.id === user.id ? <><button onClick={handleEdit}>Edit</button> <button onClick={handleDelete}>Delete</button></> : <></>}
</UserDiv>

<ChatsDiv>
<h1>Chats</h1>
{user.chatrooms ? <div className="chatcontainer"> 
    {user.chatrooms.map((chat) => <ChatCard key={chat.id} chat={chat}/>)}
</div> : <></>}

</ChatsDiv>

<h2 className="books">Books</h2>
<BooksDiv>
        {user.books ? user.books.map((book) => <BookCard book={book} />) : <></>}

</BooksDiv>

<h2 className="reviews">Reivews</h2>

<ReviewsDiv>  
            { user.reviews ? user.reviews.map((review) => <ReviewCard key={review.id} review={review} books={books} handleFormContainer={handleFormContainer} users={users} formatUser={formatUser}/>) : <></>}
</ReviewsDiv>



</UserPageDiv> : <></>}
    </>
}

export default UserPage

const UserPageDiv = styled.div`
display: grid;
margin: 3vw;
width: 100vw;
grid-template-columns: 1.5fr 1.5fr 1fr;
grid-template-rows: 1fr .25fr 1fr .25fr 1fr;

grid-template-areas: 
"user greeting chat"
"booksLabel . chat"
"books books books"
"reviewsLabel . ."
"reviews reviews reviews";

;
h1{
    grid-area: greeting;
}
h2.books{
    grid-area: booksLabel;
}
h2.reviews{
    grid-area: reviewsLabel;
}
`
const UserDiv = styled.div`
grid-area: user;
`

const ChatsDiv = styled.div`
grid-area: chat;
`
const BooksDiv = styled.div`
grid-area: books;
display: flex;
flex-wrap: nowrap;
overflow-x: scroll;
height: 50vh;
width: 100vw;
`

const ReviewsDiv = styled.div`
grid-area: reviews;
/* max-height: 30vh; */
width: 100vw;
overflow: scroll;
word-wrap: break-word;
overflow-x: hidden;
`