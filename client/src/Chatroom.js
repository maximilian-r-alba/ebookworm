import { useEffect , useState } from "react"
import { useParams } from "react-router-dom"
import consumer from "./cable"


export default function Chatroom({wss , chatrooms , user}){
    
    const [chat, setChat] = useState({})
    const [guid, setGuid] = useState("")
    const [messages, setMessages] = useState([])
    const {id} = useParams()
    const [subscription, setSubscription] = useState() 


    const [messageParams, setMessageParams] = useState({subscription_id: "", chatroom_id: id, content: ""})

    useEffect(() =>{
       
        setChat(chatrooms.find((c) => c.id == id))
        setMessages(chatrooms.find((c) => c.id == id).messages)
        setGuid(Math.random().toString(36).substring(2,15))
        if(user) {
            setSubscription(user.subscriptions.find(s => s.chatroom_id == id))
            setMessageParams({...messageParams, 'subscription_id':user.subscriptions.find(s => s.chatroom_id == id).id})
        }
        consumer.subscriptions.create({
            channel: "ChatChannel",
            room: id,
            id: guid,
        }, {
            connected: () => console.log('connected'),
            received: data => {
                console.log(data)
                setMessages(messages => [...messages, data])}
        })

        return () => {
            console.log('disconnect')
           consumer.disconnect()
        }
    }, [])
        
    function handleSubmit(e){
        e.preventDefault()
        fetch('/messages', {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(messageParams)
        }).then(r => {
            if(r.ok){
                r.json()
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

    return <>
    {chat ? <div>
    <h1>{chat.topic}</h1>
    <p>{guid}</p>
    <div>
        {messages.map(msg => <p key={msg.id}>{msg.content}</p>)}
    </div>
   { subscription ? <div>
        <form onSubmit={handleSubmit}>
            <input type="text" id='content' value = {messageParams['content']} onChange={handleChange}></input>
            <input type="submit"></input>
        </form>

    </div> : <></>}
    </div> : <></>}
    </>
}