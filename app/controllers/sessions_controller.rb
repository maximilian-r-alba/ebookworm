class SessionsController < ApplicationController

    skip_before_action :authorize, only: :create
    def create
        
        user = User.find_by(username: params[:username])
        
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
             # might not want/need to see all subscription messages
            render json: user, include: ['subscriptions', 'subscriptions.messages', 'chatrooms', 'owned_chats'], status: :created
        else
           render json: {errors:[ "Invalid Username or password"]}, status: :unauthorized
        end

    end

    def destroy
        session.delete :user_id
        head :no_content
    end
end
