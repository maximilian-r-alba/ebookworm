class Subscription < ApplicationRecord
  # user cannot subscribe to the same chat multiple times
  validates :chatroom, uniqueness: {scope: :user, message: ": already subscribed to this room"}
  belongs_to :user
  belongs_to :chatroom
  has_many :messages , dependent: :destroy
end
