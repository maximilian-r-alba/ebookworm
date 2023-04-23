class Book < ApplicationRecord
    validates_presence_of :title, :author
    validates :title, uniqueness: { scope: :author}
    after_create :init_format
    has_many :reviews
    has_many :users, through: :reviews

    private

    def init_format
        self.update(rating: 0)
        
        if self.description.nil?
            self.update(description: "No Description Available")
        end
    end
end
