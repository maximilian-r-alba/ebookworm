
import { useState } from "react";
import styled from "styled-components";

import ChatroomForm from "./ChatroomForm";
import ChatCard from "./ChatCards";

export default function BrowseChats({ user , formatChat , chatrooms}){

   
    const [formView, setFormView] = useState(false)



    return<RouteDiv>
        {user ? <h2 onClick={() => {setFormView(!formView)}}>{formView ? "Submit a Topic" : "Create New Chat?"}</h2> : <></>}

        {formView ? <ChatroomForm setFormView={setFormView} formatChat={formatChat} /> : <></>}

        <div className="chatContainer">
            {chatrooms.map((chat) => <ChatCard key={chat.id} chat={chat} />)}
        </div>
      
    </RouteDiv>
}

const RouteDiv = styled.div`

width: 100%;
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