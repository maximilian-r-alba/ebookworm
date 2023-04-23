class BooksController < ApplicationController
  before_action :set_book, only: %i[ show update destroy ]
  skip_before_action :authorize, only: [:index , :show]
  # GET /books
  def index
    @books = Book.all

    render json: @books
  end

  # GET /books/1
  def show
    render json: @book
  end

  # POST /books
  def create
    book = Book.create!(book_params)
    render json: book, status: :created
  end

  # PATCH/PUT /books/1
  # def update
  #   if @book.update(book_params)
  #     render json: @book
  #   else
  #     render json: @book.errors, status: :unprocessable_entity
  #   end
  # end

  # # DELETE /books/1
  # def destroy
  #   @book.destroy
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def book_params
      params.require(:book).permit(:title, :author, :img_url, :rating, :description)
    end
end
