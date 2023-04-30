import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import styled from "styled-components"
import {AiOutlineCloseSquare} from "react-icons/ai"
export default function ReviewForm({book , setFormView, formatUser}){

    const [reviewParams, setReviewParams] = useState({title: "", body: "", rating: 0, book_id: book.id, id: undefined})
    const user = useContext(UserContext)
    const [errors, setErrors] = useState()

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
                    r.json().then(errorObj => setErrors(errorObj.errors))
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
                    r.json().then(errorObj => setErrors(errorObj.errors))
                }
            })

        }
        
    }
    console.log(errors)
    return <FormContainer>
        <AiOutlineCloseSquare size={'5%'} onClick={() => setFormView(false)}/>
        {errors ? <ErrorDiv>{errors.map((error) => <p>{error}</p>)}</ErrorDiv> : <></>}
       
        <StyledForm onSubmit={handleSubmit}>
        <div>
            <h2>{book.title}</h2>
            <h3>Review</h3>
        </div>
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
        </StyledForm>

    </FormContainer>
}

const StyledForm = styled.form`
 margin: 2vw;
display: flex;
flex-direction: column;
/* gap: 5px; */
label{
    font-size: calc(6px + .5vw);
    margin-top: 15px;
    margin-bottom: 10px;
}

input{
    font-size: calc(12px + .5vw);
    border: none;
    border-bottom: 1px solid;
}
input:focus {
    outline: none;
    box-shadow: 0px 0px 5px #61C5FA;
    border:1px solid #5AB0DB;
}
input[type="text"]:focus:hover {
    outline: none;
    box-shadow: 0px 0px 5px #61C5FA;
    border:1px solid #5AB0DB;
    border-radius:0;
}

input[type="submit"]{
    width: 50%;
    margin-top: 15px;
    align-self: center;
    border: 2px solid;
    border-radius: 10px;
    cursor: pointer;
}

svg{
    color: red;
    align-self: end;
    cursor: pointer;
}

min-width: 30vw;
min-height: 20vw;
`

const ErrorDiv = styled.div`
font-size: calc(10px + .75vw);
padding: 20px;
max-width: 20vw;
align-self: center;
/* position: absolute;
top: 10vh;
left: 5vw; */
`

const FormContainer = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;

svg{
    cursor: pointer;
}
`