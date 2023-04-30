
import styled from "styled-components"
import { UserContext } from "./UserContext"
import { useContext } from "react"

export default function MessageCard({msg , subscribers}){

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
${props => props.isUser ? "align-self: flex-end;" : ""}
${props => props.isUser ? "padding-right: 0;" : ""}

width: fit-content;
margin-top: 10px;

div.user{
    width: 25%;
    display: flex;
    flex-direction: column;
    ${props => !props.isUser ? "align-items: end;" : ""}
    ${props => props.isUser ? "order:2;" : ""}
    
    p{
        padding: 10px;
        padding-top: 0;
        margin-top: 0;
        font-size: calc(8px + .5vw);;
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
    width: 75%;
    margin-left: 1vw;
    margin-right: 1vw;
    border: solid;
    border-radius: 30px;
    
    font-size: calc(5px + 1.5vw);
    background-color: white;
    p{
        ${props => props.isUser ? "text-align: end;" : ""}
        margin: 0;
        padding: 10px;
    }
}

`