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
class User < ApplicationRecord
  # Included Devise modules. I'm not worried about setting up
  # options for users to change their passwords or getting emails
  # to confirm their accounts/reset their passwords because I'm
  # going to be the only user, lol. I can use the project's Rake
  # tasks to manage my login credentials directly form the server,
  # and that's more than good enough for my particular use case.
  devise :database_authenticatable, :rememberable, :timeoutable

  has_many :posts, foreign_key: :author_id, inverse_of: :author, dependent: :destroy

  validates :login, presence: true, uniqueness: true
end
