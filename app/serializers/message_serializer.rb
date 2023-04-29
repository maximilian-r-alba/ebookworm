class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at
  # has_one :subscription
  # has_one :chatroom
end
