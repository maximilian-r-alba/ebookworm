import UserCard from "./UserCard"
import styled from "styled-components"

function BrowseUsers({users}){
    
    return <CardContainer>
        {users.map((user) => <UserCard  key={user.id} user={user}/>)}
    </CardContainer>
}

export default BrowseUsers

const CardContainer = styled.div`
display: flex;
flex-wrap: wrap;

`