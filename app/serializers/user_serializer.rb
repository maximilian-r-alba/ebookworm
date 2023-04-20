class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :password_digest, :profile_picture, :headline
end
