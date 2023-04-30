
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

function UserCard({user}){
    const navigate = useNavigate()

    function handleClick(){
        navigate(`/readers/${user.id}`)
    }
    return <ContainerDiv>
    <Card onClick={handleClick}>
        <h1>{user.name}</h1>
        <img src={user.profile_picture} alt="profile picture"></img>
        {user.headline ? <p>{user.headline}</p> : <p>Hello</p>}
    </Card>
    </ContainerDiv>
    
}

export default UserCard

const ContainerDiv = styled.div`
width: 20vw;
height: 20vw;

`

const Card = styled.div`
border: solid;
border-radius: 20px;
display: flex;
flex-direction: column;
align-items: center;
background-color: white;
margin: 20px;
max-height: 100%;
max-width: 100%;
img{
    border: solid;
    border-radius: 20px;
    width: 50%;
    height: width;
    object-fit: contain;
}
h1{
   height: 10%; 
   width: 100%;
   font-size: 1.5vmin;
   white-space: nowrap;
   text-align: center;
}
p{
    font-size: 1.5vmin;
    text-align: center;
    height: 10%;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


`