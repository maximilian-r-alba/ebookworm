class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :chatroom
  has_many :messages
end
