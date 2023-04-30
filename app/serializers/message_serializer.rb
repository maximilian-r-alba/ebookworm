class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at
  belongs_to :subscription
  # has_one :chatroom
end
