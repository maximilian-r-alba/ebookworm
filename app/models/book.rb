class Book < ApplicationRecord
    validates_presence_of :title, :author

    has_many :reviews
    has_many :users, through: :reviews
end
