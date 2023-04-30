class Subscription < ApplicationRecord
  validates :chatroom, uniqueness: {scope: :user, message: ": already subscribed to this room"}
  belongs_to :user
  belongs_to :chatroom
  has_many :messages , dependent: :destroy
end
