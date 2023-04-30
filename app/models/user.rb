class User < ApplicationRecord
    validates_presence_of :username, :name
    validates :username, uniqueness: true
    validates :headline, allow_blank: true, length: {in: 0..255}
    validates :profile_picture, allow_blank: true, format: {with: %r{.(jpg|png)\Z}i}
    validates :password, confirmation: true
    validates :password_confirmation, presence: true, if: :password_digest_changed?
    after_create :default_profile
    has_secure_password
    has_many :owned_chats, class_name: "Chatroom", dependent: :destroy
    has_many :subscriptions, dependent: :destroy
    has_many :chatrooms, through: :subscriptions
    has_many :reviews, dependent: :destroy
    has_many :books, through: :reviews

    private

    def default_profile
        if !self.profile_picture || self.profile_picture.empty?
            self.update(profile_picture:" https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg")
        end

        self.update(headline: "") unless self.headline
    end
end
