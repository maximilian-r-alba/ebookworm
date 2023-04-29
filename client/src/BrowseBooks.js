import { useNavigate } from "react-router-dom"
import BookCard from "./BookCard"
import styled from "styled-components"
import { useState } from "react"
function BrowseBooks ({books}) {

    const [filter, setFilter] = useState('title')
    const [filterParams, setFilterParams] = useState('')

    return <div>
        <div>
            <form>
                Sort by:
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

    </div> 
    
}

export default BrowseBooks

const Container = styled.div`

height: 60vh;
width: 100vw;
display: flex;
flex-wrap: wrap;
justify-content: center;
align-content: flex-start;
overflow: scroll;
overflow-x: hidden;
`