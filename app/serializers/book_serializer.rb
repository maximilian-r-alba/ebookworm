class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :img_url, :rating
end
