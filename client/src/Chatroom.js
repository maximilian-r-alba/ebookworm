import { useContext, useEffect , useState } from "react"
import { useParams } from "react-router-dom"

import MessageCard from "./MessageCard"
import styled from "styled-components"
import UserCard from './UserCard'
import {AiOutlineSend} from "react-icons/ai"
import {FaTrashAlt} from 'react-icons/fa'
import {AiFillEdit} from 'react-icons/ai'
import consumer from "./cable"
import { UserContext } from "./UserContext"

export default function Chatroom({ formatChat , handleFormContainer , chatrooms , user , setUser , users}){
    
   
    const [chat, setChat] = useState()
    const [guid, setGuid] = useState("")
    const [messages, setMessages] = useState([])
    const {id} = useParams()
    const [subscribers, setSubscribers] = useState()
    const [subscription, setSubscription] = useState() 


    const [messageParams, setMessageParams] = useState({subscription_id: "", chatroom_id: id, content: ""})

    const messagesContainer = document.getElementById('messages')
    
    function scrolltoBottom (data){
        if(!messagesContainer) return;
        messagesContainer.scrollTop = messagesContainer.scrollHeight

    }

    useEffect(() =>{
       
        setChat(chatrooms.find((c) => c.id == id))
        // am i allowed to fetch in this case
        // setMessages(chatrooms.find((c) => c.id == id).messages)
        fetch(`/chatrooms/${id}`).then(r => r.json()).then(data => {
            setChat(data)
            setMessages(data.messages)
        })
        setGuid(Math.random().toString(36).substring(2,15))

        consumer.subscriptions.create({
            channel: "ChatChannel",
            room: id,
            id: guid,
        }, {
            connected: () => console.log('connected'),
            received: data => {
                setChat(chat => { return {...chat, 'messages' : [...messages , data]}})
                scrolltoBottom()
                setMessages(messages => [...messages, data])
            }
        })

        return () => {
            console.log('disconnect')
           consumer.disconnect()
        }
    }, [])

    useEffect(() => {
        if(chat){
            setSubscribers(users.filter( u => chat.subscriptions.map(s => s.user_id).includes(u.id)))
        }
    }, [users , chat])

    useEffect(() =>{
        if(chat){
            
            formatChat(chat)
        }
     
    }, [chat])

    useEffect(() => {
        
        if(user && user.subscriptions.some( s=> s.chatroom_id == id)) {

            setSubscription(user.subscriptions.find(s => s.chatroom_id == id))
            setMessageParams({...messageParams, 'subscription_id':user.subscriptions.find(s => s.chatroom_id == id).id})
        }
    }, [user])
    
  

    function handleSubmit(e){
        e.preventDefault()
        fetch('/messages', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(messageParams)
        }).then(r => {
            if(r.ok){
                console.log('response recevied!')
                r.json().then(console.log)
            }
            else{
                r.json().then(console.log)
            }
        })
    }

    function handleChange(e){
        const key = e.target.id
        const value = e.target.value
        setMessageParams({...messageParams, [key] : value})
    }

    function handleDelete(){
        fetch(`/chatrooms/${id}`, {method: "DELETE"}).then(r => 
           { if(r.ok){
                formatChat(chat, true)
            }
            else{
                r.json().then(console.log)
            }})
    }

    function subscribeToChat(){
        fetch(`/subscriptions`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({chatroom_id: chat.id})
        }).then(r => {
            if(r.ok){
                r.json().then(subscription => {
                    setUser( user => {return {...user , 'subscriptions': [subscription , ...user['subscriptions']], 'chatrooms': [{id: chat.id, topic: chat.topic}, ...user['chatrooms']]}})
                    setChat(chat => {return {...chat, 'subscriptions': [ subscription, ...chat['subscriptions']]}})
                    setSubscription(subscription)
            })
            }
            else{
                r.json().then(console.log)
            }
        })
    }

    function unsubscribeToChat(){
        fetch(`/subscriptions/${subscription.id}`, {
            method: "DELETE"
        }).then(r => {
            if(r.ok){
                const filterSubscriptions = user.subscriptions.filter(s => s.id !== subscription.id)
                const filterChatrooms = user.chatrooms.filter( c => c.id !== subscription.chatroom_id)
                setUser( user => {return {...user , 'subscriptions': filterSubscriptions, 'chatrooms': filterChatrooms}})

                const filterChatSubs = chat.subscriptions.filter( s => s.id !== subscription.id)
                const filterMessages = chat.messages.filter( m => m.subscription.id !== subscription.id)
                setChat(chat => {return {...chat, 'subscriptions': filterChatSubs, 'messages': filterMessages}})
                setMessages(filterMessages)
                setSubscription(undefined)
            }
        })
    }
   
    return <>
    {chat ? 
    <RouteDiv>
    
    <div className="header">
        <h1>{chat.topic}</h1>

    </div>

    {user && user.owned_chats.map(c => c.id).includes(chat.id) ? <div className="owner">
    <div>
    <AiFillEdit onClick={() => handleFormContainer('chat', chat)} size={'10%'} /> <FaTrashAlt onClick={handleDelete} size={'8%'} /></div>

    </div> : <div className="options" >
        {user ? <>{subscribers && !subscribers.map((s) => s.id).includes(user.id) ? <button onClick={subscribeToChat}><h1>Subscribe</h1></button> : <button onClick={unsubscribeToChat}><h1>Unsubscribe</h1></button>} </> : <></>}
    </div>}
    

    

    <div className="users">
        <h1 className="label">Users</h1>
        <div className="usersContainer">
        { subscribers ? subscribers.map((u) => <UserCard key={u.id} user ={u} />) : <></>}
        </div>

    </div>


    <div id='messages' className="messagesContainer">
        {messages.map(msg => <MessageCard key={msg.id} msg={msg} users={users} chat={chat}/>)}
    </div>

   { subscription ? <div className="form">
        <form onSubmit={handleSubmit}>
            <input type="text" id='content' value = {messageParams['content']} onChange={handleChange}></input>
            <label htmlFor="submit"><AiOutlineSend /><input type="submit" id='submit'></input></label>
            
        </form>

    </div> : <></>}
    </RouteDiv> : <></>}
    </>
}

const RouteDiv = styled.div`
display: grid;
grid-template-columns: .75fr 2fr .75fr;
grid-template-rows: .5fr 4fr .5fr;
grid-template-areas: "options title owner"
                    " users chat chat"
                    "users form form"
;
width: 99%;
height: 80%;
border: solid;

div.header{
    grid-area: title;
    padding-left: 1vw;
}

div.users{
    grid-area: users;
    border-top: solid;
    h1.label{
        padding-left: 20px;
        height: 10%;
        margin: 0;
    }
    div.usersContainer{
        height: 90%;
        display: flex;
        flex-direction: column;
        div{

        }
        overflow: hidden;
        overflow-y: scroll;
    }
  
}

div.options{
    grid-area: options;
    button{
        border: none;
        background: none;
        h1{
            cursor: pointer;
            text-decoration: underline;
        }
    }

}

div.owner{
    grid-area: owner;
    div{
        width: 100%;
        display: flex;
        justify-content: end;
        *{
            cursor: pointer;
            margin: 10px;
        }
    }
}

div.messagesContainer{
    grid-area: chat;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-style: solid none solid solid;
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    
}

div.form{
    grid-area: form;
    border-left: solid;
    form{
        width: 100%;
        height: 100%;
        padding-top: 1vh;
        padding-left: 1vw;
        input[type="text"]{
            width: 80%;
            height: 50%;
            font-size: calc(5px + 1.5vw);
        }

        input[type="submit"]{
            display: none;
        }
        label{
            *{
                cursor: pointer;
                width: 5%;
                height: 30%;
                margin: 0;
                padding: 0;
            }
        }
    }
}
`