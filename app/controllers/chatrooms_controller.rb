class ChatroomsController < ApplicationController
  before_action :check_owner, only: %i[ update destroy ]
  skip_before_action :authorize, only: [:index, :show]
  # GET /chatrooms
  def index
    render json: Chatroom.all
  end

  # GET /chatrooms/1
  def show
    render json: Chatroom.find(params[:id]), include:['subscriptions' , 'messages', 'messages.subscription']
  end

  # POST /chatrooms
  def create
      chatroom = @current_user.owned_chats.create!(chatroom_params)
      
      render json: chatroom, status: :created
  end

  # PATCH/PUT /chatrooms/1
  def update
    @chatroom.update!(chatroom_params)

    render json: @chatroom
  end

  # DELETE /chatrooms/1
  def destroy

    @chatroom.destroy
    
    head :no_content
  end

  private

    def check_owner      
      @chatroom = Chatroom.find(params[:id])

      render json:{errors:["You are not the owner of this chat"]}, status: :unauthorized unless @chatroom.owner == @current_user
    end

    # Only allow a list of trusted parameters through.
    def chatroom_params
      params.require(:chatroom).permit(:topic)
    end
end
