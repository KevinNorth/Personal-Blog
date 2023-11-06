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
require 'rails_helper'

RSpec.describe User do
  it { should have_many(:posts).inverse_of(:author).with_foreign_key(:author_id).dependent(:destroy) }
end
