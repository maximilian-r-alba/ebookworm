class Review < ApplicationRecord
  # use uniqueness to prevent a user from spamming reviews?
  validates :rating, numericality: { only_integer: true , in: (0..5)}
  validates :book_id, uniqueness: {scope: :user_id}
  validates :title, length: {in: 0..255, allow_nil: false}
  validates :body, length: {in: 0..500000, allow_nil: false}
  after_save :update_book_rating
  after_destroy :update_book_rating
  belongs_to :user
  belongs_to :book

  private

  def update_book_rating
    
    book = self.book
    reviews = self.book.reviews
    
    if reviews.length == 0
      book.update(rating: 0.0)
    else
    rating = (reviews.map{|review| review[:rating]}.sum.to_f / reviews.filter{|r| r.rating != 0}.length)
  
    book.update(rating: rating)
    end
    
  end
  
end
