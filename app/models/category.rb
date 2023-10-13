class Category < ApplicationRecord
    validates :order, unique: true
end
