import { useEffect , useState } from "react"
import { useParams } from "react-router-dom"

import MessageCard from "./MessageCard"
import styled from "styled-components"
import UserCard from './UserCard'
import {AiOutlineSend} from "react-icons/ai"
import {FaTrashAlt} from 'react-icons/fa'
import {AiFillEdit} from 'react-icons/ai'
import consumer from "./cable"

export default function Chatroom({ formatChat , handleFormContainer , user , setUser , users, chatrooms}){
    

   
    const [chat, setChat] = useState()
    const [messages, setMessages] = useState([])
    const {id} = useParams()
    
    
    const [subscriptions, setSubscriptions] = useState() 
    const [chatUsers, setChatUsers] = useState()

    const [subId, setSubID] = useState()
    const [subscribed, setSubscribed] = useState(false)

    
    const [messageParams, setMessageParams] = useState({subscription_id: "", chatroom_id: parseInt(id), content: ""})
    const messagesContainer = document.getElementById('messages')
    
    function scrolltoBottom (){
        if(!messagesContainer) return;
        messagesContainer.scrollTop = messagesContainer.scrollHeight
    }

    function sortMessages(a,b){
        if (a.created_at < b.created_at){
            return -1
        }
        if (a.created_at > b.created_at){
            return 1
        }
    
        return 0
    }

    useEffect(() =>{

        fetch(`/chatrooms/${id}`).then(r => r.json()).then(data => {
            setChat(data)
            setMessages(data.messages.sort(sortMessages))
            setSubscriptions(data.subscriptions)
        })

        consumer.subscriptions.create({
            channel: "ChatChannel",
            room: parseInt(id)
        }, {
            connected: () => {
                console.log('You are connected!')},
            received: data => handleWS(data)
            
        })

        return () => {
            console.log('disconneected')

           consumer.disconnect()
          
           
        }
    }, [])

    useEffect(() => {

        return () => {
            if(chat){
                formatChat(chat)
            }
            
        }
    }, [])

    useEffect(() => {
        if(chat){
            
            setChat(chatrooms.find(s => s.id == parseInt(id)))
        }
    },[chatrooms])

    useEffect(() => {
        if(user && user.subscriptions.map(s => s.chatroom_id).includes(parseInt(id))){
            setSubID(user.subscriptions.find(s => s.chatroom_id == parseInt(id)).id)
            setSubscribed(user.subscriptions.map(s => s.chatroom_id).includes(parseInt(id)))
            setMessageParams({...messageParams, 'subscription_id': user.subscriptions.find(s => s.chatroom_id == parseInt(id)).id})
        }
    }, [user, chat])


    useEffect(() => {
        
        if(subscriptions){
            const subUserIDs = subscriptions.map(s => s.user_id)
            const chatters = users.filter(u => subUserIDs.includes(u.id))
            setChatUsers(chatters)
        }
    }, [subscriptions])
  
    
    useEffect(() => {
        scrolltoBottom()
    }, [messages])

    function handleWS(d){
    
        setChat(chat => { return {...chat, 'messages' : [...messages , d]}})
        setMessages(messages => [...messages, d])
    }


    function handleSubmit(e){
        e.preventDefault()
        
        fetch('/messages', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(messageParams)
        }).then(r => {
            if(r.ok){
                setMessageParams({...messageParams, 'content': ''})
            }
            else{
                r.json().then(error => alert(error.errors))
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
            
                setChat(undefined)
                formatChat(chat, true)
            }
            else{
                r.json().then(error => alert(error.errors))
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
                
                    setUser( user => {return {...user , 'subscriptions': [{'id':subscription.id, 'chatroom_id': subscription.chatroom_id} , ...user['subscriptions']], 'chatrooms': [{id: chat.id, topic: chat.topic}, ...user['chatrooms']]}})
                    setChat(chat => {return {...chat, 'subscriptions': [ subscription, ...chat['subscriptions']]}})
                    setSubID(subscription.id)
                    setMessageParams({...messageParams, 'subscription_id': subscription.id})
                    setSubscribed(true)

                    setSubscriptions([...subscriptions, subscription])
            })
            }
            else{
                r.json().then(error => alert(error.errors))
            }
        })
    }

    

    function unsubscribeToChat(){
        fetch(`/subscriptions/${subId}`, {
            method: "DELETE"
        }).then(r => {
            if(r.ok){
                
                setSubscribed(false)

                const filterSubscriptions = user.subscriptions.filter(s => s.id !== subId)
                const filterChatrooms = user.chatrooms.filter( c => c.id !== parseInt(id))
                setUser( user => {return {...user , 'subscriptions': filterSubscriptions, 'chatrooms': filterChatrooms}})

                const filterChatSubs = chat.subscriptions.filter( s => s.id !== subId)
       
                const filterMessages = chat.messages.filter( m => m.subscription_id !== subId)
                
                setChat(chat => {return {...chat, 'subscriptions': filterChatSubs, 'messages': filterMessages}})
                setSubscriptions(filterChatSubs)
                setMessages(filterMessages)
                
            }
            else{
                r.json().then(error => alert(error.errors))
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

    </div> : 
    <div className="options" >
        {user ? <>{ !subscribed ? <button onClick={subscribeToChat}><h1>Subscribe</h1></button> : <button onClick={unsubscribeToChat}><h1>Unsubscribe</h1></button>} </> : <></>}
    </div>}
    
    <div className="users">
        <h1 className="label">Users</h1>
        <div className="usersContainer">
            { chatUsers ? chatUsers.map((u) => <UserCard key={u.id} user ={u} />) : <></>}
        </div>
    </div>


    <div id='messages' className="messagesContainer">
        {messages ? messages.map(msg => <MessageCard key={msg.id} msg={msg} users={users}/>) : <></>}
    </div>

   { subscribed ? <div className="form">
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
    height: 80vh;
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