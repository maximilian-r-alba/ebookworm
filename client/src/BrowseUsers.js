import UserCard from "./UserCard"
import { useState } from "react"
import styled from "styled-components"

function BrowseUsers({users}){
    const [filterParams, setFilterParams] = useState("")

    return <RouteDiv>
        <form>
            <label htmlFor="name">
                Search for Readers:
            </label>
            <input type="text" id="name" value={filterParams} onChange={(e) => setFilterParams(e.target.value)}></input>
        </form>
        <h1>Readers</h1>
        <CardContainer>
            {users.filter(u => u.name.toLowerCase().includes(filterParams.toLowerCase())).map((user) => <UserCard  key={user.id} user={user}/>)}
        </CardContainer>

    </RouteDiv>

}

export default BrowseUsers

const CardContainer = styled.div`
display: flex;
flex-wrap: wrap;
width: 100vw;
height: 70vh;
justify-content: center;
overflow-y: scroll;
div{
    cursor: pointer;
}
`

const RouteDiv = styled.div`

width: 100vw;
height: 86vh;

    font-size: calc(6px + 1vw);
    form {
        margin-left: 1vw;
        margin-bottom: 1vh;
        input{
            font-size: calc(2px + 1vw);
            margin-left: 1vw;
            border: none;
            border-bottom: 2px solid;
        }
    }
 
    form *:focus{
        box-shadow: 0px 0px 5px black;
    }

`