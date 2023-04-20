class Message < ApplicationRecord
  validates_presence_of :content
  belongs_to :subscription
  belongs_to :chatroom
end
