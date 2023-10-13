class Page < ApplicationRecord
  belongs_to :category

  validates :order, unique: true
end
