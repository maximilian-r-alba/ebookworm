class UserSubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :chatroom_id
  has_many :messages
end
