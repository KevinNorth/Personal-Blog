# == Schema Information
#
# Table name: pages
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  order       :integer          not null
#  single_post :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :bigint           not null
#
# Indexes
#
#  index_pages_on_category_id  (category_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#
class Page < ApplicationRecord
  belongs_to :category
  has_many :posts, dependent: nullify

  validates :order, uniqueness: true
end
