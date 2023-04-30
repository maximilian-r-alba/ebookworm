import { UserContext } from "./UserContext"
import { useContext } from "react"

import styled from "styled-components"
import {FaTrashAlt} from 'react-icons/fa'
import {AiFillEdit} from 'react-icons/ai'
import StarsRating from "./StarRating"

export default function ReviewCard({ user , users, review , handleFormContainer , formatUser , books}){
    const currentUser = useContext(UserContext)
    const reviewer = users.find(u => u.id === review.user_id)
 
  
    const book = books.find((book) => book.id == review.book_id)
    
    function handleEdits(){
        handleFormContainer('review', book)
    }

    function handleDelete(e){
        fetch(`/reviews/${review.id}`, {
            method: "DELETE"
        }).then(r => {
            if (r.ok){
                formatUser(review, book, true)
            }
            else{
                r.json().then(error => alert(error.errors))
            }
        })
    }

    return <>
    {reviewer ? <CardDiv>
        {currentUser && currentUser.id == reviewer.id ? <div className="edits"><AiFillEdit size={'20%'} onClick={handleEdits}/> <FaTrashAlt size={'20%'} onClick={handleDelete}/></div> : <></>}
            <div className="reviewer">
                <h2>{reviewer.name}</h2>
                <img src={reviewer.profile_picture} alt="profile_picture" />
                {user ? <h3>{book.title}</h3> : <></>}
            </div>

            <div className="title" >
                <p><StarsRating givenRating={review.rating}/>{review.rating}</p>
                <h1>{review.title}</h1>
            </div>
      
            <div className="body">
                <pre>{review.body}</pre>
            </div>
    </CardDiv> :<></>}
    
    </>
}

const CardDiv = styled.div`
padding: 20px;
margin: 10px;
border: solid;
border-radius: 20px;
position: relative;
background-color: white;
display: grid;
grid-template-columns: .25fr 1fr .15fr;
grid-template-rows: 1fr 1.25fr;

grid-template-areas: "reviewer title edits"
                    "reviewer body ."
;

div{
    display: inline-block;
}
div.reviewer{
grid-area: reviewer;
text-align: center;
border-right: solid;
margin-right: 20px;
img{
    width: 50%;
    height: width;
    border-radius: 50%;
}
}
div.edits{
    grid-area: edits;
    width: 100%;
  *{
    cursor: pointer;
  }
}
div.title{
    grid-area: title;
    max-height: 20%;
}
div.body{
    grid-area: body;
    width: 100%;
    max-height: 200px;
    pre{
    max-width: 100%;
    height: 80%;
    font-size: calc(8px + 1vw);
    overflow: hidden;
    overflow-y: scroll;
    white-space: pre-wrap;       
    word-wrap: break-word;      

}
}

`