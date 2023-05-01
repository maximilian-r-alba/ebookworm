import { useState , useEffect} from "react"
import {AiOutlineCloseSquare} from "react-icons/ai"
import styled from "styled-components"

export default function ChatroomForm({formatChat , setFormView , chat}){

    useEffect(() => {
        if(chat){
            setChatParams({chatroom_id: chat.id, topic: chat.topic})
        }
    }, [chat])


    const [chatParams, setChatParams] = useState({topic: ""})
    
    function handleChange(e){
        const key = e.target.name
        const value = e.target.value
        setChatParams({[key]: value})
    }

    function handleSubmit(e){
        e.preventDefault()
        if(chat){
            fetch(`/chatrooms/${chat.id}`, {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(chatParams)
            }).then(r => {
                if(r.ok){
                    r.json().then(chat => {
                        formatChat(chat)
                        setFormView(false)
                    })
                }
                else{
                    r.json().then(error => alert(error.errors))
                }
            })
        }
        else{
            fetch(`/chatrooms`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(chatParams)
            }).then(r => {
                if(r.ok){
                    r.json().then(chat => {
                        formatChat(chat)
                        setFormView(false)
                    })
                }
                else{
                    r.json().then(error => alert(error.errors))
                }
            })
        }
      
    }


    return <FormStyled onSubmit={handleSubmit}>
    {chat ? <AiOutlineCloseSquare size={'10%'} onClick={() => setFormView(false)}/> : <></>}
    <div>
        <input type="text" name="topic" onChange={handleChange} value={chatParams['topic']}/>
        <input type="submit"></input>
    </div>
   
</FormStyled>
}

const FormStyled = styled.form`
width: 20vw;
padding: 20px;
svg{
    cursor: pointer;
}
`
