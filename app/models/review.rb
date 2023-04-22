class Review < ApplicationRecord
  validates :rating, numericality: { only_integer: true , in: (1..5) , allow_nil: true}
  after_save :update_book_rating
  after_destroy :update_book_rating
  belongs_to :user
  belongs_to :book

  private

  def update_book_rating
    
    book = self.book
    reviews = self.book.reviews
    rating =( reviews.map{|review| review[:rating]}.sum.to_f / reviews.length )

    book.update(rating: rating)
  end
end
