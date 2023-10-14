class Category < ApplicationRecord
    has_many :pages

    validates :order, uniqueness: true
end
