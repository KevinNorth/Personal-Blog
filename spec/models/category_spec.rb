# frozen_string_literal: true

# == Schema Information
#
# Table name: categories
#
#  id           :bigint           not null, primary key
#  header_image :binary
#  markdown     :text
#  name         :string
#  order        :integer
#  published    :boolean          default(FALSE), not null
#  slug         :string           not null
#  subtitle     :string
#  summary      :string
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  parent_id    :bigint
#
# Indexes
#
#  index_categories_on_parent_id  (parent_id)
#
# Foreign Keys
#
#  fk_rails_...  (parent_id => categories.id)
#
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
