import UserCard from "./UserCard"
import styled from "styled-components"

function BrowseUsers({users}){

    const cards = users.map((user) => <UserCard user={user}/>)
    
    return <CardContainer>
        {cards}

    </CardContainer>
}

export default BrowseUsers

const CardContainer = styled.div`
display: flex;
flex-wrap: wrap;

`