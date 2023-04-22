class SubscriptionsController < ApplicationController

    def create

        subscription = @current_user.subscriptions.create!(chatroom_id: params[:chatroom_id])

        render json: subscription, status: :created
    end

    def destroy
        
        subscription = Subscription.find(params[:subscription_id])
        if subscription.user == @current_user
            subscription.destroy
            head :no_content
        
        else
            render json: {errors: ["You cannot delete another user's subscription"]}
        end
    end

end
