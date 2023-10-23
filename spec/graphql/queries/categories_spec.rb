# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'categories', type: :request do
  let!(:published_categories) { create_list(:category, 3, parent: nil, published: true) }
  let!(:unpublished_categories) { create_list(:category, 3, parent: nil, published: false) }
  let(:all_categories) { published_categories + unpublished_categories }
  let(:author) { create(:user) }
  let!(:published_posts) do
    published_posts = []

    published_categories.each do |category|
      published_posts += create_list(:post, 3, category:, author:, published: true)
    end

    published_posts
  end
  let!(:unpublished_posts) do
    unpublished_posts = []

    published_categories.each do |category|
      unpublished_posts += create_list(:post, 3, category:, author:, published: false)
    end

    unpublished_categories.each do |category|
      unpublished_posts += create_list(:post, 3, category:, author:, published: false)
    end

    unpublished_posts
  end
  let(:all_posts) { published_posts + unpublished_posts }

  describe 'when include_unpublished is true' do
    it 'responds with all categories' do
      query = <<~GQL
        query {
          categories(includeUnpublished: true) {
            id
            posts {
              id
            }
          }
        }
      GQL

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['categories']

      expected_category_ids = all_categories.pluck(:id).map(&:to_s)
      actual_category_ids = result.pluck('id')
      expect(actual_category_ids).to match_array(expected_category_ids)

      actual_category_ids.each do |category_id|
        expected_post_ids = all_posts.filter { |post| post.category_id.to_s == category_id }
                                     .pluck(:id).map(&:to_s)
        actual_post_ids = result.find { |category| category['id'] == category_id }['posts']
                                .pluck('id')
        expect(actual_post_ids).to match_array(expected_post_ids)
      end
    end
  end

  describe 'when include_unpublished is false' do
    it 'responds only with published categories and published posts' do
      query = <<~GQL
        query {
          categories(includeUnpublished: false) {
            id
            posts {
              id
            }
          }
        }
      GQL

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['categories']

      expected_category_ids = published_categories.pluck(:id).map(&:to_s)
      actual_category_ids = result.pluck('id')
      expect(actual_category_ids).to match_array(expected_category_ids)

      actual_category_ids.each do |category_id|
        expected_post_ids = published_posts.filter { |post| post.category_id.to_s == category_id }
                                           .pluck(:id).map(&:to_s)
        actual_post_ids = result.find { |category| category['id'] == category_id }['posts']
                                .pluck('id')
        expect(actual_post_ids).to match_array(expected_post_ids)
      end
    end
  end
end
