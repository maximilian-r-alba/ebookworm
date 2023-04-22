class ReviewsController < ApplicationController
    before_action :check_user, only: %i[ update destroy ]

    def create
        review = @current_user.reviews.create!(review_params)
        
        render json: review , status: :created
    end

    def update
        @review.update!(review_params)
        
        render json: @review
    end

    def destroy
        @review.destroy
        
        head :no_content
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
