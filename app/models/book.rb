class Book < ApplicationRecord
    validates_presence_of :title, :author
    validates :title, uniqueness: true
    has_many :reviews
    has_many :users, through: :reviews
end
