import { UserContext } from "./UserContext"
import { useContext , useEffect, useState } from "react"
export default function ReviewCard({ users, review , handleFormContainer , formatUser , books}){
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
                r.json().then(console.log)
            }
        })
    }
    return <div>
        {currentUser && currentUser.id == reviewer.id ? <><button onClick={handleEdits}>Edit</button> <button onClick={handleDelete}>Delete</button></> : <></>}
        <h1>{review.title}</h1>
        <p>{review.rating}</p>
        <p>{reviewer.name}</p>
        <p>{review.body}</p>
    </div>
}