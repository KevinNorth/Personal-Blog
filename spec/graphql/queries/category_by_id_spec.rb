# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'category_by_id', type: :request do
  shared_examples 'responds with category' do
    it 'responds with the corresponding category' do
      query = <<~GQL
        query {
          categoryById(id: #{category.id}, includeUnpublished: #{include_unpublished}) {
            children {
              id
            }
            createdAt
            id
            markdown
            name
            order
            parent {
              id
            }
            posts {
              id
            }
            published
            slug
            subtitle
            summary
            title
            updatedAt
          }
        }
      GQL

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['categoryById']

      expect(result).to include(
        'id' => category.id.to_s,
        'markdown' => category.markdown,
        'name' => category.name,
        'order' => category.order,
        'published' => category.published,
        'slug' => category.slug,
        'subtitle' => category.subtitle,
        'summary' => category.summary,
        'title' => category.title
      )

      expect(DateTime.parse(result['createdAt'])).to eq(strip_milliseconds(category.created_at))
      expect(DateTime.parse(result['updatedAt'])).to eq(strip_milliseconds(category.updated_at))

      expect(result['parent']['id']).to eq(category.parent.id.to_s)

      expected_post_ids = posts_in_category.pluck(:id).map(&:to_s)
      actual_post_ids = result['posts'].pluck('id')
      expect(actual_post_ids).to match_array(expected_post_ids)

      expected_children_ids = children_categories.pluck(:id).map(&:to_s)
      actual_children_ids = result['children'].pluck('id')
      expect(actual_children_ids).to match_array(expected_children_ids)
    end
  end

  shared_examples 'responds with null' do
    it 'responds with null' do
      query = <<~GQL
        query {
          categoryById(id: #{id}, includeUnpublished: #{include_unpublished}) {
            children {
              id
            }
            createdAt
            id
            markdown
            name
            order
            parent {
              id
            }
            posts {
              id
            }
            published
            slug
            subtitle
            summary
            title
            updatedAt
          }
        }
      GQL

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['categoryById']

      expect(result).to be_nil
    end
  end

  describe 'when given id argument for a category that exists' do
    describe 'when the post is published' do
      let(:parent) { create(:category) }
      let(:category) { create(:category, parent:, published: true) }
      let(:author) { create(:user) }
      let!(:posts_in_category) { create_list(:post, 3, category:, author:) }
      let!(:children_categories) { create_list(:category, 3, parent: category) }

      describe 'when include_unpublished is false' do
        let(:include_unpublished) { false }

        include_examples 'responds with category'
      end

      describe 'when include_unpublished is true' do
        let(:include_unpublished) { true }

        include_examples 'responds with category'
      end
    end

    describe 'when the post is not published' do
      let(:parent) { create(:category) }
      let(:category) { create(:category, parent:, published: false) }
      let(:author) { create(:user) }
      let!(:posts_in_category) { create_list(:post, 3, category:, author:) }
      let!(:children_categories) { create_list(:category, 3, parent: category) }

      describe 'when include_unpublished is false' do
        let(:include_unpublished) { false }
        let(:id) { category.id }

        include_examples 'responds with null'
      end

      describe 'when include_unpublished is true' do
        let(:include_unpublished) { true }

        include_examples 'responds with category'
      end
    end
  end

  describe 'when given id argument that does not match a post' do
    let(:id) { Category.count == 0 ? 1 : Category.maximum(id) + 1 }

    describe 'when include_unpublished is false' do
      let(:include_unpublished) { false }

      include_examples 'responds with null'
    end

    describe 'when include_unpublished is true' do
      let(:include_unpublished) { true }

      include_examples 'responds with null'
    end
  end
end
