class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :profile_picture, :headline
end
