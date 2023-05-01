class ChatroomMessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :subscription_id

end
