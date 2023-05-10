class ChatChannel < ApplicationCable::Channel
  def subscribed
    
    chat = Chatroom.find(params[:room])
    stream_for chat
    # stream_from "chatroom#{params[:room]}"
  end

  def receive (data)
    message = Message.find(data['id'])
    
    ChatChannel.broadcast_to(message.chatroom, {id: message.id , content: message.content, subscription_id: message.subscription.id, created_at: message.created_at})

  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
