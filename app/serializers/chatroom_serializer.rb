class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :topic
  has_many :subscriptions
  has_many :messages, through: :subscriptions
end
