# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id           :bigint           not null, primary key
#  header_image :binary
#  markdown     :text
#  name         :string           default(""), not null
#  order        :integer
#  published    :boolean          default(FALSE), not null
#  slug         :string           not null
#  subtitle     :string
#  summary      :string
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  author_id    :bigint           not null
#  parent_id    :bigint
#
# Indexes
#
#  index_posts_on_author_id  (author_id)
#  index_posts_on_parent_id  (parent_id)
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#  fk_rails_...  (parent_id => posts.id)
#
require 'rails_helper'

RSpec.describe Post do
  it { should belong_to(:parent).class_name('Post').inverse_of(:children).optional(true) }
  it { should belong_to(:author).class_name('User').inverse_of(:posts) }

  describe 'uniqueness validations' do
    # In a separate describe block so the subject can be set
    # See https://matchers.shoulda.io/docs/v5.3.0/Shoulda/Matchers/ActiveRecord.html#validate_uniqueness_of-instance_method
    subject { build(:post, author: user, parent: create(:post, author: user)) }

    let(:user) { create(:user) }

    it { should validate_uniqueness_of(:order).scoped_to(:parent_id) }
    it { should validate_uniqueness_of(:slug) }
  end
end
