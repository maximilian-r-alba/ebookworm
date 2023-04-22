class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content
  # maybe need to add timestamps?
  # has_one :subscription
  # has_one :chatroom
end
