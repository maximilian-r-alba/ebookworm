class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    chat = Chatroom.find(params[:room])
    # stream_from "chatroom#{params[:room]}"
    # stream_from "chat"
    stream_for chat
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
