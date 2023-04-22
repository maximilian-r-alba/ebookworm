class MessagesController < ApplicationController

    # def index
    #     render json: Message.all
    # end

    # def show

    #     render json: Message.find(params[:id])
    # end
    private

    def message_params
        params.permit(:chatroom_id , :subscription_id , :content)
    end
end
