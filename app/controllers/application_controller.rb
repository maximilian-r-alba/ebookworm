class ApplicationController < ActionController::API
include ActionController::Cookies

before_action :authorize
rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_errors
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_error

private

def authorize
    @current_user = User.find_by(id:session[:user_id])
    
    render json: {errors: ["Not authorized"]}, status: :unauthorized unless @current_user
    
  end

  def render_invalid_errors (invalidObj)
    render json: {errors: invalidObj.record.errors.full_messages}, status: :unprocessable_entity
  end
  
  def render_not_found_error(invalidObj)
    render json: {errors: [invalidObj.message]}, status: :not_found
  end

end
