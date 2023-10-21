# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  it { should have_many(:posts).inverse_of(:author).with_foreign_key(:author_id).dependent(:destroy) }
end
