# frozen_string_literal: true

# == Schema Information
#
# Table name: categories
#
#  id           :bigint           not null, primary key
#  header_image :binary
#  markdown     :text
#  name         :string
#  order        :integer
#  published    :boolean          default(FALSE), not null
#  slug         :string           not null
#  subtitle     :string
#  summary      :string
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  parent_id    :bigint
#
# Indexes
#
#  index_categories_on_parent_id  (parent_id)
#
# Foreign Keys
#
#  fk_rails_...  (parent_id => categories.id)
#
FactoryBot.define do
  factory :category do
    markdown { 'Lorem Ipsum' }
    sequence(:name) { |n| "Category #{n}" }
    sequence(:order) { |n| n }
    published { true }
    sequence(:slug) { |n| "category-#{n}" }
    subtitle { 'Subtitle' }
    summary { 'Summary' }
    title { 'Title' }
  end
end
