class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :img_url, :rating, :description
  has_many :reviews
end
