# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  admin      :boolean
#  login      :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord
    # TODO: Do not deploy to server until authentication is set up

    has_many :posts, foreign_key: :author_id, inverse_of: :author, dependent: :nullify
end
