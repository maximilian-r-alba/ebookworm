class ChatroomMessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at
  belongs_to :subscription
end
