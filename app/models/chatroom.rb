class Chatroom < ApplicationRecord
    validates :topic, presence: true
    has_many :subscriptions
    has_many :users, through: :subscriptions
    has_many :messages, through: :subscriptions
end
