# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    admin { true }
    sequence(:login) { |n| "user#{n}" }
    sequence(:name) { |n| "User #{n}" }
  end
end
