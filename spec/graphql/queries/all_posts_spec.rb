# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'all_posts', type: :request do
  before do
    sign_in create(:user)
  end

  def get_query(include_unpublished:)
    <<~GQL
      query {
        allPosts(includeUnpublished: #{include_unpublished}) {
          id
          children {
            id
          }
        }
      }
    GQL
  end

  let(:author) { create(:user) }
  let!(:published_root_posts) { create_list(:post, 3, parent: nil, author:, published: true) }
  let!(:unpublished_root_posts) { create_list(:post, 3, parent: nil, author:, published: false) }
  let!(:published_children_posts) do
    published_children_posts = []

    published_root_posts.each do |root_post|
      published_children_posts += create_list(:post, 3, parent: root_post, author:, published: true)
    end

    published_children_posts
  end
  let!(:unpublished_children_posts) do
    unpublished_children_posts = []

    unpublished_root_posts.each do |root_post|
      unpublished_children_posts += create_list(:post, 3, parent: root_post, author:, published: false)
    end

    unpublished_children_posts
  end
  let(:published_posts) { published_root_posts + published_children_posts }
  let(:unpublished_posts) { unpublished_root_posts + unpublished_children_posts }
  let(:all_posts) { published_posts + unpublished_posts }

  describe 'when include_unpublished is true' do
    it 'responds with all posts' do
      query = get_query(include_unpublished: true)

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['allPosts']

      expected_post_ids = all_posts.pluck(:id).map(&:to_s)
      actual_post_ids = result.pluck('id')
      expect(actual_post_ids).to match_array(expected_post_ids)
    end
  end

  describe 'when include_unpublished is false' do
    it 'responds only with published posts' do
      query = get_query(include_unpublished: false)

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['allPosts']

      expected_post_ids = published_posts.pluck(:id).map(&:to_s)
      actual_post_ids = result.pluck('id')
      expect(actual_post_ids).to match_array(expected_post_ids)
    end
  end
end
