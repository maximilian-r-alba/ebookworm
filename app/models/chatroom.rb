class Chatroom < ApplicationRecord
    validates :topic, presence: true
    after_create :subscribe_owner
    belongs_to :owner, class_name: "User", foreign_key: :user_id
    has_many :subscriptions
    has_many :users, through: :subscriptions
    has_many :messages, through: :subscriptions

    private 
    def subscribe_owner
        self.owner.subscriptions.create!(chatroom: self)
    end
end
