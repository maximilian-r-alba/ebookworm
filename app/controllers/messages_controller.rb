class MessagesController < ApplicationController
    before_action :check_user, only: %i[ update destroy ]

    def create
        message = @current_user.subscriptions.find(params[:subscription_id]).messages.create!(message_params)
        
        render json: message , status: :created
    end

    def update
        @message.update!(message_params)
        
        render json: @message
    end

    def destroy
        @message.destroy
        
        head :no_content
    end

    private

    def message_params
        params.permit(:chatroom_id , :content)
    end

    def check_user
        @message = Message.find(params[:id])
        @user = @message.subscription.user

        render json: {errors: ["You cannot edit someone else's profile"]}, status: :unauthorized unless @user == @current_user
      end
end
