# frozen_string_literal: true

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
