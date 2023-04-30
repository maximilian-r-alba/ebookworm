import BookCard from "./BookCard"
import styled from "styled-components"
import { useState } from "react"

function BrowseBooks ({books}) {

    const [filter, setFilter] = useState('title')
    const [filterParams, setFilterParams] = useState('')

    return <RouteDiv>
        <div>
            <form>
                Search by:
                <select onChange={(e) => setFilter(e.target.value)}>
                    <option value={'title'}>Title</option>
                    <option value={'author'}>Author</option>
                </select>
                <input type="text" value={filterParams} onChange={(e)=> setFilterParams(e.target.value)} />
            </form>
        </div>
    <Container>
        {books.filter((book) => book[filter].toUpperCase().includes(filterParams.toUpperCase())).map((book)=> <BookCard key={`${book.id}${book.title}`} book={book} /> )}
    </Container>

    </RouteDiv> 
    
}

export default BrowseBooks

const RouteDiv = styled.div`

width: 100%;
height: 100vh;

div{
    font-size: calc(6px + 1vw);
    form{
        margin-left: 1vw;
        margin-bottom: 3vh;
    }
    form *{
        font-size: calc(2px + 1vw);
        border: none;
        border-bottom: 2px solid;
    }
  
    form *:focus{
        box-shadow: 0px 0px 5px black;
    }
    form select{
        margin-left: 10px;
        margin-right: 10px;
    }
}
`

const Container = styled.div`
border-top: solid;
height: 80%;
width: 100%;


display: flex;
flex-wrap: wrap;
justify-content: center;
align-content: flex-start;
overflow: scroll;
overflow-x: hidden;
`