class ChatChannel < ApplicationCable::Channel
  def subscribed
    
    chat = Chatroom.find(params[:room])
    stream_for chat
    # stream_from "chatroom#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
