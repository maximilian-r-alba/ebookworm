class MessagesController < ApplicationController

    # def index
    #     render json: Message.all
    # end

    # def show

    #     render json: Message.find(params[:id])
    # end

    def create
        message = @current_user.subscriptions.find(params[:subscription_id]).messages.create!(message_params)
        
        render json: message , status: :created
    end

    def destroy
        byebug
        message = Message.find(params[:id])
        if message.subscription.user == @current_user
            message.destroy
            head :no_content
        else
            render json: {errors: "Cannot delete a different user's message"}, status: :unauthorized
        end
    end

    private

    def message_params
        params.permit(:chatroom_id , :content)
    end
end
