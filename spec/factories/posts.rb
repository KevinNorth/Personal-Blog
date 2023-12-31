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
FactoryBot.define do
  factory :post do
    markdown { 'Lorem Ipsum' }
    sequence(:order) { |n| n }
    published { true }
    sequence(:slug) { |n| "post-#{n}" }
    subtitle { 'Subtitle' }
    summary { 'Summary' }
    title { 'Title' }
  end
end
