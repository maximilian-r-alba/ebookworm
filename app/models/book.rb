class Book < ApplicationRecord
    validates_presence_of :title, :author
    validates :title, uniqueness: true
    after_create :zero_rating
    has_many :reviews
    has_many :users, through: :reviews

    private

    def zero_rating
        self.update(rating: 0)
    end
end
