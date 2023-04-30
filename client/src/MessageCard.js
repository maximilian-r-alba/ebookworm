
import styled from "styled-components"
import { UserContext } from "./UserContext"
import { useContext } from "react"

export default function MessageCard({chat ,msg , subscribers}){

    const user = subscribers.find(u => {
        
        return u.subscriptions.map(s=>s.id).includes(msg.subscription.id)
    })
    
    const currentUser = useContext(UserContext)

    function checkIsUser(){
        if(currentUser){
            return currentUser.id === user.id
        }
        return false
    }
    return <MessageDiv isUser={checkIsUser()}>
        <div className="user">
            <img src={user.profile_picture} alt="profile_picture" />
            <p>{user.name}</p>
        </div>

        <div className="message">
            <p>{msg.content}</p>
        </div>
        

    </MessageDiv>
}

const MessageDiv = styled.div`
display: flex;

div.user{
    width: 5%;
    display: flex;
    flex-direction: column;
    align-items: end;
    padding-right: 10px;
    ${props => props.isUser ? "order:2;" : ""}
    p{
        font-size: calc(5px + .5vw);;
    }
    img{
        width: 45%;
        height: width;
        border: 1px solid;
        border-radius: 50%;
    }
}

div.message{
    height: 80%;
    width: 100%;
    margin-left: 1vw;
    border: solid;
    
    font-size: calc(5px + 1.5vw);
    background-color: white;
    p{
        ${props => props.isUser ? "text-align: end;" : ""}
        margin: 0;
        padding: 10px;
    }
}

`