# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Category do
  it { should have_many(:posts).dependent(:destroy) }
  it { should belong_to(:parent).class_name('Category').inverse_of(:children).optional }

  it do
    should have_many(:children)
      .class_name('Category')
      .inverse_of(:parent)
      .with_foreign_key(:parent_id)
      .dependent(:nullify)
  end

  describe 'uniqueness validations' do
    # In a separate describe block so the subject can be set
    # See https://matchers.shoulda.io/docs/v5.3.0/Shoulda/Matchers/ActiveRecord.html#validate_uniqueness_of-instance_method
    subject { build(:category) }

    it { should validate_uniqueness_of(:order).scoped_to(:parent_id) }
  end
end
