import styled from "styled-components"

function UserCard({user}){
    console.log(user)
    return <Card>
        <h1>{user.name}</h1>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg" alt="profile picture"></img>
        <p>{user.headline}</p>
    </Card>
}

export default UserCard

const Card = styled.div`
border: solid;
display: flex;
flex-direction: column;
align-items: center;
font-size: calc(10px + .5vw);
margin: 20px;
min-height: 25vh;
min-width: 25vw;
img{
    border: solid;
    min-height: 50%;
    min-width: 50%;
    max-height: 50%;
    max-width: 50%;
    
    object-fit: contain;
}


`