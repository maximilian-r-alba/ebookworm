import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import BookCard from "./BookCard"
import { UserContext } from "./UserContext"

function OpenLibrary({addBook}){

    const url = new URL(`https://openlibrary.org/search.json?`)
    const user = useContext(UserContext)
    
    const [search, setSearch] = useState("")
    const [searchParams, setSearchParams] = useState()
    const [page, setPage] = useState(1)
    const [searchResults, setSearchResults] = useState([])
    const [searchCards, setSearchCards] = useState([])
    const [searchLabel, setSearchLabel] = useState("")
    const [searched, setSearched] = useState(false)

    useEffect(() => {
        if(searched){
            handleFetch(searchParams)
        }
        
    }, [page])

    function addBooktoLibrary(book){
    
        const filterResults = searchResults.filter((b) => b.key !== book.key)
        fetch(`https://openlibrary.org${book.key}.json`).then((r) => r.json()).then( (obj)=> {
   
          
           if(typeof(obj.description) == 'string'){
               return obj.description
           }
           
           else if(obj.description){
            return obj.description.value
           } else{
            return undefined
           }
        }
           ).then((description) => {
            
            fetch('/books', {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({...book, ['description'] : description})
            }).then( r => {
                if (r.ok){
                    r.json().then( bookObj => addBook(bookObj))
                    setSearchResults(filterResults)
                }
                else{
                    r.json().then(errorObj => alert(errorObj.errors))
                }
            })
           })
           
    }
    useEffect(()=>{
       
        setSearchCards(searchResults.map((book) => <BookCard key={book.key} addBooktoLibrary={addBooktoLibrary} book={book}/>))
    }, [searchResults])


    function handleSubmit(e){
        e.preventDefault()

        const params = new URLSearchParams(url.search)
        params.set("q", search)

        setSearchLabel(search)
        setPage(1)
        handleFetch(params)
        setSearchParams(params.toString())
        
    }

    function handleFetch(searchParams){
        fetch(url.toString() + searchParams + "&limit=15" + `&page=${page}`).then(r => r.json()).then((resultObj) => {
            const bookResultsArr = resultObj.docs.map((book) => {
                        if(book.title && book.author_name && book.cover_i){
                                return {title: book.title, author: book.author_name.shift(), img_url: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`, key: book.key}}
                            })
                        .filter((book) => book !== undefined)

            

            setSearched(true)
            setSearchResults(bookResultsArr)
       })
    }

    return <PageDiv>
    <HeaderDiv searched={searched}>
        <h1>Search the OpenLibrary</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <input type="submit"/>
        </form>
    </HeaderDiv>
     
       {searchResults.length > 0 ? <h1>Showing Results for {searchLabel}</h1> : <>{searched? <h1>No results found</h1> : <></>}</>}

    <ResultContainer>
        
        {searchResults.length > 0 ? searchCards : <></>}
       
    </ResultContainer>
        
    <ButtonDiv>
        {page-1 > 0 ? <button onClick={() => setPage(page-1)}>Page {page-1}</button> : <></>}
        { searchResults.length > 0 ? <button onClick={() =>setPage(page+1)
            }>Page {page+1}</button> : <></>}

    </ButtonDiv>
 
    </PageDiv>
}

export default OpenLibrary

const PageDiv = styled.div`
    position: relative;
`

const ResultContainer = styled.div`
height: 70vh;
width: 100vw;
display: flex;
flex-wrap: wrap;
justify-content: center;
overflow: scroll;
overflow-x: hidden;

`

const HeaderDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
position: ${props => props.searched ? 'relative' : 'absolute' };
bottom: ${props => props.searched ? "" : '45%'};
min-height: 15vh;
width: 100vw;
`

const ButtonDiv = styled.div`
display: flex;
justify-content: center;
height: 5vh;
*{
    margin: 10px;
}
`