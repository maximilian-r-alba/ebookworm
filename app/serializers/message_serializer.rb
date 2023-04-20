class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content
  has_one :subscription
  has_one :chatroom
end
