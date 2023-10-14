class Page < ApplicationRecord
  belongs_to :category
  has_many :posts

  validates :order, uniqueness: true
end
