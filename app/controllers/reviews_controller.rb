class ReviewsController < ApplicationController
    before_action :check_user, only: %i[ update destroy ]

    def create
        review = @current_user.reviews.create!(review_params)
        
        render json: review , status: :created
    end

    def update
        review = Review.find(params[:id])
        if review.user == @current_user
            review.update!(review_params)
            render json: review
        else
            render json: {errors: ["Cannot edit a different user's review"]}, status: :unauthorized
        end
    end

    def destroy
        byebug
        review = Review.find(params[:id])
        if review.user == @current_user
          review.destroy
          head :no_content

        else
            render json: {errors: ["Cannot edit a different user's review"]}, status: :unauthorized
        end
        
    end

    private

    def review_params
        params.permit(:title, :body, :rating, :book_id)
    end

    def check_user
        @review = Review.find(params[:id])
        @user = @review.user

        render json: {errors: ["You cannot edit someone else's review"]}, status: :unauthorized unless @user == @current_user
      end

end
