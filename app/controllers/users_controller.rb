class UsersController < ApplicationController
  before_action :check_user, only: %i[ update destroy ]
  skip_before_action :authorize, only: [:index , :create]

  # GET /users
  def index
    render json: User.all, include: ['subscriptions', 'subscriptions.messages', 'chatrooms', 'owned_chats']
  end

  # GET /users/1
  def show
    user = User.find_by(id:session[:user_id])
        if user
          render json: user, include: ['subscriptions', 'subscriptions.messages', 'chatrooms', 'owned_chats']
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    # might not want/need to see all subscription messages
   
  end

  # POST /users
  def create
      user = User.create!(user_params)

      render json: user, status: :created
  end

  # PATCH/PUT /users/1
  def update
      @current_user.update!(user_params)

      render json: @current_user
  end

  # DELETE /users/1
  def destroy
    @current_user.destroy
    session.delete :user_id

    head :no_content
  end

  private

    def check_user
      @user = User.find(params[:id])

      render json: {errors: ["You cannot edit someone else's profile"]}, status: :unauthorized unless @user == @current_user
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:name, :username, :password, :password_confirmation, :profile_picture, :headline)
    end
end
