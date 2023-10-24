# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Post do
  it { should belong_to(:category) }
  it { should belong_to(:author).class_name('User').inverse_of(:posts) }

  describe 'uniqueness validations' do
    # In a separate describe block so the subject can be set
    # See https://matchers.shoulda.io/docs/v5.3.0/Shoulda/Matchers/ActiveRecord.html#validate_uniqueness_of-instance_method
    subject { build(:post, author: create(:user), category: create(:category)) }

    it { should validate_uniqueness_of(:order).scoped_to(:category_id) }
  end
end
