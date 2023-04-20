class User < ApplicationRecord
    validates_presence_of :username, :name
    validates :username, uniqueness: true
    validates :profile_picture, allow_blank: true, format: {with: %r{.(jpg|png)\Z}i}
    has_secure_password

    has_many :subscriptions
    has_many :chatrooms, through: :subscriptions
end
