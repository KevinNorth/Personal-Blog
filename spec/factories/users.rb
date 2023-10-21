# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    admin { true }
    sequence(:login) { |n| "user#{n}" }
    squence(:name) { |n| "User #{n}"}
  end
end
