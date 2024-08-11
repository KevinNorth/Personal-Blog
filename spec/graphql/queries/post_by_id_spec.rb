# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'post_by_id', type: :request do
  before do
    sign_in create(:user)
  end

  def get_query(id:, include_unpublished:)
    <<~GQL
      query {
        postById(id: #{id}, includeUnpublished: #{include_unpublished}) {
          author {
            id
          }
          parent {
            id
          }
          createdAt
          id
          markdown
          name
          order
          published
          slug
          subtitle
          summary
          title
          updatedAt
        }
      }
    GQL
  end

  shared_examples 'responds with post' do
    it 'responds with the corresponding post' do
      query = get_query(id: db_post.id, include_unpublished:)

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['postById']

      expect(result).to include(
        'id' => db_post.id.to_s,
        'markdown' => db_post.markdown,
        'name' => db_post.name,
        'order' => db_post.order,
        'published' => db_post.published,
        'slug' => db_post.slug,
        'subtitle' => db_post.subtitle,
        'summary' => db_post.summary,
        'title' => db_post.title
      )

      expect(DateTime.parse(result['createdAt'])).to eq(strip_milliseconds(db_post.created_at))
      expect(DateTime.parse(result['updatedAt'])).to eq(strip_milliseconds(db_post.updated_at))

      expect(result['author']['id']).to eq(db_post.author.id.to_s)
      expect(result['parent']['id']).to eq(db_post.parent.id.to_s)
    end
  end

  shared_examples 'responds with null' do
    it 'responds with null' do
      query = get_query(id:, include_unpublished:)

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['postById']

      expect(result).to be_nil
    end
  end

  describe 'when given id argument for a post that exists' do
    describe 'when the post is published' do
      let(:author) { create(:user) }
      let(:parent) { create(:post, author:) }
      let!(:db_post) { create(:post, author:, parent:, published: true) }

      describe 'when include_unpublished is false' do
        let(:include_unpublished) { false }

        include_examples 'responds with post'
      end

      describe 'when include_unpublished is true' do
        let(:include_unpublished) { true }

        include_examples 'responds with post'
      end
    end

    describe 'when the post is not published' do
      let(:author) { create(:user) }
      let(:parent) { create(:post, author:) }
      let!(:db_post) { create(:post, author:, parent:, published: false) }

      describe 'when include_unpublished is false' do
        let(:include_unpublished) { false }
        let(:id) { db_post.id }

        include_examples 'responds with null'
      end

      describe 'when include_unpublished is true' do
        let(:include_unpublished) { true }

        include_examples 'responds with post'
      end
    end
  end

  describe 'when given id argument that does not match a post' do
    let(:id) { Post.count == 0 ? 1 : Post.maximum(id) + 1 }

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
