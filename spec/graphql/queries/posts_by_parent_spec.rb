# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'post_by_parent', type: :request do
  before do
    sign_in create(:user)
  end

  def get_query(parent_id:, include_unpublished:)
    <<~GQL
      query {
        postsByParent(
          parentId: #{parent_id}
          includeUnpublished: #{include_unpublished}
        ) {
          id
        }
      }
    GQL
  end

  shared_examples 'responds with empty array' do
    it 'responds with an empty array' do
      query = get_query(parent_id:, include_unpublished:)

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['postsByParent']

      expect(result.count).to eq(0)
    end
  end

  describe 'when the id argument matches a post' do
    describe 'when the post is published' do
      let(:author) { create(:user) }
      let!(:parent) { create(:post, author:, published: true) }
      let!(:published_children) { create_list(:post, 3, author:, parent:, published: true) }
      let!(:unpublished_children) { create_list(:post, 3, author:, parent:, published: false) }
      let(:all_children) { published_children + unpublished_children }

      describe 'when the include_unpublished argument is true' do
        it "responds with all of the parent's children" do
          query = get_query(parent_id: parent.id, include_unpublished: true)

          post graphql_path, params: { query: }
          json = JSON.parse(response.body)
          result = json['data']['postsByParent']

          expect(result.count).to eq(all_children.count)

          expected_post_ids = all_children.pluck(:id).map(&:to_s)
          actual_post_ids = result.pluck('id')
          expect(actual_post_ids).to match_array(expected_post_ids)
        end

        describe 'when the category does not have associated posts' do
          before do
            all_children.each(&:destroy)
          end

          let(:parent_id) { parent.id }
          let(:include_unpublished) { true }

          include_examples 'responds with empty array'
        end
      end

      describe 'when the include_unpublished argument is false' do
        it "responds with the category's published posts" do
          query = get_query(parent_id: parent.id, include_unpublished: false)

          post graphql_path, params: { query: }
          json = JSON.parse(response.body)
          result = json['data']['postsByParent']

          expect(result.count).to eq(published_children.count)

          expected_post_ids = published_children.pluck(:id).map(&:to_s)
          actual_post_ids = result.pluck('id')
          expect(actual_post_ids).to match_array(expected_post_ids)
        end

        describe 'when the parent does not have associated published posts' do
          before do
            published_children.each(&:destroy)
          end

          let(:parent_id) { parent.id }
          let(:include_unpublished) { false }

          include_examples 'responds with empty array'
        end
      end
    end

    describe 'when the category is not published' do
      let(:author) { create(:user) }
      let!(:parent) { create(:post, author:, published: false) }
      let!(:published_children) { create_list(:post, 3, author:, parent:, published: true) }
      let!(:unpublished_children) { create_list(:post, 3, author:, parent:, published: false) }
      let(:all_children) { published_children + unpublished_children }

      describe 'when the include_unpublished argument is true' do
        it "responds with all of the parent's posts" do
          query = get_query(parent_id: parent.id, include_unpublished: true)

          post graphql_path, params: { query: }
          json = JSON.parse(response.body)
          result = json['data']['postsByParent']

          expect(result.count).to eq(all_children.count)

          expected_post_ids = all_children.pluck(:id).map(&:to_s)
          actual_post_ids = result.pluck('id')
          expect(actual_post_ids).to match_array(expected_post_ids)
        end

        describe 'when the parent does not have associated posts' do
          before do
            all_children.each(&:destroy)
          end

          let(:parent_id) { parent.id }
          let(:include_unpublished) { true }

          include_examples 'responds with empty array'
        end
      end

      describe 'when the include_unpublished argument is false' do
        let(:parent_id) { parent.id }
        let(:include_unpublished) { false }

        include_examples 'responds with empty array'
      end
    end
  end

  describe 'when the parent_id argument does not match an existing parent' do
    let(:parent_id) { Post.count == 0 ? 1 : Post.maximum(:id) + 1 }

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
