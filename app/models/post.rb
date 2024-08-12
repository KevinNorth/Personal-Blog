# frozen_string_literal: true

require_relative 'validators/not_an_ancestor_of_itself_validator'

# == Schema Information
#
# Table name: posts
#
#  id           :bigint           not null, primary key
#  header_image :binary
#  markdown     :text
#  name         :string           default(""), not null
#  order        :integer
#  published    :boolean          default(FALSE), not null
#  slug         :string           not null
#  subtitle     :string
#  summary      :string
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  author_id    :bigint           not null
#  parent_id    :bigint
#
# Indexes
#
#  index_posts_on_author_id  (author_id)
#  index_posts_on_parent_id  (parent_id)
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#  fk_rails_...  (parent_id => posts.id)
#
class Post < ApplicationRecord
  has_many :children, class_name: 'Post', foreign_key: :parent_id, inverse_of: :parent, dependent: :nullify
  belongs_to :parent, class_name: 'Post', inverse_of: :children, optional: true
  belongs_to :author, class_name: 'User', inverse_of: :posts

  validates :order, uniqueness: { scope: :parent_id }
  validates :slug, uniqueness: true
  validates_with ::NotAnAncestorOfItselfValidator
end
