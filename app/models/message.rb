class Message < ApplicationRecord
  validates_presence_of :content
  validate :check_chat
  belongs_to :subscription
  belongs_to :chatroom
  
  private
  
  def check_chat
    errors.add(:chatroom_id, "Chat IDs of subscription and Message must match") unless self.chatroom_id == self.subscription.chatroom_id 
  end
end
