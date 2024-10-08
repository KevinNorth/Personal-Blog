# frozen_string_literal: true

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
FactoryBot.define do
  factory :post do
    markdown { 'Lorem Ipsum' }
    sequence(:order) { |n| n }
    published { true }
    sequence(:slug) { |n| "post-#{n}" }
    subtitle { 'Subtitle' }
    summary { 'Summary' }
    title { 'Title' }
    name { 'Name' }
  end
end
