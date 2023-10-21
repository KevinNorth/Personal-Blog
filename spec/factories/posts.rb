# frozen_string_literal: true

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
