class UsersController < ApplicationController
  before_action :check_user, only: %i[ update destroy ]
  skip_before_action :authorize, only: [:index , :create]

  # GET /users
  def index
    @users = User.all

    render json: @users, include: ['subscriptions', 'subscriptions.messages', 'chatrooms']
  end

  # GET /users/1
  def show
    user = User.find(params[:id])

    # might not want/need to see all subscription messages
    render json: user, include: ['subscriptions', 'subscriptions.messages', 'chatrooms']
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
