# frozen_string_literal: true

require 'rails_helper'

def get_query(category_id:, include_unpublished:)
  <<~GQL
    query {
      postsByCategory(
        categoryId: #{category_id}
        includeUnpublished: #{include_unpublished}
      ) {
        id
      }
    }
  GQL
end

RSpec.describe 'post_by_category', type: :request do
  let(:author) { create(:user) }

  shared_examples 'responds with empty array' do
    it 'responds with an empty array' do
      query = get_query(category_id:, include_unpublished:)

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['postsByCategory']

      expect(result.count).to eq(0)
    end
  end

  describe 'when the id argument matches a category' do
    describe 'when the category is published' do
      let!(:category) { create(:category, published: true) }
      let!(:published_posts) { create_list(:post, 3, author:, category:, published: true) }
      let!(:unpublished_posts) { create_list(:post, 3, author:, category:, published: false) }
      let(:all_posts) { published_posts + unpublished_posts }

      describe 'when the include_unpublished argument is true' do
        it "responds with all of the category's posts" do
          query = get_query(category_id: category.id, include_unpublished: true)

          post graphql_path, params: { query: }
          json = JSON.parse(response.body)
          result = json['data']['postsByCategory']

          expected_post_ids = all_posts.pluck(:id).map(&:to_s)
          actual_post_ids = result.pluck('id')
          expect(actual_post_ids).to match_array(expected_post_ids)
        end

        describe 'when the category does not have associated posts' do
          before do
            all_posts.each(&:destroy)
          end

          let(:category_id) { category.id }
          let(:include_unpublished) { true }

          include_examples 'responds with empty array'
        end
      end

      describe 'when the include_unpublished argument is false' do
        it "responds with the category's published posts" do
          query = get_query(category_id: category.id, include_unpublished: false)

          post graphql_path, params: { query: }
          json = JSON.parse(response.body)
          result = json['data']['postsByCategory']

          expected_post_ids = published_posts.pluck(:id).map(&:to_s)
          actual_post_ids = result.pluck('id')
          expect(actual_post_ids).to match_array(expected_post_ids)
        end

        describe 'when the category does not have associated published posts' do
          before do
            published_posts.each(&:destroy)
          end

          let(:category_id) { category.id }
          let(:include_unpublished) { false }

          include_examples 'responds with empty array'
        end
      end
    end

    describe 'when the category is not published' do
      let!(:category) { create(:category, published: false) }
      let!(:published_posts) { create_list(:post, 3, author:, category:, published: true) }
      let!(:unpublished_posts) { create_list(:post, 3, author:, category:, published: false) }
      let(:all_posts) { published_posts + unpublished_posts }

      describe 'when the include_unpublished argument is true' do
        it "responds with all of the category's posts" do
          query = get_query(category_id: category.id, include_unpublished: true)

          post graphql_path, params: { query: }
          json = JSON.parse(response.body)
          result = json['data']['postsByCategory']

          expect(result.count).to eq(all_posts.count)

          expected_post_ids = all_posts.pluck(:id).map(&:to_s)
          actual_post_ids = result.pluck('id')
          expect(actual_post_ids).to match_array(expected_post_ids)
        end

        describe 'when the category does not have associated posts' do
          before do
            all_posts.each(&:destroy)
          end

          let(:category_id) { category.id }
          let(:include_unpublished) { true }

          include_examples 'responds with empty array'
        end
      end

      describe 'when the include_unpublished argument is false' do
        let(:category_id) { category.id }
        let(:include_unpublished) { false }

        include_examples 'responds with empty array'
      end
    end
  end

  describe 'when the id argument does not match an existing category' do
    let(:category_id) { Category.count == 0 ? 1 : Category.maximum(:id) + 1 }

    describe 'when the include_unpublished argument is true' do
      let(:include_unpublished) { true }

      include_examples 'responds with empty array'
    end

    describe 'when the include_unpublished argument is false' do
      let(:include_unpublished) { false }

      include_examples 'responds with empty array'
    end
  end
end
