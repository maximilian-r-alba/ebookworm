import ChatCard from "./ChatCards";

export default function BrowseChats({chatrooms}){

    return<div>
        {chatrooms.map((chat) => <ChatCard key={chat.id} chat={chat} />)}
    </div>
}
