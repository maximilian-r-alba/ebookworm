import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function ChatCard({chat}){

    const navigate = useNavigate()
    return<ChatCardDiv onClick={() => navigate(`/chatrooms/${chat.id}`)}>
        <h1>{chat.topic}</h1>
        {chat.subscriptions ? <p>{chat.subscriptions.length} Users</p> : <></>}
    </ChatCardDiv>
}

const ChatCardDiv = styled.div`
border: solid;
margin: 20px;
`