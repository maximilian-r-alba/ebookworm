import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ReviewCard from "./ReviewCard"
import BookCard from "./BookCard"
import styled from "styled-components"
import ChatCard from "./ChatCards"

import {FaTrashAlt} from 'react-icons/fa'
import {AiFillEdit} from 'react-icons/ai'

function UserPage({currentUser , users , books ,  handleFormContainer , formatUser , deleteUser}){

    
    const {id} = useParams()
    const [user, setUser] = useState()


    useEffect(()=>{
        setUser(users.find((user) => user.id == id))
    }, [users , id])
  
 
    function handleEdit(){
        handleFormContainer('user')
    }

    function handleDelete(){
        fetch(`/users/${id}`, {method:"DELETE"}).then(r => {
            if(r.ok){
                deleteUser(user)
            }
            else{
                r.json().then(errorObj => alert(errorObj.errors))
            }
        })
    }

    return<>
    { user ?  <RouteDiv>
<UserDiv>

<h1>{user.name}</h1>
<img src={user.profile_picture} alt="profile_picture"/>
{currentUser && currentUser.id === user.id ? <div>
    
    
    <AiFillEdit size={'5%'} onClick={handleEdit} /> <FaTrashAlt size={'4%'} onClick={handleDelete}/></div> : <></>}
</UserDiv>
{user.headline ? <h1 className="greeting">{user.headline}</h1> : <></>}
<ChatsDiv>
<h1>Chatrooms</h1>
{user.chatrooms ? <div className="chatcontainer"> 
    {user.chatrooms.map((chat) => <ChatCard key={chat.id} chat={chat}/>)}
</div> : <></>}

</ChatsDiv>

<h2 className="books">Books</h2>
<BooksDiv>
        {user.books ? user.books.map((book) => <BookCard key={book.id} book={book} />) : <></>}

</BooksDiv>

<h2 className="reviews">Reviews</h2>

<ReviewsDiv>  
            { user && user.reviews ? user.reviews.filter(r => r.rating !==0).map((review) => <ReviewCard key={review.id} review={review} books={books} handleFormContainer={handleFormContainer} user={user} users={users} formatUser={formatUser}/>) : <></>}
</ReviewsDiv>



</RouteDiv> : <></>}
    </>
}

export default UserPage

const RouteDiv = styled.div`
display: grid;

width: 99%;
grid-template-columns: .75fr 1fr 1.25fr;
grid-template-rows: 1fr .25fr 1fr .25fr 1fr;



grid-template-areas: 
"user greeting chat"
"booksLabel booksLabel booksLabel"
"books books books"
"reviewsLabel reviewsLabel reviewsLabel"
"reviews reviews reviews";

;

h1.greeting{
    grid-area: greeting;
    
    align-self: center;
    text-align: center;
    font-size: calc(20px + 1vw);
}
h2.books{
    grid-area: booksLabel;
    border-top: solid;
    width: 80%;
    margin-top: 5%;
    margin-left: 5%;
    padding: 20px;
    font-size: calc(20px + 1vw);
}
h2.reviews{
    grid-area: reviewsLabel;
    border-top: solid;
    width: 80%;
    margin-top: 5%;
    margin-left: 5%;
    padding: 20px;
    font-size: calc(20px + 1vw);
}
`
const UserDiv = styled.div`
grid-area: user;
position: relative;
h1{
    font-size: calc(20px + 1vw);
}
img{
    width: 10vw;
    height: width;
    border-radius: 50%;
}
div{
    position: absolute;
    display: flex;
    *{
        cursor: pointer;
        margin-right: 15px;
    }
}
padding: 20px;

`

const ChatsDiv = styled.div`
grid-area: chat;
display: flex;

height: 50vh;
flex-direction: column;
flex-wrap: nowrap;
overflow: hidden;
overflow-y: scroll;

`
const BooksDiv = styled.div`
grid-area: books;
display: flex;
flex-wrap: nowrap;
overflow: hidden;
overflow-x: scroll;
min-height: 50vh;

*{
    min-width: 10%;
}


`

const ReviewsDiv = styled.div`
grid-area: reviews;
height: 50vh;
width: 100%;

overflow: scroll;
word-wrap: break-word;
overflow-x: hidden;
`