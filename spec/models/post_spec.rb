# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id                             :bigint           not null, primary key
#  header_image                   :binary
#  markdown                       :text
#  name                           :string           default(""), not null
#  order                          :integer
#  previous_id_as_category        :integer
#  previous_order_as_category     :integer          default(1)
#  previous_parent_id_as_category :integer
#  published                      :boolean          default(FALSE), not null
#  slug                           :string           not null
#  subtitle                       :string
#  summary                        :string
#  title                          :string
#  was_category                   :boolean          default(FALSE), not null
#  created_at                     :datetime         not null
#  updated_at                     :datetime         not null
#  author_id                      :bigint           not null
#  category_id                    :bigint
#  parent_id                      :bigint
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
  it { should belong_to(:category) }
  it { should belong_to(:author).class_name('User').inverse_of(:posts) }

  describe 'uniqueness validations' do
    # In a separate describe block so the subject can be set
    # See https://matchers.shoulda.io/docs/v5.3.0/Shoulda/Matchers/ActiveRecord.html#validate_uniqueness_of-instance_method
    subject { build(:post, author: create(:user), category: create(:category)) }

    it { should validate_uniqueness_of(:order).scoped_to(:category_id) }
  end
end
