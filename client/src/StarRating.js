import { useEffect, useState } from "react"
import styled from "styled-components"
import Star from "./Star"

function StarsRating({ givenRating=0}){
   
    const [rating, setRating] = useState(Math.floor(givenRating))
    useEffect(() =>{
        setRating(Math.floor(givenRating))
    }, [givenRating])

    const ratingArr = [1,2,3,4,5].map((value) => 
    <label key={value} >
        <Star key={value} value={value} filled = {value <= rating}/>
    </label>
    )

   
    return (
        <StyledLabel>
            {ratingArr}
        </StyledLabel>
    )
}

export default StarsRating

const Radio = styled.input`
opacity: 0;
pointer-events:none;
width: 1px;
margin: 0;
`
const StyledLabel = styled.label`
display: inline-flex;
width: auto;
`
