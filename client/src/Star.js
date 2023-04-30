
import {AiFillStar } from "react-icons/ai"

function Star ({ filled  , value }){
    
    return (
        <AiFillStar key ={value} color={filled ? 'yellow' : 'lightgray'} />
    )
}

export default Star