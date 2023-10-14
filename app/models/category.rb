# frozen_string_literal: true

# == Schema Information
#
# Table name: categories
#
#  id         :bigint           not null, primary key
#  name       :string
#  order      :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  parent_id  :bigint
#
# Indexes
#
#  index_categories_on_parent_id  (parent_id)
#
# Foreign Keys
#
#  fk_rails_...  (parent_id => categories.id)
#
class Category < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :categories, foreign_key: :parent_id, inverse_of: :parent, dependent: :nullify
  belongs_to :parent, class_name: 'Category', inverse_of: :parent

  validates :order, uniqueness: { scope: :parent_id }
end
