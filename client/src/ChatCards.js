import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import {FaBookReader} from "react-icons/fa"

export default function ChatCard({chat}){

    const navigate = useNavigate()
    
    return<ChatCardDiv onClick={() => navigate(`/chats/${chat.id}`)}>
        <h1>{chat.topic}</h1>
        {chat.subscriptions ? <p>{chat.subscriptions.length} <FaBookReader /></p> : <></>}
    </ChatCardDiv>
}

const ChatCardDiv = styled.div`
border: solid;
margin: 20px;
cursor: pointer;
background-color: white;
padding: 20px;
border-radius: 20px;
`