class UsersController < ApplicationController
  # before_action :set_user, only: %i[ update destroy ]
  skip_before_action :authorize, only: [:index , :create]
  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    @user = User.find(params[:id])
    render json: @user
  end

  # POST /users
  def create
      @user = User.create!(user_params)

      render json: @user, status: :created
  
  end

  # PATCH/PUT /users/1
  def update
    # make an error alerting can't update someone else's profile
    @user = User.find_by(id: params[:id])
    byebug
    if @user == @current_user && @current_user.update(user_params)
      render json: @current_user
    else
      render json:@current_user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @current_user.destroy
  end

  private

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:name, :username, :password, :password_confirmation, :profile_picture, :headline)
    end
end
