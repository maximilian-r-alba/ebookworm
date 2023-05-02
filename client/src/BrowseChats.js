
import styled from "styled-components";

import ChatCard from "./ChatCards";

export default function BrowseChats({ user , handleFormContainer , chatrooms}){

    return<RouteDiv>
        {user ? <h2 onClick={() => {handleFormContainer('chat')}}>Create a Chat?</h2> : <></>}

        <div className="chatContainer">
            {chatrooms.map((chat) => <ChatCard key={chat.id} chat={chat} />)}
        </div>
      
    </RouteDiv>
}

const RouteDiv = styled.div`

width: 100%;
padding: 20px;
h2{
    cursor: pointer;
}
div.chatContainer{
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    div{
        width: 80%;
    }
    overflow: hidden;
    overflow-y: scroll;
 
}
`