# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                  :bigint           not null, primary key
#  encrypted_password  :string           default(""), not null
#  login               :string
#  name                :string
#  remember_created_at :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
# Indexes
#
#  index_users_on_login  (login) UNIQUE
#
FactoryBot.define do
  factory :user do
    sequence(:login) { |n| "user#{n}" }
    sequence(:name) { |n| "User #{n}" }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
