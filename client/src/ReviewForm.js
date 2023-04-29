import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"


export default function ReviewForm({book , setFormView, formatUser}){

    const [reviewParams, setReviewParams] = useState({title: "", body: "", rating: 0, book_id: book.id, id: undefined})
    const user = useContext(UserContext)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (user.reviews){
            const prevReview = user.reviews.find((r) => r.book_id == book.id)

            if(prevReview){
                setReviewParams({id: prevReview['id'], title: prevReview['title'], body: prevReview['body'], rating: prevReview['rating']})
            }
        }
       
        
    }, [])


    function handleChange(e){
        const key = e.target.id
        const value = e.target.value
        if (key == 'rating'){
            setReviewParams({...reviewParams, [key]: parseInt(value)})
        }
        else{
            setReviewParams({...reviewParams, [key]: value})
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        if(reviewParams['id']){

            fetch(`/reviews/${reviewParams['id']}`, {
                method: 'PATCH',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(reviewParams)
            }).then(r => {
                if(r.ok){
                    r.json().then(reviewObj => formatUser(reviewObj, book))
                    setFormView(false)
                }
                else{
                    r.json().then(errorObj => setErrors(errorObj))
                }
            })
        }
        else{
            fetch('/reviews', {
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(reviewParams)
            }).then(r => {
                if(r.ok){
                    r.json().then(reviewObj => formatUser(reviewObj, book))
                    setFormView(false)
                }
                else{
                    r.json().then(errorObj => setErrors(errorObj))
                }
            })

        }
        
    }
    
    return <div>
        <button  onClick={() => setFormView(false)}>X</button>
        <div>
            <h2>{book.title}</h2>
            <h3>Review</h3>
        </div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="title">
            Review Title:
        </label>
        <input type="text" id="title" onChange={handleChange} value={reviewParams['title']}/>
        <label htmlFor="body">
            Review Body:
        </label>
        <textarea id="body" onChange={handleChange} value={reviewParams['body']} rows="10" cols="40"/>

        <label htmlFor="rating">
            Rating:
        </label>
        <input type="number" id="rating" onChange={handleChange} value={reviewParams['rating']}/>

        <input type="submit" ></input>
        </form>

    </div>
}
