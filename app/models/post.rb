# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id           :bigint           not null, primary key
#  header_image :binary
#  markdown     :text
#  order        :integer
#  published    :boolean          default(FALSE), not null
#  slug         :string           not null
#  subtitle     :string
#  summary      :string
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  author_id    :bigint           not null
#  category_id  :bigint           not null
#
# Indexes
#
#  index_posts_on_author_id    (author_id)
#  index_posts_on_category_id  (category_id)
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#  fk_rails_...  (category_id => categories.id)
#
class Post < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :children, class_name: 'Post', foreign_key: :parent_id, inverse_of: :parent, dependent: :nullify
  belongs_to :parent, class_name: 'Post', inverse_of: :children, optional: true
  belongs_to :author, class_name: 'User', inverse_of: :posts

  # These columns are exclusively used to keep track of metadata needed to make
  # db/migrate/db/migrate/20240704022000_refactor_categories_into_posts.rb
  # a reversible migration.
  # ignored_columns %i[
  #   was_category
  #   previous_id_as_category
  #   previous_parent_id_as_category
  #   previous_order_as_category
  # ]

  validates :order, uniqueness: { scope: :category_id }
end
