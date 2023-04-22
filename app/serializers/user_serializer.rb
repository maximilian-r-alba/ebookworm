class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :profile_picture, :headline
  has_many :subscriptions, serializer: UserSubscriptionSerializer
  has_many :chatrooms, through: :subscriptions
end
